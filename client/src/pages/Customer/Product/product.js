import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ConnectServer from "~/components/ConnectError";
import ProductCate from "./productCate";
import ProductDetail from "./productDetail";
import './product.scss'
import CustomerContext from "~/context/CustomerContext";

function Product() {
    const [connectServer, setConnectServer] = useState(false)
    const [userLogin] = useContext(CustomerContext)
    const [product, setProduct] = useState()

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const slug = queryParams.get("slug");
    const category = queryParams.get("category");
    let query = ''
    slug && (query = `filter=slug&value=${slug}`)
    category && (query = `filter=category&value=${category}`)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products/filter?${query}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.data)
                setConnectServer(true)
            })
    })
    const handleClick = () => {
        console.log(slug)
        console.log(category)
        console.log(query)
    }
    return !connectServer ? (<ConnectServer />) : (
        <>
            {/* <button onClick={handleClick}>click</button> */}
            {
                product.length === 1 ? <ProductDetail productDetail={product} /> : <ProductCate productCate={product} />
            }
        </>
    );
}

export default Product;