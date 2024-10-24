'use strict';

/**
 * microfiction service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::microfiction.microfiction');
