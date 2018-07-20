//Commit Test
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();
app.set("view engine", hbs);

//Partials
hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper("year", () => {
    return new Date().getFullYear()
});
hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase()
});

//Partials
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.path}`;
    fs.appendFile("server.log", log, (err) => {
        if(err) {
            console.log("unable to append the log file !")
        }
    } )
    console.log(log);
    
    next();
});
app.use((req, res , next) => {
    res.render("error.hbs")
})

app.get("/", (req, res) => {
    res.render("index.hbs", {
        header: "Hi visitor !",
        username: "Omar Ali",

    })
});

app.get("/help", (req, res) => {
    res.render("help.hbs", {
        header: "About page",
    });
});

app.listen("3000");
