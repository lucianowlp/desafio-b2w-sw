export const environment = {
  server: { port: process.env.SERVER_PORT || 5005 },
  serverTest: { url: `http://localhost:${process.env.SERVER_PORT || 5005}` },
  db: { url: process.env.DB_URL || 'mongodb://localhost/swapi' },
  urlSWApi: 'http://swapi.co/api/'
}
