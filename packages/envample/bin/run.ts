#!/user/bin/env node

import { envample } from '../src/envample';

function run() {
  const args = process.argv.slice(2);

  const isHelp = args.includes(`--help`) || args.includes(`-h`);
  if (isHelp) {
    process.stdout.write(
      `Usage: envample [.env] [.env.example], defaults to .env and .env.example is no arguments are provided`
    );
    return Promise.resolve();
  }

  return envample(...args);
}

run().catch((error) => {
  process.stderr.write(error.stack);
  process.exit(1);
});
