module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Skate-O-Meter',
    titleTemplate: 'Skate-O-Meter - %s',
    meta: [
      {
        name: 'description',
        content: 'Skate-O-Meter',
      },
    ],
  },
};
