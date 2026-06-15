// scripts/upload-tech-stack-icons.ts
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function uploadIcons() {
  const iconsDir = path.resolve(__dirname, "../public/icons");
  const files = fs.readdirSync(iconsDir).filter((f) => !fs.statSync(path.join(iconsDir, f)).isDirectory());
  for (const file of files) {
    const filePath = path.join(iconsDir, file);
    const buffer = fs.readFileSync(filePath);
    const storagePath = `${file}`; // store with same filename
    const { error: uploadError } = await supabase.storage.from("tech-stack").upload(storagePath, buffer, {
      upsert: true,
      contentType: "image/png",
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
    // Derive skill name from filename (remove extension, capitalize first letter)
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
