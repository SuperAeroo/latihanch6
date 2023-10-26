const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const imageKit = require('../libs/imagekit')
const path = require('path');

module.exports = {
    createProfile : async (req, res, next) => {
        try {
            let { idUser, first_name, last_name, birth_date } = req.body
            let strFile = req.file.buffer.toString('base64')
            idUser = Number(idUser)

            let idUserExist = await prisma.user.findUnique({ where: { id : idUser } });
            if (!idUserExist) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'idUser not found!',
                    data: null
                });
            }
            
            let userExist = await prisma.userProfile.findUnique({ where: { idUser } });
            if (userExist) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'idUser has already been used!',
                    data: null
                });
            }
            
            // image
            let {url} = await imageKit.upload({
                fileName : Date.now() + path.extname(req.file.originalname),
                file : strFile
            })

            let profile = await prisma.userProfile.create({
                data: {
                    idUser,
                    first_name,
                    last_name,
                    birth_date,
                    profile_picture : url
                }
            });

            return res.status(201).json({
                status: true,
                message: 'Profile Created',
                err: null,
                data: { profile }
            });
        } catch (err) {
            next(err);
        }
    }, updateProfile : async (req, res, next) => {
        try {
            let {id} = req.params
            let { idUser, first_name, last_name, birth_date } = req.body
            idUser = Number(idUser)
            let strFile = req.file.buffer.toString('base64')

            
            let profileExist = await prisma.userProfile.findUnique({ where: { id : Number(id) } });
            if (!profileExist) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'profile not found!',
                    data: null
                });
            }
            let idUserExist = await prisma.user.findUnique({ where: { id : idUser } });
            if (!idUserExist) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'idUser not found!',
                    data: null
                });
            }

            // let userExist = await prisma.userProfile.findUnique({ where: { idUser } });
            // if (userExist) {
            //     return res.status(400).json({
            //         status: false,
            //         message: 'Bad Request',
            //         err: 'idUser has already been used!',
            //         data: null
            //     });
            // }
            
            let {url} = await imageKit.upload({
                fileName : Date.now() + path.extname(req.file.originalname),
                file : strFile
            })

            let updateProfile = await prisma.userProfile.update({
                where: {id: Number(id)},
                data: {
                    idUser,
                    first_name,
                    last_name,
                    birth_date,
                    profile_picture : url
                }
            });

            return res.status(200).json({
                status: true,
                message: 'Profile Updated!',
                err: null,
                data: { updateProfile }
            });

        } catch (err) {
            next(err)
        }
    }
}