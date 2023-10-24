import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Product() {
    const [searchResult, setSearchResult] = useState()

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const slug = queryParams.get("slug");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products/filter?filter=slug&value=${slug}`)
            .then(res => res.json())
            .then(data => { setSearchResult(data.data) })
    })
    const handleClick = () => {
        console.log(searchResult)
    }
    return (
        <>
            <button onClick={handleClick}>click</button>
            {
                searchResult &&
                (
                    searchResult.length === 1 ?
                        searchResult.map(result =>
                            <h2>Tên sản phẩm chi tiết</h2>
                        ) :
                        searchResult.map(result =>
                            <h2>Tên sản phẩm</h2>
                        )

                )
            }
            <h2>Product page</h2>
        </>
    );
}

export default Product;