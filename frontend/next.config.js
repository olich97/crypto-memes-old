module.exports = {
  images: {
    domains: ['localhost', 'host.docker.internal'],
  },
  env: {
    MEMES_ENDPOINT: process.env.MEMES_ENDPOINT,
    HOST_URL: process.env.HOST_URL,
    CONTENT_ENDPOINT: process.env.CONTENT_ENDPOINT,
    CRYPTO_MEME_CONTRACT: process.env.CRYPTO_MEME_CONTRACT,
  },
};
