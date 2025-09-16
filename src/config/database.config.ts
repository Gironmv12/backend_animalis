const environment = process.env.NODE_ENV;
const databaseUrl =
  environment === 'produccion'
    ? process.env.DATABASE_URL
    : process.env.LOCAL_DATABASE_URL;

export default {
  url: databaseUrl,
};
