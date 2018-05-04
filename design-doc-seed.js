var PouchDB = require('pouchdb');
var pouchSeed = require('pouchdb-seed-design');
var request = require('request');
var nodemon = require('nodemon');
var args = process.argv.slice(2);
console.log(args);
var options = {
    username: { },
    password: { },
    host: { },
    dir: {},
};
// 1. Get username and password
for (const optionKey in options ) {
    var option = options[optionKey];
    var optionName = `--${optionKey}=`;
    args.forEach((arg) => {
        if(arg.indexOf(optionName) !== -1) {
            var optionValue = arg.replace(optionName, '');
            option.value = optionValue;
        }
    });
    if (option.value === undefined) {
        throw new Error(`${optionName} is missing!`);
    }
}    
// request(this.place + '/' + name, function (error, response, data) {
//     data = JSON.parse(data);
//     if (response.statusCode === 200) {
//         cb(null, data);
//     } else {
//         cb(error || data);
//     }
// });

nodemon({ args: [`--watch="${options.dir.value}"`] }).on('restart', (files) => {
    console.log(files);
});
// var db = new PouchDB(args[0], {
//     auth: {
//         username: '509dave16',
//         password: 'dsf0@mia',
//     }
// });

// var ddoc = {
//     auth: {
//         validate_doc_update: function(newDoc, oldDoc, userContext, secObject) {
//             var messagesStr = 'context=';
//             for(var key in userContext) {
//                 messagesStr += ' | ' + key + ' : ' + userContext[key];
//             }
//             messagesStr += ' security=';
//             for(var key in secObject) {
//                 messagesStr += ' | ' + key + ' : ' + secObject[key];
//             }
//             throw({ forbidden: messagesStr});
//         }
//     }
// };

// var promise = pouchSeed(db, ddoc).then(function(updated) {
//   console.log(updated);
//   if(updated) {
//     console.log('DDocs updated!');
//   } else {
//     console.log('No update was necessary');
//   }
// });