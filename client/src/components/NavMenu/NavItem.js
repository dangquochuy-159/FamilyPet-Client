import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom";

function NavItem({ to, icon, title, className }) {
    return (
        <NavLink
            to={to}
            className={`${className} nav--link`}
        >
            <span className='w-4 h-4'> {icon}</span>
            <span className="nav--title ml-4 font-bold">{title}</span>
        </NavLink>
    );
}

NavItem.propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
}

export default NavItem;