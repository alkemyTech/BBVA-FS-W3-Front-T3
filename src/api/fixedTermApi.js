import api from "./axios.js";

const constroller = "/fixedTerm";
export class FixedTermApi {
  static async simulate(data) {
    return api.post(constroller + "/simulate", data);
  }
}
