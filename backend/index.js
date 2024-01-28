var express = require('express');
var app = express();
var cors = require('cors');
const { db } = require('./config/admin');

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors());

app.listen(5555, function(){
    console.log('Server is running');
});
//get all item
app.get("/gameshop", async (req,res) => {
    const courseRef = db.collection(`shopdb`);
    try {
        courseRef.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            
            
        }));
        console.log(data);
        return res.status(200).json(data);
    });
    } catch (error) {
        return res
        .status(500)
        .json({message: error});
    }
})
//get by id
app.get("/gameshop/:id", async (req,res) => {
    const ref = db.collection(`shopdb`);
    const id = req.params.id;
    console.log(id);
    try {
        ref.doc(id).get().then((snapshot) => {
            const data = snapshot.data();
            console.log(data);
            res.status(200).json(data);
        });
    } catch (error) {
        return res
        .status(500)
        .json({message: error});
    }
    
})

//add new item
app.post("/gameshop/add", async (req, res) => {
    const ref = db.collection(`shopdb`);
    const data = req.body;
    try {
      ref.add(data);
      res.status(200).json({ message: "added to firebase" });
    } catch (error) {
      res.status(500).json({ general: "Failed" });
    }
  });
  
//update item
app.put("/gameshop/update/:id", async (req, res) => {
    const ref = db.collection(`shopdb`);
    const id = req.params.id;
    console.log(id);
    const data = req.body;
    try {
      ref.doc(id).update(data);
      res.status(200).json({ message: "updated to firebase" });
    } catch (error) {
      res.status(500).json({ general: "Failed" });
    }
  });

  //delete item
  app.delete("/gameshop/delete/:id", async (req, res) => {
    const ref = db.collection(`shopdb`);
    const id = req.params.id;
    try {
      ref.doc(id).delete();
      res.status(200).json({ message: "deleted from firebase" });
    } catch (error) {
      res.status(500).json({ general: "Failed" });
    }
  });
  
//search item by name
app.get("/gameshop/search/:name", async (req, res) => {
    const ref = db.collection(`shopdb`);
    const name = req.params.name;
    console.log(name);
    try {
      ref.where("name", "==", name).get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json({ general: "Something went wrong, please try again" });
    }
  });

//get profile id,username,email ben backend
  app.get("/profile", async (req,res) => {
    const courseRef = db.collection(`users`);
    try {
        courseRef.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            
            
        }));
        console.log(data);
        return res.status(200).json(data);
    });
    } catch (error) {
        return res
        .status(500)
        .json({message: error});
    }
})
  //update profile username, url
  app.put("/profile/:id", async (req, res) => {
    const ref = db.collection(`users`);
    const id = req.params.id;
    console.log(id);
    const data = req.body;
    try {
      ref.doc(id).update(data);
      res.status(200).json({ message: "updated profile" });
    } catch (error) {
      res.status(500).json({ general: "Failed" });
    }
  });

