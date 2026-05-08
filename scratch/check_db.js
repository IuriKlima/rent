import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

async function check() {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  const { data, error } = await supabase.from('products').select('id, image');
  if (error) console.error(error);
  else {
    let totalSize = 0;
    for (const p of data) {
      if (p.image) {
        const size = p.image.length;
        totalSize += size;
        if (size > 100000) console.log(p.id, (size / 1024 / 1024).toFixed(2) + ' MB');
      }
    }
    console.log('Total base64 image size in DB:', (totalSize / 1024 / 1024).toFixed(2), 'MB');
  }
}
check();
