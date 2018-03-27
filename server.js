var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();
var port = process.env.PORT || 3001;
var Schema = mongoose.Schema;

var Can = mongoose.model('candidates',{
    secNo:Number,
    candidates:[
        {
            name:{type:String},
            age:{type:Number},
            //photo
            desc:{type:String},
            party:{type:String}
        }
    ]
});

var User = mongoose.model('voter',{
    name:{type:String},
    ID:{type:String,unique:true},
    address:{type:String},
    //photo
    DOB:{type:String},
    token:{type:String}
});


var Vote = mongoose.model('votes',{
    voterId:{
        type:String,
        required:true,
        unique:true,
        minlength:[1,'Invalid voter ID'],
    },
    partyNo:{
        type:Number,
        required:true,
        minlength:[1,'Inavlid Party ID'],
    },
    canNo:{
        type:Number,
        required:true,
        minlength:[1,'Inavlid Party ID'],
    }
});

mongoose.connect('mongodb://test:test@ds113019.mlab.com:13019/voting-system',()=>{
    console.log('connected to db successfully');
});

app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.post('/vote',(req,res)=>{
    // if(new Date().getTime() >= new Date('March 13, 2018 02:00:00 GMT+05:30').getTime()){
    //     res.status(400).send('late');
    //     return;
    // }
    
    
    var {voterId,partyNo,canNo} = req.body;
    
    var vote1 = new Vote({
        voterId:voterId,
        partyNo:partyNo,
        canNo:canNo
    });
    vote1.save().then((newVote)=>{
        
        res.status(200).send({msg:'ok'});
    }).catch((e)=>{
        
        res.status(400).send({error:e});
    });
});

app.get('/dummy',(req,res)=>{
    res.sendFile(__dirname+'/index2.html');
});

app.post('/',(req,res)=>{
    
    var {ID} = req.body;
    var secNo;
    var patt1 = /\/\d\d\//g;
    var result = ID.match(patt1);
    if(result !=null){    
        secNo = result[0].replace(/\//g,''); 
        secNo = parseInt(secNo);
        User.find({ID}).then((voter)=>{
            var token = jwt.sign({ID:voter.ID,name:voter.name},'some secret key').toString();

            User.findOneAndUpdate({ID},{$push:{token}}).then((doc)=>{          
                Can.find({secNo}).then((doc)=>{
                    
                    if(doc.length != 0){               
                    res.header('x-auth',token).status(200).send({ID,doc});
                    }
                    else{
                        res.status(400).send({msg:'Invalid credentials'});
                    }
                }).catch((e)=>{
                    
                    
                    res.status(400).send({msg:'Invalid credentials'});
                });
            });
        }).catch((e)=>{
            res.status(400).send({msg:'Invalid credentials'});           
        });
    }
    else{
        res.status(400).send({msg:'Invalid credentials'});
    }
});

app.listen(port,()=>{
    console.log(`listening to ${port}`);
});