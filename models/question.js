let db = require('../config/database');
let moment = require('moment');
moment.locale('fr');



class Question {

    constructor(d) {
        if (d == null) {
            this._id = null
            this._content = null
            this._username = null
            this._validation = null
            this._theme = null
            this.created = null
            this._modified = null
        } else {
            this._id = d.id
            this._content = d.content
            this._username = d.username
            this._validation = d.validation
            this._theme = d.theme
            this.created = d.created
            this._modified = d.modified
        }
    }


    get id() {
        return this._id
    }
    get content() {
        return this._content
    }
    get username() {
        return this._username
    }
    get validation() {
        return this._validation
    }
    get theme() {
        return this._theme
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
    set content(x) {
        this._content = x
    }
    set username(x) {
        this._username = x
    }
    set validation(x) {
        this._validation = x
    }
    set theme(x) {
        this._theme = x
    }
    set created(x) {
        this._created = x
    }
    set modified(x) {
        this._modified = x
    }

    static all(callback) {
        db.query('SELECT * FROM questions ',
            function (err, datas) {
                callback(datas.map((d) => new Question(d)))
            })
    }
    static create(theme, callback) {
        db.query('select * from questions where theme = ? AND validation = true ', [theme], function (err, datas) {
            callback(datas.map((d) => new Question(d)))
        })
    }
}
module.exports = Question
// ORDER BY RAND()
