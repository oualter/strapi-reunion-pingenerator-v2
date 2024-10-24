"use strict";
module.exports = ({ strapi }) => ({
  async index(ctx) {
    // console.log("************* ROUTES INDEX !!!! ***************");

    let pinCoordsEntries = await strapi.entityService.findMany(
      "api::microfiction.microfiction",
      {
        fields: ["pingenerator"],
      }
    );
    // retourne les posts avec les coordonnées des épingles ET en dernier la valeur du referer
    return [...pinCoordsEntries, { referrer: ctx.request.header.referer }];
  },
  async getMapImg(ctx) {
    console.log("************* ROUTES getMapImg !!!! ***************");
    let imageToPinOnUrlDB = await strapi.entityService.findOne(
      "plugin::pingenerator.pingenerator-setting",
      1,
      {
        fields: ["imageToPinOnUrl"],
      }
    );
    if (imageToPinOnUrlDB) {
      return imageToPinOnUrlDB;
    }
  },
  async getConfig(ctx) {
    console.log("************* ROUTES GETCONFIG !!!! ***************");

    let imageToPinOnUrlDB = await strapi.entityService.findOne(
      "plugin::pingenerator.pingenerator-setting",
      1,
      {
        fields: ["imageToPinOnUrl"],
      }
    );
    if (imageToPinOnUrlDB) {
      return imageToPinOnUrlDB;
    }
  },
  async setConfig(ctx) {
    // console.log("************* ROUTES SETCONFIG !!!! ***************");
    let { imageToPinOnUrl } = ctx.request.body.data;
    // console.log("CONTROL 1 imageToPinOnUrl => ", imageToPinOnUrl);
    if (!imageToPinOnUrl) return;

    let imageToPinOnUrlDBObj = await strapi.entityService.findOne(
      "plugin::pingenerator.pingenerator-setting",
      1,
      {
        fields: ["imageToPinOnUrl"],
      }
    );
    let imageToPinOnUrlDB = imageToPinOnUrlDBObj.imageToPinOnUrl;
    // console.log("CONTROL 2 imageToPinOnUrlDB => ", imageToPinOnUrlDB);
    if (!imageToPinOnUrlDB && imageToPinOnUrl) {
      // console.log(
      //   "CONTROL 3 !imageToPinOnUrlDB && imageToPinOnUrl => ",
      //   (!imageToPinOnUrlDB && imageToPinOnUrl)
      // );
      imageToPinOnUrlDBObj = await strapi.entityService.create(
        "plugin::pingenerator.pingenerator-setting",
        {
          data: {
            imageToPinOnUrl,
          },
        }
      );
      return imageToPinOnUrlDB;
    }

    if (imageToPinOnUrlDB && imageToPinOnUrl) {
      // console.log(
      //   "CONTROL 4 (imageToPinOnUrlDB && imageToPinOnUrl) => ",
      //   (imageToPinOnUrlDB && imageToPinOnUrl)
      // );
      imageToPinOnUrlDBObj = await strapi.entityService.update(
        "plugin::pingenerator.pingenerator-setting",
        1,
        {
          data: {
            imageToPinOnUrl,
          },
        }
      );
      //   console.log("CONTROL 5 imageToPinOnUrlDB => ", imageToPinOnUrlDB);
      return imageToPinOnUrlDB;
    }
  },
});
