import api from "./axios.js";
import { toast } from "react-toastify";
const controller = "/users";
export default class UsersApi {
  static async deleteUser(id) {
    return new Promise((resolve, reject) => {
      api
        .delete(controller + `/${id}`)
        .then((response) => {
          localStorage.clear();
          toast.warn("Tu cuenta ha sido eliminada", {
            position: "top-center",
            autoClose: 3000,
          });
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  }

  static async updateUser(id, data) {
    return new Promise((resolve, reject) => {
      api
        .patch(controller + "/" + id, data)
        .then((response) => {
          toast.success("Tu cuenta ha sido actualizada", {
            position: "top-center",
            autoClose: 3000,
          });
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  }
}
