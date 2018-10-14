'use strict';

const express = require('express');
const cors = require('cors');
// *************************************************************************************************************
// init express
// *************************************************************************************************************

const app = express();

// *************************************************************************************************************
// define view-engine & static resources
// *************************************************************************************************************

app.use(express.static('public'));
app.all("/*", function(req, res, next) {
  res.sendFile("index.html", { root: "public" });
});

app.use(cors());

// *************************************************************************************************************
// run the  server
// *************************************************************************************************************

app.listen(4200);


