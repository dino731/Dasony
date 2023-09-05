import { useState } from 'react';
import HeartIcon from '../heart';
import { Button } from 'react-bootstrap';
import './share.css';


export const Share = () => {

    const text = '난 내가 말야 스물이 되면 요절할 천재일 줄만 알고 난 내가 말야 모든 게 다 간단하다 믿었지 이제는 딸기맛 해열제같은 이상적인 해결책이 필요해 징그러운 일상에 불을 지르고 어디론가~~ 도망칠까~ '
    const settingText = (text, n) => {
        return text.length>n?text.substring(0, n-1)+'...':text;
    }

    return(
        <div className="share-container">
            <div>나눔게시판<div><Button className="btn btn-primary">확인</Button></div></div>
            <div className="share-content">
                <div className="share-content-box">
                    <table>
                        <tbody>
                            <tr>
                                <th colSpan={2}>userName{" "} <span>2023-10-13 06:30</span></th>
                            </tr>
                            <tr>
                                <td rowSpan={2}>
                                    <div className='share-content-img'><img src='/resources/shop/product/1/001.png'/></div>
                                </td>
                                <td>
                                    <div>
                                        {settingText(text, 100)}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><div><div><i class="bi bi-chat"/>36</div><div><HeartIcon/></div></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="share-content-box">
                    <table>
                        <tbody>
                            <tr>
                                <th colSpan={2}>userName{" "} <span>2023-10-13 06:30</span></th>
                            </tr>
                            <tr>
                                <td rowSpan={2}>
                                    <div className='share-content-img'><img src='/resources/shop/product/1/001.png'/></div>
                                </td>
                                <td>
                                    <div>
                                        {settingText(text, 100)}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><div><div><i class="bi bi-chat"/>36</div><div><HeartIcon/></div></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}