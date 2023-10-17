import PropTypes from 'prop-types'
import { NavLink, useNavigate } from "react-router-dom";

function NavItem({ to, icon, title, className }) {
    const navigate = useNavigate();
    const handleNavLinkClick = (e) => {
        e.preventDefault()
        console.log('add class modal')
        setTimeout(() => {
            navigate(to);
            console.log('remove class modal')
        }, 0);
    };
    return (
        <NavLink
            to={to}
            className={`${className} nav--link`}
            onClick={handleNavLinkClick}
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