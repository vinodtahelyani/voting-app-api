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

mongoose.connect('mongodb://test:test@ds113019.mlab.com:13019/voting-system',()=>{
    console.log('connected to db successfully');
})

app.use(bodyParser.json());

app.post('/vote',(req,res)=>{
    if(new Date().getTime() >= new Date('March 13, 2018 02:00:00 GMT+05:30').getTime()){
        res.status(400).send('late');
        return;
    }

    
    var {voterId,partyNo} = req.body;
    const voteSchema = new Schema({
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
    });
    var Vote = mongoose.model('votes',voteSchema);
    var vote = new Vote({
        voterId:voterId,
        partyNo:partyNo,
    });
    vote.save().then((newVote)=>{
        res.status(200).send('ok');
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

app.get('/candis/:id',(req,res)=>{
    var id = req.params.id;
    // todo get secno from id 45/23/de
    User.find({ID:'45/23/de'}).then((voter)=>{
        var token = jwt.sign({ID:voter.ID,name:voter.name},'some secret key').toString();
        User.findOneAndUpdate({ID:id},{$push:{token}}).then((doc)=>{
            Can.find({secNo:78}).then((doc)=>{
                res.header('x-auth',token).send(doc);
            }).catch((e)=>{
                res.status(400).send(e);
            });
        });
    }).catch((e)=>{
        res.status(400).send(); 
    });
});


app.listen(port,()=>{
    console.log(`listening to ${port}`);
});