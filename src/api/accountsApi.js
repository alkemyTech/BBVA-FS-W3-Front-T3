import api from "./axios.js";
import { toast } from "react-toastify";

const constroller = "/accounts";
const endpoints = {
  accountByCBU: "/cbu/",
  balance: "/balance",
};
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
        .get(constroller + endpoints.accountByCBU + cbu)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message, toastOptions);
          reject(error);
        });
    });
  }

  static async accountInfo(id) {
    return api.get(constroller + `/${id}`).catch((error) => {
      console.log(error);
    });
  }

  static async getBalance() {
    return api
      .get(constroller + endpoints.balance)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }
}
