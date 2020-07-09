const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require('helmet')
const compression = require('compression')
 const userRoutes = require('./api/users/users.controller');


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


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//-ROUTES
app.use('/users', userRoutes);

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