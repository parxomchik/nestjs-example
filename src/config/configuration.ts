//const dbHost = process.env.DATABASE_HOST || 'localhost';
//const dbPort = process.env.DATABASE_PORT || 5432;

export default () => ({
  port: process.env.SERVER_PORT || 3000,
  env: process.env.ENV || 'DEV',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME || 'podil-back-end',
    password: process.env.DATABASE_PASSWORD || 'podil-back-end',
    name: process.env.DATABASE_DB || 'podil-back-end',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT || 6379),
    url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}/0`,
    password: process.env.REDIS_PASSWORD,
  },
});
