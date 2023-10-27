const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../libs/postgres')
const { JWT_SECRET_KEY } = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            let { email, password } = req.body;

            let userExist = await prisma.user.findUnique({ where: { email } });
            if (userExist) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'email has already been used!',
                    data: null
                });
            }

            let encryptedPassword = await bcrypt.hash(password, 10);
            let user = await prisma.user.create({
                data: {
                    email,
                    password: encryptedPassword
                }
            });

            return res.status(201).json({
                status: true,
                message: 'Created',
                err: null,
                data: { user }
            });
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            let { email, password } = req.body;

            let user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'invalid email or password!',
                    data: null
                });
            }

            let isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'invalid email or password!',
                    data: null
                });
            }

            let token = jwt.sign({ id: user.id }, JWT_SECRET_KEY);

            return res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: { user, token }
            });
        } catch (err) {
            next(err);

        }
    },
    authenticate : async (req, res, next) => {
        try {
            let { id } = req.params
            id = Number(id)
                // ------ menggunakan pool query postgres -----
            // let getUser = await pool.query(`SELECT "UserProfile"."first_name",
            //                                 "UserProfile"."last_name", "User"."email",
            //                                 "UserProfile"."birth_date", "UserProfile"."profile_picture"
            //                                 FROM "User"
            //                                 INNER JOIN "UserProfile"
            //                                 ON "User"."id" = "UserProfile"."idUser" 
            //                                 WHERE "User"."id" = $1`,[id])
            // res.status(200).json({
            //     status : true,
            //     message : 'OK!',
            //     data : getUser.rows[0]
            // })
            
            // ------ menggunakan prisma -----
            let {first_name , last_name, birth_date, profile_picture} = await prisma.userProfile.findUnique({
                where:{idUser : req.user.id}
            })
            let {email} = await prisma.user.findUnique({
                where:{id : req.user.id}
              })

              
            res.status(200).json({
                status : true,
                message : 'OK!',
                data : {first_name, last_name, email, birth_date, profile_picture}
                // data : {user : req.user}
            })
        } catch (err) {
            next(err)
        }
    }
}