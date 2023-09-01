import { Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'react-bootstrap';
import './adminShop.css'
import AdvancedExample from './Pagination';
import { useState, useEffect } from 'react';


const AdminShop = () => {

{/*새로운 상점 추가 모달 열기 */}
    const [show, setShow] = useState(false);
    const handleOn = ()=> setShow(true);
    const handleOff = () => setShow(false);

    const [newShop, setNewShop] = useState({
        name : '',
        location : '',
        cate : ''
    })
    const [newShopArray, setNewShopArray] = useState([]);
{/*새로운 상점 추가 */}
    const handleNewShop = (event) => {
        const { id, value, defaultValue} = event.target;
        setNewShop( prevShop => ({
            ...prevShop,
                [id] : value==''?defaultValue:value
        }))
    }
{/*새로운 상점 추가 -버튼 클릭(배열 만들기) */}
    const handleNewShopArray = ()=>{
        setNewShopArray(newShop);
        handleOff();
        setNewShop({name:"", location:"", cate:""});
    }
    

{/* 상점 수정 모달 열기 */}
    const [modifyShow, setModifyShow] = useState(false);
    const handleModifyOn = ()=> setModifyShow(true);
    const handleModifyOff = () => setModifyShow(false);

{/* 상점 수정 */}
    const [modifyingShop, setModifyingShop] = useState({name:'', location:'', cate:''});
    const handleModifyingShop = (event) => {
        const { id, value } = event.target;
        let name = modifyingShop.name;
        let location = modifyingShop.location;
        let cate = modifyingShop.cate;
        switch(id){
            case 'name': name=value; break;
            case 'location' : location=value; break;
            case 'cate' : cate = value; break;
        }
        const shop = {name:name, location:location, cate:cate==''?'카페/베이커리':cate};
        setModifyingShop(shop);
    }

    useEffect(()=>{
        
        console.log("modifyingShop",modifyingShop);
        console.log("newShop",newShop);
        console.log("newShopArray", newShopArray);
    }, [modifyingShop, newShop, newShopArray]);



    return(
        <div className="admin-shop-container">
            <div className='admin-shop-head'>
                <div>상점 목록</div>
                <div><input type="search"/><Button className="btn btn-primary">검색</Button></div>
            </div>
            <div className="admin-shop-table">
                <table>
                    <thead>
                        <tr>
                            <th>상점 번호</th>
                            <th>상점 이름</th>
                            <th>지역</th>
                            <th>카테고리</th>
                            <th>수정/삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
                            <td>
                                <Button className="btn btn-primary">수정</Button>
                                <Button className='btn btn-danger'>삭제</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>몰</td>
                            <td>{modifyingShop.name}</td>
                            <td>{modifyingShop.location}</td>
                            <td>{modifyingShop.cate}</td>
                            <td>
                                <Button className="btn btn-primary" onClick={handleModifyOn}>수정</Button>
                                <Button className='btn btn-danger'>삭제</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='adminShop-pagination'>
                <AdvancedExample/>
                <div><Button className="btn btn-primary" onClick={handleOn}>상점 추가</Button></div>
            </div>
                <Modal show={show} onHide={handleOff}>
                    <ModalHeader>
                        상점 추가 
                        <Button className='btn btn-danger' onClick={handleOff}>x</Button>
                    </ModalHeader>
                    <ModalBody>
                        <table style={{width:'100%', textAlign:'center', marginTop:'5%'}}>
                            <tbody>
                                <tr style={{height:'7vh'}}>
                                    <th>상점 이름</th>
                                    <td>
                                        <input id='name' type='text' style={{width:'60%', height:'5vh'}}
                                                onChange={handleNewShop} value={newShop.name}/>
                                    </td>
                                </tr>
                                <tr style={{height:'7vh'}}>
                                    <th>지역</th>
                                    <td>
                                        <input id='location' type='text' style={{width:'60%', height:'5vh'}}
                                                onChange={handleNewShop} value={newShop.location}/>
                                    </td>
                                </tr>
                                <tr style={{height:'7vh'}}>
                                    <th>카테고리</th>
                                    <td>
                                        <select id='cate' style={{width:'60%', height:'5vh'}}
                                                onChange={handleNewShop} value={newShop.cate}>
                                            <option>카페/베이커리</option>
                                            <option>외식</option>
                                            <option>문화생활</option>
                                            <option>편의점</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={2} style={{textAlign:'right'}}>
                                        <Button className="btn btn-primary"
                                                onClick={handleNewShopArray}>확인</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </ModalBody>
                </Modal>


                <Modal show={modifyShow} onHide={handleModifyOff}>
                <ModalHeader>상점 수정</ModalHeader>
                <ModalBody style={{textAlign:'center'}}>
                    상점 정보를 수정하세요.
                    <table style={{width:'100%', textAlign:'center', marginTop:'5%'}}>
                        <tbody>
                            <tr style={{height:'10vh'}}>
                                <th>상점 이름</th>
                                <td>
                                    <input id='name' type="text"
                                            onChange={handleModifyingShop}  value={modifyingShop.name}/>
                                </td>
                            </tr>
                            <tr>
                                <th>지역</th>
                                <td><input id='location' type="text"
                                            onChange={handleModifyingShop} value={modifyingShop.location}/></td>
                            </tr>
                            <tr style={{height:'10vh'}}>
                                <th>카테고리</th>
                                <td>
                                    <select id='cate' style={{width:'60%', height:'5vh'}}
                                                onChange={handleModifyingShop} value={modifyingShop.cate}>
                                            <option>카페/베이커리</option>
                                            <option>외식</option>
                                            <option>문화생활</option>
                                            <option>편의점</option>
                                        </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-primary" onClick={handleModifyOff}>확인</Button>
                    <Button className='btn btn-danger' onClick={handleModifyOff}>취소</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AdminShop;