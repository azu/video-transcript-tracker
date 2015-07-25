// LICENSE : MIT
"use strict";
var VideoTranscriptTracker = require("video-transcript-tracker");
var video = document.getElementById("video");
var tracker = new VideoTranscriptTracker(video);
// play video, show next transcript, then call `onChange` handler.
var count = 0;
tracker.onChange(function (text, track) {
    console.log(text);
    var element = document.getElementById("main");
    if (count > 2) {
        element.className = "test-ok";
    }
    element.innerHTML = text;
    count++;
});
tracker.start();