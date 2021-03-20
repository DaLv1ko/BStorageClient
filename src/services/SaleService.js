import axios from "axios";
import authHeader from "../js/auth-header";

const API_URL_SALE= "https://bstorage-server.herokuapp.com/api/sale";
// const API_URL_SALE= "https://localhost:8080/api/sale";

class StorageService{

    getSale(){
        return axios.get(API_URL_SALE,{ headers: authHeader() });
    }


}

export default new StorageService()