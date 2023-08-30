import { useState, useEffect } from 'react';
import './DonaList.css';
import { useDonaData } from './DonaDataContext';

const DonaList = () => {

    const {donalist} = useDonaData();

    const handlemydona = () => {
        window.location.href = '/donatotal';
    }

    const handeldetail = (id) => {
        const donaInfo = donalist.find(dona => dona.id === id);
        localStorage.setItem("donaInfo", JSON.stringify(donaInfo));

        window.location.href = `/donadetail/${id}`;
    }

    // const donalist =[
    //     {id : 1, title : '기부해주세요1', dona : '초록 어린이 우산 재단', createdate : '2023-03-22'},
    //     {id : 2, title : '도와주세요', dona : '노인복지단체', createdate : '2023-03-25'},
    //     {id : 3, title : '기부해주세요2', dona : '어린이 보호 재단', createdate : '2023-03-27'},
    //     {id : 4, title : '기부해주세요3', dona : '해피빈', createdate : '2023-03-28'}
    // ];

    return(
        <div id="donalistcontent">
            <div id='block-content'>
                <div id="dolistbtn">
                   <button type='button' id='dona_btn' onClick={handlemydona} style={{ fontFamily: 'HakgyoansimWoojuR' }}>나의 기부 내역</button>
                </div>
                <div className="donation_list">
                    <table id='donalistthead'>
                        <thead>
                            <tr>
                                <th width="100">글번호</th>
                                <th width="500">제목</th>
                                <th width="300">모금단체</th>
                                <th width="200">작성일</th>
                            </tr>
                        </thead>
                    </table>
                    <div id='scrolldona'>
                        <table id='donalisttbody'>
                            <tbody style={{height: '100%'}}>
                                {
                                    <div>
                                        {donalist.map((dona) => {
                                            return <tr key={dona.id} onClick={() => handeldetail(dona.id)}>
                                                <td width="100">{dona.id}</td>
                                                <td width="580">{dona.title}</td>
                                                <td width="330">{dona.dona}</td>
                                                <td width="240">{dona.createdate}</td>
                                                </tr>
                                        })}
                                    </div>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DonaList