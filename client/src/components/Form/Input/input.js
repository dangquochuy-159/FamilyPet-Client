import PropTypes from 'prop-types'

function Input({ className, label, id, name, placeholder, type, defaultValue, value, title, onChange, innerRef, ...props }) {


    return (
        <>
            {label && (<label htmlFor={id} className='font-semibold italic'>{label}</label>)}
            {
                type === 'radio' || type === 'checkbox' ? (
                    <div className='flex items-center space-x-2 '>
                        <span>{title}</span>
                        <input
                            ref={innerRef}
                            id={id}
                            className={`${className} focus:outline-none focus:border-black hover:cursor-pointer form-control`}
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            onChange={onChange}
                            value={value}
                            {...props}
                        />
                    </div>
                ) : (
                    <input
                        ref={innerRef}
                        id={id}
                        className={`${className} focus:outline-none focus:border-black form-control`}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        onChange={onChange}
                        {...props}
                    />
                )
            }
        </>
    );
}

Input.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default Input;