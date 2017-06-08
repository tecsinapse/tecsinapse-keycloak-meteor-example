import {Links} from '/imports/api/links/links.js';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import TecSinapseKeycloak from 'tecsinapse-keycloak-js';

import './info.html';

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
    TecSinapseKeycloak.login(Meteor.settings.public.username, Meteor.settings.public.password, Meteor.settings.public.keycloak)
      .then(result => {
        console.log(`success=${result}`);
      });
  },
  'click .js-get-user-details'(event) {
    event.preventDefault();

    // WIP
    Accounts.loginWithKeycloak(Meteor.settings.public.username, Meteor.settings.public.password, (err) => {
      console.log(`hello=${err}`);

    });
  },
  'click .js-logout'(event) {
    event.preventDefault();

    TecSinapseKeycloak.logout(Meteor.settings.public.keycloak);
  },
});
