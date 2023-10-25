import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const [products, setProducts] = useState([])
    const contentRef = useRef();
    const navigate = useNavigate()

    const handleGetData = () => {
        console.log(contentRef.current.innerHTML)
    }

    
    return (
        <div className='container'>
            <div style={{marginTop:"50px"}}>
                <button onClick={() => {
                    navigate('/create')
                }} className='btn btn-primary'>Tạo mới product</button>
            </div>
            <div className='product_list'>
                <div className="card col-3" style={{ width: "100%",padding:"0 0" }}>
                    <img style={{width:"100%",height:"250px",objectFit:"cover"}} src="https://treobangron.com.vn/wp-content/uploads/2022/09/background-dep-5-2.jpg" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            <button onClick={handleGetData}>Get</button>
            <div ref={contentRef} style={{width:"100%",minHeight:"50px",border:"1px solid rgba(0,0,0,0.2)"}} contentEditable={true}>

            </div>
        </div>
    )
}

export default Home