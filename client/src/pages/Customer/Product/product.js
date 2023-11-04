import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ConnectServer from "~/components/ConnectError";
import ProductDetail from "./productDetail";
import './product.scss'
import ProductMutil from "./productMutil";

function Product() {
    const [connectServer, setConnectServer] = useState(false)
    const [products, setProducts] = useState()
    const [keyParams, setKeyParams] = useState('')

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const slug = queryParams.get("slug");
    const category = queryParams.get("category");
    const outstand = queryParams.get("outstand");
    const promote = queryParams.get("promote");
    let query = ''
    slug && (query = `/filter?filter=slug&value=${slug}`)
    category && (query = `/filter?filter=category&value=${category}`)
    outstand && (query = `/filter?filter=outstand&value=${outstand}`)



    useEffect(() => {
        window.scrollTo(0, 0);
        for (const key of queryParams.keys()) {
            setKeyParams(key)
        }
        fetch(`${process.env.REACT_APP_API_URL}/api/products${query}`)
            .then(res => res.json())
            .then(data => {
                let productPromote = []
                data.data.map(product => product.sale_price && productPromote.push(product))
                promote ? setProducts(productPromote) : setProducts(data.data)
                setConnectServer(true)
            })
    }, [])
    return !connectServer ? (<ConnectServer />) : (
        <>
            {/* <button onClick={() => console.log(keyParams)}>Click</button> */}
            {
                products.length === 1 ? <ProductDetail productDetail={products} /> : <ProductMutil keyParams={keyParams} valueParams={category} products={products} />
            }
        </>
    );
}

export default Product;