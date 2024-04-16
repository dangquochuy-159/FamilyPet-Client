function TitleProduct({ title }) {
    return (
        <h2 className=" w-full sm:!text-xl md:!text-3xl 
                        text-4xl text-white bg-[var(--primary-color)] p-4 text-center font-extrabold rounded-tl-xl rounded-tr-xl
                        bg-gradient-to-r from-indigo-900 to-blue-500">
            {title}
        </h2>
    );
}

export default TitleProduct;