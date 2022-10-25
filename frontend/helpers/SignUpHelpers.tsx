


export function verifPassword(password: string) {
    if (password == "") {
        return "Please write password"
    }
    if (password == "" || password.length < 8 ) {
        return "The password must be longer than 8 characters.";
    }
    return ""
}

export function verifPasswordconfirm(password: string, passwordconfirm: string) {
    if (password == "") {
        return "Please write password confirmation."
    }
    if (password != passwordconfirm) {
        return "The two typed password must match.";
    }
    return ""
}


export function verifEmail(email: string) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == "" || email.length < 3 || !reg.test(email)) {
        return "Enter valid email.";
    }
    // if (email != user.email) {
    //     return "There are no email like this.";
    // }
    return "";
}

