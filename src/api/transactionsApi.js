import api from "./axios.js";
import { toast } from "react-toastify";

const constroller = "/transactions";
const toastOptions = {
  position: "top-center",
  autoClose: 3000,
  closeOnClick: true,
  draggable: false,
};
const endpoints = {
  ARS: "/sendArs",
  USD: "/sendUsd",
  DEPOSIT: "/deposit",
  PAY: "/payment"
};
export default class TransactionsApi {
  static async deposit(data) {
    return new Promise((resolve, reject) => {
      api
        .post(constroller + endpoints.DEPOSIT, data)
        .then((response) => {
          toast.success("Deposito realizado con éxito", toastOptions);
          resolve(response.data);
        })
        .catch((error) => {
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


  static async pay(data) {
    return new Promise((resolve, reject) => {
      api
        .post(constroller + endpoints.PAY, data)
        .then((response) => {
          toast.success("Pago realizado con éxito", toastOptions);
          resolve(response.data);
        })
        .catch((error) => {
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