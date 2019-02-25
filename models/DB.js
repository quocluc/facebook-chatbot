const mysql = require('mysql');

const PAGE_ACCESS_TOKEN = "EAACpT0r9iRgBAOkF8s65UaOZBQw3nVUXvbmTdaAC4eCkHzwZADulYa3NDmDGMZAKl392h55NKAHuiVkPP81Ba8usGI4aa6pf6dFm0jCU3iQZAlleT4VZC0dcE9WMyZAHcYTchsZABAhBlBF8jJu8ZAFxNsHYUngkgFjN7sUmt9vOXHGQaxGt8f63";
const DB = mysql.createConnection({
    host: "remotemysql.com",
    user: "XaheR1DFnf",
    password: "rNweImVl6M",
    database: "XaheR1DFnf"
});
async function insertMessage(mess) {
    let userId = mess.id_user;
    let message = mess.message;

    let sql = "INSERT INTO `messages`(`id_user`, `message`) VALUES (" + userId + ",'" + message + "')";
    DB.connect(function (err) {
        DB.query(sql, function (err, result) {
            if (err) throw err;
            return "Add success!";
        });
    });
}
module.exports = {
    PAGE_ACCESS_TOKEN, DB, insertMessage
};