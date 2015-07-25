// LICENSE : MIT
"use strict";
var path = require("path");
var BrowserRunner = require("browser-runner");
var runner = new BrowserRunner({
    "browser": "chrome"
});
runner.runBrowser(path.join(__dirname, "index.html"), function (driver) {
    return driver.wait(function () {
        var htmlClassAttr = driver.findElement({id: 'main'}).getAttribute("class");
        return htmlClassAttr.then(function (className) {
            return className === "test-ok";
        });
    }, 5000);
}).catch(function (error) {
    console.error(error, error.stack);
    process.exit(1);
});