import PropTypes from 'prop-types'

function Select({ children, className, name, onChange }) {
    return (
        <select className={`${className} hover:cursor-pointer`} name={name} onChange={onChange}>
            {children}
        </select>
    );
}

Select.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,

}

export default Select;