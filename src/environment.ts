export const environment = {
  PORT: parseInt(process.env.PORT || "4000"),
  SALT: parseInt(process.env.SALT || "12"),
  DB_HOST: process.env.DB_HOST || `localhost`,
  DB_USER: process.env.DB_USER || `root`,
  DB_PASSWORD: process.env.DB_PASSWORD || `root`,
  DB_NAME: process.env.DB_NAME || `myFinances`,
  DB_PORT: process.env.DB_PORT || `3306`,
  EXCHANGE_RATE_KEY: process.env.EXCHANGE_RATE_KEY || "",
};
