/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const envVars = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^\s*(\w+)=["']?(.+?)["']?\s*$/);
  if (m) envVars[m[1]] = m[2];
}

const supabase = createClient(
  envVars.SUPABASE_URL || envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_KEY,
);

const ICONS_DIR = path.join(__dirname, "..", "public", "icons");
const BUCKET = "tech-stack";

const nameMap = {
  "CSS3": "CSS",
  "HTML5": "HTML",
  "PostgresSQL": "PostgreSQL",
  "Shadcn": "shadcn/ui",
  "zustand": "Zustand",
};

async function run() {
  const { data: skills, error } = await supabase.from("skills").select("id, name");
  if (error) { console.error("Fetch skills error:", error); return; }

  const skillMap = {};
  for (const s of skills) {
    skillMap[s.name.toLowerCase()] = s;
  }

  const files = fs.readdirSync(ICONS_DIR).filter(f =>
    [".png", ".jpg", ".jpeg", ".svg"].includes(path.extname(f).toLowerCase())
  );

  for (const file of files) {
    const ext = path.extname(file);
    const base = file.slice(0, -ext.length);
    const skillName = nameMap[base] || base;
    const skill = skillMap[skillName.toLowerCase()];

    if (!skill) {
      console.log(`Skipping ${file}: no matching skill for "${skillName}"`);
      continue;
    }

    const filePath = path.join(ICONS_DIR, file);
    const content = fs.readFileSync(filePath);
    const storagePath = `icons/${file}`;

    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, content, { upsert: true, contentType: `image/${ext === ".svg" ? "svg+xml" : ext.slice(1)}` });

    if (uploadErr) { console.error(`Upload error for ${file}:`, uploadErr); continue; }

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

    const { error: updateErr } = await supabase
      .from("skills")
      .update({ icon_url: pub.publicUrl })
      .eq("id", skill.id);

    if (updateErr) { console.error(`Update error for ${skill.name}:`, updateErr); continue; }

    console.log(`✅ ${file} → ${skill.name}: ${pub.publicUrl}`);
  }

  console.log("\nDone!");
}

run();
