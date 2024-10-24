const pluginPermissions = {
  main: [{ action: "plugin::pingenerator.settings.config", subject: null},
{ action: "plugin::pingenerator.settings.read", subject: null },
{ action: "plugin::pingenerator.settings.regenerate", subject: null },
{ action: "plugin::pingenerator.settings.update", subject: null },
],
  // main: [
  //   { action: "plugin::pingenerator.settings.read", subject: null },
  //   { action: "plugin::pingenerator.settings.regenerate", subject: null },
  //   { action: "plugin::pingenerator.settings.update", subject: null },
  // ],
  open: [
    { action: "plugin::pingenerator.settings.read", subject: null },
    { action: "plugin::pingenerator.settings.regenerate", subject: null },
  ],
  regenerate: [
    { action: "plugin::pingenerator.settings.regenerate", subject: null },
  ],
  update: [{ action: "plugin::pingenerator.settings.update", subject: null }],
};

export default pluginPermissions;