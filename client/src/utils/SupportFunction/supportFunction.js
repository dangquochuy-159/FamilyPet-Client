export const changeNumberToPrice = (number) => {
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

export const changeDate = (date) => {
    const originalDate = new Date(date);
    const day = String(originalDate.getDate()).padStart(2, '0');
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const year = originalDate.getFullYear();
    const hours = String(originalDate.getHours()).padStart(2, '0');
    const minutes = String(originalDate.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

export const handleLoadingPage = async () => {
    return new Promise((resolve) => {
        const loadingEle = document.getElementById('block-loading');
        loadingEle.classList.remove('hidden')
        setTimeout(() => {
            loadingEle.classList.add('hidden')
            resolve(true);
        }, 500);
    });
}

export const changeStatus = {
    in_stock: 'Còn hàng',
    low_stock: 'Sắp hết hàng',
    out_stock: 'Hết hàng'
}
