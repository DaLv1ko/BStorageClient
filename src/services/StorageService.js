import axios from "axios";
import authHeader from "../js/auth-header";

const API_URL_STORAGE= "https://bstorage-server.herokuapp.com/api/storage";
// const API_URL_STORAGE= "https://localhost:8080/api/storage";

class StorageService{

    getStorage(){
        return axios.get(API_URL_STORAGE, { headers: authHeader() });
    }

    sellStorage(storageId, sale){
        return axios.put(API_URL_STORAGE+'/'+storageId, sale, { headers: authHeader() })
    }


}

export default new StorageService()