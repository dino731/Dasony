import { Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'react-bootstrap';
import './adminShop.css'
import AdvancedExample from './Pagination';
import { useState } from 'react';


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
    const handleNewShop = (addShop) => {
        setNewShop(addShop);
        handleOff();
    }
    

{/* 상점 수정 추가 모달 열기 */}
    const [modifyShow, setModifyShow] = useState(false);
    const handleModifyOn = ()=> setModifyShow(true);
    const handleModifyOff = () => setModifyShow(false);

    const [modifyingShop, setModifyingShop] = useState([]);
    const handleModifyingShop = (event) => {
        let {id, value} = event.target;
        let name = '';
        let location = '';
        let cate = '';
        switch(id){
            case 'name': name=value; break;
            case 'location' : location=value; break;
            case 'cate' : cate = value; break;
        }
        let shop = {name:name, location:location, cate:cate};
        setModifyingShop(shop);
    }




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
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
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
                                    <td><input id='name' type='text' style={{width:'60%', height:'5vh'}}/></td>
                                </tr>
                                <tr style={{height:'7vh'}}>
                                    <th>지역</th>
                                    <td><input id='location' type='text' style={{width:'60%', height:'5vh'}}/></td>
                                </tr>
                                <tr style={{height:'7vh'}}>
                                    <th>카테고리</th>
                                    <td>
                                        <select id='cate' style={{width:'60%', height:'5vh'}}>
                                            <option>카페/베이커리</option>
                                            <option>외식</option>
                                            <option>문화생활</option>
                                            <option>편의점</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={2} style={{textAlign:'right'}}>
                                        <Button className="btn btn-primary" onClick={()=>{handleNewShop({name:'멀라', location:'멀라', cate:'멀라'})}}>확인</Button>
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
                        <tr style={{height:'10vh'}}>
                            <th>상점 이름</th>
                            <td><input type="text" defaultValue={newShop.name}/></td>
                        </tr>
                        <tr>
                            <th>지역</th>
                            <td><input type="text" defaultValue={newShop.location}/></td>
                        </tr>
                        <tr style={{height:'10vh'}}>
                            <th>카테고리</th>
                            <td><input type="text" defaultValue={newShop.cate}/></td>
                        </tr>
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