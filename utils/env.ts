// utils/env.ts
export function getEnvOrThrow(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} não definido no .env`);
  }
  return value;
}
