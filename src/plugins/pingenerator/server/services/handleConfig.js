"use strict";

// Function to build the configuration object
const buildConfig = (strapi) => {
  // Getting the plugin configuration using the provided utility function
  const pluginConfig = strapi.plugin("pingenerator").config;

  // Extracting the imageToPinOnUrl from the plugin configuration
  const imageToPinOnUrl = pluginConfig("imageToPinOnUrl");

  // If the imageToPinOnUrl is not available, return undefined
  if (!imageToPinOnUrl) {
    return undefined;
  }

  // Returning the configuration object with the imageToPinOnUrl
  return {
    imageToPinOnUrl,
  };
};

// Exporting an object with getConfig and setConfig functions
module.exports = ({ strapi }) => ({
  // Function to get the configuration
  getConfig: async () => {
    // Building the configuration object
    const buildConfigResult = buildConfig(strapi);

    // Flag to determine if a request needs to be made to retrieve the token
    const shouldMakeRequest = !buildConfigResult;

    // Variable to store the imageToPinOnUrl result
    let imageToPinOnUrlResult = "";

    // If a request should be made, retrieve the imageToPinOnUrl from the database
    if (shouldMakeRequest) {
      const results = await strapi.entityService.findOne(
        "plugin::pingenerator.config",
        1
      );

      // Accessing the imageToPinOnUrl value from the results object, fallback to an empty string if it's not available
      imageToPinOnUrlResult = results?.imageToPinOnUrl ?? "";
    }

    // Generating the token to return based on the build configuration and the token result
    const imageToPinOnUrlToReturn = buildConfigResult?.imageToPinOnUrl
      ? `${buildConfigResult.token.substring(0, 6)}[...]`
      : imageToPinOnUrlResult || buildConfigResult?.imageToPinOnUrl;

    // Returning the configuration object with the token
    return {
      imageToPinOnUrl: imageToPinOnUrlToReturn,
    };
  },
  // Function to set the configuration
  setConfig: async ({ imageToPinOnUrl }) => {
    // Retrieving the current configuration from the database
    const config = await strapi.entityService.findOne(
      "plugin::pingenerator.config",
      1
    );

    // If the configuration already exists, update it with the new token
    if (config?.imageToPinOnUrl) {
      return await strapi.entityService.update(
        "plugin::pingenerator.config",
        1,
        {
          data: {
            imageToPinOnUrl,
          },
        }
      );
    }

    // If the configuration doesn't exist, create a new one with the provided token
    return await strapi.entityService.create("plugin::pingenerator.config", {
      data: {
        imageToPinOnUrl,
      },
    });
  },
});
