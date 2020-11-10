const { age, date, desde } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    index(req, res){
        db.query(`SELECT * FROM instructors`, function(err, results) {
            if(err) return res.send("Database Error!")

            return res.render('instructors/index', {instructors: results.rows})
            
        })
    },

    create(req, res){
        return res.render('instructors/create')
    },

    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            //req.body.avatar_url == "";
            if (req.body[key] == "") {
                return res.send('Please, fill all')
            }
        }
     
        //let {avatar_url, birth, name, gender, services} = req.body
        
        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            date(req.body.birth).iso,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) return res.send("Database Error!")

            return res.redirect(`/instructors/${results.rows[0].id}`)
        })

    },

    show(req, res){
        return 
    },

    edit(req, res){
        return
    },

    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            //req.body.avatar_url == "";
            if (req.body[key] == "") {
                return res.send('Please, fill all')
            }
        }

        return
    },

    delete(req, res){
        return
    },
}
