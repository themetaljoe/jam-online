import React, { Component } from 'react';
import Recorder from 'react-recorder'

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      command: 'start',
      audioFile: false,
    };
    this.onStop = this.onStop.bind(this);
  }

  onStop(blob) {
    var reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
      this.setState({ audioFile: reader.result });
    }.bind(this);
  }

  render() {
    return (
      <div>
      <Recorder onStop={this.onStop} command={this.state.command}/>
      <button onClick={() => this.setState({ command: 'start' })}>Start</button>
      <button onClick={() => this.setState({ command: 'stop' })} >Stop</button>
      <button>Play</button>
      {
        this.state.audioFile ?
          (
            <audio controls="controls" src={this.state.audioFile} />
          ) : ''
      }
      </div>
    );
  }
}
