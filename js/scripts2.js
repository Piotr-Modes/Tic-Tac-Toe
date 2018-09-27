var dataManipulation = (function(){
    
    var data = {
        checkedFields:{
            rows:[],
            collumns:[],
            side1:[],
            side2:[]
        },
        win:false,
        tie:false,
        player:1,
        scores:[0,0],
        roundsLeft:9,
        lastRound:false,
        fieldsCheckedInRound:0
    }
    
    Array.prototype.multiIndexOf = function(el){
        var indxs = [];
        for(var i=this.length-1;i>=0;i--){
            if(this[i]===el){
                indxs.unshift(i);
            }
        }
        return indxs;
    }
    
    var splitID = function(ID){
        var idArr = ID.split('-');
        
        return idArr;
    }
    
    return {
        
        data: function(){
            return data;
        },
        checkIfWin: function(row,collumn){
            
            var P = data.player === 1? 1 : 10;
            
            if(data.checkedFields.rows.multiIndexOf(row*P).length===3||
               data.checkedFields.collumns.multiIndexOf(collumn*P).length===3||
               data.checkedFields.side1.multiIndexOf(data.player).length===3||
               data.checkedFields.side2.multiIndexOf(data.player).length===3){
                   
                    data.win = true;
            }  
        },
        checkIfTie: function(){
            
            if(data.fieldsCheckedInRound === 9 && data.win === false){
                data.tie = true;
            }
        },
        checkIfLastRound: function(){
            data.roundsLeft === 0? data.lastRound = true: data.lastRound = false;
        },
        nextPlayer: function(){
            data.player === 1? data.player = 2: data.player = 1;
        },
        loopArray: function(arr,fun){
            for(var i=0;i<arr.length;i++){
                fun(arr[i]);
            }
        },
        pushFieldPositionToData: function(ID,player){
            
            var idArr = splitID(ID);
            var DATA = data.checkedFields; 
            var P = player === 1? 1 : 10;
            
            DATA.rows.push(parseFloat(idArr[1])*P);
            DATA.collumns.push(parseFloat(idArr[2]*P));
            
            if(parseFloat(idArr[1]) === parseFloat(idArr[2])){
                DATA.side1.push(player);
            }
            
            if(idArr.length === 4){
                DATA.side2.push(player);
            }
        },
        splitID: function(ID){
            return splitID(ID);
        },
        updateScore: function(){
            if(!data.tie){
                data.scores[data.player-1]++;
            }
            console.log(data.scores[data.player-1]);
        },
        resetRoundData: function(){
           // change to a function clear array
            var D = data;
            var Dc = D.checkedFields;
            Dc.rows=[];
            Dc.collumns=[];
            Dc.side1=[];
            Dc.side2=[];
                
            D.win=false;
            D.tie=false;
            D.fieldsCheckedInRound=0;
        },
        resetGameData: function(){
            var D = data;
            D.player=1;
            D.scores=[0,0];
            D.roundsLeft=9;
    }
            
    }
})();



var UIcontroller = (function(){
    
    var fields = document.querySelectorAll(".field");
    
    var changeFieldBackground = function(event,player){
    event.target.style.background = "url(img/player"+player+".png)";
    }
    
    var resetBackground = function(x){
    x.style.background = 'white';
    }
    
    var visibilityHide = function(id){
    
    id.style.visibility = "hidden";
    id.style.opacity = "0";
    }

    var visible = function(id){
        id.style.visibility = "visible";
        id.style.opacity = "1";
    }
    
    var toggleFontSize = function(smallFont,bigFont,letterSpacing,ID){
        if(x.fontSize=== smallFont+"px"){
            ID.style.fontSize= bigFont+"px";
            ID.style.letterSpacing= letterSpacing+"px";
        }else{
            ID.style.fontSize= smallFont+"px";
            ID.style.letterSpacing= "0px";
        }
    }
    return {
        displayGameResult: function(score1,score2){
            var txt;
            
            if (score1>score2){txt='<em>player1</em> wins!<br><span class="play-again new">p<em class="new">l</em><em class="green new">a</em><em class="new">y </em>a<em class="new">g</em><em class="green new">a</em>i<em class="new">n</em></span>';
            }else if (score1<score2){txt='<em>player2</em> wins!<br><span class="play-again new">p<em class="new">l</em><em class="green new">a</em><em class="new">y </em>a<em class="new">g</em><em class="green new">a</em>i<em class="new">n</em></span>';
            }else if (score1===score2){txt='it\'s a tie!<br><span class="play-again new">p<em class="new">l</em><em class="green new">a</em><em class="new">y </em>a<em class="new">g</em><em class="green new">a</em>i<em class="new">n</em></span>';}

            //in controlle? no invoking in other moduls
            
            document.querySelector(".game-wrap .results").innerHTML = txt;
            
            visibilityHide(document.querySelector(".game-wrap .in-play"));
            visible(document.querySelector(".game-wrap .results"));
        },
        displayInGame: function(){
            visibilityHide(document.querySelector(".game-wrap .results"));
            visible(document.querySelector(".game-wrap .in-play"));  
        },
        changeFieldBackground: function(event,player){
            event.target.style.background = "url(img/player"+player+".png)";
        },
        clearFieldBackground: function(el){
            el.style.background = 'white';
        },
        getFieldsId: function(event){
            var ID = event.target.id;
            return ID;
        },
        showTie: function(){
            document.querySelector('.p1 p').innerHTML = 'tie';
            document.querySelector('.p2 p').innerHTML = 'tie';
        },
        showWinner: function(player){
            document.querySelector('.p'+player+' p').innerHTML = 'winner!';
        },
        showPlayer: function(){
            document.querySelector('.p1 p').innerHTML = 'player1';
            document.querySelector('.p2 p').innerHTML = 'player2';
        },
        publicFields: function(){
            return fields;
        },
        updateScore: function(player,tie){
            if(!tie){
                var txt;
                player === 1? txt = 'o': txt = 'x';
                document.querySelector('.small-'+player).innerHTML += txt;
            }
        },
        restScore: function(){
            document.querySelector('.small-1').innerHTML = '';
            document.querySelector('.small-2').innerHTML = '';
        },
        updateRoundCounter: function(roundsLeft){
            document.querySelector('.counter').innerHTML = roundsLeft;
        },
        toggleFontSize: function(id,smallFont,bigFont,letterSpacing){
            
            var x = document.querySelector(id).style;
            if(x.fontSize===smallFont+'px'){
                x.fontSize=bigFont+'px';
                x.letterSpacing=letterSpacing+'px';
            }else{
                x.fontSize=smallFont+'px';
                x.letterSpacing="0px";
            }
        }
        
    }
})();



var Controller = (function(UI,DATA){
    
    var D;
    
    var addEvent = function(el){
        el.addEventListener('click',playerClicked);
    }
    
    var removeEvent = function(el){
        el.removeEventListener('click',playerClicked);
    }
    
    var nextRound = function(){
        
        UI.updateScore(D.player,D.tie);
        
        DATA.resetRoundData();
       
        //DATA.loopArray(fields,addEvent);
        DATA.loopArray(UI.publicFields(),addEvent);
        //change player
        DATA.nextPlayer();
        //reset backgrouns
        DATA.loopArray(UI.publicFields(),UI.clearFieldBackground);
        //change winner to player
        UI.showPlayer();
        //roundsLeft ++
        DATA.data().roundsLeft--;
        //update UI roundCounter
        UI.updateRoundCounter(D.roundsLeft);
    }
    var endOfGame = function(){
        
        var D = DATA.data();
        
        UI.displayGameResult(D.scores[0],D.scores[1]);
    }
    
    
     
    var playerClicked = function(event){
        
        var ID,row,collumn,idArr;
        
        ID = UI.getFieldsId(event);
        D = DATA.data();
        idArr = DATA.splitID(ID);
        row = parseFloat(idArr[1]);
        collumn = parseFloat(idArr[2]);
        
        UI.changeFieldBackground(event,D.player);
        
        removeEvent(event.target);
        
        D.fieldsCheckedInRound++;
        
        DATA.pushFieldPositionToData(ID,D.player);
        
        DATA.checkIfWin(row,collumn);
           
        DATA.checkIfTie();
           
        DATA.checkIfLastRound();
        
        /*if(!D.lastRound){
            DATA.nextPlayer();
        }*/
        
        if(D.lastRound===true&&D.tie===true){
            UI.showTie(D.player);
            setTimeout(endOfGame,2000);
            return
        }
        
        if(D.lastRound===true&&D.win===true){
            DATA.updateScore();
            UI.showWinner(D.player);
            setTimeout(endOfGame,2000);
            return
        }
        
        if(D.tie===true){
            UI.showTie(D.player);
            setTimeout(nextRound,2000);
            return
        }
        
        if(D.win===true){
            DATA.loopArray(UI.publicFields(),removeEvent);
            DATA.updateScore();
            UI.showWinner(D.player);
            setTimeout(nextRound,2000);
            return
        }
        
        DATA.nextPlayer();
    }
    
    var newGame = function(){
        console.log('newGame');
        //clean data
        DATA.resetRoundData();
        
        DATA.resetGameData();
        //DATA.loopArray(fields,addEvent);
        DATA.loopArray(UI.publicFields(),addEvent);
        //reset background
        DATA.loopArray(UI.publicFields(),UI.clearFieldBackground);
        //reset UI score
        UI.restScore();
        
        UI.showPlayer();
        
        UI.updateRoundCounter(DATA.data().roundsLeft);
        
        UI.displayInGame();
        
    }
    
    setInterval(function(){UI.toggleFontSize(".p"+DATA.data().player,'27','27.5','0.5');},400);
    
    setInterval(function(){UI.toggleFontSize(".play-again",'30','33.5','1.5');},400);
    
    var setEventListeners = function(){
        
        var fields = UI.publicFields();        

        DATA.loopArray(fields,addEvent);
        
        document.querySelector('.new-game').addEventListener('click',newGame);
        
        document.querySelector('.game-wrap').addEventListener('click',function(event){
    
            if(event.target.classList.contains('new')){
                newGame();
            }
        });
    }
    
    
    setEventListeners();
    
    
    var init = function(){
        
    }
    
    
   
    
})(UIcontroller,dataManipulation);


















/*data.checkedFieldsInRound++;

event.target.removeEventListener('click',f1);*/
// change img names in img folder



/*changeFieldBackground(event){
    event.target.style.background = "url(img/player"+player+".png)";
}*/
//add position to data.rows,data.collumns

//data.checkIfWin() method

//data.checkIfTie() method:
//if no win && last data.checkedFieldsInRound === 9
    //data.tie = true

//data.checkIfLastRound() method:
    //if data.roundsLeft === 0;
        //lastRound = true




//if !win && if not last round && tie===false
    //return data.nextPlayer()



//if win && data.checkedFieldsInRound === 9 && last round
    //
