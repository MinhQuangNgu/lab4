import React, { useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef()
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await axios.post('/users',{
                email:emailRef.current.value,
                password:passwordRef.current.value,
                name:nameRef.current.value
            })
            const user = data.data.user;
            localStorage.setItem('user_id',user?._id);
            navigate('/')
        }
        catch (err) {

        }
    }
    return (
        <div style={{ marginTop: "50px", width: "40%", border: '1px solid rgba(0,0,0,0.1)', padding: "20px" }} className='container'>
            <div class="form-group">
                <label for="formGroupExampleInput">Name</label>
                <input ref={nameRef} type="text" class="form-control" id="formGroupExampleInput" placeholder="Name" />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button onClick={handleLogin} style={{ marginTop: "20px" }} type="submit" className="btn btn-primary">Register and login</button>
        </div>
    )
}

export default Login