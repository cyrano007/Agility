module.exports = {
    development: {
      client: 'pg',
      connection: process.env.DATABASE_URL || 'postgres://localhost/agility-dev',
      pool: { min: 0, max: 1 }
    },
    stage: {
      client: 'pg',
      connection: process.env.DATABASE_URL || 'postgres://localhost/agility-dev',
      pool: { min: 0, max: 1 }
    },
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      pool: { min: 0, max: 1 }
    }
  }