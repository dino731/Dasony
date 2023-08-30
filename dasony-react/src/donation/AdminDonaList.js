import { useState } from 'react';
import './AdminDonaList.css';

const AdminDonaList = () => {

    const [adDonaList, setAdDonaList] = useState([
        {id : 1, title : '독립유공자 후손들에게 도움을 주세요', dona : '노인종합복지회관', createdate : '2022-03-20', enddate : '2022-09-19', mony : '222,222다손'},
        {id : 2, title : '독립유공자 후손들에게 도움을 주세요', dona : '노인종합복지회관', createdate : '2022-03-20', enddate : '2022-09-19', mony : '222,222다손'},
        {id : 3, title : '독립유공자 후손들에게 도움을 주세요', dona : '노인종합복지회관', createdate : '2022-03-20', enddate : '2022-09-19', mony : '222,222다손'},
        {id : 4, title : '독립유공자 후손들에게 도움을 주세요', dona : '노인종합복지회관', createdate : '2022-03-20', enddate : '2022-09-19', mony : '222,222다손'}
    ])

    return(
        <div id='adlistcontent'>
            <div id='addonalist'>
                <table id='listhead'>
                    <thead>
                        <tr>
                            <th width="110">번호</th>
                            <th width="400">제목</th>
                            <th width="270">모금단체</th>
                            <th width="220">작성일</th>
                            <th width="210">마감일</th>
                            <th width="230">모금액</th>
                        </tr>
                    </thead>
                </table>
                <div id='scrolladmin'>
                    <table id='listbody'>
                        <tbody style={{height: '100%'}}>
                            {
                                adDonaList.map(list => (
                                    <tr key={list.id}>
                                        <td width="110">{list.id}</td>
                                        <td width="450">{list.title}</td>
                                        <td width="350">{list.dona}</td>
                                        <td width="200">{list.createdate}</td>
                                        <td width="250">{list.enddate}</td>
                                        <td width="250">{list.mony}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default AdminDonaList;