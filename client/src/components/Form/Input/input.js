import PropTypes from 'prop-types'
import { forwardRef } from 'react';

const Input = forwardRef(({ className, label, id, name, placeholder, type, value, title, onChange }, ref) => {


    return (
        <>
            {label && (<label htmlFor={id} className='font-semibold italic'>{label}</label>)}
            {
                type === 'radio' || type === 'checkbox' ? (
                    <div className='flex items-center space-x-2'>
                        <span>{title}</span>
                        <input
                            ref={ref}
                            id={id}
                            className={`${className} focus:outline-none focus:border-black form-control`}
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                        />
                    </div>
                ) : (
                    <input
                        ref={ref}
                        id={id}
                        className={`${className} focus:outline-none focus:border-black form-control`}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                )
            }
        </>
    );
})

Input.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    title: PropTypes.string,
}

export default Input;