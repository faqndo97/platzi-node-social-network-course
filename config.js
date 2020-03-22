module.exports = {
  api: {
    port: process.env.API_PORT || 3001
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || '73ZPHee3tO',
    password: process.env.MYSQL_PASSWORD || 'ph7BveGtIj',
    database: process.env.MYSQL_DATABASE || '73ZPHee3tO',
  }
}