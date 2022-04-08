const express = require('express'); 
const sequelize = require('./db/connection'); 
const path = require('path'); 
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers }); 
