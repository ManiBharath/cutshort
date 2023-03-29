import { dbConnect } from "../DB/dbconnection.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function createUser(req, res) {
    try {
        const dbo = await dbConnect();
        let data = dbo.collection('users')

        let userInfo = req.body;

        if (userInfo.user_name && userInfo.user_email && userInfo.password) {
            bcrypt.hash(userInfo.password, 10, function (err, hash) {
                userInfo.password = hash;
                let result = data.insertOne(userInfo).then((resp) => {

                    res.json({
                        success: true,
                        data: resp
                    })
                })
            });
        } else {
            res.status(400).json({
                error: 'missing inputs!!'
            })
        }

    }
    catch (er) {
        res.status(500).json({
            error: er
        })
    }
}

export async function loginUser(req, res) {
    try {
        let dbo = await dbConnect();
        let collection = dbo.collection('users');

        if (req.body.user_email && req.body.password) {
            let userInfo = await collection.findOne({
                "user_email": req.body.user_email
            })

            bcrypt.compare(req.body.password, userInfo.password, function (err, result) {
                if (result) {
                    const token = jwt.sign(userInfo, 'cutshort_key', {
                        expiresIn: "2h"
                    })
                    userInfo.token = token;
                    res.json({
                        success: true,
                        data: userInfo
                    })
                } else {
                    res.json({
                        error: 'incorrect password'
                    })
                }
            });
        } else {
            res.status(400).json({
                error: 'missing inputs!!'
            })
        }
    }
    catch (er) {
        res.status(400).json({
            error: er
        })
    }
}