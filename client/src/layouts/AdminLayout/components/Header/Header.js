import PropTypes from 'prop-types'

import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';

function Header({ title, avatar, name, id }) {


    return (
        <div className="wrapper--header w-10/12 fixed top-0 right-0 z-2 p-2">
            <div className='header-content h-full flex justify-between items-center px-8'>
                <div className='header--title flex  items-center'>
                    <FontAwesomeIcon className='icon w-6 h-6' icon={faPlay} />
                    <h2 className='title--page text-2xl font-bold uppercase ml-4'>{title}</h2>
                </div>
                {
                    avatar && name && id &&
                    <div className='header--admin flex items-center '>
                        <h2 className='title--admin text-2xl font-thin  '>{name}</h2>
                        <Image className='w-10 h-10 ml-4 object-cover' src={`${process.env.REACT_APP_API_URL}/api/admins/${id}/${avatar}`} alt={avatar} />
                    </div>
                }
            </div>
        </div>
    );
}

Header.prototypes = {
    title: PropTypes.string.isRequired,
}

export default Header;