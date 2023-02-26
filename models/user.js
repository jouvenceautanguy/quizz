let db = require('../config/database');
let moment = require('moment');
moment.locale('fr');



class User {

    constructor(d) {
        if (d == null) {
            this._id = null

            this._username = null
            this._password = null

            this.created = null
            this._modified = null
        } else {
            this._id = d.id

            this._username = d.username
            this._password = d.password

            this.created = d.created
            this._modified = d.modified
        }
    }


    get id() {
        return this._id
    }

    get username() {
        return this._username
    }
    get password() {
        return this._password
    }

    get created() {
        return moment(this._created)
    }
    get modified() {
        return moment(this._modified)
    }


    set id(x) {
        this._id = x
    }

    set password(x) {
        this._password = x
    }
    set username(x) {
        this._username = x
    }

    set created(x) {
        this._created = x
    }
    set modified(x) {
        this._modified = x
    }

    static all(callback) {
        db.query('SELECT * FROM users ',
            function (err, datas) {
                callback(datas.map((d) => new User(d)))
            })
    }

}
module.exports = User
// ORDER BY RAND()
