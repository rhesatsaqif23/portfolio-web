/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env.local") });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Supabase credentials are missing in environment variables.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadIcons() {
  const iconsDir = path.resolve(__dirname, "../public/icons");
  if (!fs.existsSync(iconsDir)) {
    console.error(`Icons directory not found: ${iconsDir}`);
    return;
  }
  const files = fs.readdirSync(iconsDir).filter((f) => !fs.statSync(path.join(iconsDir, f)).isDirectory());
  for (const file of files) {
    const filePath = path.join(iconsDir, file);
    const buffer = fs.readFileSync(filePath);
    const storagePath = `${file}`; // keep original filename
    const ext = path.extname(file).toLowerCase();
    const contentTypeMap = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml" };
    const contentType = contentTypeMap[ext] || "application/octet-stream";
    const { error: uploadError } = await supabase.storage.from("tech-stack").upload(storagePath, buffer, {
      upsert: true,
      contentType,
    });
    if (uploadError) {
      console.error(`Failed to upload ${file}:`, uploadError.message);
      continue;
    }
    const { data: publicData } = supabase.storage.from("tech-stack").getPublicUrl(storagePath);
    const publicUrl = publicData?.publicUrl;
    if (!publicUrl) {
      console.error(`Could not get public URL for ${file}`);
      continue;
    }
    // Derive skill name from filename (remove extension, replace underscores with spaces)
    const skillName = path.parse(file).name.replace(/_/g, " ");
    const { error: updateError } = await supabase.from("skills").update({ icon_url: publicUrl }).eq("name", skillName);
    if (updateError) {
      console.error(`Failed to update skill ${skillName}:`, updateError.message);
    } else {
      console.log(`Updated skill ${skillName} with icon ${publicUrl}`);
    }
  }
}

uploadIcons().then(() => console.log("Done"));
