export default class Auth {

    static login(cb) {
        localStorage.setItem("jwt-token", cb);
    }

    static logout() {
        localStorage.clear();
    }

    static isAuthenticated() {
        return localStorage.getItem("jwt-token");
    }
}

