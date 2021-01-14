const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("./users-model")
const JWT = require("jsonwebtoken")
const { restrict } = require("./users-middleware")
// const usersMiddleware = require("./users-middleware")
const router = express.Router()


// router.post('/register', async (req, res) => {
//     let user = req.body;

//     const hash = bycript.hashSync(user.password, 10);
//     user.password = hash;

//     try {
//         const saved = await usersMiddleware.add(user);
//         res.status(201).json(saved)
//     } catch (err) {
//         console.log(500).json(err);
//     }
// });

router.get("/users", restrict('admin'), async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch(err) {
        next(err)
    }
})

router.post("/users", async (req, res, next) => {
    try {
        const { username, password, role_id } = req.body
        const user = await Users.findByUsername(username)

        if (user) {
            return res.status(409).json({
                message: "Username is already taken",
            })
        }
        const newUser = await Users.add({
            username,
            password: await bcrypt.hash(password, 14),
            role_id: role_id
        })

        res.status(201).json(newUser)
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findByUsername(username)

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentialss",
            })
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) {
            return res.status(401).json({
                message: "Invalid Credentials!!!!!",
            })
        }
    

    const token = JWT.sign({ user
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    res.json({
        message: `welcome ${user.username}!`,
        token
    })
    } catch(err) {
        next(err)
    }
})
router.get("/logout", async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                next(err)
            } else {
                res.status(204).end()
            }
        })
    } catch (err) {
        next(err)
    }
})
module.exports = router