let db = require('../config/database');
let moment = require('moment');
moment.locale('fr');



class Answer {

    constructor(d) {
        if (d == null) {
            this._id = null
            this._question_id = null

            this._content = null
            this.correct = null
            this.created = null
            this._modified = null
        } else {
            this._id = d.id
            this._content = d.content
            this._question_id = d.question_id
            this._correct = d.correct
            this._created = d.created
            this._modified = d.modified
        }
    }


    get id() {
        return this._id
    }
    get content() {
        return this._content
    }
    get correct() {
        return this._correct
    }
    get question_id() {
        return this._question_id
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
    set correct(x) {
        this._correct = x
    }
    set question_id(x) {
        this.question_id = x
    }

    set created(x) {
        this._created = x
    }
    set modified(x) {
        this._modified = x
    }

    static all(callback) {
        db.query('SELECT * FROM answers ',
            function (err, datas) {
                callback(datas.map((d) => new Answer(d)))
            })
    }
    static create(id, callback) {
        db.query('SELECT * FROM `answers` WHERE question_id =  ? ', [id], function (err, datas) {
            callback(datas.map((d) => new Answer(d)))
        })
    }

    // static create(id, callback) {
    //     db.query('SELECT answers.*, question.content FROM answers JOIN question ON answers.question_id = question.id WHERE question.id = ?;', [id], function(err,datas) {
    //         callback( datas )
    //     })
    //   }
}
module.exports = Answer
// ORDER BY RAND()
