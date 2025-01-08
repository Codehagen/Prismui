import { promises as fs } from "fs";
import path from "path";

const SOURCE_DIR = path.join(process.cwd(), "src/registry/app");
const TARGET_DIR = path.join(process.cwd(), "public/r/v0");

async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      // Create parent directory if it doesn't exist
      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function copyTemplates() {
  try {
    console.log("🔄 Copying templates to public directory...");

    // Clean target directory first
    try {
      await fs.rm(TARGET_DIR, { recursive: true, force: true });
      console.log("🧹 Cleaned target directory");
    } catch (error) {
      // Ignore if directory doesn't exist
    }

    // Ensure target directory exists
    await fs.mkdir(TARGET_DIR, { recursive: true });

    // Get all template directories
    const templates = await fs.readdir(SOURCE_DIR);

    // Copy each template
    for (const template of templates) {
      const sourcePath = path.join(SOURCE_DIR, template);
      const targetPath = path.join(TARGET_DIR, template);

      const stats = await fs.stat(sourcePath);
      if (stats.isDirectory()) {
        await copyDir(sourcePath, targetPath);
        console.log(`✅ Copied template: ${template}`);
      }
    }

    console.log("✨ All templates copied successfully!");
  } catch (error) {
    console.error("Error copying templates:", error);
    process.exit(1);
  }
}

copyTemplates();
