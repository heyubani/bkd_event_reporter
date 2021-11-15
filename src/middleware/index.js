const { adduser } = require("../services")

const getUser = (req, res, next) => {
    try {
        const { client_id } = req.body
        const createUser = adduser(client_id),

        if (!createUser) {
            res.json({
                message: "invalid credentials",
                data: createUser
            }).status(404)
        }
            req.createUser = createUser,
            req.client_id = client_id,
        next()
    } catch (error) {
        console.log(error.message)
    }

}

module.exports = {
    getUser
}