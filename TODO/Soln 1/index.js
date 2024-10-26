const express = require("express");
const {createTodo, updateTodo} = require("./types");
const {todo} = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "Error you sent wrong inputs!"
        })
    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg:"Todo created successfully!"
    })
});


app.get("/todos", async (req, res)=>{
    const allTodos = await todo.find({});
    res.json({
        allTodos
    })
});


app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "Error you sent wrong id or inputs!"
        })
    }
    await todo.updateOne({
        _id: req.body.id
    },{
        completed: true
    })
    res.json({
        msg:"Todo marked as completed!"
    })
});


const port = 8000;
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
});