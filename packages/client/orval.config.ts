import { defineConfig } from 'orval';

export default defineConfig({
  raffle: {
    input: './raffle.yaml',
    output: {
      target: './lib/api.ts',
      client: 'axios-functions',
      httpClient: 'axios',
      baseUrl: '',
      prettier: false,
      biome: true,
      mode: 'single',
      override: {
        mutator: {
          path: './lib/http.ts',
          name: 'httpClient'
        }
      }
    }
  }
});
