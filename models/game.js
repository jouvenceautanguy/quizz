let db = require('../config/database');
let moment = require('moment');
moment.locale('fr');

class Game {

    constructor(d) {
        if(d == null) {
            this._id = null
            this._name = null
            this._username = null
            this._platform = null
            this.created = null
            this._modified = null
        } else {
            this._id = d.id
            this._name = d.name
            this._username = d.username
            this._platform = d.platform
            this.created = d.created
            this._modified = d.modified
        }
    }

    get username() {
        return this._username
    }
    get id() {
        return this._id
    }
    get name() {
        return this._name.toUpperCase()
    }
    get platform() {
        return this._platform
    }
    get created() {
        return moment(this._created)
    }
    get modified() {
        return moment(this._modified)
    }
set username(x) {
    this._username = x
}
    set id(x) {
        this._id = x
    }
    set name(x) {
         this._name = x
    }
    set platform(x) {
         this._platform = x
    }
    set created(x) {
         this._created = x
    }
    set modified(x) {
        this._modified = x
    }

  static all(callback) {
    db.query('SELECT * FROM videogames ORDER BY name',
    function(err,datas) {
        callback( datas.map( (d) => new Game(d)) )
    })
  }
  static create(name, platform, contento, callback) {
    db.query('insert into videogames (name, platform, username) VALUES (?,?, ?)', [name, platform, contento], (err, res) => {
        callback(res)
    })
  }
}
module.exports = Game