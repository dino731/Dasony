import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import './adminShopDetail.css';
import { useState } from "react";

export const AdminShopDetail = ()=> {

    

    const [detailShow, setDetailShow] = useState(false);
    const handleDetailOn = () => setDetailShow(true);
    const handleDetailOff = () => setDetailShow(false);

    const [selectedProduct, setSelectedProduct] = useState({
                                                            name:'',
                                                            price:''
                                                        });

    const [show, setShow] = useState(false);
    const handleOn = ()=> setShow(true);
    const handleOff = () => setShow(false);

    const handleOnEdit = (product) => {
        setSelectedProduct(product);
        handleOn();
    }

    const [cancleShow, setCancleShow] = useState(false);
    const handleCancleOn = ()=> setCancleShow(true);
    const handleCancleOff = () => setCancleShow(false);

    const handleOnEditCancle = (product)=>{
        setSelectedProduct(product);
        handleCancleOn();
    }


    return (
        <div className="admin-shop-detail-container">
            <div>상점 상세</div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>상점 이름</th>
                            <td>멀라 가게</td>
                        </tr>
                        <tr>
                            <th>지역</th>
                            <td>멀라 가게</td>
                        </tr>
                        <tr>
                            <th>카테고리</th>
                            <td>멀라 가게</td>
                        </tr>
                        <tr>
                            <th>상품 추가</th>
                            <td>
                                <Button className="btn btn-primary" onClick={handleDetailOn}>관리</Button>
                            </td>
                        </tr>
                            <Modal show={detailShow} onHide={handleOff} fullscreen={true}>
                                <ModalHeader>
                                    상품 관리 
                                    <Button className='btn btn-danger' onClick={handleDetailOff}>x</Button>
                                </ModalHeader>
                                <ModalBody>
                                    <table style={{width:'100%', textAlign:'center', marginTop:'5%'}}>
                                        <tr style={{height:'10vh'}}>
                                            <th>상품 번호</th>
                                            <th>상품 이름</th>
                                            <th>상품 가격</th>
                                            <th>상품 수정/삭제</th>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>몰라</td>
                                            <td>몰라</td>
                                            <td>
                                                <Button className="btn btn-primary" onClick={()=>handleOnEdit({ name: '몰라', price: '몰라' })}>수정</Button>
                                                {" "}
                                                <Button className='btn btn-danger' onClick={()=>handleOnEditCancle({ name: '몰라', price: '몰라' })}>삭제</Button>
                                            </td>
                                        </tr>
                                    </table>
                                </ModalBody>
                            </Modal>
                    </tbody>
                </table>
            </div>
            <Modal show={show} onHide={handleOff}>
                <ModalHeader>상품 수정</ModalHeader>
                <ModalBody style={{textAlign:'center'}}>
                    상품 정보를 수정하세요.
                    <table style={{width:'100%', textAlign:'center', marginTop:'5%'}}>
                        <tr style={{height:'10vh'}}>
                            <th>상품 이름</th>
                            <td><input type="text" defaultValue={selectedProduct.name}/></td>
                        </tr>
                        <tr>
                            <th>상품 포인트(다손)</th>
                            <td><input type="text" defaultValue={selectedProduct.price}/></td>
                        </tr>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-primary" onClick={handleOff}>확인</Button>
                    <Button className='btn btn-danger' onClick={handleOff}>취소</Button>
                </ModalFooter>
            </Modal>

            <Modal show={cancleShow} onHide={handleOff}>
                <ModalHeader>상품 삭제</ModalHeader>
                <ModalBody style={{textAlign:'center'}}>
                    {selectedProduct.name} : 이 상품을 삭제하시겠어요? 
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-primary" onClick={handleCancleOff}>확인</Button>
                    <Button className='btn btn-danger' onClick={handleCancleOff}>취소</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
