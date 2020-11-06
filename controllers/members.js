const fs = require('fs');
const data = require("../data.json")
const { age, date, desde, birthday } = require('../utils')


exports.index = function(req, res) {
    return res.render('members/index', { members: data.members })
}

exports.show = function(req, res) {
    // req.query.id
    // req.body
    // req.params.id = /:id

    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return id == member.id
    })

    if (!foundMember) return res.send("Member not found!")

    /*const adaptMember = {
        ... foundMember,
        created_at: desde(foundMember)
    }*/

    const member = {
      ...foundMember,
      age: age(foundMember.birth),
      birth: birthday(foundMember.birth),
    }

    return res.render("members/show", { member })

}

exports.create = function(req, res) {
    return res.render('members/create')
}

exports.post = function(req, res) {

    const keys = Object.keys(req.body)

   for(key of keys) {
       //req.body.avatar_url == "";
       if (req.body[key] == "") {
           return res.send('Please, fill all')
       }
   }

   birth = Date.parse(req.body.birth)

   let id = 1
   const lastMember = data.members[data.members.length - 1]

   if (lastMember) {
       id = lastMember.id + 1
   }

   // na 1° [] -> [{...}] na 2° [{...}] -> [{...}, {...}] 
   data.members.push({
       id,
       ...req.body,
       birth   
   }) //  na 3° [{...}, {...}] -> [{...}, {...}, {...}]

   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
       if (err) return res.send("write file error!")

       return res.redirect(`/members/${id}`)
   });

    //return res.send(req.body)
}

exports.edit = function(req, res) {
    // req.params
    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return id == member.id
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth) // 2000-2-1
    }

    return res.render('members/edit', { member })
}

exports.put = function(req, res) {
    // req.body
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex) {
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(function(member) {
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")
    
        return res.redirect("/members")
    })
}