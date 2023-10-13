const check = {
    minPass: 6,
    isEmpty: "Vui lòng không để trống",
    isEmail: "Vui lòng nhập đúng định dạng",
    isPass() {
        return `Vui lòng nhập tối thiểu ${this.minPass} ký tự`
    },
    isConfirmPass: "Mật khẩu không khớp",
}

export default check