import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Search() {
    const [searchResult, setSearchResult] = useState()

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const handleClick = () => {
        console.log(name)
    }
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products/search?name=${name}`)
            .then(res => res.json())
            .then(data => {
                setSearchResult(data.data)
            })
    })

    return (
        <>
            <h2>Search page</h2>
            <button onClick={handleClick}>click</button>
            {
                searchResult && searchResult.map(result =>
                    <h2>{result.name}</h2>
                )
            }
        </>
    );
}

export default Search;