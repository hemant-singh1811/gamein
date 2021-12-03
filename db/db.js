const mysql2=require('mysql2')

const connnection=mysql2.createConnection({
    host:'localhost',
    database:'mytestdb',
    user:'myuser',
    password:'mypass'
}) 

function create(){
  return new Promise(function(resolve,reject){
      connnection.query(`CREATE TABLE if not exists GAMEIN ( 
        Event_Name varchar(500) primary key,
        Event_ID varchar(500),
        Event_L_Reg_Date varchar(500)
    );`,function(err,result){
        if(!err)
        resolve("table created successfully")
        else
        reject(err)
    })
  })
}

// create().then((data)=>{
//     console.log(data);
// }).catch((error)=>{
//     console.log(error);
// })

function del(){
    return new Promise(function(resolve,reject){
    connnection.query(`DROP TABLE GAMEIN;;
    `,function(err,result){
        if(!err)
        resolve("table is formated")
        else
        reject(err)
    })
  })
}

// format().then((data)=>{
//         console.log(data);
//     }).catch((error)=>{
//         console.log(error);
//     })

function insert(obj){
  return new Promise(function(resolve,reject){ 
    obj.forEach(obj1 => {
        connnection.query(`INSERT INTO GAMEIN (Event_Name,Event_Id,Event_L_Reg_Date)
        VALUES('${obj1.Event_Name}','${obj1.Event_Id}','${obj1.Event_L_Reg_Date}')`)
    },function(err,res){
        if(err)
        reject(err)
        else 
        resolve('inserted')
    });
  })
}

function search(search_tour){
    let str=search_tour+'%';
  return new Promise(function(resolve,reject){
      connnection.query(`SELECT * FROM GAMEIN WHERE Event_Name LIKE '${str}'`,function(err,result){
          if(err)
          reject('error')
          else resolve(result)
      })
  })
}

module.exports={
    create,del,insert,search
}