import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

interface SidebarItem {
  text: string;
  link: string;
}

interface SidebarGroup {
  text: string;
  items: SidebarItem[];
}

type Sidebar = SidebarGroup[];

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function generateSidebarItems(dirPath: string): SidebarItem[] {
  const items: SidebarItem[] = [];
  const fullPath = resolve(__dirname, "../notes", dirPath);

  try {
    const files = readdirSync(fullPath);

    for (const file of files) {
      if (file.endsWith(".md")) {
        items.push({
          text: file.replace(".md", ""),
          link: `/${dirPath}/${file.replace(".md", "")}`,
        });
      }
    }
    return items;
  } catch (error) {
    console.error(`Error reading directory: ${fullPath}`, error);
    return [];
  }
}

const sidebar: Sidebar = [
  {
    text: "Algorithm",
    items: generateSidebarItems("algorithm"),
  },
  {
    text: "Services",
    items: generateSidebarItems("services"),
  },
];

export default sidebar;
