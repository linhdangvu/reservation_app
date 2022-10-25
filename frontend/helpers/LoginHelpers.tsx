


export function verifPassword(password: string) {
    if (password == "") {
        return "Please write password"
    }
    return ""
}


export function verifEmail(email: string) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == "" || email.length < 3 || !reg.test(email)) {
        return "Vous devez entrer une adresse email valide.";
    }
    // if (email != user.email) {
    //     return "There are no email like this.";
    // }
    return "";
}

