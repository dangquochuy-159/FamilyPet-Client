import PropTypes from 'prop-types'
import { ProductAll, ProductCategory, ProductOutstand, ProductPromote } from './components';
import { useEffect, useRef, useState } from 'react';
import { changeNumberToPrice, handleLoadingPage } from '~/utils/SupportFunction/supportFunction';
import { images } from '~/assets';
import { API_CATEGORY } from '~/api/api';

function ProductMutil({ products, keyParams, valueParams }) {
    const [priceFilter, setPriceFilter] = useState(5000000)
    const [priceMaxCurrent, setPriceMaxCurrent] = useState(5000000)
    const [categorys, setCategorys] = useState([])
    const ipPriceFilterRef = useRef()
    const handleChangeInputRange = () => {
        setPriceMaxCurrent(ipPriceFilterRef.current.value)
    }
    const handleFilterPrice = async () => {
        await handleLoadingPage()
        setPriceFilter(ipPriceFilterRef.current.value)

    }
    useEffect(() => {
        fetch(`${API_CATEGORY}`).then(res => res.json())
            .then(data => setCategorys(data.data))
    }, [])

    return (
        <>
            <div id='sec-product_mutil' className='grid_layout wide grid grid-cols-4 gap-4 my-16 sm:!px-2'>
                <div className='sm:!col-span-4 md:!col-span-4 space-y-2'>
                    <h2 className='py-2 text-lg font-bold'>Danh mục sản phẩm</h2>
                    <ul className='flex sm:!flex-row md:!flex-row flex-wrap flex-col gap-y-2 gap-x-6 mb-8'>
                        {
                            categorys.length > 0 && categorys.map(category =>
                                <li key={category._id} className='border-b border-solid border-[#ccc] py-2 '>
                                    <a href={`/product?category=${category.name}`} className='hover:text-[var(--primary-color)]'>{category.name}</a>
                                </li>)
                        }
                        <li className='border-b border-solid border-[#ccc] py-2 '>
                            <a href={`/product`} className='hover:text-[var(--primary-color)]'>Tất cả sản phẩm</a>
                        </li>
                    </ul>
                    <h2 className='py-2 text-lg font-bold'>Lọc theo giá:</h2>
                    <input ref={ipPriceFilterRef} onChange={handleChangeInputRange} type='range' min={0} max={5000000} defaultValue={priceMaxCurrent}
                        className='input-range w-full' />
                    <div className='flex justify-between'>
                        <p className='text-[var(--primary-color)] font-bold'>{changeNumberToPrice(0)}</p>
                        <p className='text-[var(--primary-color)] font-bold'>{changeNumberToPrice(Number(priceMaxCurrent))}</p>
                    </div>
                    <button onClick={handleFilterPrice} className='text-white p-2 my-4 float-right w-1/3 rounded-md bg-[var(--primary-color)]'>Lọc</button>
                    <img className='md:!hidden sm:!hidden' src={images.banner_product_page} alt='' />
                    <img className='md:!hidden sm:!hidden' src={images.banner_product_page02} alt='' />
                    <img className='md:!hidden sm:!hidden' src={images.banner_product_page03} alt='' />
                </div>

                <div className='sm:!col-span-4 md:!col-span-4 col-span-3'>
                    {
                        keyParams === 'category' ? <ProductCategory priceFilter={priceFilter} valueParams={valueParams} products={products} /> :
                            keyParams === 'outstand' ? <ProductOutstand priceFilter={priceFilter} valueParams={valueParams} products={products} /> :
                                keyParams === 'promote' ? <ProductPromote priceFilter={priceFilter} valueParams={valueParams} products={products} /> :
                                    <ProductAll priceFilter={priceFilter} products={products} />
                    }
                </div>
            </div>

        </>
    );
}

ProductMutil.propTypes = {
    products: PropTypes.array.isRequired,
    keyParams: PropTypes.string.isRequired,
    valueParams: PropTypes.string.isRequired,
}
export default ProductMutil;