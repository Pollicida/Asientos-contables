const esActivo = (cuenta: string): boolean => {
    return [
        "Caja",
        "Banco",
        "Inventario",
        "Edificio",
        "Inventarios - Materia en proceso",
        "Inventarios - Materia prima",
        "Inventarios - Producto terminado",
        "Rentas pagadas por anticipado",
        "Papelería",
        "Gastos generales",
        "Iva acreditable",
        "Iva por acreditar",
        "Terreno",
        "Pagos anticipados",
        "Maquinaria",
    ].includes(cuenta);
};

export const esPasivo = (cuenta: string): boolean => {
    return [
        "Proveedores",
        "Documentos por pagar",
        "Acreedores hipotecarios",
        "Anticipo cliente",
        "Iva trasladado",
    ].includes(cuenta);
};

export default esActivo;