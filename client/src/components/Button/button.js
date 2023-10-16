import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

function Button(
    {
        title,
        to,
        href,
        type,
        className,
        leftIcon,
        rightIcon,
        onClick,
        ...passProps
    }
) {
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps
    }

    if (type === 'disabled') {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    if (to) {
        props.to = to
        Comp = Link

    } else if (href) {
        props.href = href
        Comp = 'a'
    }

    const classes = {
        primary: ' font-bold py-2 px-4 rounded',
        outline: `font-bold py-2 px-4 border rounded`,
        text: 'underline',
        rounded: ' font-bold py-2 px-4 rounded-full',
        disabled: ' font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed',
    }
    return (
        <Comp className={`${classes[type]} ${className} flex items-center space-x-2 justify-center`} {...passProps} onClick={props.onClick}>
            {leftIcon}
            {title ? <span>{title}</span> : <></>}
            {rightIcon}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,

    onClick: PropTypes.func,
}

export default Button;