import { defineConfig } from 'orval';

export default defineConfig({
  raffleMain: {
    input: './raffleMain.yaml',
    output: {
      target: './lib/apiMain.ts',
      client: 'axios-functions',
      httpClient: 'axios',
      baseUrl: '',
      prettier: false,
      biome: true,
      mode: 'single',
      override: {
        mutator: {
          path: './lib/httpMain.ts',
          name: 'httpClient'
        }
      }
    }
  },
  raffleBitcoin: {
    input: './raffleBitcoin.yaml',
    output: {
      target: './lib/apiBitcoin.ts',
      client: 'axios-functions',
      httpClient: 'axios',
      baseUrl: '',
      prettier: false,
      biome: true,
      mode: 'single',
      override: {
        mutator: {
          path: './lib/httpBitcoin.ts',
          name: 'httpClient'
        }
      }
    }
  }
});
