const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2')
const bodyParser = require('body-parser');

const koneksi =  require("./db.config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

koneksi.connect(function(err){
    if (err) throw err;
    console.log("Connected !");
}
);


app.get('/user', (req, res) =>{
    let sql = "SELECT * FROM user ORDER BY id desc";
    let query = koneksi.query(sql, function (err, rows, fields){
        if (err) throw err
        res.send(rows);
    })
})

app.post('/user', (req, res) => {
    let data = [
        req.body.nama, 
        req.body.alamat,
    ]
    let sql = `INSERT INTO user VALUES ('', '${data[0]}', '${data[1]}' )`;
    let query = koneksi.query(sql,function (err, rows, fields) {
        if (err) throw err
        res.send('TAMBAH user sukses');
    })
})

app.put('/user', (req, res) => {
    let sql = "UPDATE user SET nama='" + req.body.nama + "', alamat='" + req.body.alamat + "' WHERE id=" + req.body.id;
      let query = koneksi.query(sql, function (err, rows, fields) {
          if (err) throw err
          res.send('EDIT sukses');
      })
  });
  

  app.delete('/user/:id', function (req, res) {
    let sql = "DELETE FROM user WHERE id=" + req.params['id'];
    let query = koneksi.query(sql, function (err, rows, fields) {
         if (err) throw err
         res.send('HAPUS sukses');
     })
 })
 
        
app.listen(port, () => {
        console.log(`Server sudah berjalan di port : ` + port)
    });