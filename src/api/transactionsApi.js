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
  PAY: "/payment",
  USERID: "/userId/",
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

  static async send(data) {
    let endpoint = endpoints[data.currency];
    const body = {
      amount: data.amount,
      destinationAccountId: data.destinationAccountId,
      description: data.description,
    };
    return new Promise((resolve, reject) => {
      api
        .post(constroller + endpoint, body)
        .then((response) => {
          toast.success("Transferencia realizada con éxito!", toastOptions);
          resolve(response.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message, toastOptions);
          reject(error);
        });
    });
  }

  static async getTransactionsByUserId(
    id,
    page = 0,
    pageSize = 10,
    orderType,
    currency,
  ) {
    return new Promise((resolve, reject) => {
      const params = {
        page: page,
        size: pageSize,
        orderBy: orderType,
        currency: currency,
      };

      api
        .get(constroller + endpoints.USERID + id, { params: params })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (!error.response.data.message && error.response.status === 403) {
            // Refrescar token
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

  static async patchTransactionDescription(id, description) {
    return new Promise((resolve, reject) => {
      const body = {
        description: description,
      };

      api
        .patch(constroller + "/" + id, body)
        .then((response) => {
          toast.success("Descripción actualizada con éxito!", toastOptions);
          resolve(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (!error.response.data.message && error.response.status === 403) {
            // Refrescar token
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
