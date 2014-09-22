require('../lib/Prototypes');

const reader = require("../io/Reader"),
      URM = require("../URM/FormalURM"),
      debug = require("debug")("URM");

var content = reader("./examples/test.urm"),
    machine = new URM(content);

debug(machine);
