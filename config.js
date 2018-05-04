var path = require('path');
var config = {
    dbServer: {
      protocol: 'http://',
      host: 'localhost:5984',
      user: '509dave16',
      password: 'dsf0@mia',
      userDB: 'sl-users',
      couchAuthDB: '_users'
    },
    mailer: {
      fromEmail: 'gmail.user@gmail.com',
      options: {
        service: 'Gmail',
          auth: {
            user: 'gmail.user@gmail.com',
            pass: 'userpass'
          }
      }
    },
    security: {
      maxFailedLogins: 3,
      lockoutTime: 600,
      tokenLife: 86400,
      loginOnRegistration: true,
    },
    userDBs: {
      defaultDBs: {
        private: ['supertest']
      },
      model: {
        supertest: {
          designDocs: ['supertest.design'],
        }
      },
      designDocDir: path.join(__dirname, './design-docs')
    },
    providers: {
      local: true
    }
  }

  module.exports = config;