module.exports = {
  images: {
    name: 'images',
    connector: 'loopback-component-storage',
    provider: 'filesystem',
    root: './client/'
  },
  DappstackDB: {
    connector: 'mongodb',
    url: process.env.MONGODB_URI
  }
};
