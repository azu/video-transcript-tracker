# video-transcript-tracker

Observe the change of `<track>` element.

## Installation

    npm install video-transcript-tracker

## Dependency

- Array.form
- [ ] remove this dependency. WelCome to Pull Request!

## Usage

```html
<video id="video" width="400" src="./Google_Developer_Stories.webm" autoplay controls>
    <track label="English subtitles" kind="subtitles" srclang="en" src="./video-subtitles-en.vtt" default>
    Your browser does not support the video tag
</video>
<div id="main"></div>
<script src="node_modules/array.from/array-from.js"></script>
<script src="build.js"></script>
```

```js
var VideoTranscriptTracker = require("video-transcript-tracker");
var video = document.getElementById("video");
var tracker = new VideoTranscriptTracker(video);
tracker.onChange(function (text, track) {
    console.log(text);
});
tracker.start();
```
## Tests

Run example 

    npm run example

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT