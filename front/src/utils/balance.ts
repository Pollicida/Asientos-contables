import { BalanceType } from "../types/BalanceType";
import esActivo from "./tiposCuentas";
import { esPasivo } from "./tiposCuentas";
import { AsientoType } from "../types/AsientosType";
import balanceInicial from "./balanceInicial";

const generarBalanceGeneral = (cuentas: AsientoType, balanceAnterior: BalanceType = balanceInicial): BalanceType => {
    // Clonar balanceAnterior para evitar modificar el original
    const balance: BalanceType = { ...balanceAnterior };
    console.log("Antes: ", balance);
  
    cuentas.forEach(({ concepto, debe, haber }) => {
      const esAumento = Number(debe) > 0;
      let tipoCuenta = esActivo(concepto) ? "Activo" : esPasivo(concepto) ? "Pasivo" : "Capital";
      let cuentaEncontrada;
  
      // Aseguramos que los valores siempre sean números
      const debeValor = Number(debe); // Convertir a número
      const haberValor = Number(haber); // Convertir a número
  
      // Procesar cuentas tipo "Activo"
      if (tipoCuenta === "Activo") {
        cuentaEncontrada = balance.detalle.activos.find(cuenta => cuenta.concepto === concepto);
        if (cuentaEncontrada) {
          cuentaEncontrada.valor = Number(cuentaEncontrada.valor) + (esAumento ? debeValor : -haberValor);
        } else {
          balance.detalle.activos.push({ concepto, valor: debeValor });
        }
      }
  
      // Procesar cuentas tipo "Pasivo"
      if (tipoCuenta === "Pasivo") {
        cuentaEncontrada = balance.detalle.pasivos.find(cuenta => cuenta.concepto === concepto);
        if (cuentaEncontrada) {
          cuentaEncontrada.valor = Number(cuentaEncontrada.valor) + (esAumento ? -debeValor : haberValor);
        } else {
          balance.detalle.pasivos.push({ concepto, valor: haberValor });
        }
      }
  
      // Procesar cuentas tipo "Capital"
      if (tipoCuenta === "Capital") {
        cuentaEncontrada = balance.detalle.capital.find(cuenta => cuenta.concepto === concepto);
        if (cuentaEncontrada) {
          cuentaEncontrada.valor = Number(cuentaEncontrada.valor) + (esAumento ? -debeValor : haberValor);
        } else {
          balance.detalle.capital.push({ concepto, valor: haberValor });
        }
      }
    });
  
    // Aseguramos que los totales se calculen correctamente con valores numéricos
    balance.totalActivos = balance.detalle.activos.reduce((sum, cuenta) => sum + Number(cuenta.valor), 0);
    balance.totalPasivos = balance.detalle.pasivos.reduce((sum, cuenta) => sum + Number(cuenta.valor), 0);
    balance.totalCapital = balance.detalle.capital.reduce((sum, cuenta) => sum + Number(cuenta.valor), 0);
  
    console.log("Despues: ", balance);
    return balance;
  };
  
  export default generarBalanceGeneral;