const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const mongoose = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin',
    dashboard: {
        component: AdminBro.bundle('../adminPanelComponents/Dashboard.jsx')
    },
    branding: {
        logo: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg",
        companyName: "Carina Codorean"
    }
})

const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'carina@mail.com',
    password: process.env.ADMIN_PASSWORD || 'Carina21',
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
    authenticate: async (email, password) => {
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN
        }
        return null
    }
})

module.exports = router