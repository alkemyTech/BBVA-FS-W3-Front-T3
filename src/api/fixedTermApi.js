import api from "./axios.js";
import { toast } from "react-toastify";

const constroller = "/fixedTerm";
const toastOptions = {
  position: "top-center",
  autoClose: 3000,
  closeOnClick: true,
  draggable: false,
};
export class FixedTermApi {
  static async simulate(data) {
    return new Promise((resolve, reject) => {
      api
        .post(constroller + "/simulate", data)
        .then((response) => {
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

  static async create(data) {
    return new Promise((resolve, reject) => {
      api
        .post(constroller, data)
        .then((response) => {
          toast.success("Plazo fijo realizado con éxito", toastOptions);
          resolve(response.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message, toastOptions);
          reject(error);
        });
    });
  }
}
