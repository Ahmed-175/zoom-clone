export default () => ({
  port: process.env.PORT || 3000,
  database: process.env.DATABASE_URL,
});
