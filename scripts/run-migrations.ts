import { exec } from 'child_process';
import { promisify } from 'util';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const execPromise = promisify(exec);

async function runMigrations() {
  const configFiles = readdirSync(resolve(__dirname)).filter(file => file.startsWith('tenant_drizzle.config.') && file.endsWith('.ts'));

  for (const file of configFiles) {
    const configPath = resolve(__dirname, file);
    console.log(`Running migrations for ${file}`);
    await execPromise(`bunx drizzle-kit generate --config ${configPath}`);
    await execPromise(`bunx drizzle-kit migrate --config ${configPath}`);
    console.log(`Migrations completed for ${file}`);
  }
}

runMigrations().catch(err => {
  console.error('Error running migrations:', err);
});
