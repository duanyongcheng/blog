import { readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

interface NavItem {
  text: string;
  link: string;
}

interface NavGroup {
  text: string;
  items: NavItem[];
}

type Nav = (NavGroup | NavItem)[];

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// 创建一个调试日志函数
function debugLog(message: string) {
  const logDir = resolve(__dirname, "../logs");
  const logPath = resolve(logDir, "debug.log");

  // 确保日志目录存在
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true });
  }

  writeFileSync(logPath, message + "\n", { flag: "a" });
  console.log(message);
}

function generateNavItems(dirPath: string): NavItem[] {
  const items: NavItem[] = [];
  const fullPath = resolve(__dirname, "../notes", dirPath);

  debugLog("\n=== Nav Generation Debug Info ===");
  debugLog(`Timestamp: ${new Date().toISOString()}`);
  debugLog(`Current __dirname: ${__dirname}`);
  debugLog(`Looking for files in: ${fullPath}`);

  try {
    const files = readdirSync(fullPath);
    debugLog(`Found files: ${JSON.stringify(files, null, 2)}`);

    for (const file of files) {
      if (file.endsWith(".md")) {
        const item = {
          text: file.replace(".md", ""),
          link: `/${dirPath}/${file.replace(".md", "")}`,
        };
        items.push(item);
        debugLog(`Added nav item: ${JSON.stringify(item, null, 2)}`);
      } else {
        debugLog(`Skipped non-markdown file: ${file}`);
      }
    }

    debugLog(`Final nav items: ${JSON.stringify(items, null, 2)}`);
    debugLog("=== End Debug Info ===\n");
    return items;
  } catch (error) {
    debugLog("\n=== Nav Generation Error ===");
    debugLog(`Error reading directory: ${fullPath}`);
    debugLog(`Error details: ${error}`);
    debugLog("=== End Error Info ===\n");
    return [];
  }
}

const nav: Nav = [
  {
    text: "Algorithm",
    items: generateNavItems("algorithm"),
  },
  { text: "Services", items: generateNavItems("services") },
];

export default nav;
