module.exports = {
  raffle: {
    input: './raffle.yaml',
    output: {
      target: './src/raffle.ts',
      client: 'fetch',
      prettier: true,
      mode: 'split',
    },
  },
};
