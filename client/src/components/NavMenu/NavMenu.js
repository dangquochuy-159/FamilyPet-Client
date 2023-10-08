import PropTypes from 'prop-types'
import './NavMenu.scss'

function NavMenu({ children, className }) {
    return (
        <nav className={className}>
            {children}
        </nav>
    );
}

NavMenu.propTypes = {
    children: PropTypes.node.isRequired,
}

export default NavMenu;