export interface ISellerQualificationResponse {
    idVendedor: number;
    nombreVendedor: string;
    idComprador: number;
    nombreComprador: string;
    comentario: string;
    calificacion: String;
    porcentajeCalificacion: number;
    fechaComentario: Date;
}