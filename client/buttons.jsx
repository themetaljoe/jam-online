import React from 'react';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      addTrack: [{
        name: 'plus-square', href: 'https://www.facebook.com/carrythestorm/'
      
      }]
    }
  }
  render() {
    return (
      <div>
        <div className="logo">
          <img src="logo.png" />
        </div>
        <h1 className='title-header'>Welcome to the Jam</h1>
            <div className="add-tracks">
        {
          this.state.addTrack.map((track) => (
            <div className="add-track">
              <a className={`btn btn-social-icon btn-${icon.name}`} href={icon.href}>
              <span className={`fa fa-lg fa-${icon.name}`}></span>
              </a>
            </div>
          ))
        }
            </div>
      </div>
    );
  }
}
