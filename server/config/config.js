require('dotenv').config();

const defaultConfig = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres'
};

const testConfig = {
  url: process.env.TEST_URL,
  dialect: 'postgres'
};

module.exports = {
  test: testConfig,
  development: defaultConfig,
  production: defaultConfig
};
