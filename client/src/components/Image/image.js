import PropTypes from 'prop-types'
import { useState } from 'react'
import { images } from '~/assets'


function Image({ className, src, alt, fallback: customFallback = images.no_image, onClick, innerRef, ...props }) {
    const [fallback, setFallback] = useState('')
    const handleError = () => {
        console.log('errr')
        setFallback(customFallback);

    }
    return (
        <img
            className={className}
            ref={innerRef}
            src={fallback || src} {...props}
            alt={alt}
            {...props}
            onError={handleError}
            onClick={onClick}
        />
    );
}

Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string,
    onClick: PropTypes.func,
}

export default Image;