import { defineConfig } from "vitepress";
import nav from "./nav";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Barry Blog",
  description:
    "Remember the past, live the present, look forward to the future",
  srcDir: "notes",
  base: "/",
  outDir: "docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    logo: "/assets/logo.png",
    socialLinks: [{ icon: "github", link: "https://github.com/duanyongcheng" }],
  },
});
