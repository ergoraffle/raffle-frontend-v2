import { defineConfig } from 'orval';

export default defineConfig({
  raffle: {
    input: './raffle.yaml',
    output: {
      target: './lib/index.ts',
      client: 'fetch',
      prettier: false,
      biome: true,
      mode: 'single',
      clean: true
    }
  }
});
