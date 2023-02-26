let db = require('../config/database');
let moment = require('moment');
moment.locale('fr');



class Result {

    constructor(d) {
        if (d == null) {
            this._id = null
            this.user = null
            this.total = null
            this.correct = null

            this.created = null
            this._modified = null
        } else {
            this._id = d.id
            this.user = d.user
            this.total = d.total
            this.correct = d.correct

            this.created = d.created
            this._modified = d.modified
        }
    }


    get id() {
        return this._id
    }
    get user() {
        return this.user
    }
    get total() {
        return this.total
    }
    get correct() {
        return this.correct
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
    set user(x) {
        this.user = x
    }
    set total(x) {
        this.total = x
    }
    set correct(x) {
        this.correct = x
    }

    set created(x) {
        this._created = x
    }
    set modified(x) {
        this._modified = x
    }

    static all(callback) {
        db.query('SELECT * FROM results ',
            function (err, datas) {
                callback(datas.map((d) => new Result(d)))
            })
    }
    static create(user, score, callback) {
        db.query('INSERT INTO results (user, total) values(?, ?)', [user, score], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    }
    //   static create(score, userId, callback) {
    //     const query = `INSERT INTO results ( user, total) VALUES ($1, $2, )`;
    //     const values = [userId, score];
    //     db.query(query, values, (err, result) => {
    //       if (err) {
    //         console.error('Error creating result:', err);
    //         callback(err, null);
    //       } else {
    //         callback(null, result);
    //       }
    //     });
    //   }
}
module.exports = Result
// ORDER BY RAND()
