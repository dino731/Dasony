import $ from 'jquery';
import './game.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../atoms';

const Gamestart = () =>{

const [loginUserInfo, setLoginUserInfo] = useRecoilState(loginUserState);

const Game= ()=>{
    
    alert("질뻑이가 보물상자를 다 먹기전에 질뻑이들을 피해서 먼저 보물상자를 차지하세요!");
    let random = Math.floor(Math.random() * 1);
    
    if(random == 0){
        let map=[
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,4,1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1],
            [1,1,1,0,1,0,1,0,1,0,1,0,1,4,1,1,0,1,4,1],
            [1,0,0,0,0,0,1,2,1,0,0,0,1,1,0,0,0,1,0,1],
            [1,0,1,1,0,1,1,0,1,0,1,0,0,0,0,1,0,1,0,1],
            [1,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,1],
            [1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,3,0,1,0,0,1,2,1,0,1],
            [1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,0,1],
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
            [1,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1],
            [1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,0,1],
            [1,0,0,0,1,4,1,2,1,0,0,0,0,2,0,0,0,4,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];

        function Board() {
            let gameDiv = $("#gameDiv"); // gameDiv 선택
        
            let table = $("<table bgcolor='white' id='gameTable'></table>"); // 테이블 하나 생성
            gameDiv.append(table); // gameDiv에 테이블 추가
        
            for (let i = 0; i < 20; i++) {
                let row = $("<tr></tr>"); // 새로운 행 생성
                table.append(row); // 테이블에 행 추가
        
                for (let j = 0; j < 20; j++) {
                    let cell = $("<td id='x" + i + "y" + j + "' width='30' height='30'></td>");
                    row.append(cell); // 행에 셀 추가
                }
            }
        }
    
        Board();
        
        function ChangeColor(x, y, color) {
            $("#x" + x + "y" + y).css("background-color", color);
        }
        
        function drawmaze() {
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 20; j++){
                    if(map[i][j]==1){
                        ChangeColor(i,j,"#DAD7CD"); //벽
                    }
                    else if(map[i][j]==2){
                        ChangeColor(i,j,"#FFFF48");
                        document.getElementById("x"+i+"y"+j).innerHTML="<img src='/resources/common-img/gameimg/jilbbuk.png' width='30' height='30'>"
                    }
                    else if(map[i][j]==3){                    
                        ChangeColor(i,j,"#90E4FF");
                        document.getElementById("x"+i+"y"+j).innerHTML="<img src='/resources/common-img/gameimg/molang.png' width='30' height='30'>"
                    }
                    else if(map[i][j]==0){
                        ChangeColor(i,j,"white");
                        document.getElementById("x"+i+"y"+j).innerHTML="<img src=''>"
                    }
                    else if(map[i][j]==4){
                        document.getElementById("x"+i+"y"+j).innerHTML="<img src='/resources/common-img/gameimg/bomul.png' width='30' height='30'>"
                    }
                }
            }
        }
        // function erase() {
        //     for (let i = 0; i < 20; i++) {
        //         for (let j = 0; j < 20; j++) {
        //             ChangeColor(i, j, "white");
        //         }
        //     }
        // }
        
        drawmaze();    
        
        let nowX = 10;
        let nowY = 10;
        let life = 3;
        let count = 0;
        let pCount = 0;
        let tCount = 0;
        let pikas = [
           
        ];
        let boxcount = 3;

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] == 2) {
                    pikas.push({ x: i, y: j });
                }
            }
        }
          
    
        
        function inputFunction(key) {
            
           
            document.body.style.overflow = 'hidden';
            

                $("#life").html(life);
        
                if (life == 2) {
                    alert("포인트 획득에 실패하였습니다. 님 개못하네요.");
                    const gameData = {
                        gameStatus: "N",
                        pointStatus: "N",
                        ticketStatus: "N",
                        userNo : loginUserInfo.userNo  
                    };
                    axios.post("/dasony/api/gamefinish",gameData)
                    .then(response=>{
                        console.log(response.data);
                        window.location.reload();
                    });
                    
                }

            switch(key){
                case 38://up
                    map[nowX][nowY]=0;
                    nowX--; 
                    
                    if(map[nowX][nowY]==0){
                        for (let i = 0; i < pikas.length; i++) {
                            let randommove = Math.floor(Math.random()*4);
                            let nowPx = pikas[i].x;
                            let nowPy = pikas[i].y;
                             
                                while(true){
                                switch(randommove){
                                    case 0:  if(map[nowPx-1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx--;
                                       if(map[nowPx][nowPy] == 4 ){
                                           
                                           boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();
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
                                        if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
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
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                           
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
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
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
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
                        alert("질뻑이에게 잡아먹혔습니다! 목숨-1 (현재목숨 :"+life+")");
                    }
                    else if(map[nowX][nowY]==4){
                        let pointorticket= Math.floor(Math.random() * 2);
                        boxcount --;
                        if(pointorticket == 0){
                            alert("50포인트 획득!");
                            count++; 
                            pCount++;
                        }else{
                            alert("응모권 당첨! ")
                            tCount++;
                        }
                       
                        if (boxcount == 0) {
                            
                            if(tCount > 0 && pCount >0){
                                alert("성공! 획득한 포인트 : "+pCount*50+ "포인트"+ "응모권 흭득! 마이페이지에서 확인하세요");
                            const gameData = {
                                gameStatus: "Y",
                                pointStatus: "Y",
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo 
                            };
                            axios.post("/dasony/api/gamefinish",gameData)
                            .then(response=>{
                                console.log(response.data);
                                
                            });
                            const ticektData = {  
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo 
                            };
                            axios.post("/dasony/api/insertTicket",ticektData)
                            .then(response=>{
                                console.log(response.data);
                            });
                            const pointData = {
                                userNo : loginUserInfo.userNo,
                                pointAmount : pCount*50,
                                pointCate : "G"  
                            };
                            axios.post("/dasony/api/insertPoint",pointData).then(response=>{
                                console.log(response.data);
                                window.location.reload();
                            })
                            }else if(tCount>0  ){
                                alert("응모권 흭득! 마이페이지에서 확인하세요");
                            const ticketData = {
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo   
                            };
                            axios.post("/dasony/api/insertTicket",ticketData)
                            .then(response=>{
                                console.log(response.data);
                                
                            });
                            const gameData = {
                                gameStatus: "Y",
                                pointStatus: "N",
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo 
                            };
                            axios.post("/dasony/api/gamefinish",gameData)
                            .then(response=>{
                                console.log(response.data);
                                window.location.reload();
                            });
                            }else if(pCount >0){
                                alert("성공! 획득한 총 포인트 : "+pCount*50+ "포인트");
                                const pointData = {
                                    userNo : loginUserInfo.userNo,
                                    pointAmount : pCount*50,
                                    pointCate : "G"  
                                };
                                axios.post("/dasony/api/insertPoint",pointData).then(response=>{
                                    console.log(response.data);
                                })
                            const gameData = {
                                gameStatus: "Y",
                                pointStatus: "Y",
                                ticketStatus: "N",
                                userNo : loginUserInfo.userNo  
                            };
                            axios.post("/dasony/api/gamefinish",gameData)
                            .then(response=>{
                                console.log(response.data);
                                window.location.reload();
                            });
                            }

                        }

                    }
                    
                    map[nowX][nowY]=3;
                    
                    break;
                case 39://right
                    map[nowX][nowY]=0
                    nowY++;
                    if(map[nowX][nowY]==0){
                        for (let i = 0; i < pikas.length; i++) {
                            let randommove = Math.floor(Math.random()*4);
                            let nowPx = pikas[i].x;
                            let nowPy = pikas[i].y;
                             
                                while(true){

                                
                                switch(randommove){
                                    case 0:  if(map[nowPx-1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx--;
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{ 
                                        randommove = Math.floor(Math.random()*4);
                                        continue;}
                                    break;
                                    case 1: if(map[nowPx+1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx++;
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 2: if(map[nowPx][nowPy-1] != 1){map[nowPx][nowPy] = 0;nowPy--;
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 3: if(map[nowPx][nowPy+1] != 1){map[nowPx][nowPy] = 0;nowPy++;
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
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
                        alert("질뻑이에게 잡아먹혔습니다! 목숨-1 (현재목숨 :"+life+")");
                        
                    }
                    else if(map[nowX][nowY]==4){
                        let pointorticket= Math.floor(Math.random() * 2);
                        boxcount --;
                        if(pointorticket == 0){
                            alert("50포인트 획득!");
                            count++; 
                            pCount++;
                        }else{
                            alert("응모권 당첨! 어떤 응모권인지는 마이페이지에서 확인해주세요~")
                            tCount++;
                        }
                        if (boxcount == 0) {
                            
                            if(tCount > 0 && pCount >0){
                                alert("성공! 획득한 포인트 : "+pCount*50+ "포인트"+ "응모권 흭득! 마이페이지에서 확인하세요");
                            const gameData = {
                                gameStatus: "Y",
                                pointStatus: "Y",
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo 
                            };
                            axios.post("/dasony/api/gamefinish",gameData)
                            .then(response=>{
                                console.log(response.data);
                                
                            });
                            const ticektData = {  
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo 
                            };
                            axios.post("/dasony/api/insertTicket",ticektData)
                            .then(response=>{
                                console.log(response.data);
                            });
                            const pointData = {
                                userNo : loginUserInfo.userNo,
                                pointAmount : pCount*50,
                                pointCate : "G"  
                            };
                            axios.post("/dasony/api/insertPoint",pointData).then(response=>{
                                console.log(response.data);
                                window.location.reload();
                            })
                            }else if(tCount>0){
                                alert("응모권 흭득! 마이페이지에서 확인하세요");
                            const ticketData = {
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo   
                            };
                            axios.post("/dasony/api/insertTicket",ticketData)
                            .then(response=>{
                                console.log(response.data);
                                
                            });
                            const gameData = {
                                gameStatus: "Y",
                                pointStatus: "Y",
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo 
                            };
                            axios.post("/dasony/api/gamefinish",gameData)
                            .then(response=>{
                                console.log(response.data);
                                window.location.reload();
                            });
                            }else if(pCount >0){
                                alert("성공! 획득한 총 포인트 : "+pCount*50+ "포인트");
                                const pointData = {
                                    userNo : loginUserInfo.userNo,
                                    pointAmount : pCount*50,
                                    pointCate : "G"  
                                };
                                axios.post("/dasony/api/insertPoint",pointData).then(response=>{
                                    console.log(response.data);
                                })
                            const gameData = {
                                gameStatus: "Y",
                                pointStatus: "Y",
                                ticketStatus: "N",
                                userNo : loginUserInfo.userNo  
                            };
                            axios.post("/dasony/api/gamefinish",gameData)
                            .then(response=>{
                                console.log(response.data);
                                window.location.reload();
                            });
                            }

                        }

                    }
                    map[nowX][nowY]=3;
                break;
                case 37://left
                    map[nowX][nowY]=0;
                    nowY--;
                    if(map[nowX][nowY]==0){
                        for (let i = 0; i < pikas.length; i++) {
                            let randommove = Math.floor(Math.random()*4);
                            let nowPx = pikas[i].x;
                            let nowPy = pikas[i].y;
                             
                                while(true){
                                switch(randommove){
                                    case 0:  if(map[nowPx-1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx--;
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
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
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 2: if(map[nowPx][nowPy-1] != 1){map[nowPx][nowPy] = 0;nowPy--;
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 3: if(map[nowPx][nowPy+1] != 1){map[nowPx][nowPy] = 0;nowPy++;
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
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
                        alert("질뻑이에게 잡아먹혔습니다! 목숨-1 (현재목숨 :"+life+")");
                        
                    }
                    else if(map[nowX][nowY]==4){
                        let pointorticket= Math.floor(Math.random() * 2);
                        boxcount --;
                        if(pointorticket == 0){
                            alert("50포인트 획득!");
                            count++; 
                            pCount++;
                        }else{
                            alert("응모권 당첨! 어떤 응모권인지는 마이페이지에서 확인해주세요~")
                            tCount++;
                        }
                        if (boxcount == 0) {
                            
                            if(tCount > 0 && pCount >0){
                                alert("성공! 획득한 포인트 : "+pCount*50+ "포인트"+ "응모권 흭득! 마이페이지에서 확인하세요");
                            const gameData = {
                                gameStatus: "Y",
                                pointStatus: "Y",
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo 
                            };
                            axios.post("/dasony/api/gamefinish",gameData)
                            .then(response=>{
                                console.log(response.data);
                                
                            });
                            const ticektData = {  
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo 
                            };
                            axios.post("/dasony/api/insertTicket",ticektData)
                            .then(response=>{
                                console.log(response.data);
                            });
                            const pointData = {
                                userNo : loginUserInfo.userNo,
                                pointAmount : pCount*50,
                                pointCate : "G"  
                            };
                            axios.post("/dasony/api/insertPoint",pointData).then(response=>{
                                console.log(response.data);
                                window.location.reload();
                            })
                            }else if(tCount>0 ){
                                alert("응모권 흭득! 마이페이지에서 확인하세요");
                            const ticketData = {
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo   
                            };
                            axios.post("/dasony/api/insertTicket",ticketData)
                            .then(response=>{
                                console.log(response.data);
                                
                            });
                            const gameData = {
                                gameStatus: "Y",
                                pointStatus: "Y",
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo 
                            };
                            axios.post("/dasony/api/gamefinish",gameData)
                            .then(response=>{
                                console.log(response.data);
                                window.location.reload();
                            });
                            }else if(pCount >0){
                                alert("성공! 획득한 총 포인트 : "+pCount*50+ "포인트");
                                const pointData = {
                                    userNo : loginUserInfo.userNo,
                                    pointAmount : pCount*50,
                                    pointCate : "G"  
                                };
                                axios.post("/dasony/api/insertPoint",pointData).then(response=>{
                                    console.log(response.data);
                                })
                            const gameData = {
                                gameStatus: "Y",
                                pointStatus: "Y",
                                ticketStatus: "N",
                                userNo : loginUserInfo.userNo  
                            };
                            axios.post("/dasony/api/gamefinish",gameData)
                            .then(response=>{
                                console.log(response.data);
                                window.location.reload();
                            });
                            }

                        }

                    }
                    map[nowX][nowY]=3;
                break;
                case 40://down
                    map[nowX][nowY]=0;
                    nowX++;
                    if(map[nowX][nowY]==0){
                        for (let i = 0; i < pikas.length; i++) {
                            let randommove = Math.floor(Math.random()*4);
                            let nowPx = pikas[i].x;
                            let nowPy = pikas[i].y;
                             
                                while(true){
                                switch(randommove){
                                    case 0:  if(map[nowPx-1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx--;
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{ 
                                        randommove = Math.floor(Math.random()*4);
                                        continue;}
                                    break;
                                    case 1: if(map[nowPx+1][nowPy] != 1){map[nowPx][nowPy] = 0;nowPx++;
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                   else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 2: if(map[nowPx][nowPy-1] != 1){map[nowPx][nowPy] = 0;nowPy--;
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
                                                window.location.reload();break;
                                            }
                                        }
                                    }
                                    
                                    else{
                                        randommove = Math.floor(Math.random()*4);
                                        continue;
                                    } break;
                                    case 3: if(map[nowPx][nowPy+1] != 1){map[nowPx][nowPy] = 0;nowPy++;
                                       if(map[nowPx][nowPy] == 4 ){
                                            
                                            boxcount --;
                                            
                                            if(boxcount == 0 ){
                                                alert("질뻑이가 모든 상자를 다먹어치웠습니다!");
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
                        alert("질뻑이에게 잡아먹혔습니다! 목숨-1 (현재목숨 :"+life+")");
                        
                    }
                    else if(map[nowX][nowY]==4){
                        let pointorticket= Math.floor(Math.random() * 2);
                        boxcount --;
                        if(pointorticket == 0){
                            alert("50포인트 획득!");
                            count++; 
                            pCount++;
                        }else{
                            alert("응모권 당첨! 어떤 응모권인지는 마이페이지에서 확인해주세요~")
                            tCount++;
                        }
                        if (boxcount == 0) {
                            
                            if(tCount > 0 && pCount >0){
                                alert("성공! 획득한 포인트 : "+pCount*50+ "포인트"+ "응모권 흭득! 마이페이지에서 확인하세요");
                            const gameData = {
                                gameStatus: "Y",
                                pointStatus: "Y",
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo 
                            };
                            axios.post("/dasony/api/gamefinish",gameData)
                            .then(response=>{
                                console.log(response.data);
                                
                            });
                            const ticektData = {  
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo 
                            };
                            axios.post("/dasony/api/insertTicket",ticektData)
                            .then(response=>{
                                console.log(response.data);
                            });
                            const pointData = {
                                userNo : loginUserInfo.userNo,
                                pointAmount : pCount*50,
                                pointCate : "G"  
                            };
                            axios.post("/dasony/api/insertPoint",pointData).then(response=>{
                                console.log(response.data);
                                window.location.reload();
                            })
                            }else if(tCount>0){
                                alert("응모권 흭득! 마이페이지에서 확인하세요");
                            const ticketData = {
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo   
                            };
                            axios.post("/dasony/api/insertTicket",ticketData)
                            .then(response=>{
                                console.log(response.data);
                                
                            });
                            const gameData = {
                                gameStatus: "Y",
                                pointStatus: "Y",
                                ticketStatus: "Y",
                                userNo: loginUserInfo.userNo 
                            };
                            axios.post("/dasony/api/gamefinish",gameData)
                            .then(response=>{
                                console.log(response.data);
                                window.location.reload();
                            });
                            }else if(pCount >0){
                                alert("성공! 획득한 총 포인트 : "+pCount*50+ "포인트");
                                const pointData = {
                                    userNo : loginUserInfo.userNo,
                                    pointAmount : pCount*50,
                                    pointCate : "G"  
                                };
                                axios.post("/dasony/api/insertPoint",pointData).then(response=>{
                                    console.log(response.data);
                                })
                            const gameData = {
                                gameStatus: "Y",
                                pointStatus: "Y",
                                ticketStatus: "N",
                                userNo : loginUserInfo.userNo  
                            };
                            axios.post("/dasony/api/gamefinish",gameData)
                            .then(response=>{
                                console.log(response.data);
                                window.location.reload();
                            });
                            }

                        }

                    }
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
    return(
        <div><button onClick={Game}>
                시작버튼
            </button></div>
    )
}


export default Gamestart;
