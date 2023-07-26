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
          }
          toast.error("Contraseña inválida", toastOptions);
          reject(true);
        });
    });
  }
}
