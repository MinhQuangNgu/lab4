import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
const Home = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);

    const [comment, setComment] = useState('');
    const [success, setSuccess] = useState('');


    const [rating, setRating] = useState(0);
    const handleRatingChange = (value) => {
        setRating(value);
    };

    useEffect(() => {
        axios.get('/products')
            .then(res => {
                setProducts(res?.data)
            })
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
                    navigate('/create')
                }} className='btn btn-primary'>Tạo mới product</button>
                <button onClick={() => {
                    navigate('/cart');
                }} style={{ marginLeft: '20px' }} className='btn btn-primary'>Giỏ hàng</button>

            </div>
            <div className='product_list'>
                {products?.map(item =>
                    <div key={item?._id} className="card col-12" style={{ width: "100%", padding: "0 0", margin: "20px 0" }}>
                        <div className='row'>
                            <div className='col-3'>
                                <img style={{ width: "100%", height: "350px", objectFit: "cover", border: '1px solid rgba(0,0,0,0.1)' }} src={item?.thumpnail} alt="Card image cap" />
                            </div>
                            <div className="card-body col-4">
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
                                    <p>stock: </p><i style={{ marginLeft: "3px" }}> {item?.stock}</i>
                                </div>
                                <div className='d-flex'>
                                    <p>brand: </p><i style={{ marginLeft: "3px" }}> {item?.brand}</i>
                                </div>
                                <div>
                                    <button onClick={() => handleAddToCart(item)} className="btn btn-primary">Thêm giỏ hàng</button>
                                    <button onClick={() => {
                                        setComment(item);
                                    }} style={{ marginLeft: "10px" }} className="btn btn-primary">Comment</button>
                                </div>
                            </div>
                            <div className='col-5'>
                                <Carousel>
                                    {item?.images?.map((item, index) =>
                                        <Carousel.Item key={index + "b"} className='position-relative'>
                                            <img style={{ width: "100%", height: "350px", objectFit: "cover", border: "1px solid rgba(0,0,0,0.1)" }} src={item?.url} />
                                            <Carousel.Caption>
                                                <p>{item?.caption}</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    )
                                    }
                                </Carousel>
                            </div>
                        </div>
                    </div>)}
            </div>
            {comment && <div className='comment'>
                <div className='comment_form'>
                    <div onClick={() => {
                        setComment('');
                    }} className='close_btn'>
                        <div>&times;</div>
                    </div>
                    <div className='comment_container'>
                        <div className='recipe-comments-rate'>
                            <section>
                                <div style={{ marginTop: "50px" }} className="container text-dark">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-md-10 col-lg-10 col-xl-10">
                                            <div className="card">
                                                <div className="card-body p-4">
                                                    <div className="d-flex flex-start w-100">
                                                        <img
                                                            style={{ marginRight: "10px" }}
                                                            className="rounded-circle shadow-1-strong me-3"
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                                                            alt="avatar"
                                                            width="65"
                                                            height="65"
                                                        />
                                                        <div className="w-100">
                                                            <h5>Minh Quang</h5>
                                                            <div className="rating">
                                                                <input
                                                                    type="radio"
                                                                    id="star1"
                                                                    name="rating"
                                                                    value="1"
                                                                    checked={rating === 1}
                                                                    onChange={() => handleRatingChange(1)}
                                                                />
                                                                <label htmlFor="star1">
                                                                    <i className="fa-solid fa-star"></i>
                                                                </label>

                                                                <input
                                                                    type="radio"
                                                                    id="star2"
                                                                    name="rating"
                                                                    value="2"
                                                                    checked={rating === 2}
                                                                    onChange={() => handleRatingChange(2)}
                                                                />
                                                                <label htmlFor="star2">
                                                                    <i className="fa-solid fa-star"></i>
                                                                </label>

                                                                <input
                                                                    type="radio"
                                                                    id="star3"
                                                                    name="rating"
                                                                    value="3"
                                                                    checked={rating === 3}
                                                                    onChange={() => handleRatingChange(3)}
                                                                />
                                                                <label htmlFor="star3">
                                                                    <i className="fa-solid fa-star"></i>
                                                                </label>

                                                                <input
                                                                    type="radio"
                                                                    id="star4"
                                                                    name="rating"
                                                                    value="4"
                                                                    checked={rating === 4}
                                                                    onChange={() => handleRatingChange(4)}
                                                                />
                                                                <label htmlFor="star4">
                                                                    <i className="fa-solid fa-star"></i>
                                                                </label>

                                                                <input
                                                                    type="radio"
                                                                    id="star5"
                                                                    name="rating"
                                                                    value="5"
                                                                    checked={rating === 5}
                                                                    onChange={() => handleRatingChange(5)}
                                                                />
                                                                <label htmlFor="star5">
                                                                    <i className="fa-solid fa-star"></i>
                                                                </label>
                                                            </div>
                                                            <div className="form-outline">
                                                                <textarea placeholder='What is your view?' className="form-control" id="textAreaExample" rows="4"></textarea>

                                                            </div>
                                                            <div className="d-flex justify-content-end mt-3">
                                                                <button type="button" className="btn btn-primary">
                                                                    Gửi <i className="fas fa-long-arrow-alt-right ms-1"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className='recipe-comments'>
                            <section>
                                <div className="container my-5">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-md-12 col-lg-10 col-xl-10">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex flex-start align-items-center">
                                                        <img
                                                            className="rounded-circle shadow-1-strong me-3"
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                                            alt="avatar"
                                                            width="60"
                                                            height="60"
                                                            style={{ marginRight: "10px" }}
                                                        />
                                                        <div>
                                                            <h6 className="fw-bold text-primary mb-1">Lily Coleman</h6>
                                                            <p className="text-muted small mb-0">Shared publicly - Jan 2020</p>
                                                        </div>
                                                    </div>

                                                    <p className="mt-3 mb-4 pb-2">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>}
            {success &&
                <div className='custom_toast'>
                    <p style={{ color: "white", marginTop: "10px" }}><i>Thêm giỏ hàng thành công</i></p>
                </div>}

        </div>
    )
}

export default Home