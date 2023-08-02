import api from "./axios.js";
import { toast } from "react-toastify";
const controller = "/users";
const toastOptions = {
  position: "top-center",
  autoClose: 3000,
  closeOnClick: true,
  draggable: false,
};
export default class UsersApi {
  static async deleteUser(id) {
    return new Promise((resolve, reject) => {
      api
        .delete(controller + `/${id}`)
        .then((response) => {
          localStorage.clear();
          toast.warn("Tu cuenta ha sido eliminada", toastOptions);
          resolve(response.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message, toastOptions);
          reject(error);
        });
    });
  }

  static async updateUser(id, data) {
    return new Promise((resolve, reject) => {
      api
        .patch(controller + "/" + id, data)
        .then((response) => {
          toast.success("Tu cuenta ha sido actualizada", toastOptions);
          resolve(response.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message, toastOptions);
          reject(error);
        });
    });
  }
}
