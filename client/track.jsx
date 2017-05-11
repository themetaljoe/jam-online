import React, { Component } from 'react';
import Recorder from 'react-recorder'

export default class Track extends Component {
  constructor() {
    super();
    this.id = Meteor.uuid();
    this.state = {
      command: 'start',
      audioFile: false,
      shouldStop: false,
      stoped: false,
    };
  }

  handleSuccess(stream) {
    recorder = new MediaRecorder(stream);
    recorder.start();
    recorder.ondataavailable = (e) => {
      this.setState({ audioFile: window.URL.createObjectURL(e.data), stream, recorder, data: e.data });
      const player = document.getElementById(`${this.id}-player`);
      player.src = this.state.audioFile;
    }
    this.setState({ stream, recorder });
  }

  getStream() {
    return this.state.stream;
  }

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(this.handleSuccess.bind(this))
  }

  stop() {
    this.state.recorder.stop();
    this.state.stream.getTracks()[0].stop()
    this.setState({ audioFile: window.URL.createObjectURL(this.state.stream) })
  }

  render() {
    return (
      <div className="a-track">
        <button onClick={() => { this.startRecording() }}>start</button>
        <button onClick={() => { this.stop() }}>stop</button>
        <audio className="recorder" id={`${this.id}-player`} controls></audio>
      </div>
    );
  }
}

function visuals() {
  var ctx = new AudioContext();
  var audio = document.getElementById('');
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();
  audioSrc.connect(analyser);
  analyser.connect(ctx.destination)
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  function renderFrame() {
    requestAnimationFrame(renderFrame);
    analyser.getByteFrequencyData(frequencyData);
    console.log(frequencyData)
  }
  renderFrame();
}
