module.exports = {
  "pass-data": {
    type: "admin",
    routes: [
      // {
      //   method: "GET",
      //   path: "/pass-data",
      //   handler: "pingen.index",
      //   config: {
      //     policies: [],
      //     auth: false,
      //   },
      // },
      {
        method: "GET",
        path: "/pass-data/get",
        handler: "pingen.getConfig",
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: "POST",
        path: "/pass-data/post",
        handler: "pingen.setConfig",
        config: {
          policies: [],
          auth: false,
        },
      },
    ],
  },
  pincoords: {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/pincoords",
        handler: "pingen.index",
        config: {
          policies: [],
          auth: false,
        },
      },
    ],
  },
  mapimage: {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/mapimage",
        handler: "pingen.getMapImg",
        config: {
          policies: [],
          auth: false,
        },
      },
    ],
  },
};
