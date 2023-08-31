import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import './ShopProductDetail.css';
<<<<<<< HEAD
import HeartIcon from '../heart';
import { useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';

=======
import HeartIcon from './heart';
import { useEffect, useState } from 'react';
>>>>>>> parent of ace4ded (2028.08.31 ain commit)

const ShopProductDetail = () => {

    const {store, product} = useParams();
    console.log(product);

    const [show, setShow] = useState(false);
    const [modalText, setModalText] = useState(`상품 이름을 5000포인트로 구매하시겠습니까?


                                                *구매 이후 환불은 불가능합니다.*`);
    const [modalButton, setModalButton] = useState('inline-block');
    const [modalButtonText, setModalButtonText] = useState('취소');

    const [modalClass, setModalClass] = useState('modalButton-no');

    const handleClose = () => setShow(false);
    const handleShow = () => {
        handleModalOff();
        setShow(true);
    }
    const handleModalOn = ()=>{
                                    setModalText(`구매가 정상적으로 완료되었습니다.`);
                                    setModalButton('none');
                                    setModalButtonText('확인');
                                    setModalClass('modalButton-yes');
                                }
    const handleModalOff = ()=>{
                                    setModalText(<div textalign='center'>상품 이름을<br/>5000포인트로 구매하시겠습니까?<br/><br/>
                                                    *구매 이후 환불은 불가능합니다.*</div>);
                                    setModalButton('inline-block');
                                    setModalButtonText('취소');
                                    setModalClass('modalButton-no');
                                }
    const handleModalOffAndClose = () => {
        if(modalButtonText == '확인' && modalButton == 'inline-block' && show){
            handleModalOff();
        }
        handleClose();
    }

    return(
        <div className="shopProductDetail-container">
            <div className="product-info">
                <div className='product-info-img'>
                    <img src='/resources/shop/product/4/004.png'/>
                </div>
                <div className='product-info-head'>
                    <div className='product-info-store'>
                        {store}
                    </div>
                    <div>
                        <HeartIcon/>
                    </div>
                </div>
                
                <div className='product-info-middle'>
                    <div className='product-info-middle-left'>
                        <div>{product}</div>
                        <div>5000 다손</div>
                    </div>
                    <div className='product-info-middle-right'>
                        <button onClick={handleShow}>구매</button>
                        <Modal className='modal' show={show} onHide={handleClose} >
                            <ModalHeader>
                                상품 구매
                            </ModalHeader>
                            <ModalBody>
                                <div style={{textAlign:'center'}}>
                                {modalText}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <button className={modalClass} onClick={handleModalOffAndClose}>{modalButtonText}</button>
                                <button className='modalButton-yes' onClick={handleModalOn} style={{display:modalButton}}>구매</button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
                
            </div>
            <div className="buy-info"> 
                <div>
                    <div>구매 전 필독<br/></div>
                    - 상기 이미지는 연출된 것으로 실제와 다를 수 있습니다.<br/><br/>
                </div>

                <div>
                    <div>사용처 / 사용 안내<br/></div>
                    - 본 상품은 매장 재고 상황에 따라 동일 상품으로 교환이 불가능할 수 있습니다.<br/>
                    - 동일 상품 교환이 불가한 경우 동일 가격 이상의 다른 상품으로 교환이 가능하며, 
                    동일 상품 외 다른 상품으로 교환할 시 차액이 발생할 수 있습니다.(차액 추가 지불)<br/><br/>
                </div>
                
                <div>
                    <div>사용 전 주의 사항<br/></div>
                    - 정식 판매처 외의 장소나 경로를 통하여 구매하거나 기타의 방법으로 보유하신 쿠폰은 정상적인
                    사용이 금지되거나 제한될 수 있으니 주의하시기 바랍니다.<br/>
                </div>
            </div>
        </div>

    );
}

export default ShopProductDetail;