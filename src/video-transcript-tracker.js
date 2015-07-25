"use strict";
import {EventEmitter} from "events"
/**
 * VideoTranscriptTracker handle "cueChange" of <track> element.
 *
 * @example
 * var tracker = new VideoTranscriptTracker(video);
 * // play video, show next transcript, then call `onChange` handler.
 * tracker.onChange((text, track) => {
 *
 * });
 */
export default class VideoTranscriptTracker extends EventEmitter {
    static get eventTypes() {
        return {
            "enable": "enable",
            "disable": "disable",
            "cueChange": "cueChange"
        }
    }

    constructor(video) {
        super();
        this.video = video;
        this.handleCueChange = this._handleCueChange.bind(this);
        this.handleChange = this._handleChange.bind(this);
    }

    onChange(callback) {
        this.on(VideoTranscriptTracker.eventTypes.cueChange, callback);
    }

    onEnable(callback) {
        this.on(VideoTranscriptTracker.eventTypes.enable, callback);
    }

    onDisable(callback) {
        this.on(VideoTranscriptTracker.eventTypes.disable, callback);
    }

    _handleChange() {
        var availableTracks = Array.from(this.video.textTracks).filter(track => {
            if (track.subtitles !== "subtitles") {
                return false
            }
            return track.mode !== "disabled";
        });
        if (availableTracks.length === 0) {
            this.emit(VideoTranscriptTracker.eventTypes.disable);
        } else {
            this.emit(VideoTranscriptTracker.eventTypes.enable);
        }
    }


    start() {
        var tracks = this.video.textTracks;
        tracks.addEventListener("change", this.handleChange);
        Array.from(tracks, this.observeTrack, this);
    }

    observeTrack(track) {
        track.addEventListener("cuechange", this.handleCueChange);
    }

    unObserveTrack(track) {
        track.removeEventListener("cuechange", this.handleCueChange);
    }

    _handleCueChange(event) {
        var myTrack = event.target;
        var myCues = myTrack.activeCues;// activeCues is an array of current cues.
        if (myCues.length === 0) {
            return;
        }
        Array.from(myCues, cue => {
            this.emit(VideoTranscriptTracker.eventTypes.cueChange, cue.text, myTrack);
        }, this);
    }

    stop() {
        var tracks = this.video.textTracks;
        Array.from(tracks, this.unObserveTrack, this);
        tracks.removeEventListener("change", this.handleChange)
    }
}