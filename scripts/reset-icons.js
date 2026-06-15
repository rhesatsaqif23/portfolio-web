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

async function listAllRecursive(prefix = "") {
  const { data, error } = await supabase.storage.from(BUCKET).list(prefix, { limit: 500 });
  if (error) throw error;
  let paths = [];
  for (const item of data || []) {
    if (item.metadata) {
      paths.push(prefix ? `${prefix}/${item.name}` : item.name);
    } else {
      const sub = await listAllRecursive(prefix ? `${prefix}/${item.name}` : item.name);
      paths = paths.concat(sub);
    }
  }
  return paths;
}

async function deleteAllObjects() {
  console.log("Listing all objects in bucket...");
  let allPaths;
  try {
    allPaths = await listAllRecursive();
  } catch (e) {
    console.error("List error:", e);
    return false;
  }

  if (allPaths.length === 0) {
    console.log("Bucket is empty.");
    return true;
  }

  console.log(`Found ${allPaths.length} objects. Deleting...`);
  // Delete in batches of 100 (Supabase limit)
  while (allPaths.length > 0) {
    const batch = allPaths.splice(0, 100);
    const { error: delErr } = await supabase.storage.from(BUCKET).remove(batch);
    if (delErr) { console.error("Delete error:", delErr); return false; }
    console.log(`Deleted ${batch.length} objects.`);
  }
  return true;
}

async function run() {
  // 1. Delete all existing objects recursively
  const ok = await deleteAllObjects();
  if (!ok) return;

  // 2. Fetch skills
  const { data: skills, error } = await supabase.from("skills").select("id, name");
  if (error) { console.error("Fetch skills error:", error); return; }

  const skillMap = {};
  for (const s of skills) {
    skillMap[s.name.toLowerCase()] = s;
  }

  // 3. Upload files directly to root
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

    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(file, content, { upsert: true, contentType: `image/${ext === ".svg" ? "svg+xml" : ext.slice(1)}` });

    if (uploadErr) { console.error(`Upload error for ${file}:`, uploadErr); continue; }

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(file);

    const { error: updateErr } = await supabase
      .from("skills")
      .update({ icon_url: pub.publicUrl })
      .eq("id", skill.id);

    if (updateErr) { console.error(`Update error for ${skill.name}:`, updateErr); continue; }

    console.log(`✅ ${file} → ${skill.name}: ${pub.publicUrl}`);
  }

  console.log("\nDone! All icons uploaded to root and skills seeded.");
}

run();
