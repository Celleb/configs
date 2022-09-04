import { copyFileSync, readFileSync, unlinkSync } from 'fs';
import { envample } from './envample';

describe('envample', () => {
  it('throws an error if no env file is found', async () => {
    await expect(() => envample()).rejects.toThrowError('.env file not found');
  });

  it('generates .env.example file from .env file when no paths provided', async () => {
    jest.spyOn(process.stdout, 'write').mockImplementation(jest.fn());
    copyFileSync('packages/envample/test-data/.env', '.env');
    await envample();
    expect(readFileSync('.env.example')).toEqual(
      readFileSync('packages/envample/test-data/.env.example')
    );
    unlinkSync('.env.example');
    unlinkSync('.env');
    expect(process.stdout.write).toHaveBeenCalledWith(
      `🎉 .env.example generated from ${process.cwd()}/.env 🚀`
    );
  });

  it('generates .env.example from .env using the specified paths', async () => {
    await envample('packages/envample/test-data/.env', '.env.test');
    expect(readFileSync('.env.test')).toEqual(
      readFileSync('packages/envample/test-data/.env.example')
    );
    unlinkSync('.env.test');
  });
});
