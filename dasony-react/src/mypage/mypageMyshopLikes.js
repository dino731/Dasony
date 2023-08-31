import React, { useEffect } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import { Link, Outlet } from 'react-router-dom';
import HeartIcon from '../heart';
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';

const MypageMyshopLikes = () => {

  return (

        <div className="myShopLikes-table">

          <h3>내 찜 목록</h3>

          <div className="product-content">

    <table>
        <tr>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>찜 1</div><div>찜 설명 1</div></td>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>찜 2</div><div>찜 설명 2</div></td>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>찜 3</div><div>찜 설명 3</div></td>
        </tr>
        <tr>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>찜 4</div><div>찜 설명 4</div></td>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>찜 5</div><div>찜 설명 5</div></td>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>찜 6</div><div>찜 설명 6</div></td>
        </tr>
        <tr>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>찜 7</div><div>찜 설명 7</div></td>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>찜 8</div><div>찜 설명 8</div></td>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>찜 9</div><div>찜 설명 9</div></td>
        </tr>
    </table>
    </div>

    <button className="gotoshop"><Link to='/Shop'>상점으로</Link></button>

          {/* <div>
            <table>
              <tbody>
                <tr>
                  <td ><img src="image1.jpg" alt="Image 1"/>
                  <HeartIcon/>
                </td>
                   <td><img src="image2.jpg" alt="Image 2"/>
                   <HeartIcon/>
                   </td>
                  <td><img src="image3.jpg" alt="Image 3"/>
                  <HeartIcon/>
                    </td>
                </tr>
                <tr>
                  <td><img src="image4.jpg" alt="Image 4"/>
                  <HeartIcon/>
                    </td>
                  <td><img src="image5.jpg" alt="Image 5"/>
                  <HeartIcon/>
                   </td>
                  <td><img src="image6.jpg" alt="Image 6"/>
                  <HeartIcon/>
                   </td> 
                </tr>
                </tbody>
                </table>
                <button className="gotoshop"><Link to='/Shop'>상점으로</Link></button>
        </div> */}
        </div>

        
     

    
 );}
export default MypageMyshopLikes;
       

