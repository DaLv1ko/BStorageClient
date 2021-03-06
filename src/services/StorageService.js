import axios from "axios";
import authHeader from "../js/auth-header";

const API_URL_STORAGE= `${process.env.REACT_APP_API_URL}storage`;

class StorageService{

    getStorage(){
        return axios.get(API_URL_STORAGE, { headers: authHeader() });
    }

    sellStorage(storageId, sale){
        return axios.put(API_URL_STORAGE+'/'+storageId, sale, { headers: authHeader() })
    }


}

export default new StorageService()