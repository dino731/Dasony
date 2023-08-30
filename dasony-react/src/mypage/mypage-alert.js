<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyPage-alert</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
<link rel="stylesheet" href="mypage.css">
</head>
<body>

    <div class="header">
        
        <div id="main-container"> 
            <ul>
                <li></li>
                <li><span>다소니</span></li>
                <li></li>
                <li><i class="bi bi-house-door"></i> 메인</li>
                <li className="board"><i class="bi bi-clipboard"></i> 게시판</li>
                <li><i class="bi bi-chat-quote"></i> 채팅</li>
                <li className="board"><i class="bi bi-coin"></i> 포인트</li>
                <li className="board"><i class="bi bi-search-heart"></i> 이벤트</li>
                <li className="board"><i class="bi bi-person"></i> 내 정보</li>
                <li><p><i class="bi bi-box-arrow-right"></i> 로그아웃</p></li>
            </ul>
            <br/><br/>
            
        </div>
    </div>

    <div class="main">

        <div class="btn-line">

            <div class="user-levelimg">
                <img src="resources/images/루피.png" alt="" style="width: 40px; height: 40px;">
                <div class="exp-bar">
                    
                </div>
            </div> <!-- user-levelimg !-->

            <div class="button-div">

            <div> <button class="mypage-btn">내 프로필</button> </div>
            <div> <button class="mypage-btn">내 활동</button></div>
            <div> <button class="mypage-btn">나만의 상점</button></div>
            <div> <button class="mypage-btn">기부내역</button></div>
            <div> <button class="mypage-btn">알림</button></div>

            </div> <!-- button-div-->

        </div> <!--btn-line -->

        <div class="alert-table">
             <table>
                <thead>
                    <th>활동 번호</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>작성자</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>구매완료</td>
                        <td>홈런볼 500원</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>구매완료</td>
                        <td>초코송이 500원</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>신고대상 제재 완료</td>
                        <td>미선님 강퇴</td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div> <!-- main -->












</body>
</html>