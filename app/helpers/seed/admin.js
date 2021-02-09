require('dotenv').config()
const bcrypt = require('bcryptjs')
const AdminModel = require('../../models/admin')

const mongoose = require('mongoose')


try {
    mongoose.connect(process.env.DATABASE_URI || 'mongodb://localhost:27017/orama', { useNewUrlParser: true, useUnifiedTopology: true })
} catch (error) {
    console.log(error)
}

let createAdmin = async () => {
    let pass = process.env.ADMIN_PASSWORD || 'password'

    try {
        let admin = await AdminModel({
            name: process.env.ADMIN_NAME || 'Admin',
            username: process.env.ADMIN_USERNAME || 'admin',
            password: bcrypt.hashSync(pass)
        }).save()

        return admin
    } catch (error) {
        return error
    }
}

let log = async () => {

    console.log(await createAdmin())
}

log()


