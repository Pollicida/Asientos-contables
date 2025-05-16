import { useState } from "react";
import cuentas from "../utils/opciones";
import generarBalanceGeneral from "../utils/balance";
import { opcionesAsientos } from "../utils/opciones";
import { DataHeaderType } from "../types/DataHeaderType";
import { BalanceType } from "../types/BalanceType";
import { MayorType } from "../types/MayorType";
import { DataGeneralType } from "../types/DataGeneralType";
import generarCuentasT from "../utils/cuentasT";
import { sendData } from "../api/sendData";
import { AsientoType } from "../types/AsientosType";

const AsientoTable = ({ balanceAnterior, numeroAsientoAnterior, mayorAnterior }: { balanceAnterior: BalanceType, numeroAsientoAnterior: number, mayorAnterior: MayorType }) => {
  const [rows, setRows] = useState<AsientoType>([{ concepto: "", debe: 0, haber: 0 }]);
  const [data, setData] = useState<DataHeaderType>({ numero: numeroAsientoAnterior, descripcion: "", fecha: new Date().toISOString().split("T")[0], tipoAsiento: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Manejar cambios en la tabla
  const handleChange = (index: number, field: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
  };

  // Agregar una nueva fila
  const addRow = () => {
    setRows([...rows, { concepto: "", debe: 0, haber: 0 }]);
  };

  // Eliminar una fila
  const removeRow = (index: number) => {
    if (rows.length <= 1) {
      return;
    }
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  //Manejar los cambios de valores de la tabla
  const handleChangeData = (value: string | number, name: keyof DataHeaderType) => {
    const newData: DataHeaderType = { ...data };
    if (typeof value === "number" && name === "numero") {
      newData[name] = value;
    } else if (typeof value === "string" && (name === "descripcion" || name === "fecha" || name === "tipoAsiento")) {
      newData[name] = value;
    }
    setData(newData);
  };

  //Manejar la demostración del alert
  const handleAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  // Validación de cuentas no aperturadas y saldos negativos
  const validateRows = (): boolean => {
    for (const row of rows) {
      const cuentaEncontrada = balanceAnterior.detalle.activos.find(cuenta => cuenta.concepto === row.concepto) ||
        balanceAnterior.detalle.pasivos.find(cuenta => cuenta.concepto === row.concepto) ||
        balanceAnterior.detalle.capital.find(cuenta => cuenta.concepto === row.concepto);

      if (!cuentaEncontrada && (Number(row.debe) < 0 || Number(row.haber) < 0)) {
        setAlertMessage("Las cuentas no aperturadas no pueden tener saldos negativos.");
        handleAlert();
        return false;
      }
    }
    return true;
  };

  function handleSave() {
    const totalIzquierdo = rows.reduce((sum, cuenta) => sum + Number(cuenta.debe), 0)
    const totalDerecho = rows.reduce((sum, cuenta) => sum + Number(cuenta.haber), 0)
    const totalMonto = parseFloat(Number(totalIzquierdo).toFixed(2)) - parseFloat(Number(totalDerecho).toFixed(2))
    if (totalMonto !== 0) {
      setShowAlert(true);
      setAlertMessage("El asiento no está balanceado.");
      setTimeout(() => {
        setShowAlert(false)
      }, 3000);
      return;
    }
    if (!validateRows()) {
      return;
    }

    setShowSave(true);
  }

  function handleConfirmSave() {
    const datos: DataGeneralType = {
      dataHeader: {...data, numero: numeroAsientoAnterior +   1},
      asiento: rows,
      balance: generarBalanceGeneral(rows, balanceAnterior),
      mayor: generarCuentasT(data.numero, rows, mayorAnterior)
    };
    sendData(datos);
    setShowSave(false);
  }

  return (
    <div className=" shadow-md rounded-md w-full h-full flex flex-col items-end">
      <div className="w-full h-[100px] bg-[#9a76c6] p-6 flex items-center text-white gap-4">
        <h1 className="text-2xl font-medium mr-6 ml-11 mb-1">Asientos</h1>
        <div className="p-2 border rounded-md appearance-none outline-none w-[70px]">
          {numeroAsientoAnterior + 1}
        </div>
        <select
          value={data.tipoAsiento}
          onChange={(e) => handleChangeData(e.target.value, "tipoAsiento")}
          className="w-full flex-1/4 p-2 appearance-none border rounded-md outline-none bg-transparent"
        >
          <option className="text-gray-500" value="">
            Selecciona el tipo de asiento
          </option>
          {opcionesAsientos.map((opcion, index) => (
            <option key={index} value={opcion} className="text-black">{opcion}</option>
          ))}
        </select>
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={data.descripcion}
          onChange={(e) => handleChangeData(e.target.value, "descripcion")}
          className="w-[500px] p-2 border rounded-md appearance-none outline-none"
          required
        />
        <input
          name="fecha"
          type="date"
          value={data.fecha}
          onChange={(e) => handleChangeData(e.target.value, "fecha")}
          className="w-1/12 p-2 border rounded-md appearance-none outline-none"
          required
        />
        <div className="flex-1" />
        <button
          onClick={() => handleSave()}
          className="m-3 bg-[#8c69b7] text-white px-2 py-2 rounded-md transition-transform hover:scale-105 active:bg-[#a271df]"
        >
          Guardar Asiento
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2 w-1/2">Concepto</th>
            <th className="border border-gray-300 p-2 w-1/4">Debe</th>
            <th className="border border-gray-300 p-2 w-1/4">Haber</th>
            <th className="p-2 w-[70px]"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">
                <select
                  value={row.concepto}
                  onChange={(e) => handleChange(index, "concepto", e.target.value)}
                  className="w-full p-1 appearance-none border-none outline-none bg-transparent"
                >
                  <option className="text-gray-500" value="">
                    Selecciona un concepto
                  </option>
                  {cuentas.map((cuenta, index) => (
                    <option key={index} value={cuenta}>{cuenta}</option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={row.debe?.toString()}
                  onChange={(e) => Number(e.target.value) >= 0 && handleChange(index, "debe", e.target.value)}
                  className="w-full p-1 appearance-none border-none outline-none text-end"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={row.haber?.toString()}
                  onChange={(e) => Number(e.target.value) >= 0 && handleChange(index, "haber", e.target.value)}
                  className="w-full p-1 appearance-none border-none outline-none text-end"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  onClick={() => removeRow(index)}
                  className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-600 active:bg-red-800"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAlert && <div className="h-[50px] p-[20px] text-white bg-red-400 flex - items-center justify-center text-center rounded-2xl border-red-600 border-2 absolute top-10 left-1/2 transform -translate-x-1/2">
        {alertMessage}
      </div>
      }
      {showSave &&
        <div className="text-black text-2xl font-medium bg-gray-200 rounded-3xl w-[500px] h-[200px] shadow-2xs absolute inset-0 m-auto flex flex-col justify-center items-center gap-3 p-[40px] text-center">
          Asiento generado, ¿desea guardar los cambios?
          <div className="flex gap-4">
            <button
              onClick={handleConfirmSave}
              className="m-3 bg-green-500 text-white px-4 py-2 rounded-md transition-transform hover:scale-105 active:bg-green-600 hover:bg-green-400 text-xl"
            >
              Guardar
            </button>
            <button
              onClick={() => { setShowSave(false) }}
              className="m-3 bg-red-500 text-white px-4 py-2 rounded-md transition-transform hover:scale-105 hover:bg-red-400 active:bg-red-600 text-xl"
            >
              Cancelar
            </button>
          </div>
        </div>
      }
      <button
        onClick={addRow}
        className="m-3 bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-300 active:bg-blue-500"
      >
        Agregar movimiento
      </button>
    </div>
  );
};

export default AsientoTable;