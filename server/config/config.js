require('dotenv').config();

const defaultConfig = {
  url: process.env.DEV_URL,
  dialect: 'postgres'
};

const testConfig = {
  url: process.env.TEST_URL,
  dialect: 'postgres'
};

const productionConfig = {
  url: process.env.PRODUCTION_URL,
  dialect: 'postgres'
};

module.exports = {
  test: testConfig,
  development: defaultConfig,
  production: productionConfig
};
