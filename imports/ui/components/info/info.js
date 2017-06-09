import {Links} from '/imports/api/links/links.js';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

import './info.html';

Template.info.onCreated(function () {
  Meteor.subscribe('links.all');
});

Template.info.helpers({
  links() {
    return Links.find({});
  },
  isLogged() {
    return Accounts.isLogged();
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
    Accounts.loginWithKeycloak(Meteor.settings.public.username, Meteor.settings.public.password);
  },
  'click .js-get-user-details'(event) {
    event.preventDefault();
  },
  'click .js-logout'(event) {
    event.preventDefault();
    Accounts.logoutKeycloak();
  },
});
