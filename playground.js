// var date = new Date();
// var jwt = require('jsonwebtoken');

// console.log(jwt.sign({voterId:'457/dg/23'},'some secret key').toString());

var ID = '457/45/23';

var str = "457/45/23"; 
    var patt1 = /\/\d\d\//g;
    var result = ID.match(patt1);
    var secNo;
    
    var patt1 = /\/\d\d\//g;
    var result = ID.match(patt1);
    secNo = result[0].replace(/\//g,''); 
    secNo = parseInt(secNo);  
    console.log(secNo);


    function (data,status) {
            var list = data[0].candidates;
        $('.container').html('<h1>select your candidate</h1>');
        for(var i=0;i<list.length;i++){
            $('.container').append(`<hr><label><input type="radio" name="vote" class="card-inputelement" id=${list[i].canNo}><div><span class="name">${list[i].name}</span><br><span class="age">${list[i].age}</span><br><span class="party">${list[i].party}</span><br><span class="canNo">${list[i].partyNo}</span><br><p class="desc">${list[i].desc}</p></div></label>`);
        }
        $('.container').append('<button id="vote">vote</button><script src="./index.js"></script>');
        }
    