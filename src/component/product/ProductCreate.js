import axios from 'axios';
import React, { useRef, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import ToastCustom from '../common/ToastCustom';
import { useNavigate } from 'react-router-dom';
const ProductCreate = () => {
    const [thumpNail, setThumpnail] = useState('')
    const thumpNailRef = useRef('');
    const imageRef = useRef([]);
    const [image, setImage] = useState([]);

    const [error, setError] = useState({})

    const nameRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const discountPercentageRef = useRef();
    const stockRef = useRef();
    const brandRef = useRef();

    const [success, setSuccess] = useState('')

    const navigate = useNavigate();

    const handleUploadFile = (e, type) => {
        if (type === 'thumpnail') {
            const file = e.target.files[0];
            thumpNailRef.current = file;
            const url = URL.createObjectURL(file);
            setThumpnail(url);
        }
        else {
            const files = e.target.files;
            imageRef.current = files;
            let urls = [...image];
            for (const file of files) {
                const url = URL.createObjectURL(file);
                urls.push(url);
            }
            setImage([...urls])
        }
    }

    const handleRemoveImage = (index) => {
        const tempUrl = [...image];
        tempUrl.splice(index, 1);
        imageRef.current.splice(index, 1);
        setImage([...tempUrl]);
    }

    const handleCreateNewProduct = async () => {
        try {
            const product = {
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                price: priceRef.current.value,
                discountPercentage: discountPercentageRef.current.value,
                stock: stockRef.current.value,
                brand: brandRef.current.value
            }
            let isError = false;

            const excludesFields = ['name', 'description'];
            let failFields = {}
            excludesFields.forEach(item => {
                if (!product[item]) {
                    failFields = {
                        ...failFields,
                        [item]: `${item} is required`
                    }
                    isError = true;
                }
            })

            const comparePositiveNumberFields = ['price', 'stock', 'discountPercentage'];
            comparePositiveNumberFields.forEach(item => {
                if (product[item] < 0) {
                    failFields = {
                        ...failFields,
                        [item]: `${item} need to be greater than 0`
                    }
                    isError = true;
                }
            })
            setError({ ...failFields });
            if (isError) {
                return;
            }

            const formData = new FormData();
            formData.append("image", thumpNailRef.current);
            imageRef.current.forEach((file) => {
                formData.append(`image`, file);
            })

            const data = await axios.post('/images/multiple', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            let imgArray = [...data.data];
            let data2 = []
            if (imageRef.current.length > 0) {
                let tempImage = [...image];
                let tempImageStore = [];
                tempImage.forEach((item, index) => {
                    tempImageStore.push({
                        url: imgArray[index + 1],
                        caption: imageRef.current[index]?.filename
                    })
                })
                data2 = await axios.post('/images/multipleimage', {
                    tempImageStore
                });
            }

            const data3 = await axios.post('/products', {
                ...product,
                thumpnail: imgArray[0],
                images: data2.data?.tempImage
            })
            setSuccess(data3?.data?.msg);
            navigate('/');

        }
        catch (err) {

        }
    }
    return (
        <div className='container'>
            {success && <ToastCustom message={success} />}
            <div style={{ marginTop: "50px", marginBottom: "20px" }}>
                <h3 className='d-flex justify-content-center' style={{ margin: "40px 0" }}>Tạo mới product</h3>
                <div style={{ border: "1px solid rgba(0,0,0,0.2)", padding: "20px" }}>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label for="inputEmail4">Name *</label>
                            <input ref={nameRef} type="text" className="form-control" id="inputEmail4" placeholder="Name" />
                            {error?.name && <span style={{ color: 'red' }}><i>{error?.name}</i></span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="inputAddress">Description</label>
                        <textarea ref={descriptionRef} type="text" className="form-control" id="inputAddress" placeholder="Description" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label for="inputCity">Price</label>
                            <input ref={priceRef} type="number" className="form-control" id="inputCity" defaultValue={0} />
                            {error?.price && <span style={{ color: 'red' }}><i>{error?.price}</i></span>}
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputState">discountPercentage</label>
                            <input ref={discountPercentageRef} type="number" className="form-control" id="inputState" defaultValue={0} />
                            {error?.discountPercentage && <span style={{ color: 'red' }}><i>{error?.discountPercentage}</i></span>}
                        </div>
                        <div className="form-group col-md-3">
                            <label for="stock">Stock</label>
                            <input ref={stockRef} type="number" className="form-control" id="stock" defaultValue={0} />
                            {error?.stock && <span style={{ color: 'red' }}><i>{error?.stock}</i></span>}
                        </div>
                        <div className="form-group col-md-3">
                            <label for="brand">Brand</label>
                            <input ref={brandRef} type="text" className="form-control" id="brand" placeholder='brand' />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='col-3'>
                            <div className='position-relative' style={{ height: "350px" }}>
                                <img style={{ width: "100%", height: "100%", objectFit: 'cover' }} src={thumpNail} />
                                <div className='position-absolute' style={{ top: 0, left: 0, bottom: 0, right: 0 }}>
                                    <label
                                        className='d-flex justify-content-center align-items-center'
                                        style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.2)", color: "white" }} htmlFor='thumpnail'><i>Thêm ảnh thumpnail tại đây</i></label>
                                </div>
                                <input onChange={(e) => handleUploadFile(e, "thumpnail")} id='thumpnail' type='file' hidden />
                            </div>
                        </div>
                        <div className='col-3'>
                            <div className='position-relative' style={{ height: "350px" }}>
                                <div className='position-absolute' style={{ top: 0, left: 0, bottom: 0, right: 0 }}>
                                    <label
                                        className='d-flex justify-content-center align-items-center'
                                        style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.7)", color: "white" }} htmlFor='product'>
                                        <i>Thêm ảnh sản phẩm tại đây</i></label>
                                </div>
                                <input multiple onChange={(e) => handleUploadFile(e, "product")} id='product' type='file' hidden />
                            </div>
                        </div>
                        <div className='col-6'>
                            <Carousel>
                                {image?.map((item, index) =>
                                    <Carousel.Item key={index + "b"} className='position-relative'>
                                        <img style={{ width: "100%", height: "350px", objectFit: "cover", border: "1px solid rgba(0,0,0,0.1)" }} src={item} />
                                        <div className='position-absolute d-flex justify-content-center' style={{ top: '10px', right: 0, left: 0 }}>
                                            <button onClick={() => handleRemoveImage(index)} className='btn btn-danger'>Delete</button>
                                        </div>
                                    </Carousel.Item>
                                )
                                }
                            </Carousel>
                        </div>
                    </div>
                    <div style={{ marginTop: "50px" }} className='d-flex justify-content-center'>
                        <button onClick={handleCreateNewProduct} type="submit" class="btn btn-primary">Tạo mới</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCreate