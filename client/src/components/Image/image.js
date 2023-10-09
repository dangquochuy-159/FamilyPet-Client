import PropTypes from 'prop-types'
import { useState, forwardRef } from 'react'
import { images } from '~/assets'


const Image = forwardRef(({ className, src, alt, fallback: customFallback = images.no_image, ...props }, ref) => {
    const [fallback, setFallback] = useState('')
    const handleError = () => {
        setFallback(customFallback);

    }
    return (
        <img
            className={className}
            ref={ref}
            src={fallback || src} {...props}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
})

Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string,
}

export default Image;