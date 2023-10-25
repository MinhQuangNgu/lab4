import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
const ProductCreate = () => {
    const [thumpNail, setThumpnail] = useState('')
    const [image, setImage] = useState([]);

    const handleUploadFile = (e, type) => {
        if (type === 'thumpnail') {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setThumpnail(url);
        }
        else {
            const files = e.target.files;
            let urls = [];
            for (const item of files) {
                const url = URL.createObjectURL(item);
                urls.push(url);
            }
            setImage([...urls])
        }
    }
    return (
        <div className='container'>
            <div style={{ marginTop: "50px", marginBottom: "20px" }}>
                <h3 className='d-flex justify-content-center' style={{ margin: "40px 0" }}>Tạo mới product</h3>
                <div style={{ border: "1px solid rgba(0,0,0,0.2)", padding: "20px" }}>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="inputEmail4">Name</label>
                            <input type="text" class="form-control" id="inputEmail4" placeholder="Name" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputAddress">Description</label>
                        <textarea type="text" class="form-control" id="inputAddress" placeholder="Description" />
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label for="inputCity">Price</label>
                            <input type="number" class="form-control" id="inputCity" defaultValue={0} />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputState">discountPercentage</label>
                            <input type="number" class="form-control" id="inputState" defaultValue={0} />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="stock">Stock</label>
                            <input type="number" class="form-control" id="stock" defaultValue={0} />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="brand">Brand</label>
                            <input type="text" class="form-control" id="brand" placeholder='brand' />
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
                                <Carousel.Item key={index + "b"}>
                                    <img style={{width:"100%",height:"350px",objectFit:"cover",border:"1px solid rgba(0,0,0,0.1)"}} src={item} />
                                </Carousel.Item>
                                )
                                }
                            </Carousel>
                        </div>
                    </div>
                    <div style={{ marginTop: "50px" }} className='d-flex justify-content-center'>
                        <button type="submit" class="btn btn-primary">Tạo mới</button>
                    </div>
                </div>
                <div>
                    <h4>Thương mại điện tử</h4>
                </div>
            </div>
        </div>
    )
}

export default ProductCreate