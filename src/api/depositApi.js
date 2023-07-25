import api from "./axios.js";
import { toast } from "react-toastify";

const constroller = "/transactions";
const toastOptions = {
  position: "top-center",
  autoClose: 3000,
  closeOnClick: true,
  draggable: false,
};
const endpoint = "/deposit"
export class DepositApi {
  static async deposit(data) {
    return new Promise((resolve, reject) => {
      api
        .post(constroller + endpoint, data)
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
}
