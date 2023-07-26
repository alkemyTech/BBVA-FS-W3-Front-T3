import api from "./axios.js";
const constroller = "/accounts";
const accountByCBU = "/cbu/";
export default class AccountsApi {
    static async getAccountByCbu(cbu) {
        return new Promise((resolve, reject) => {
            api
                .get(constroller + accountByCBU + cbu)
                .then((response) => {
                    resolve(response.data);
                })
        });
    }
}