// LICENSE : MIT
"use strict";
var VideoTranscriptTracker = require("video-transcript-tracker");
var video = document.getElementById("video");
var tracker = new VideoTranscriptTracker(video);
// play video, show next transcript, then call `onChange` handler.
tracker.onChange(function (text, track) {
    console.log(text);
    document.getElementById("main").className = "test-ok";
});
tracker.start();