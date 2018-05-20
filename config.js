var path = require('path');
var config = {
    // dbServer: {
    //   protocol: 'https://',
    //   host: 'ba135a53-f972-43ba-81d1-611c9fc3c5d3-bluemix.cloudant.com',
    //   user: 'ba135a53-f972-43ba-81d1-611c9fc3c5d3-bluemix',
    //   password: 'cfc8b010be3f69c4b40446172746395c5952b11370d935a0732ed81a8cc75198',
    //   userDB: 'sl-users',
    //   couchAuthDB: '_users',
    //   cloudant: true,
    // },
    dbServer: {
        protocol: 'https://',
        host: 'couchdb-f2f5de.smileupps.com',
        user: 'admin',
        password: 'bc3098a12fba',
        userDB: 'sl-users',
        couchAuthDB: '_users',
        cloudant: false,
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