module.exports = {
    development: {
      client: 'pg',
      connection: process.env.DATABASE_URL || 'postgres://localhost/agility-dev',
      pool: { min: 0, max: 7 }
    },
    test: {},
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL
    }
  }