export interface IBuyerQualificationResponse {
    idVendedor: number;
    nombreVendedor: string;
    idComprador: number;
    nombreComprador: string;
    comentario: string;
    calificacion: string;
    porcentajeCalificacion: number;
    fechaComentario: Date;
}
