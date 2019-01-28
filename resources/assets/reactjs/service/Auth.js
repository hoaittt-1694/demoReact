export default class Auth {

    static authenticateUser(token) {
        localStorage.setItem('usertoken', token);
    }

    static isUserAuthenticated() {
        return localStorage.getItem('usertoken') !== null;
    }

    static deleteAuthenticateUser() {
        localStorage.removeItem('usertoken');
    }

    static getToken() {
        return localStorage.getItem('usertoken');
    }
}