const config = require("../config");
const memcached = require("memcached");
const crypto = require("crypto");

var mc = new memcached;

mc.connect(config.MC_HOST, function(err, conn) {
    if (err)
        console.log("Error while constructing connection");
});
