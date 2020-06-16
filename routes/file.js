const router = require('express').Router();
const express = require("express");
const { mongo } = require('mongoose');
const config = require('./../config');
const File = require("./../models/File");

var mongoose = require("mongoose");
const conn = mongoose.createConnection(config.db, { useNewUrlParser: true });

conn.once('open', () => {

});

router.get('/form', function(req, res) {
    conn.collection('files').find().toArray((err, files) => {
    if(!files || files.length === 0){
      return res.status(404).json({
        message: "Could not find files"
      });
    }
    return res.json(files);
}); 
});

router.get('/companyData', (req, res) => {
  conn.collection('files').aggregate().group({ _id: '$company', count: {$sum: 1 }, cost: {$sum: '$salary'} }).toArray((err, files) => {
    if(!files || files.length === 0){
      return res.status(404).json({
        message: "Could not find file"
      });
    }
    return res.json(files.sort((d1, d2) => d2.cost - d1.cost));
  });
});


router.get('/form/:email', (req, res) => {
  conn.collection('files').find({ email: req.params.email }).toArray((err, files) => {
    if(!files || files.length === 0){
      return res.status(404).json({
        message: "Could not find file"
      });
    }
    return res.json(files);
  });
});

router.post('/form', function (req, res) {
    console.log('Req Body: '+req.body);
    console.log('Req Body name: '+req.body.firstName);

    var post = new File({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email,
        address : req.body.address || '',
        company: req.body.company,
        salary : req.body.salary,
        timestamp: req.body.timestamp
    });
    
    conn.collection('files').findOne({ email: req.body.email }, function(err, record){
        if(err){
            console.log(err);
        }
        
        if(record){
            res.json({msg: "duplicate entry"})
        }
        else {
             post.save(function(err, resp){      
                if(err){
                    console.log(err);
                    res.json({msg: "network error"})
                }
                else{
                    res.json({msg: "success"})
                }
            });           
        }
    });

});

module.exports = router
