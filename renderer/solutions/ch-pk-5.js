import { obolochkaPk } from "./ch-pk-6.js";
import { pattern, invalidInputMsg, overLimitMsg, checkLimits, pow } from "./helper.js";

export const isShefferFunctionPk = input => {
    let [ k, n, value ] = input.split(pattern);

    if (!k || !n || !value) return invalidInputMsg;

    k = Number(k); n = Number(n);

    if (value.length !== pow(k, n)) return invalidInputMsg;

    if (n !== 2) return "В этой задаче во всех тестах n = 2";
    if (k > 10) return overLimitMsg;

    const obolochka = obolochkaPk(input);

    if (obolochka.length - 1 === pow(k, k)) return 1;

    return 0;
}