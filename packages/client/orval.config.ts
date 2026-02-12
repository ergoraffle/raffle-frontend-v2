import { defineConfig } from 'orval';

export default defineConfig({
  raffle: {
    input: './raffle.yaml',
    output: {
      target: './lib/index.ts',
      client: 'react-query',
      httpClient: 'fetch',
      baseUrl: '/api',
      prettier: false,
      biome: true,
      mode: 'single',
      clean: true
    }
  }
});
