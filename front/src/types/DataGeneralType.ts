export type DataGeneralType = {
  fecha: string;
  libroDiario?: any; // Mejora esto según tu tipo real
  libroMayor?: any;
  balanceGeneral: {
    header: {
      numero: number;
      descripcion: string;
      fecha: string;
      tipoAsiento: string;
    };
    totalActivos: number;
    totalPasivos: number;
    totalCapital: number;
    detalle: {
      activos: { concepto: string; valor: number }[];
      pasivos: { concepto: string; valor: number }[];
      capital: { concepto: string; valor: number }[];
    };
  };
  mayor: any; // o el tipo de tu componente Mayor
};

export type DatasGeneralesType = DataGeneralType[]