interface rows{
    concepto: string,
    debe: number,
    haber: number
}
type rowsType = rows[]

const detectarTipoAsiento = (rows:rowsType) => {
    const conceptos = rows.map(row => row.concepto.toLowerCase());
    const incluye = (cuenta: string) => conceptos.includes(cuenta.toLowerCase());

    if (incluye("Iva por acreditar") && incluye("Iva acreditable") && (incluye("Banco") || incluye("Caja")) && incluye("Documentos por pagar")) {
      return "Compra en efectivo y a crédito";
    } else if (incluye("Rentas pagadas por anticipado")) {
      return "Pago de rentas por anticipado";
    } else if ((incluye("Caja") || incluye("Banco")) && incluye("Iva acreditable") && !incluye("Iva por acreditar")) {
      return "Compra en Efectivo";
    } else if (incluye("Iva por acreditar")) {
      return "Compra a crédito";
    } else if (incluye("Caja") && incluye("Capital")) {
      return "Asiento de apertura";
    } else if (incluye("Anticipo cliente")) {
      return "Anticipo de clientes";
    } else if (incluye("Papelería")) {
      return "Compra de papelería";
    } else {
      return "Desconocido";
    }
  };

export default detectarTipoAsiento