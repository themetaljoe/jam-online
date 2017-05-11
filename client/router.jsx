import React from 'react';
import { mount } from 'react-mounter';
import Home from './home';
import Dashboard from './dashboard';

FlowRouter.route('/', {
    triggersEnter: [checkIfLoggedIn],
    action: function(params, queryParams) {
      mount(Home);
    }
});

FlowRouter.route('/dashboard', {
    action: function(params, queryParams) {
      mount(Dashboard);
    }
});


function checkIfLoggedIn() {
  if (Meteor.userId()) {
    FlowRouter.go('/dashboard');
  }
}
