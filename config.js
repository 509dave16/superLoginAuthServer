var path = require('path');
var dbServer = require('./dbserver.dist');
var config = {
    dbServer,
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
        private: ['relational']
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
  };

  module.exports = config;