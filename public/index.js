$(document).ready(function(){
    
    $('#submit').click(function(){
        var id=$('#id').val();
        
        $.ajax({
            type: 'POST',
            url: '/',
            data: JSON.stringify({ID:id}), 
            success: 
            function (data,status) {
                
                if(status =='success'){
                    var list = data.doc[0].candidates;
                    $('.container').html(`<h1>select your candidate</h1><hr><p id="ID">${data.ID}</p>`);
                    for(var i=0;i<list.length;i++){
                        $('.container').append(`<hr><label><input type="radio" name="vote" class="card-inputelement" partyNo=${list[i].partyNo} id=${list[i].canNo}><div><span class="name">${list[i].name}</span><span class="canNo">${list[i].canNo}</span><span class="age">${list[i].partyNo}</span><span class="party">${list[i].party}</span><p class="desc">${list[i].desc}</p></div></label>`);
                    }
                    $('.container').append('<button id="vote">vote</button><script src="./index.js"></script>');
                }
                else{
                $('.container').html('<div id="output"><p>Invalid Credentials</p><a href="/">try again</a><script src="./index.js"></script></div>')                    
                }
            },
            error:function(data,status){
                $('.container').html('<div id="output"><p>Invalid Credentials</p><a href="/">try again</a><script src="./index.js"></script></div>')
            },
            contentType: "application/json",
            dataType: 'json'
        });
    });

    $('#vote').click(function(){
        var ID = $('#ID').text();
        console.log(ID);
        
        var canNo = $('input[name="vote"]:checked').attr('id');
        var partyNo = $('input[name="vote"]:checked').attr('partyNo');
        var vote = JSON.stringify({voterId:ID,partyNo:partyNo,canNo:canNo});
        vote = JSON.stringify({"voterId":ID,"partyNo":partyNo,"canNo":canNo});
        $.ajax({
            type: 'POST',
            url: '/vote',
            data: vote, 
            success: function (data) {
                $('body').html('<div id="output">cool!</div>')
            },
            error: function(e){
                $('body').html('<div id="output"><p>Invalid Credentials</p><a href="/">try again</a><script src="./index.js"></script></div>');
            },
            contentType: "application/json",
            dataType: 'json'
        });
        });
    
});

