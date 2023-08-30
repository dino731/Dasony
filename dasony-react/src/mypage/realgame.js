import $ from 'jquery';
import './game.css';
export function gamestart(){
    
    alert("피카츄가 보물상자를 다 먹기전에 피카츄들을 피해서 먼저 보물상자를 차지하세요!");
    var random = Math.floor(Math.random() * 2);
    
    if(random == 0){
        var map=[
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,4,1,0,0,0,0,0,0,0,0,2,0,1],
            [1,0,1,1,1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,1,0,1],
            [1,2,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1],
            [1,1,1,0,1,0,1,0,1,0,1,0,1,4,1,1,0,1,4,1],
            [1,0,0,0,0,0,1,2,1,0,0,0,1,1,0,0,0,1,0,1],
            [1,0,1,1,0,1,1,0,1,0,1,0,0,0,0,1,0,1,0,1],
            [1,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,1],
            [1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,3,0,1,0,0,1,2,1,0,1],
            [1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,2,1,0,1,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,0,1],
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,1],
            [1,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1],
            [1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1],
            [1,2,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,0,1],
            [1,0,0,0,1,4,1,2,1,0,0,0,0,2,0,0,0,4,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        function Board() {
            for (var i = 0; i < 20; i++) {
                $("body").append("<table bgcolor='white'><tr>");
                for (var j = 0; j < 20; j++) {
                    $("table:last").append("<td id='x" + i + "y" + j + "' width='15' height='20'></td>");
                }
                $("table:last").append("</tr></table>");
            }
        }
    
        Board();
        
        function ChangeColor(x, y, color) {
            $("#x" + x + "y" + y).css("background-color", color);
        }
        
        function drawmaze() {
            for (var i = 0; i < 20; i++) {
                for (var j = 0; j < 20; j++){
                    if(map[i][j]==1){
                        ChangeColor(i,j,"#DAD7CD"); //벽
                    }
                    else if(map[i][j]==2){
                        ChangeColor(i,j,"#FFFF48");
                        document.getElementById("x"+i+"y"+j).innerHTML="<img src='resources/images/피카츄.jpg' width='30' height='25'>"
                    }
                    else if(map[i][j]==3){                    
                        ChangeColor(i,j,"#90E4FF");
                        document.getElementById("x"+i+"y"+j).innerHTML="<img src='resources/images/꼬부기.jpg' width='30' height='25'>"
                    }
                    else if(map[i][j]==0){
                        ChangeColor(i,j,"white");
                        document.getElementById("x"+i+"y"+j).innerHTML="<img src=''>"
                    }
                    else if(map[i][j]==4){
                        document.getElementById("x"+i+"y"+j).innerHTML="<img src='resources/images/보물상자.jpg' width='30' height='25'>"
                    }
                }
            }
        }
        // function erase() {
        //     for (var i = 0; i < 20; i++) {
        //         for (var j = 0; j < 20; j++) {
        //             ChangeColor(i, j, "white");
        //         }
        //     }
        // }
        
        drawmaze();    
        
        var nowX = 10;
        var nowY = 10;
        var life = 3;
        var count = 0;
        var pikas = [
           
        ];
        var boxcount = 0;

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] == 2) {
                    pikas.push({ x: i, y: j });
                }
            }
        }
          
    
        
        function inputFunction(key) {
            
                $("#life").html(life);
        
                if (life == 0) {
                    alert("포인트 획득에 실패하였습니다. 님 개못하네요.");
                    window.location.reload();
                }
                if (count == 5) {
                    alert("성공! 획득한 총 포인트 : 300 포인트");
                    window.location.href = "https://search.naver.com/search.naver?where=image&sm=tab_jum&query=%EC%B6%95%ED%95%98%ED%95%A9%EB%8B%88%EB%8B%A4";
                }

            switch(key){
                case 38://up
                    map[nowX][nowY]=0;
                    nowX--; 
                    
                    if(map[nowX][nowY]==0){
                        for (var i = 0; i < pikas.length; i++) {
                            var randommove = Math.floor(Math.random()*4);
                            var nowPx = pikas[i].x;
                            var nowPy = pikas[i].y;
                             
                                while(true){
                                switch(randommove){
                                    case 0:  if(map[nowPx-1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            } 
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                                break;
                                            }
                                        }
                                    }

                                    
                                    else{ 
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    }
                                    
                                    break;
                                    case 1: if(map[nowPx+1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                                break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    }
                                     break;
                                    case 2: if(map[nowPx][nowPy-1] != 1){map[nowPx][nowPy] = 0;nowPy--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                           
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                                break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    }
                                     break;
                                    case 3: if(map[nowPx][nowPy+1] != 1){map[nowPx][nowPy] = 0;nowPy++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                                break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    }
                                     break;
                                    default : 
                                    break;
                                }
                            
                                
                                    pikas[i].x = nowPx
                                    pikas[i].y = nowPy;
    
                                    

                                        map[pikas[i].x][pikas[i].y] = 2;
                                break;
                                    }    
                                    
                                
                            
                        }
                    }           
                    if(map[nowX][nowY]==1){
                        nowX++;
                    }
                    if(map[nowX][nowY]==2&&life!=0){
                        life--;
                        pikas = pikas.filter( pika => !(pika.x == nowX && pika.y == nowY));
                        alert("피카츄에게 잡아먹혔습니다! 목숨-1 (현재목숨 :"+life+")");
                    }
                    else if(map[nowX][nowY]==4){
                        alert("100포인트 획득!");
                        count++;
                    }
                    
                    map[nowX][nowY]=3;
                    
                    break;
                case 39://right
                    map[nowX][nowY]=0
                    nowY++;
                    if(map[nowX][nowY]==0){
                        for (var i = 0; i < pikas.length; i++) {
                            var randommove = Math.floor(Math.random()*4);
                            var nowPx = pikas[i].x;
                            var nowPy = pikas[i].y;
                             
                                while(true){

                                
                                switch(randommove){
                                    case 0:  if(map[nowPx-1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{ 
                                        randommove = Math.floor(Math.random()*4);
                                        continue;}
                                    break;
                                    case 1: if(map[nowPx+1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 2: if(map[nowPx][nowPy-1] != 1){map[nowPx][nowPy] = 0;nowPy--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 3: if(map[nowPx][nowPy+1] != 1){map[nowPx][nowPy] = 0;nowPy++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    default : break;
                                }
                                    
                                    pikas[i].x = nowPx
                                    pikas[i].y = nowPy;
    
                                    

                                        map[pikas[i].x][pikas[i].y] = 2;
                                   
                                        
                                    
                                        break;
                                    }   
                            
                        }
                    }   
                    if(map[nowX][nowY]==1){
                        nowY--;
                    }
                    else if(map[nowX][nowY]==2&&life!=0){
                        life--;
                        pikas = pikas.filter( pika => !(pika.x == nowX && pika.y == nowY));
                        alert("피카츄에게 잡아먹혔습니다! 목숨-1 (현재목숨 :"+life+")");
                        
                    }
                    else if(map[nowX][nowY]==4){
                        alert("100포인트 획득!");
                        count++;
                    }
                    map[nowX][nowY]=3;
                break;
                case 37://left
                    map[nowX][nowY]=0;
                    nowY--;
                    if(map[nowX][nowY]==0){
                        for (var i = 0; i < pikas.length; i++) {
                            var randommove = Math.floor(Math.random()*4);
                            var nowPx = pikas[i].x;
                            var nowPy = pikas[i].y;
                             
                                while(true){
                                switch(randommove){
                                    case 0:  if(map[nowPx-1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();
                                                break;
                                            }
                                        }
                                    }
                                    
                                    else{ 
                                        randommove = Math.floor(Math.random()*4);
                                        continue;}
                                    break;
                                    case 1: if(map[nowPx+1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 2: if(map[nowPx][nowPy-1] != 1){map[nowPx][nowPy] = 0;nowPy--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 3: if(map[nowPx][nowPy+1] != 1){map[nowPx][nowPy] = 0;nowPy++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    default : break;
                                }
                                    
                                    pikas[i].x = nowPx
                                    pikas[i].y = nowPy;
    
                                    

                                        map[pikas[i].x][pikas[i].y] = 2;
                             break;      
                            }
                                    
                                
                            
                        }
                    }   
                    if(map[nowX][nowY]==1){
                        nowY++;
                    }
                    else if(map[nowX][nowY]==2&&life!=0){
                        life--;
                        pikas = pikas.filter( pika => !(pika.x == nowX && pika.y == nowY));
                        alert("피카츄에게 잡아먹혔습니다! 목숨-1 (현재목숨 :"+life+")");
                        
                    }
                    else if(map[nowX][nowY]==4){
                        alert("100포인트 획득!");
                        count++;
                    }
                    map[nowX][nowY]=3;
                break;
                case 40://down
                    map[nowX][nowY]=0;
                    nowX++;
                    if(map[nowX][nowY]==0){
                        for (var i = 0; i < pikas.length; i++) {
                            var randommove = Math.floor(Math.random()*4);
                            var nowPx = pikas[i].x;
                            var nowPy = pikas[i].y;
                             
                                while(true){
                                switch(randommove){
                                    case 0:  if(map[nowPx-1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{ 
                                        randommove = Math.floor(Math.random()*4);
                                        continue;}
                                    break;
                                    case 1: if(map[nowPx+1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                   else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 2: if(map[nowPx][nowPy-1] != 1){map[nowPx][nowPy] = 0;nowPy--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 3: if(map[nowPx][nowPy+1] != 1){map[nowPx][nowPy] = 0;nowPy++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    default : break;
                                }
                                    
                                    pikas[i].x = nowPx
                                    pikas[i].y = nowPy;
    
                                    

                                        map[pikas[i].x][pikas[i].y] = 2;
                                   break;
                            }
                                        
                                    
                                
                            
                        }
                    }   
                    if(map[nowX][nowY]==1){
                        nowX--;
                    }
                    else if(map[nowX][nowY]==2&&life!=0){
                        life--;
                        pikas = pikas.filter( pika => !(pika.x == nowX && pika.y == nowY));
                        alert("피카츄에게 잡아먹혔습니다! 목숨-1 (현재목숨 :"+life+")");
                        
                    }
                    else if(map[nowX][nowY]==4){
                        alert("100포인트 획득!");
                        count++;
                    }
                    map[nowX][nowY]=3;
                break;
            }   
    
            
            // erase();
            drawmaze();
            
        };
        
       
        $(document).keydown(function(event) {
            inputFunction(event.which);
        });
    }else{
        var map=[
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,4,1,0,0,0,0,0,0,0,0,2,0,1],
            [1,0,1,1,1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,1,0,1],
            [1,2,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1],
            [1,1,1,0,1,0,1,0,1,0,1,0,1,4,1,1,0,1,4,1],
            [1,0,0,0,0,0,1,2,1,0,0,0,1,1,0,0,0,1,0,1],
            [1,0,1,1,0,1,1,0,1,0,1,0,0,0,0,1,0,1,0,1],
            [1,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,1],
            [1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,3,0,1,0,0,1,2,1,0,1],
            [1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,2,1,0,1,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,0,1],
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,1],
            [1,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1],
            [1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1],
            [1,2,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,0,1],
            [1,0,0,0,1,4,1,2,1,0,0,0,0,2,0,0,0,4,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        function Board() {
            for (var i = 0; i < 20; i++) {
                $("body").append("<table bgcolor='white'><tr>");
                for (var j = 0; j < 20; j++) {
                    $("table:last").append("<td id='x" + i + "y" + j + "' width='15' height='20'></td>");
                }
                $("table:last").append("</tr></table>");
            }
        }
    
        Board();
        
        function ChangeColor(x, y, color) {
            $("#x" + x + "y" + y).css("background-color", color);
        }
        
        function drawmaze() {
            for (var i = 0; i < 20; i++) {
                for (var j = 0; j < 20; j++){
                    if(map[i][j]==1){
                        ChangeColor(i,j,"#DAD7CD"); //벽돌
                    }
                    else if(map[i][j]==2){
                        ChangeColor(i,j,"#FFFF48");
                        document.getElementById("x"+i+"y"+j).innerHTML="<img src='resources/images/피카츄.jpg' width='30' height='25'>"
                    }
                    else if(map[i][j]==3){                    
                        ChangeColor(i,j,"#90E4FF");
                        document.getElementById("x"+i+"y"+j).innerHTML="<img src='resources/images/꼬부기.jpg' width='30' height='25'>"
                    }
                    else if(map[i][j]==0){
                        ChangeColor(i,j,"white");
                        document.getElementById("x"+i+"y"+j).innerHTML="<img src=''>"
                    }
                    else if(map[i][j]==4){
                        document.getElementById("x"+i+"y"+j).innerHTML="<img src='resources/images/보물상자.jpg' width='30' height='25'>"
                    }
                }
            }
        }
        // function erase() {
        //     for (var i = 0; i < 20; i++) {
        //         for (var j = 0; j < 20; j++) {
        //             ChangeColor(i, j, "white");
        //         }
        //     }
        // }
        
        drawmaze();    
        
        var nowX = 10;
        var nowY = 10;
        var life = 3;
        var count = 0;
        var pikas = [
           
        ];
        var boxcount = 0;

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] == 2) {
                    pikas.push({ x: i, y: j });
                }
            }
        }
          
    
        
        function inputFunction(key) {
            
                $("#life").html(life);
        
                if (life == 0) {
                    alert("포인트 획득에 실패하였습니다. 님 개못하네요.");
                    window.location.reload();
                }
                if (count == 5) {
                    alert("성공! 획득한 총 포인트 : 300 포인트");
                    window.location.href = "https://search.naver.com/search.naver?where=image&sm=tab_jum&query=%EC%B6%95%ED%95%98%ED%95%A9%EB%8B%88%EB%8B%A4";
                }

            switch(key){
                case 38://up
                    map[nowX][nowY]=0;
                    nowX--; 
                    
                    if(map[nowX][nowY]==0){
                        for (var i = 0; i < pikas.length; i++) {
                            var randommove = Math.floor(Math.random()*4);
                            var nowPx = pikas[i].x;
                            var nowPy = pikas[i].y;
                             
                                while(true){
                                switch(randommove){
                                    case 0:  if(map[nowPx-1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            } 
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                                
                                            }
                                        }
                                    }

                                    
                                    else{ 
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    }
                                    
                                    break;
                                    case 1: if(map[nowPx+1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    }
                                     break;
                                    case 2: if(map[nowPx][nowPy-1] != 1){map[nowPx][nowPy] = 0;nowPy--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                           
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    }
                                     break;
                                    case 3: if(map[nowPx][nowPy+1] != 1){map[nowPx][nowPy] = 0;nowPy++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    }
                                     break;
                                    default : 
                                    break;
                                }
                            
                                
                                    pikas[i].x = nowPx
                                    pikas[i].y = nowPy;
    
                                    

                                        map[pikas[i].x][pikas[i].y] = 2;
                                break;
                                    }    
                                    
                                
                            
                        }
                    }           
                    if(map[nowX][nowY]==1){
                        nowX++;
                    }
                    if(map[nowX][nowY]==2&&life!=0){
                        life--;
                        pikas = pikas.filter( pika => !(pika.x == nowX && pika.y == nowY));
                        alert("피카츄에게 잡아먹혔습니다! 목숨-1 (현재목숨 :"+life+")");
                    }
                    else if(map[nowX][nowY]==4){
                        alert("100포인트 획득!");
                        count++;
                    }
                    
                    map[nowX][nowY]=3;
                    
                    break;
                case 39://right
                    map[nowX][nowY]=0
                    nowY++;
                    if(map[nowX][nowY]==0){
                        for (var i = 0; i < pikas.length; i++) {
                            var randommove = Math.floor(Math.random()*4);
                            var nowPx = pikas[i].x;
                            var nowPy = pikas[i].y;
                             
                                while(true){

                                
                                switch(randommove){
                                    case 0:  if(map[nowPx-1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{ 
                                        randommove = Math.floor(Math.random()*4);
                                        continue;}
                                    break;
                                    case 1: if(map[nowPx+1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 2: if(map[nowPx][nowPy-1] != 1){map[nowPx][nowPy] = 0;nowPy--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 3: if(map[nowPx][nowPy+1] != 1){map[nowPx][nowPy] = 0;nowPy++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    default : break;
                                }
                                    
                                    pikas[i].x = nowPx
                                    pikas[i].y = nowPy;
    
                                    

                                        map[pikas[i].x][pikas[i].y] = 2;
                                   
                                        
                                    
                                        break;
                                    }   
                            
                        }
                    }   
                    if(map[nowX][nowY]==1){
                        nowY--;
                    }
                    else if(map[nowX][nowY]==2&&life!=0){
                        life--;
                        pikas = pikas.filter( pika => !(pika.x == nowX && pika.y == nowY));
                        alert("피카츄에게 잡아먹혔습니다! 목숨-1 (현재목숨 :"+life+")");
                        
                    }
                    else if(map[nowX][nowY]==4){
                        alert("100포인트 획득!");
                        count++;
                    }
                    map[nowX][nowY]=3;
                break;
                case 37://left
                    map[nowX][nowY]=0;
                    nowY--;
                    if(map[nowX][nowY]==0){
                        for (var i = 0; i < pikas.length; i++) {
                            var randommove = Math.floor(Math.random()*4);
                            var nowPx = pikas[i].x;
                            var nowPy = pikas[i].y;
                             
                                while(true){
                                switch(randommove){
                                    case 0:  if(map[nowPx-1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{ 
                                        randommove = Math.floor(Math.random()*4);
                                        continue;}
                                    break;
                                    case 1: if(map[nowPx+1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 2: if(map[nowPx][nowPy-1] != 1){map[nowPx][nowPy] = 0;nowPy--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 3: if(map[nowPx][nowPy+1] != 1){map[nowPx][nowPy] = 0;nowPy++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    default : break;
                                }
                                    
                                    pikas[i].x = nowPx
                                    pikas[i].y = nowPy;
    
                                    

                                        map[pikas[i].x][pikas[i].y] = 2;
                             break;      
                            }
                                    
                                
                            
                        }
                    }   
                    if(map[nowX][nowY]==1){
                        nowY++;
                    }
                    else if(map[nowX][nowY]==2&&life!=0){
                        life--;
                        pikas = pikas.filter( pika => !(pika.x == nowX && pika.y == nowY));
                        alert("피카츄에게 잡아먹혔습니다! 목숨-1 (현재목숨 :"+life+")");
                        
                    }
                    else if(map[nowX][nowY]==4){
                        alert("100포인트 획득!");
                        count++;
                    }
                    map[nowX][nowY]=3;
                break;
                case 40://down
                    map[nowX][nowY]=0;
                    nowX++;
                    if(map[nowX][nowY]==0){
                        for (var i = 0; i < pikas.length; i++) {
                            var randommove = Math.floor(Math.random()*4);
                            var nowPx = pikas[i].x;
                            var nowPy = pikas[i].y;
                             
                                while(true){
                                switch(randommove){
                                    case 0:  if(map[nowPx-1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{ 
                                        randommove = Math.floor(Math.random()*4);
                                        continue;}
                                    break;
                                    case 1: if(map[nowPx+1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                   else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 2: if(map[nowPx][nowPy-1] != 1){map[nowPx][nowPy] = 0;nowPy--;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 3: if(map[nowPx][nowPy+1] != 1){map[nowPx][nowPy] = 0;nowPy++;
                                        if(map[nowPx][nowPy] == 4 || map[nowPx-1][nowPy] == 2 || map[nowPx-1][nowPy] == 0){
                                            boxcount = 0;
                                            for (let i = 0; i < map.length; i++) {
                                                for (let j = 0; j < map[i].length; j++) {
                                                    if (map[i][j] == 4) {
                                                        boxcount ++;
                                                    }
                                                }
                                            }
                                            
                                            if(boxcount == 0 ){
                                                alert("피카츄가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    default : break;
                                }
                                    
                                    pikas[i].x = nowPx
                                    pikas[i].y = nowPy;
    
                                    

                                        map[pikas[i].x][pikas[i].y] = 2;
                                   break;
                            }
                                        
                                    
                                
                            
                        }
                    }   
                    if(map[nowX][nowY]==1){
                        nowX--;
                    }
                    else if(map[nowX][nowY]==2&&life!=0){
                        life--;
                        pikas = pikas.filter( pika => !(pika.x == nowX && pika.y == nowY));
                        alert("피카츄에게 잡아먹혔습니다! 목숨-1 (현재목숨 :"+life+")");
                        
                    }
                    else if(map[nowX][nowY]==4){
                        alert("100포인트 획득!");
                        count++;
                    }
                    map[nowX][nowY]=3;
                break;
            }   
    
            
            // erase();
            drawmaze();
            
        };
        
       
        $(document).keydown(function(event) {
            inputFunction(event.which);
        });
}

}

