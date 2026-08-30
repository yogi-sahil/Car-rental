import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const imagesDir = path.join(process.cwd(), "public/images");

function getFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getFiles(fullPath, files);
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convertAll() {
  const files = getFiles(imagesDir);
  console.log(`Found ${files.length} images to convert to WebP...`);

  let totalOldSize = 0;
  let totalNewSize = 0;

  for (const file of files) {
    const ext = path.extname(file);
    const targetFile = file.slice(0, -ext.length) + ".webp";
    const oldSize = fs.statSync(file).size;
    totalOldSize += oldSize;

    const isPng = ext.toLowerCase() === ".png";
    const isCutout = file.includes("/cutouts/");

    let pipeline = sharp(file);

    if (isCutout || isPng) {
      pipeline = pipeline.webp({ quality: 90, effort: 6, alphaQuality: 90 });
    } else {
      pipeline = pipeline.webp({ quality: 85, effort: 5 });
    }

    await pipeline.toFile(targetFile);
    const newSize = fs.statSync(targetFile).size;
    totalNewSize += newSize;

    console.log(
      `✓ ${path.relative(process.cwd(), file)} (${(oldSize / 1024).toFixed(1)} KB) -> ${path.relative(process.cwd(), targetFile)} (${(newSize / 1024).toFixed(1)} KB) [${(((oldSize - newSize) / oldSize) * 100).toFixed(1)}% smaller]`
    );

    // Delete the original file
    fs.unlinkSync(file);
  }

  console.log("-----------------------------------------");
  console.log(`Original total size: ${(totalOldSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`New WebP total size: ${(totalNewSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total savings: ${(((totalOldSize - totalNewSize) / totalOldSize) * 100).toFixed(1)}% reduction! 🎉`);
}

convertAll().catch((err) => {
  console.error("Error converting images:", err);
  process.exit(1);
});
