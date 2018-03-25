$(document).ready(function(){
    
    $('#submit').click(function(){
        var id=$('#id').val();
        
        $.ajax({
            type: 'POST',
            url: '/',
            data: JSON.stringify({ID:id}), 
            success: 

            function (data,status) {
                var list = data.doc[0].candidates;
            $('.container').html(`<h1>select your candidate</h1><hr><p id="ID">${data.ID}</p>`);
            for(var i=0;i<list.length;i++){
                $('.container').append(`<hr><label><input type="radio" name="vote" class="card-inputelement" partyNo=${list[i].partyNo} id=${list[i].canNo}><div><span class="name">${list[i].name}</span><br><span class="age">${list[i].age}</span><br><span class="party">${list[i].party}</span><br><span class="canNo">${list[i].partyNo}</span><br><p class="desc">${list[i].desc}</p></div></label>`);
            }
            $('.container').append('<button id="vote">vote</button><script src="./index.js"></script>');
            },
            contentType: "application/json",
            dataType: 'json'
        });
    });

    $('#vote').click(function(){
        var ID = $('#ID').text();
        var canNo = $('input[name="vote"]:checked').attr('id');
        var partyNo = $('input[name="vote"]:checked').attr('partyNo');
        var vote = JSON.stringify({voterId:ID,partyNo:partyNo,canNo:canNo});
        vote = JSON.stringify({"voterId":"45/23/de","partyNo":45,"canNo":1});
        $.ajax({
            type: 'POST',
            url: '/vote',
            data: vote, 
            success: function (data) {
                $('body').html('cool')
            },
            error: function(e){
                $('body').html(e);
            },
            contentType: "application/json",
            dataType: 'json'
        });
        });
    
});

