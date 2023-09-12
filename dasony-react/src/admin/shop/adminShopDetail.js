import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import './adminShopDetail.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useRef } from "react";

export const AdminShopDetail = ()=> {

    {/*상점 정보 디테일 가져오기 */}
    const {shopOkey} = useParams();
        {/*상점 정보 초기화 */}
    const [shop, setShop] = useState({
        shopOkey:"",
        shopName:"",
        shopAddress:"",
        shopRegion:"",
        shopCate:""
    });
        {/*shopCateMap설정 */}
    const shopCateMap = {
        "B":"카페/베이커리",
        "C":"편의점",
        "L":"문화생활",
        "O":"외식"
    }
        {/*상점 정보 디테일 가져오기 - 서버 */}
    const handleShopDetail = ()=>{
        axios.post('/dasony/api/admin/shopInfo', {shopOkey:shopOkey})
        .then(res=>{
            setShop(res.data);
        })
        .catch(err=>{
            console.log(err);
            alert("다시 시도해주세요.");
        })
    }

    useEffect(()=>{
        handleShopDetail();
    },[])

    const [detailShow, setDetailShow] = useState(false);
    const handleDetailOn = () => {handleProductInfo(); setDetailShow(true);}
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


{/*상품 추가 */}
    const [addShow, setAddShow] = useState(false);
    const handleAddOn = ()=> setAddShow(true);
    const handleAddOff = () => setAddShow(false);

    const inputRef = useRef(null);
    const form = new FormData();
    const[addProduct, setAddProduct] = useState({
        shopOkey:shopOkey,
        productName : '',
        productAmount:''
    });
    {/*상품 정보 설정 */}
    const handleAddProduct = (e) => {
        const {id, value} = e.target;
        
        setAddProduct(prev=>({
            ...prev,
            [id]:value
        }));
        console.log("addproduct정보 : ", addProduct);
    }
    {/*상품 이미지 정보 저장 */}
    const handleAddImg = ()=>{
        const fileInput = inputRef.current;
        if (fileInput) {
            const file = fileInput.files;
            for(let i = 0; i < file.length; i++) {
                form.append("file", file[i]);
            }
        }
    }
    {/*상품 정보 전달 - 서버 */}
    const handleProductSub = () =>{
        handleAddImg();
        form.append("product", new Blob([JSON.stringify(addProduct)], {type: "application/json" }));
        axios.post('/dasony/api/admin/addProduct', form)
        .then(res=>{
            alert(res.data);
            setAddProduct({});
        })
        .catch(err=>{
            console.log(err);
            alert("다시 시도해주세요.");
        })
        handleAddOff();
    }
{/*상품 정보 불러오기 */}
    {/*상품 정보 설정 */}
    const [product, setProduct] = useState([]);
    {/*상품 정보 불러오기 - 서버*/}
    const handleProductInfo = () => {
        axios.post("/dasony/api/admin/productInfo", {shopOkey:shopOkey})
        .then(res=>{
            console.log(res.data.product);
            setProduct(res.data.product);
        })
        .catch(err=>{
            console.log(err);
            alert("다시 시도해주세요.");
        })
    }


    return (
        <div className="admin-shop-detail-container">
            <div>상점 상세</div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>상점 번호</th>
                            <td>{shop.shopOkey}</td>
                        </tr>
                        <tr>
                            <th>상점 이름</th>
                            <td>{shop.shopName}</td>
                        </tr>
                        <tr>
                            <th>지역</th>
                            <td>{shop.shopRegion}</td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>{shop.shopAddress}</td>
                        </tr>
                        <tr>
                            <th>카테고리</th>
                            <td>{shopCateMap[shop.shopCate]}</td>
                        </tr>
                        <tr>
                            <th>상품 추가</th>
                            <td>
                                <Button className="btn btn-primary" onClick={handleDetailOn}>관리</Button>
                            </td>
                        </tr>
                        {/* 상품 관리 모달 */}
                            <Modal show={detailShow} onHide={handleOff} fullscreen={true}>
                                <ModalHeader>
                                    상품 관리 
                                    <Button className='btn btn-danger' onClick={handleDetailOff}>x</Button>
                                </ModalHeader>
                                <ModalBody>
                                    <table style={{width:'100%', textAlign:'center', marginTop:'5%'}}>
                                        <thead>
                                            <tr style={{height:'10vh'}}>
                                                <th>상품 번호</th>
                                                <th>상품 이름</th>
                                                <th>상품 가격</th>
                                                <th>상품 이미지</th>
                                                <th>상품 수정/삭제</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                product && product.map((p, index)=>{
                                                    console.log(p.productImg)
                                                    return(
                                                        <tr key={p.productNo} style={{height:'25vh'}}>
                                                            <td>{index+1}</td>
                                                            <td>{p.productName}</td>
                                                            <td>{p.productAmount}</td>
                                                            <td>
                                                                <div className="product-add-img">
                                                                    {p.productImg.map((i, index)=>{
                                                                        console.log(p.productImg);
                                                                        return(
                                                                        <img key={index} src={i}/>
                                                                        )
                                                                    })}    
                                                                </div>
                                                            </td>
                                                            
                                                            <td>
                                                                <Button className="btn btn-primary" style={{height:'5vh'}} onClick={()=>handleOnEdit({ name: '몰라', price: '몰라' })}>수정</Button>
                                                                {" "}
                                                                <Button className='btn btn-danger' style={{height:'5vh'}} onClick={()=>handleOnEditCancle({ name: '몰라', price: '몰라' })}>삭제</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={handleAddOn}>상품 추가</Button>
                                    {/* 상품 추가 모달 */}
                                    <Modal show={addShow} onHide={handleAddOff} fullscreen={true}>
                                        <ModalHeader>상품 추가</ModalHeader>
                                        <ModalBody>
                                            <div className='product-add-table'>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>상품 이름</th>
                                                            <th>상품 가격</th>
                                                            <th>상품 이미지</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr>
                                                            <td style={{height:'15vh'}}>
                                                                <input id='productName' type="text" onChange={handleAddProduct} value={addProduct.productName}/>
                                                            </td>
                                                            <td>
                                                                <input id='productAmount' type="text" onChange={handleAddProduct}  value={addProduct.productAmount}/>
                                                            </td>
                                                            <td>
                                                                <input type="file" ref={inputRef} multiple/>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button className='btn btn-danger' onClick={handleAddOff} >닫기</Button>
                                            <Button className='btn btn-primary' onClick={handleProductSub}>확인</Button>
                                        </ModalFooter>
                                    </Modal>
                                </ModalFooter>
                            </Modal>
                    </tbody>
                </table>
            </div>
            {/* 상품 수정 모달 */}
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
                        <tr style={{height:'10vh'}}>
                            <th>상품 이미지</th>
                            <td><input type="file"/></td>
                        </tr>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-primary" onClick={handleOff} >확인</Button>
                    <Button className='btn btn-danger' onClick={handleOff}>취소</Button>
                </ModalFooter>
            </Modal>

            {/* 상품 삭제 모달 */}
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
