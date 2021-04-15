import axios from "axios";

const API_URL_AUTH = "https://bstorage-server.herokuapp.com/api/auth/";
// const API_URL_AUTH = "https://localhost:8080/api/auth/";



class AuthService {
    login(username, password) {
        return axios
            .post(API_URL_AUTH + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL_AUTH + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();