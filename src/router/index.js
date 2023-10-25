import Home from "../component/home/Home";
import ProductCreate from "../component/product/ProductCreate";

const { default: Login } = require("../component/user/Login");

export const router = [
    {
        path:"/",
        element:Home
    },
    {
        path:"/login",
        element:Login
    }
    ,
    {
        path:"/create",
        element:ProductCreate
    }
]

