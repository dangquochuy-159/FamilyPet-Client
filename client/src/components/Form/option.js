import PropTypes from 'prop-types'

function Option({ value, name }) {
    return (
        <option value={value} >{name}</option>
    );
}

Option.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
}


export default Option;