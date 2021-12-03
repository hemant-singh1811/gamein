const express = require('express')
const firebase = require('firebase')   
const sql_db=require('./db/db')
require("firebase/firestore"); 

const firebaseConfig = {
    apiKey: "AIzaSyAm-Ed41RxIGiEzNmtOoXbCmR_TYiIek1o",
    authDomain: "cart-5593d.firebaseapp.com",
    projectId: "cart-5593d",
    storageBucket: "cart-5593d.appspot.com",
    messagingSenderId: "639308241462",
    appId: "1:639308241462:web:62e3eab1d106ad2823d697"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const app = express();

var db=firebase.firestore();

app.use('/', express.static(__dirname + '/public'))

var all_info;

app.use('/tour',express.static(__dirname+'/page'))

app.get("/tournament", async (req, res) => {
    var all_data; 
    var tour_names=req.query.tourname;
    console.log('tour name : ',tour_names);
    await db.collection('tounaments').get().then((snap) => { 
        all_data = snap;
    }) 
    if(!tour_names){
       var all_info = all_data.docs.map((doc) => {
            let data = doc.data();
            let d1 = { id: doc.id };
            // id = doc.id;
            let merged = { ...data, ...d1 };
            console.log(merged);
            return merged;
        })
        res.send(all_info);
    } 
    else{
          all_info = all_data.docs.map((doc) => {
            let data = doc.data();
            let d1 = { Event_Id: doc.id,
                       Event_Name:data.Event_Name,
                       Event_L_Reg_Date:data.Event_L_Reg_date
                      }   
            return d1;
        })
        console.log(all_info);
        sql_modi(all_info);
        res.send(all_info);
    }
  
})

app.get('/tournament/:name',async(req,res)=>{
    var id=req.params.name;
    var find = await firebase.firestore().collection('tounaments').doc(id).get() // search by key
    console.log('find', find.data());                                            // get the search data
    var data=find.data();
    res.send(data)
})

app.get("/search_tour",async(req,res)=>{
    var search=req.query.search_tour;
 
    sql_db.search(search).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(null)
    })

})

app.get('/all/tournament',async(req,res)=>{
    var all_data; 
    await db.collection('tounaments').get().then((snap) => {

        all_data = snap.docs.map((doc) => {
            let data = doc.data();
            let d1 = { id: doc.id };
            id = doc.id;
            let merged = { ...data, ...d1 };
            return merged;
        })
    }) 
    res.send(all_data);
})

app.get('/add/tour',async(req,res)=>{
   // added to new tournament into firebase
   
   
// method 1 - create new document with random id
db.collection("tounaments").add({
    name: "Tokyo",
    country: "Japan"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})

// method 2 - create new document with specific id
var newId 
// = db.createId();
   newId="dsadadas"
   console.log('new id : ',newId);
db.collection("tounaments").doc(newId).set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
}).then(d=>{
    console.log(d);
    res.send('added')
}).catch(e=>{
    console.log(e);
    res.send('error during added')
})


})

app.listen(9647, () => {
    console.log('server is running at localhost:9647');
})

async function sql_modi(all_info){
    await sql_db.del();
    await sql_db.create();
    await sql_db.insert(all_info);
}