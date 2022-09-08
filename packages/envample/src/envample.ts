import { createInterface } from 'readline';
import { createReadStream, existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';

/**
 * @description: Generates .env.example file from your .env file
 */
export function envample(inputFile?: string, outputFile?: string) {
  return new Promise((res, reject) => {
    const envFile = inputFile || resolve(process.cwd(), '.env');
    if (!existsSync(envFile)) {
      return reject(Error(`${envFile} file not found`));
    }

    const envExampleFile = outputFile || '.env.example';

    const stream = createInterface({
      input: createReadStream(envFile),
    });

    const envs: string[] = [];
    let value: string | undefined;
    let useValue = false;
    let ignoreNext = false;
    stream
      .on('line', (line) => {
        if (ignoreNext) {
          ignoreNext = false;
          return;
        }

        if (line.startsWith('# ignore')) {
          ignoreNext = true;
          return;
        }

        if (line.startsWith('# example')) {
          const [, ...example] = line.split('=');
          if (example?.length) {
            value = example.join('=');
          } else {
            useValue = true;
          }
          envs.push(line);
          return;
        }

        if (line.startsWith('#') || line.trim() === '') {
          envs.push(line);
          useValue = false;
          value = undefined;
          return;
        }
        const [left, ...right] = line.split('=');
        envs.push(`${left}=${value ? value : useValue ? right.join('=') : ''}`);
        value = undefined;
        useValue = false;
      })
      .on('close', () => {
        console.info(`🎉 ${envExampleFile} generated from ${envFile} 🚀`);
        writeFileSync(envExampleFile, envs.join('\r\n'), 'utf8');
        return res(null);
      });
  });
}
