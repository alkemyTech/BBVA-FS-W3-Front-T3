import api from "./axios.js";

const constroller = "/accounts";
const balanceEndpoint = "/balance";


export class AccountApi {
  static async balance () {
    return api.get(constroller + balanceEndpoint).then((response) => {
      console.log(response)});
  }


  static async accountInfo (id) {
    return api.get(constroller + `/${id}`).catch((error) => {
      console.log(error)});
  }
}