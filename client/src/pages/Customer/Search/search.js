import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonToTop from "~/components/ButtonToTop";
import CardProduct from "~/components/CardProduct";

function Search() {
    const [searchResult, setSearchResult] = useState([])

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products/search?name=${name}`)
            .then(res => res.json())
            .then(data => {
                setSearchResult(data.data)
            })
    })

    return (
        <section id='sec-search_product' className="grid_layout wide my-16 sm:!my-2 sm:!px-2">
            <ButtonToTop />
            <h2 className="text-xl font-bold">Tìm kiếm sản phẩm</h2>
            <p className="mt-4 font-extralight"> {searchResult.length} kết quả trùng khớp</p>
            <div className="mt-4 grid sm:!grid-cols-2 md:!grid-cols-3 grid-cols-5 gap-x-2 gap-y-4">
                {
                    searchResult.length > 0 && searchResult.map(result =>
                        <CardProduct product={result} />
                    )
                }
            </div>
        </section>
    );
}

export default Search;