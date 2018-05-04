const gulp = require('gulp');
const shell = require('gulp-shell');
const argv = require('yargs').argv;
const watch = require('gulp-watch');
const request = require('request');
const PouchDB = require('pouchdb');
const pouchSeed = require('pouchdb-seed-design');
const couchdbServerUrl = `http://${argv.username}:${argv.password}@${argv.host}:5984`;
const config = require(argv.config);
gulp.task('default', () => {
    const patternToWatch = `${config.userDBs.designDocDir}/**/*.design.js`;
    console.log(`Pattern to watch: ${patternToWatch}`)
    return watch(patternToWatch, { ignoreInitial: false }, (vinyl) => {
        const designDoc = vinyl.stem;
        const designDocObj = require(vinyl.path);
        console.log(vinyl.path);
        //1. Get all of the DBs on the CouchDB Server
        request(`${couchdbServerUrl}/_all_dbs`, (error, response, rawData) => {
            const allUserDBs = JSON.parse(rawData);
            const dbsToUpdate = [];
            console.log(allUserDBs);
            //2. Go through each User DB to see if it uses this Design Doc
            for(var userDB in config.userDBs.model) {
                const model = config.userDBs.model[userDB];
                const indexOfDesignDoc = model.designDocs.indexOf(designDoc);
                if (indexOfDesignDoc === -1) {
                    continue;
                }
                allUserDBs.forEach((db) => {
                    if (db.indexOf(userDB)=== 0) {
                        dbsToUpdate.push(encodeURIComponent(db));
                    }
                })
            }
            //3. Update each db with the updated Design Doc
            for (const db of dbsToUpdate) {
                const couchdbUrl = `${couchdbServerUrl}/${db}`;
                console.log(couchdbUrl);
                const pouchdb = new PouchDB(couchdbUrl, {
                    auth: {
                        username: argv.username,
                        password: argv.password,
                    }
                });
                const promise = pouchSeed(pouchdb, designDocObj).then(function(updated) {
                    console.log(updated);
                    if(updated) {
                      console.log('DDocs updated!');
                    } else {
                      console.log('No update was necessary');
                    }
                });
            }
        });
    });
});