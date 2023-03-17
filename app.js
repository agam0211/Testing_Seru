const express = require("express");
const app = express();
const db = require("./config/db.js");


app.get('/', (req, res) => res.send("respond nodejs berhasil"))

app.use(express.urlencoded({extended: true}))

db.authenticate().then(()=>
    console.log("Berhasil terkunci dengan database")
)

const User = require("./models/User")

app.post("/mobil", async (req,res) => {
    try{

        const{name, is_admin} = req.body;


        const newUser = new User({
            name,is_admin
        })

        await newUser.save();

        res.json(newUser);
    } catch (err){
        console.error(err.message);
        res.status(500).send("server error")
    }
})

app.get("/mobil",async (req, res) =>{
    try {
        const getAllUser = await User.findAll({})
        
        res.json(getAllUser)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
})


app.get("/mobil/:id", async (req, res)=> {
    try {
        const id = req.params.id

        const  GetUser = await User.findOne({
            where: {id:id}
        });

        res.json(GetUser);
    }catch (err){
        console.error(err.message);
        res.status(500).send("server error")
    }
})

app.delete("/mobil/:id", async(req,res) => {
    try{
        const id = req.params.id;
        const deleteUser = await  User.destroy({
            where: {id: id}
        });

        await deleteUser;

        res.json('Berhasil dihapus')
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
})

app.put("/mobil/:id", async (req, res)=> {
    try{
        const {name,is_admin,} = req.body
        const id = req.params.id

        const updateUser = await User.update({
            name,is_admin
        },{where : {id:id} } )

        await updateUser;

        res.json("Berhasil di Update")
    }catch(err){ 
        console.error(err.message);
        res.status(500).send("server error")
    }
})


app.listen(4500, () => console.log("port bejalan di 4500"))
