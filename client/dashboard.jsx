import React, { Component } from 'react';
import Track from './track';
import 'concatenateblobs';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [0, 1, 2],
    }
    this.tracks = [];
    this.ctx = new AudioContext();
  }

  render() {
    return (
      <div>
        {
          this.state.tracks.map(() => {
            return <Track ref={c => this.tracks.push(c)}/>
          })
        }
        <button onClick={() => playAllTracks(this.tracks, this.ctx)}> Play All</button>
      </div>
    );
  }
}

function readData(data, ctx) {
  var reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.addEventListener("loadend", function() {
      resolve(reader.result);
    });
    reader.readAsArrayBuffer(data);
  });
}

function playAllTracks(tracks, ctx) {
  const ArrayBuffers = [];
  const buffers = [];

  tracks.filter(track => track.state.data).reduce((acc, track) => {
    return acc.then(() => {
      return readData(track.state.data)
        .then(a => Promise.resolve(ArrayBuffers.push(a)))
    });
  }, Promise.resolve())
  .then(() => {
    return ArrayBuffers.reduce((acc, next) => {
      return acc.then(() => {
        return ctx.decodeAudioData(next)
          .then(buffer => Promise.resolve(buffers.push(buffer)));
      })
    }, Promise.resolve())
  })
  .then(() => {
    buffers.forEach(buffer => {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    })
  })
}
