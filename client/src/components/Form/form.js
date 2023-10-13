function Form({ children, action, method, id, className, enctype }) {
    return (
        <form action={action} method={method} id={id} className={className} encType={enctype} noValidate>
            {children}
        </form>
    );
}

export default Form;