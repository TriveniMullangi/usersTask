var mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//var cookieParser = require('cookie-parser');
var logger = require('./util/logger');
const usersRoute = require('./routes/users.route')

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(bodyParser.json({ extended: true}))
app.use(bodyParser.urlencoded({extended: true}))



mongoose.connect("mongodb://madhukorada:madhukorada123@ds141633.mlab.com:41633/hubble");
mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb ');
});
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in database connection: ' + err);
        logger.error('Error in database connection: ' + err);
    }
});

app.use('/users', usersRoute);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.Status = 404;
    err.Info = "Route Not Found"
    next(err);
});

//Error Handler Function(middleware)
app.use(function (err, req, res, next) {
    console.log("API Endpoint Hit : " +req.protocol + '://'+req.get('host')+""+req.originalUrl+"");
    // Validation Error for JOI request
    if (err.isBoom) {
        var error = {
            "Status": 400,
            "Info": [{
                "Error": err.data[0].message.replace(/\"/g, '')
            }],
            "message": "Check Request Data"
        };
        logger.error("JOI validation error");
        logger.error("Payload Request : " + JSON.stringify(req.body))
        logger.error(error);
        res.status(400).send(error);

    }
    else {
        //Handling Error through Status Codes 
        if (err.Status == 400) {
            var errorMessage = {
                "Status": parseInt(err.Status),
                "Info": err.Info
            };
            logger.error("Bad Request Found");
            logger.error("Payload Request: " + JSON.stringify(req.body))
            logger.error(errorMessage);
            res.status(400).json(errorMessage);
        }
        else if (err.Status == 404) {
            var errorMessage = {
                "Status": parseInt(err.Status),
                "Info": err.Info
            };
            logger.error("Request Not Found");
            logger.error("Payload Request : " + JSON.stringify(req.body))
            logger.error(errorMessage);
            res.status(404).json(errorMessage);
        }
        else if (err.Status == 401) {
            var errorMessage = {
                "Status": parseInt(err.Status),
                "Info": err.Info
            };
            logger.error("Forbidden Error");
            logger.error("Payload Request : " + JSON.stringify(req.body))
            logger.error(errorMessage);
            res.status(401).json(errorMessage);
        }
        else if (err.Status == 403) {
            var errorMessage = {
                "Status": parseInt(err.Status),
                "Info": err.Info
            };
            logger.error("Forbidden Error");
            logger.error("Payload Request : " + JSON.stringify(req.body))
            logger.error(errorMessage);
            res.status(200).json(errorMessage);
        }
        else {
            var errorMessage = {
                "Status": 500,
                "Info": err.Info ? err.Info : err.name,
                "Error": err.Error ? err.Error : err.message
            };
            logger.error("Internal Server Error Found");
            logger.error("Payload Request : " + JSON.stringify(req.body))
            logger.error(errorMessage);
            res.status(500).json(errorMessage);
        }
    }
})

app.listen(8000,()=>{
    console.log("server is listening on port 8000");
  })

module.exports = app