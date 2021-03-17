import axios from "axios";
import authHeader from "../js/auth-header";

const API_URL_INCOME = "https://bstorage-server.herokuapp.com/api/income";
// const API_URL_INCOME = "https://localhost:8080/api/income";

class IncomeService {

    getIncome() {
        return axios.get(API_URL_INCOME,{ headers: authHeader() });
    }

    getBrands() {
        return axios.get(API_URL_INCOME + '/brands',{ headers: authHeader() });
    }

    getModels() {
        return axios.get(API_URL_INCOME + '/models',{ headers: authHeader() });
    }

    getTypes() {
        return axios.get(API_URL_INCOME + '/types',{ headers: authHeader() });
    }

    getSuppliers() {
        return axios.get(API_URL_INCOME + '/suppliers',{ headers: authHeader() });
    }

    addIncome(income) {
        return axios.post(API_URL_INCOME, income,{ headers: authHeader() });
    }

    getIncomeById(incomeId) {
        return axios.get(API_URL_INCOME + '/' + incomeId,{ headers: authHeader() });
    }

    updateIncome(income, incomeId) {
        return axios.put(API_URL_INCOME + '/' + incomeId, income,{ headers: authHeader() });
    }

    deleteIncome(incomeId) {
        return axios.delete(API_URL_INCOME + '/' + incomeId,{ headers: authHeader() });
    }
}

export default new IncomeService()