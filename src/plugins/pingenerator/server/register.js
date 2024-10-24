'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "pingenerator",
    plugin: "pingenerator",
    type: "string",
  });
};