import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginId from "./pluginId";
import PluginIcon from "./components/PluginIcon";
import pluginPermissions from "./permissions";
import { getTrad } from "./utils/getTrad";

export default {
  register(app) {
    app.customFields.register({
      name: "pingenerator",
      pluginId: "pingenerator",
      type: "string",
      intlLabel: {
        id: `${pluginId}.plugin.field.generator.field`,
        defaultMessage: "pingenerator",
      },
      intlDescription: {
        id: `${pluginId}.plugin.field.generator.description`,
        defaultMessage: "Pin a point on the image map",
      },
      icon: PluginIcon,
      components: {
        Input: async () => import("./components/Input"),
      },
    });

    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Pin Generator",
      },
      Component: async () => {
        const Configuration = await import("./pages/Settings/Configuration");
        return Configuration;
      },
    });

    app.registerPlugin({
      id: pluginId,
      // initializer: Initializer,
      // isReady: false,
      name,
    });
  },
  bootstrap(app) {
        app.addSettingsLink("global", {
          intlLabel: {
            id: `${pluginId}.plugin.name`,
            defaultMessage: "PinGenerator",
          },
          id: "PinGenerator",
          to: `/settings/${pluginId}`,
          Component: async () => {
            const Configuration = await import(
              "./pages/Settings/Configuration"
            );
            return Configuration;
          },
          // permissions: {
          //   action: "plugin::pingenerator.pingenerator-setting.read",
          //   subject: null,
          // },
          permissions: pluginPermissions.main,
        });
  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
