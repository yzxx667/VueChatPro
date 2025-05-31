import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css"; // 引入样式
import { AntDesignContainer } from "@vitepress-demo-preview/component";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "@vitepress-demo-preview/component/dist/style.css";
// import "@/theme/index.scss";
// import "@/theme/config.scss";
// import "@/theme/var.scss";
// import "@/theme/mixin.scss";
import "./custom.css";
import "vue-chat-pro/es/index.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
    app.use(ElementPlus).component("demo-preview", AntDesignContainer);
  },
};
