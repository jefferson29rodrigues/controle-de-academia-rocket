const Instructor = require('../models/Instructor')

module.exports = {
    index(req, res){
        Instructor.all(function(instructors) {
            return res.render('instructors/index', { instructors })
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
        
        Instructor.create(req.body, function(instructor) {
            return res.redirect(`/instructors/${instructor.id}`)
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
