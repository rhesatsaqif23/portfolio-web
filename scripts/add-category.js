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

const updates = [
  { id: "8574bead-2b01-431b-b521-1138612d0a5a", category: "hackathon" },
  { id: "47851030-3c88-4789-8de6-e37c60002092", category: "software development" },
  { id: "6c4d5f26-b5d5-4a1c-99a8-f08c719ca0a0", category: "hackathon" },
  { id: "44ca255c-aee2-4ab6-84fd-6cab17584f6d", category: "software development" },
  { id: "3054f29f-2f36-482f-8fcb-eff6fc444f63", category: "photo & video" },
  { id: "9f64127c-a9a3-4dab-a36f-a1a80c512944", category: "photo & video" },
  { id: "9374cf89-54a1-493f-8969-a287b52e84c0", category: "applied technology" },
];

async function run() {
  for (const { id, category } of updates) {
    const { error: uErr } = await supabase
      .from("achievements")
      .update({ category })
      .eq("id", id);
    if (uErr) console.error(`Update error for ${id}:`, uErr);
    else console.log(`✅ ${id} → ${category}`);
  }
  console.log("\nDone seeding categories!");
}

run();
