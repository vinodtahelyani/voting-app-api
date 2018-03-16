var mongoose = require('mongoose');

var can = mongoose.model('candidates',{
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
//sec - 78
// mongoose.connect('mongodb://test:test@ds113019.mlab.com:13019/voting-system',()=>{
//     var can1 = new can({
//         secNo:78,
//         candidates:[
//             {
//                 name:'lorem adipiscing elit',
//                 age:44,
//                 desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo ',
//                 party:'emmet'
//             },
//             {
//                 name:'incididunt ut labo',
//                 age:48,
//                 desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo ',
//                 party:'sed quia consequuntur'
//             },
//             {
//                 name:'eiusmod tempor ',
//                 age:48,
//                 desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo ',
//                 party:'adipiscing'
//             },
//             {
//                 name:'amet, consectetur',
//                 age:48,
//                 desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo ',
//                 party:'incididunt ut labo'
//             },
//         ]
//     });
//     can1.save().then(()=>{
//         console.log('saved');
//     });
// })

var User = mongoose.model('voter',{
    name:{type:String},
    ID:{type:String,unique:true},
    address:{type:String},
    //photo
    DOB:{type:String},
    token:[{type:String}]
});

mongoose.connect('mongodb://test:test@ds113019.mlab.com:13019/voting-system',()=>{
    var user = new User({
        name:'lorem',
        ID:'45/23/de',
        address:'Lorem ipsum dolor sit amet',
        DOB:'45/12/12',
    });
    user.save().then((doc)=>{
        console.log('saved');
        
    }).catch((e)=>{
        console.log(e);
        
    });
});


/*
name:'lorem',
        ID:'45/23/de',
        address:'Lorem ipsum dolor sit amet',
        DOB:'45/12/12',


*/