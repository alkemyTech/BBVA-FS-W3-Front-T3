import api from "./axios.js";
import { toast } from "react-toastify";

const controller = "/auth";
const toastOptions = {
  position: "top-center",
  autoClose: 3000,
  closeOnClick: true,
  draggable: false,
};
export default class AuthApi {
  static async login(values) {
    return new Promise((resolve, reject) => {
      api
        .post(controller + "/login", {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          toast.success("Logged In", toastOptions);
          resolve(res.data);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data.errors.includes("USER_NOT_FOUND")
          ) {
            toast.error(
              "No tienes cuenta. Deberías registrarte primero",
              toastOptions,
            );
            reject(false);
          } else {
            toast.error("Contraseña inválida", toastOptions);
            reject(true);
          }
        });
    });
  }
  static async register(values) {
    return new Promise((resolve, reject) => {
      api
        .post(controller + "/register", {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        })
        .then(() => {
          toast("Registro exitoso", { type: "success", autoClose: 2000 });
          resolve(true);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data.errors.includes("DUPLICATED_VALUE")
          ) {
            toast("Ya existe cuenta con ese email. Logeate", {
              type: "warning",
              autoClose: 2000,
            });
            reject(true);
          } else if (
            error.response &&
            error.response.data.errors.includes("INVALID_VALUE")
          ) {
            toast(
              "Campo " + error.response.data.data + "invalido",
              error.response.data.err,
            );
            reject(false);
          } else {
            toast(" Contraseña invalida", { type: "error", autoClose: 2000 });
            reject(false);
          }
        });
    });
  }
}
