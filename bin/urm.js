require('../lib/Prototypes');

const reader = require("../io/Reader"),
      FormalURM = require("../URM/FormalURM"),
      URM = require("../URM/urmModel"),
      debug = require("debug")("URM");

var content = reader("./examples/test.urm"),
    machineConfs = new FormalURM(content),
    urm = new URM(machineConfs);

debug(urm);
urm.run();
