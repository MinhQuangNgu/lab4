import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const [cart, setCart] = useState({});

    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        let user_id = localStorage.getItem('user_id');
        if (user_id) {
            axios.get(`/carts?user_id=${user_id}`)
                .then(res => {
                    setCart(res?.data)
                })
        }
    }, []);



    const handleAddToCart = async (item) => {
        try {
            const user_id = localStorage.getItem('user_id');
            if (!user_id) {
                return;
            }
            const cart = {
                user_id,
                product_id: item?._id,
                quantity: 1
            }
            const data = await axios.post('/carts', {
                ...cart
            });
            setSuccess(data.data.msg);
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='container'>
            <div style={{ marginTop: "50px" }}>
                <button onClick={() => {
                    navigate('/')
                }} className='btn btn-primary'>Home</button>
            </div>
            <div className="card col-6" style={{ width: "100%", padding: "0 5px", margin: "20px 0" }}>
                <div className='row'>
                    <div className="card-body col-12">
                        <div className='d-flex'>
                            <p>totalPrice: </p><i style={{ marginLeft: "3px" }}> {cart?.totalPrice} đ</i>
                        </div>
                        <div className='d-flex'>
                            <p>discountTotal: </p><i style={{ marginLeft: "3px" }}> {cart?.discountTotal} đ</i>
                        </div>
                        <div className='d-flex'>
                            <p>totalQuantity: </p><i style={{ marginLeft: "3px" }}> {cart?.totalQuantity}</i>
                        </div>
                        <div className='d-flex'>
                            <p>totalProduct: </p><i style={{ marginLeft: "3px" }}> {cart?.totalProduct}</i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='product_list row'>
                {cart?.products?.map(item =>
                    <div key={item?._id} className="card col-6" style={{ width: "100%", padding: "0 5px", margin: "20px 0" }}>
                        <div className='row'>
                            <div className='col-6'>
                                <img style={{ width: "100%", height: "350px", objectFit: "cover", border: '1px solid rgba(0,0,0,0.1)' }} src={item?.thumpnail} alt="Card image cap" />
                            </div>
                            <div className="card-body col-6">
                                <h5 className="card-title">{item?.name}</h5>
                                <p className="card-text">
                                    {item?.description}
                                </p>
                                <div className='d-flex'>
                                    <p>Price: </p><i style={{ marginLeft: "3px" }}> {item?.price} đ</i>
                                </div>
                                <div className='d-flex'>
                                    <p>discountPercentage: </p><i style={{ marginLeft: "3px" }}> {item?.discountPercentage} %</i>
                                </div>
                                <div className='d-flex'>
                                    <p>quantity: </p><i style={{ marginLeft: "3px" }}> {item?.quantity}</i>
                                </div>
                                <div>
                                    <button onClick={() => handleAddToCart(item)} className="btn btn-primary">Thêm giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>)}
                {success &&
                    <div className='custom_toast'>
                        <p style={{ color: "white", marginTop: "10px" }}><i>Thêm giỏ hàng thành công</i></p>
                    </div>}
            </div>
        </div>

    )
}

export default Cart