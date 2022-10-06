import axios from "axios";
import { environment } from "../environment";

class ExchangeRateService {
  private baseURL: string = "https://v6.exchangerate-api.com/v6";

  getCurrenciesCodes() {
    return axios.get(`${this.baseURL}/${environment.EXCHANGE_RATE_KEY}/codes`);
  }
}

export { ExchangeRateService };
