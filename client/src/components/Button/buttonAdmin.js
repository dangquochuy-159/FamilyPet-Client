import PropTypes from 'prop-types'

function Button({ title, icon, className }) {
    return (
        <button
            className={`${className} flex items-center justify-center space-x-2 text-white font-semibold text-center p-4 rounded`}>
            <span>{title}</span>
            {icon}
        </button>
    );
}

Button.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    icon: PropTypes.node,
}

export default Button;