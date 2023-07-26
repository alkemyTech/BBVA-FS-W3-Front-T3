import api from "./axios.js";
import { toast } from "react-toastify";

const constroller = "/transactions";
const endpoints = {
  ARS: "/sendArs",
  USD: "/sendUsd",
};
const toastOptions = {
  position: "top-center",
  autoClose: 3000,
  closeOnClick: true,
  draggable: false,
};
export default class TransactionsApi {
  static async send(data) {
    let endpoint = endpoints[data.currency];
    console.log(endpoint);
    const body = {
      amount: data.amount,
      destinationAccountId: data.destinationAccountId,
    };
    return new Promise((resolve, reject) => {
      api
        .post(constroller + endpoint, body)
        .then((response) => {
          toast.success("Transferencia realizada con éxito!", toastOptions);
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
        });
    });
  }
}
