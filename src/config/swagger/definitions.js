module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'APP Dock',
    version: 'v1.0.0',
    description: 'A API built on top of expressJS',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Development Environment - v1',
    },
  ],
};
