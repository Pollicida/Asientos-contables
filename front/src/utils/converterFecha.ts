export function FormatearFecha(fechaISO: string){
    const fecha = new Date(fechaISO);
    
    // Opciones para formatear la fecha en español
    const opciones: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    
    // Convertir la fecha al formato "12 de marzo de 2025"
    const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
    return fechaFormateada
}
