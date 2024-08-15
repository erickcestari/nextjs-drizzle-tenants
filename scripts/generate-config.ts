// generate-configs.ts

import { db } from '@/db/system/drizzle';
import { connection } from '@/db/system/schema';
import { config } from 'dotenv';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { exit } from 'process';

config({ path: '.env' });

async function generateConfigs() {
  const connections = await db.select().from(connection);

  for (const conn of connections) {
    const configContent = `
      import { defineConfig } from "drizzle-kit";

      export default defineConfig({
        schema: "./src/db/tenant/schema.ts",
        out: "./migrations/tenant/${conn.id}", // Change database_name accordingly
        dialect: "postgresql",
        dbCredentials: {
          url: "${conn.connection_url}",
        },
      });
    `;

    const configPath = resolve(__dirname, `tenant_drizzle.config.${conn.id}.ts`);
    writeFileSync(configPath, configContent, 'utf-8');
    console.log(`Generated config for ${conn.connection_url} at ${configPath}`);
  }
  console.log('Configs generated successfully');
}

generateConfigs().then(() => {
  console.log("finish");
  exit(0);
}).catch(err => {
  console.error('Error generating configs:', err);
  process.exit(1); // Exit with a non-zero code to indicate failure
});

