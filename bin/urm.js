/**
 * Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
 *
 * Date: 22 - 09 - 2014
 * LastUpdate: 24 - 09 - 2014
 * version: 1.1.0
 *
 * Name: urm.js
 *
 * Description:
 *   Main file for getting settings, file content, and a machine object of urm.
*/

//Require prototypes, extend functionality of native structures using public API
require('../lib/Prototypes');
//Constants. this never changes
const reader = require("../io/Reader"),
      FormalURM = require("../URM/FormalURM"),
      URM = require("../URM/urmModel"),
      //This module is used in all the package, it allows to run: "npm run-script debug" and get debug info
      debug = require("debug")("URM");

var content = reader("./main.urm"),
    //create the basic structure: instructions, registers and initial conditions
    machineConfs = new FormalURM(content),
    //create a machine with own set of instructions.
    //this also helps to extend in future
    urm = new URM(machineConfs);

debug(urm);
//start machine
urm.run();
