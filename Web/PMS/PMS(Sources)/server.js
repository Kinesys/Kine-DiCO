app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static("static"));
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router_index);
app.use("/profile", router_profile);

db.registerAdmin(config.ADMIN_ID, config.FLAG)
    .then((user) => {}, (err) => {
        console.log("Falied to save admin : ", err);
    });

const server = app.listen(3000, function() {
    console.log("Started");
});
