import Flickity from 'react-flickity-component'
import { images } from "~/assets";
const flickityOptions = {
    initialIndex: 2,
    pageDots: false,
    prevNextButtons: false,
    wrapAround: true, // cuộn vô hạn
    autoPlay: 1500,
    pauseAutoPlayOnHover: true
    // freeScroll: true, // lướt tùy chỉnh 
    // freeScrollFriction: 0.00,
}


function Banner() {
    return (
        <section id='sec-banner' className=' w-full h-auto overflow-hidden shadow-md shadow-black'>
            <Flickity
                className={'carousel'} // default ''
                elementType={'div'} // default 'div'
                options={flickityOptions} // takes flickity options {}
                disableImagesLoaded={false} // default false
                reloadOnUpdate // default false
                static // default false

            >
                <img src={images.banner1} alt='banner' className='gallery-cell' />
                <img src={images.banner2} alt='banner' className='gallery-cell' />
                <img src={images.banner1} alt='banner' className='gallery-cell' />
            </Flickity>
        </section>
    );
}

export default Banner;