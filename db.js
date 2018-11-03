const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Entry Table
 */
const createTables = () => {
  const query = ` 
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS entries CASCADE;
  
  CREATE TABLE IF NOT EXISTS users(
  
    id UUID PRIMARY KEY,
  
    fullname VARCHAR(150) NOT NULL,
  
    username VARCHAR(100) NOT NULL,
  
    email VARCHAR(255) UNIQUE NOT NULL,
  
    password VARCHAR(255) NOT NULL,
    
    reminder INTEGER  DEFAULT  0,
    
    image VARCHAR(255),
    
    created_date TIMESTAMP,
    
    modified_date TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS entries(

    id UUID PRIMARY KEY,
  
    title VARCHAR(255) NOT NULL,
  
    entry TEXT NOT NULL,
  
    userId UUID REFERENCES users(id) ON DELETE CASCADE,
  
    created_date TIMESTAMP,
    
    modified_date TIMESTAMP
    
     )`;

  pool.query(query, (err) => {
    if (err) {
      return err.message;
    }
    pool.end();
  }
  );
};

module.exports = {
  createTables
}

require('make-runnable');