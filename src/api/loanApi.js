import api from "./axios.js";
import { toast } from "react-toastify";

const constroller = "/loan";
const toastOptions = {
  position: "top-center",
  autoClose: 3000,
  closeOnClick: true,
  draggable: false,
};

export class Loan {
static async simulate(data) {
    return new Promise((resolve, reject) => {
      api
        .post(constroller + "/simulate", data)
        .then((response) => {
          
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error)
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