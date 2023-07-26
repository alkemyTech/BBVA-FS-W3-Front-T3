import api from "./axios.js";
import {toast} from "react-toastify";

const constroller = "/accounts";
const accountByCBU = "/cbu/";
const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    closeOnClick: true,
    draggable: false,
};
export default class AccountsApi {
    static async getAccountByCbu(cbu) {
        return new Promise((resolve, reject) => {
            api
                .get(constroller + accountByCBU + cbu)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    if (!error.response.data.message && error.response.status === 403) {
                        //refrescar token
                        toast.error(
                            "Su sesión ha expirado, por favor vuelva a iniciar sesión",
                            toastOptions,
                        );
                    } else {
                        toast.error(error.response.data.message, toastOptions);
                    }
                    reject(error);
                })
        });
    }
}