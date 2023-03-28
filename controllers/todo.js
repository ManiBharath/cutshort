import { dbConnect } from "../models/dbconnection.js";
import { ObjectId } from "mongodb";

export async function createTodo(req, res) {
    try {
        const dbo = await dbConnect();
        let data = dbo.collection('todo')
        let user_id = new ObjectId(req.user._id)

        if (req.body.title) {
            let todoInfo = {
                title: req.body.title,
                createdBy_id: user_id,
                createdBy_name: req.user.user_name,
                complete: false,
                delete: false
            }
            let result = data.insertOne(todoInfo).then((resp) => {

                res.json({
                    success: true,
                    data: resp
                })
            })
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

export async function updateTodo(req, res) {
    try {
        let dbo = await dbConnect();
        let data = dbo.collection('todo')
        let todoId = new ObjectId(req.body.todoId)

        let getTodo = await data.findOne({ '_id': todoId, 'delete': false })

        if (getTodo == null) {
            res.status(400).json({
                error: "todo doesn't exist"
            })
        } else {

            if (req.user._id == getTodo.createdBy_id) {
                data.updateOne({
                    "_id": new ObjectId(req.body.todoId)
                }, {
                    $set: {
                        title: req.body.title
                    }
                }).then(response => {
                    res.status(202).json({
                        data: response
                    })
                })
            } else {
                res.status(401).json({
                    error: `You don't have access to update this workitem.`
                })
            }
        }
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

export async function deleteTodo(req, res) {
    try {
        let dbo = await dbConnect();
        let data = dbo.collection('todo');

        let todoId = new ObjectId(req.body.todoId)

        let getTodo = await data.findOne({ '_id': todoId, 'delete': false });

        if (getTodo == null) {
            res.status(400).json({
                error: "todo doesn't exist"
            })
        } else {

            if (req.user._id == getTodo.createdBy_id) {
                data.updateOne({
                    "_id": new ObjectId(req.body.todoId)
                }, {
                    $set: {
                        delete: true
                    }
                }).then(response => {
                    res.status(200).json({
                        data: response
                    })
                })
            } else {
                res.status(401).json({
                    error: `You don't have access to delete this workitem.`
                })
            }
        }
    }
    catch (err) {
        res.status(500);
    }
}

export async function markAsComplete(req, res) {
    try {
        let dbo = await dbConnect();
        let data = dbo.collection('todo');

        let todoId = new ObjectId(req.body.todoId)

        let getTodo = await data.findOne({ '_id': todoId, 'delete': false });

        if (getTodo == null) {
            res.status(400).json({
                error: "todo doesn't exist"
            })
        } else {
            if (req.user._id == getTodo.createdBy_id) {
                data.updateOne({
                    "_id": new ObjectId(req.body.todoId)
                }, {
                    $set: {
                        complete: true
                    }
                }).then(response => {
                    res.status(200).json({
                        data: response
                    })
                })
            } else {
                res.status(401).json({
                    error: `You don't have access to update this workitem.`
                })
            }
        }
    }
    catch (err) {
        res.status(500);
    }
}

export async function getTodos(req, res) {
    try {

        console.log('controller invoked')
        let dbo = await dbConnect();
        let data = dbo.collection('todo');

        let todos = data.find({})

        console.log(todos);

        res.json({
            todos: todos
        })
    }
    catch (err) {
        res.status(500);
    }
}