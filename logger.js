const winston = require('winston');
require('winston-daily-rotate-file');
const path = require("path");
const fs = require("fs");
const appRoot = require("app-root-path");
const clfDate = require("clf-date");

var logDirectory = path.resolve(`${appRoot}`, "logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var options = {

    infofile: {
      level: "info",
      filename: path.resolve(logDirectory, "info.log"),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    },

    console: {
        level: "info",
        handleExceptions: true,
        format: winston.format.simple(),  // disable json format
        colorize: true
    }
  };

  var errorfile = new winston.transports.DailyRotateFile({
    level: "error",
    filename: path.resolve(logDirectory, "application-%DATE%-info.log"),
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "100m",
    maxFiles: "14d" // keep logs for 14 days
  
  });
  errorfile.on("rotate", function(oldFilename, newFilename) {
    // do something fun
  });


if (process.env.NODE_ENV === "test") {
  module.exports = {}; // No logger created during tests
} else {
  const logger = winston.createLogger({
    level: 'info',
    exitOnError: false, //Ensure execution continues even when application does not catch exception
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.timestamp()
    ),
    transports: [
      errorfile,
      new winston.transports.Console(options.console),
      new winston.transports.File(options.infofile)
    ]
  });
  // export it
  module.exports = logger;
}