import './wrapper.scss'

function Wrapper({ children, className }) {
    return (
        <div className={`wrapper ${className}`}>
            {children}
        </div>
    );
}

export default Wrapper;