module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Holiday Ice Link',
    titleTemplate: 'Holiday Ice Link - %s',
    meta: [
      {
        name: 'description',
        content: 'Holiday Ice Link',
      },
    ],
  },
};
