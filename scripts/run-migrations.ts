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
    const { stdout, stderr } = await execPromise(`bunx drizzle-kit generate --config ${configPath}`);
    if (stdout) console.log(`stdout: ${stdout}`);
    if (stderr) console.error(`stderr: ${stderr}`);
    const { stdout: stdout1, stderr:  stderr1} = await execPromise(`bunx drizzle-kit migrate --config ${configPath}`);
    if (stdout1) console.log(`stdout: ${stdout1}`);
    if (stderr1) console.error(`stderr: ${stderr1}`);
    console.log(`Migrations completed for ${file}`);
  }
}

runMigrations().catch(err => {
  console.error('Error running migrations:', err);
});
