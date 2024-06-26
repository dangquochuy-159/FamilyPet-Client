import { useEffect, useRef, useState } from "react"
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import { Button } from "~/components/Button"
import { SearchIcon } from "~/components/Icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "~/hooks";
import Wrapper from "~/components/Wrapper";
import { Link, useNavigate } from "react-router-dom";
import { API_PRODUCT_SEARCH } from "~/api/api";

function SearchProduct() {
    const [searchValue, setSeachValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResults, setShowResults] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    const debounced = useDebounce(searchValue, 1000)

    useEffect(() => {
        if (!debounced.trim()) {
            return setSearchResult([])
        }
        setLoading(true)
        setTimeout(() => {
            fetch(`${API_PRODUCT_SEARCH}?name=${debounced}&quantity=5`)
                .then(res => res.json())
                .then(data => {
                    setSearchResult(data.data)
                    setLoading(false)
                })
        }, 500)

    }, [debounced])

    const handleClear = () => {
        setSeachValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResults(false)
    }

    const handleChange = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setSeachValue(searchValue)
        }
    }

    const handleSearchProduct = () => {
        if (inputRef.current.value === '') {
            alert('BẠN CHƯA NHẬP TỪ KHÓA TÌM KIẾM')
        } else {
            window.location.href = `/search?name=${inputRef.current.value}`
        }
    }

    return (
        <TippyHeadless
            appendTo={() => document.body}
            visible={showResults && searchResult.length > 0}
            interactive={true}
            placement='bottom-start'
            render={attrs => (
                <div className='w-[400px] sm:!w-[200px] md:!w-[236px]' tabIndex="-1" {...attrs}>
                    <Wrapper className='flex flex-col gap-4 p-4'>
                        {
                            searchResult.length > 0 && searchResult.map((result, index) => (
                                <a href={`/product?slug=${result.slug}`} key={index} className="">{result.name}</a>
                            ))
                        }
                    </Wrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className="w-[500px] sm:!w-[90%] md:w-[90%] sm:!shadow-md sm:!shadow-black md:!shadow-md md:!shadow-black flex rounded-sm bg-white relative">
                <input
                    ref={inputRef}
                    type='text'
                    placeholder='Tìm kiếm'
                    className="w-full h-auto py-2 px-4 font-bold outline-none rounded-tl-sm rounded-bl-sm"
                    value={searchValue}
                    spellCheck={false}
                    onChange={handleChange}
                    onFocus={() => setShowResults(true)}
                />
                {!!searchValue && !loading && (
                    <button
                        className='clear'
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {!!loading && (
                    <button className='loading'>
                        <FontAwesomeIcon icon={faSpinner} />
                    </button>
                )}
                <Button leftIcon={<SearchIcon width="32px" height='32px' className='text-[var(--primary-color)]' />}
                    className='p-2 border-l border-solid border-[#ccc] rounded-tr-sm rounded-br-sm hover:bg-gray-100 hover:text-white'
                    onClick={handleSearchProduct} />
            </div>
        </TippyHeadless>
    );
}

export default SearchProduct;