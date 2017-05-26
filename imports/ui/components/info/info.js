import {Links} from '/imports/api/links/links.js';
import {Meteor} from 'meteor/meteor';
import TecSinapseKeycloak from 'tecsinapse-keycloak-js';

import './info.html';

const authParams = {
  realm: 'test',
  urlServer: 'https://auth.xxxkeycloak.com',
  adminUsername: 'admin@xxxkeycloak.com.br',
  adminPassword: 'pass@123'
};

Template.info.onCreated(function () {
  Meteor.subscribe('links.all');
});

Template.info.helpers({
  links() {
    return Links.find({});
  },
  isLogged() {
    return TecSinapseKeycloak.isLogged();
  },
});

Template.info.events({
  'submit .info-link-add'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title;
    const url = target.url;

    Meteor.call('links.insert', title.value, url.value, (error) => {
      if (error) {
        alert(error.error);
      } else {
        title.value = '';
        url.value = '';
      }
    });
  },
  'click .js-login'(event) {
    event.preventDefault();
    TecSinapseKeycloak.login('myuser@test.com', 'test#myuser', authParams)
      .then(result => {
        console.log(`success=${result}`);
      });
  },
  'click .js-get-users'(event) {
    event.preventDefault();

    TecSinapseKeycloak.getUser('myuser@test.com', authParams)
      .then(user => {
        console.log(`user.firstName=${user.firstName}, user.email=${user.email}`);
      });
  },
  'click .js-logout'(event) {
    event.preventDefault();

    TecSinapseKeycloak.logout();
  },
});
