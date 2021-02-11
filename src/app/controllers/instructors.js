const { age, date, desde } = require('../../lib/utils')

const Instructor = require('../models/Instructor')

module.exports = {
    index(req, res){

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors) {

                const pagination = {
                    total: Math.ceil(instructors[0].total / limit),
                    page
                }

                return res.render('instructors/index', { instructors, pagination, filter })
            }
        }

        Instructor.paginate(params)

        /*
        if ( filter ) {
            Instructor.findBy(filter, function(instructors) {
                return res.render('instructors/index', { instructors, filter })
            })
        } else {
            Instructor.all(function(instructors) {
                return res.render('instructors/index', { instructors })
            })        
        }
        
        console.log(req.query)
        */
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
        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("Instructor not found!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")

            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        }) 
    },

    edit(req, res){
        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("Instructor not found!")

            instructor.birth = date(instructor.birth).iso

            return res.render("instructors/edit", { instructor })
        })
    },

    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            //req.body.avatar_url == "";
            if (req.body[key] == "") {
                return res.send('Please, fill all')
            }
        }

        Instructor.update(req.body, function() {
            return res.redirect(`/instructors/${req.body.id}`)
        })
    },

    delete(req, res){
        Instructor.delete(req.body.id, function() {
            return res.redirect(`/instructors`)
        })
    },
}
