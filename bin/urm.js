//Require prototypes, extend functionality of native structures using public API
require('../lib/Prototypes');
//Constants. this never changes
const reader = require("../io/Reader"),
      FormalURM = require("../URM/FormalURM"),
      URM = require("../URM/urmModel"),
      debug = require("debug")("URM");
//read file.from stdin
var content = reader(process.argv[2] || "./main.urm"),
    //create the basic structure: instructions, registers and initial conditions
    machineConfs = new FormalURM(content),
    //create a machine with own set of instructions.
    //this also helps to extend in future
    urm = new URM(machineConfs);

debug(urm);
//start machine
urm.run();
