const router = require("express").Router();
const config = require("../config");
const db = require("../module/db");
const url = require("url");
const Curl = require("node-libcurl").Curl;

router.get("/", (req, res) => {
    sess = req.session
    if(!sess.login)
        return res.redirect("/login");

    //profile
    let e = "";
    pfUrl = url.parse(sess.user.profile.url);
    if(!pfUrl.host.endsWith(config.HOST) || pfUrl.protocol.toLowerCase() == "file : ") {
        return res.render("index", {
            e : "Nope!"
        });
    }

    if(!sess.user.profile.isRender) {
        return res.render("index", {
            u : sess.user,
            r : "Only for approved user"
        });
    }
    
    let curl = new Curl();
    curl.setOpt("URL", pfUrl.href);
    curl.on("data", (chunk) => {
        return res.render("index", {
            e : "Some error occured"
        });
    });

    curl.perform();

});

router.get("/view/:pid", (req, res) => {
    db.fetch(req.params.pid)
    .then((user) => {
        console.log(user);
        return res.render("view", {
            u : user
        });
    }, (err) => {
        return res.render("view", {
            e : err
        });
    });
});

//생략

router.post("/add", (req, res) => {
    sess = req.session;
    if(!sess.login)
        return res.redirect("/login");

    if(!req.body.key || !req.body.value)
        return res.redirect("/profile");

    let key = req.body.key;
    let value = req.body.value;

    let filter = /[_ \\\/\|'"` \n\r(\)]/;
    if(value.length >= 20) {
        return res.json({
            c : -1,
            e : "Too long"
        });
    }
    if((key.length >= 5) && filter.test(key)) {
        return res.json({
            c : -1,
            e : "Invaild char"
        });
    }

    sess.user = new db.__appendData(sess.user, key, value);
    console.log(sess.user.profile.isRender);
    return res.json({
        c : 0
    });
});

//생략
