module.exports = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || '73ZPHee3tO',
    password: process.env.MYSQL_PASSWORD || 'ph7BveGtIj',
    database: process.env.MYSQL_DATABASE || '73ZPHee3tO',
  },
  mysqlService: {
    protocol: process.env.MYSQL_SRV_PROTOCOL || 'http',
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001
  },
  posts: {
    port: process.env.POST_PORT || 3002
  }
}