module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() -  birthDate.getMonth()

        if (month < 0 || 
            month == 0 &&
            today.getDate() <= birthDate.getDate()) {
                age = age - 1
            }

        return age
    },

    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        //return `${year}-${month}-${day}`
        
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },

    birthday(timestamp) {
        const date = new Date(timestamp)

        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${day}/${month}` // iso
    },

    desde(timestamp) {
        const desde = new Date(timestamp)

        const year = desde.getUTCFullYear()
        const month = `0${desde.getUTCMonth() + 1}`.slice(-2)
        const day = `0${desde.getUTCDate()}`.slice(-2)

        return `${day}/${month}/${year}`
    }
}