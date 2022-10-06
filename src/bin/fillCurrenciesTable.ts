import { prisma } from "../prisma";
import { ExchangeRateService } from "../services/ExchangeRateService";

export async function fillCurrenciesTable() {
  if ((await prisma.currency.count()) === 0) {
    const exchangeRateService = new ExchangeRateService();
    const response = await exchangeRateService.getCurrenciesCodes();

    const { supported_codes } = response.data;

    supported_codes.forEach((item: string[]) => {
      const [code, name] = item;

      prisma.currency
        .create({
          data: {
            code,
            name,
          },
        })
        .catch(() => console.log(`${code} ----- ${name}`));
    });
  }
}
