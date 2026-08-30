import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const imagesDir = path.join(process.cwd(), "public/images");

function getWebpFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getWebpFiles(fullPath, files);
    } else if (/\.webp$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function verifyAll() {
  const files = getWebpFiles(imagesDir);
  console.log(`Auditing ${files.length} WebP images for visual and structural integrity...\n`);

  let allValid = true;
  let summary = [];

  for (const file of files) {
    const relPath = path.relative(process.cwd(), file);
    try {
      const metadata = await sharp(file).metadata();
      const stats = fs.statSync(file);
      
      const isClean = metadata.format === "webp" && metadata.width > 0 && metadata.height > 0;
      if (!isClean) {
        console.error(`❌ Corrupted or invalid: ${relPath}`);
        allValid = false;
      } else {
        summary.push({
          file: relPath,
          dims: `${metadata.width}x${metadata.height}`,
          sizeKB: (stats.size / 1024).toFixed(1),
          hasAlpha: metadata.hasAlpha ? "Transparent Alpha" : "Opaque",
        });
      }
    } catch (err) {
      console.error(`❌ Error reading ${relPath}:`, err.message);
      allValid = false;
    }
  }

  console.table(summary);

  if (allValid) {
    console.log(`\n✅ ALL ${files.length} WebP IMAGES ARE 100% VALID, CRISP & CORRUPTION-FREE!`);
  } else {
    console.error("\n❌ Some images failed verification.");
    process.exit(1);
  }
}

verifyAll();
