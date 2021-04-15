import axios from "axios";
import authHeader from "../js/auth-header";

const API_URL_SALE= `${process.env.REACT_APP_API_URL}sale`;


class StorageService{

    getSale(){
        return axios.get(API_URL_SALE,{ headers: authHeader() });
    }


}

export default new StorageService()