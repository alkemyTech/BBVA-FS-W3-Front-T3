import api from "./axios.js";
import { toast } from "react-toastify";

const controller = "/trading";
const toastOptions = {
  position: "top-center",
  autoClose: 3000,
  closeOnClick: true,
  draggable: false,
};
export default class TradeApi {
  static async simulateDollarPurchase(amount) {
    var body = {
      amountInPesos: amount,
      dollarType: "OFICIAL",
    };
    return new Promise((resolve, reject) => {
      api
        .post(`${controller}/simulateDollarPurchase`, body)
        .then((response) => resolve(response.data))
        .catch((error) => {
          toast.error(error.response.data.message, toastOptions);
          reject(error);
        });
    });
  }

  static async dollarPurchase(amount) {
    var body = {
      amountInPesos: amount,
      dollarType: "OFICIAL",
    };
    return new Promise((resolve, reject) => {
      api
        .post(`${controller}/dollarPurchase`, body)
        .then((response) => resolve(response.data))
        .catch((error) => {
          toast.error(error.response.data.message, toastOptions);
          reject(error);
        });
    });
  }
}
