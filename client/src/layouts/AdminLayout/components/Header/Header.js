import PropTypes from 'prop-types'

import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function Header({ title, avatar, name, }) {


    return (
        <div className="wrapper--header w-10/12 h-20 fixed top-0 right-0 z-2 p-2">
            <div className='header-content h-full flex justify-between items-center px-8'>
                <div className='header--title flex  items-center'>
                    <FontAwesomeIcon className='icon w-6 h-6' icon={faPlay} />
                    <h2 className='title--page text-2xl font-bold uppercase ml-4'>{title}</h2>
                </div>
                <div className='header--admin flex items-center '>
                    <h2 className='title--admin text-2xl font-semibold'>{name}</h2>
                    <img className='w-12 h-12 ml-4' src={avatar} alt={avatar} />
                </div>
            </div>
        </div>
    );
}

Header.prototypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
}

export default Header;