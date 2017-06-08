import {Accounts} from 'meteor/accounts-base';

Accounts.keycloakConfig(Meteor.settings.public.keycloak);