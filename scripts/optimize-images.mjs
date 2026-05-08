import sharp from 'sharp';
import { join, basename, extname } from 'path';
import { readdirSync, statSync } from 'fs';

const assetsDir = join(import.meta.dirname, '..', 'src', 'assets');
const files = readdirSync(assetsDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));

for (const file of files) {
  const input = join(assetsDir, file);
  const name = basename(file, extname(file));
  const output = join(assetsDir, `${name}.webp`);

  await sharp(input)
    .resize(1920, undefined, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output);

  const origSize = statSync(input).size;
  const newSize = statSync(output).size;
  console.log(`${file}: ${(origSize / 1024).toFixed(0)}KB -> ${name}.webp: ${(newSize / 1024).toFixed(0)}KB (${((1 - newSize / origSize) * 100).toFixed(0)}% smaller)`);
}

console.log('Done!');
