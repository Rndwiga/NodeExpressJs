const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./models");
const helmet = require('helmet')
const compression = require('compression')


app.use(cors());
app.use(compression())
app.use(helmet())
    app.disable('x-powered-by')

/* mongoose.connect(process.env.atlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('DB Connected!'))
.catch(err => {
    console.log(Error, err.message);
}); */

  try {
     db.sequelize.sync();
    /*  db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
      }); */
     // db.initializeRoles();

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//-ROUTES
require("./routes/user.routes")(app);

// Default route
app.use((req, res, next) => {
    res.json({
        message: 'Hmmm...You have broken the internet.'
    })
    next();
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;