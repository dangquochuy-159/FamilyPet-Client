import PropTypes from 'prop-types'

function ProductCate({ productCate }) {
    return (
        <div>
            {
                productCate.map(product =>
                    <h2>{product.name}</h2>
                )
            }
        </div>
    );
}

ProductCate.propTypes = {
    productCate: PropTypes.array.isRequired,
}
export default ProductCate;