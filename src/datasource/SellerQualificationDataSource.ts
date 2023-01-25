import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { executeSQL } from '../database/database';
import { MessageError } from '../utilities/DebugUtilities';
//model
import { ISellerQualificationResponse } from '../model/Response/ISellerQualificationResponse';
import { ISellerAddQualificationRequest } from '../model/Request/ISellerAddQualificationRequest';
import { ISellerAddQualificationResponse } from '../model/Response/ISellerAddQualificationResponse';

const debug = debugLib('tc:SellerQualificationDataSource');

export default class SellerQualificationDataSource {

    public static readonly getSellerQualification = async (idSeller : number): Promise<ISellerQualificationResponse> => {
        debug('Starts the database query of the search configuration');
        try {
            const rqUid = 'test';
            const result = await executeSQL(
                `select ven_id as idVendedor, CONCAT(venUsu.usu_nombre, ' ', venUsu.usu_apellido) as nombreVendedor, com_id as idComprador , CONCAT(comUsu.usu_nombre, ' ', comUsu.usu_apellido) as nombreComprador ,cve_descripcion as comentario , tca_descripcion as calificacion , tca_valor as porcentajeCalificacion,  DATE(cve_fechaCreacion) as fechaComentario  
                from tr_data_base.calificacion_vendedor 
                inner join tr_data_base.vendedor on cve_vendedor = ven_id 
                inner join tr_data_base.comprador on cve_comprador = com_id 
                inner join tr_data_base.usuario as venUsu on ven_usuario = venUsu.usu_id 
                inner join tr_data_base.tipo_calificacion on cve_tipoCalificacion = tca_id 
                inner join tr_data_base.usuario as comUsu on com_usuario = comUsu.usu_id
                where cve_vendedor= $idSeller;`,
                QueryTypes.SELECT,
                {idSeller}
            );
            if (result) {
                return Promise.resolve(result);
            } else {
                debug(`[%s] ${MessageError}`, rqUid, '404 tr_data_base'); // Ajustar el nombre de la base de datos
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'select-calificacion_vendedor-404-DB',
                    Reason: 'BD error tr_data_base', // Ajustar el nombre de la base de datos
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'select-calificacion_vendedor', Reason: err });
        }
    }


    public static readonly addSellerQualification = async (dataRequest : ISellerAddQualificationRequest): Promise<ISellerAddQualificationResponse> => {
        try {
            let idVendedor = dataRequest.idVendedor;
            let idComprador = dataRequest.idComprador;
            let idTipoComentario = dataRequest.idTipoComentario;
            let comentario = dataRequest.comentario;
            const rqUid = 'test';
            const result = await executeSQL(
                `INSERT INTO tr_data_base.calificacion_vendedor (cve_vendedor, cve_descripcion, cve_tipoCalificacion, cve_fechaCreacion, cve_comprador,cve_activo) VALUES ($idVendedor, $comentario, $idTipoComentario,  now(), $idComprador, '1');`,
                QueryTypes.INSERT,
                {idVendedor,comentario,idTipoComentario,idComprador}
            );
            if (result) { 
                console.log("resultado",result);
                 const response = {
                    operationStatus: true,
                    operationCode: "0000",
                    operationMessage:"operacion exitosa"
                };
                return Promise.resolve(response);
            } else {
                console.log("Entra a error 1");
                debug(`[%s] ${MessageError}`, rqUid, '404 tr_data_base'); // Ajustar el nombre de la base de datos
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'add-calificacion_vendedor-404-DB',
                    Reason: 'BD error tr_data_base', // Ajustar el nombre de la base de datos
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            console.log("Entra a error 1");
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'add-calificacion_vendedorr', Reason: err });
        }
    }
}