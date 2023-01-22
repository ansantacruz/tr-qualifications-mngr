import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { executeSQL } from '../database/database';
import { MessageError } from '../utilities/DebugUtilities';
//Model
import { IBuyerQualificationResponse } from '../model/Response/IBuyerQualificationResponse';
import {IBuyyerAddQualificationRequest} from '../model/Request/IBuyerAddQualificationRequest';
import {IBuyerAddQualificationResponse} from '../model/Response/IBuyerAddQualificationResponse';

const debug = debugLib('tc:BuyerQualificationDataSource');

export default class BuyerQualificationDataSource {


    public static readonly getBuyerQualification = async (idBuyer : number): Promise<IBuyerQualificationResponse> => {
        debug('Starts the database query of the search configuration');
        try {
            const rqUid = 'test';
            const result = await executeSQL(
                `select ven_id as idVendedor, CONCAT(venUsu.usu_nombre, ' ', venUsu.usu_apellido) as nombreVendedor, com_id as idComprador , CONCAT(comUsu.usu_nombre, ' ', comUsu.usu_apellido) as nombreComprador ,cco_descripcion as comentario , tca_descripcion as calificacion , tca_valor as porcentajeCalificacion,  DATE(cco_fechaCreacion) as fechaComentario  from tr_data_base.calificacion_comprador
                inner join tr_data_base.vendedor on cco_vendedor = ven_id
                inner join tr_data_base.comprador on cco_comprador = com_id
                inner join tr_data_base.usuario as venUsu on ven_usuario = venUsu.usu_id
                inner join tr_data_base.tipo_calificacion on cco_tipoCalificacion = tca_id
                inner join tr_data_base.usuario as comUsu on com_usuario = comUsu.usu_id
                where cco_comprador = $idBuyer;`,
                QueryTypes.SELECT,
                {idBuyer}
            );
            if (result) {
                return Promise.resolve(result);
            } else {
                debug(`[%s] ${MessageError}`, rqUid, '404 tr_data_base'); // Ajustar el nombre de la base de datos
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'select_calificacion_comprador-404-DB',
                    Reason: 'BD error tr_data_base', // Ajustar el nombre de la base de datos
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'select_calificacion_comprador', Reason: err });
        }
    }

    public static readonly addBuyerQualification = async (dataRequest : IBuyyerAddQualificationRequest): Promise<IBuyerAddQualificationResponse> => {
        try {
            let idVendedor = dataRequest.idVendedor;
            let idComprador = dataRequest.idComprador;
            let idTipoComentario = dataRequest.idTipoComentario;
            let comentario = dataRequest.comentario;
            const rqUid = 'test';
            const result = await executeSQL(
                `INSERT INTO tr_data_base.calificacion_comprador (cco_comprador, cco_descripcion, cco_tipoCalificacion, cco_fechaCreacion, cco_vendedor,cco_activo) VALUES ($idComprador, $comentario, $idTipoComentario, now(), '1', $idVendedor);`,
                QueryTypes.INSERT,
                {idComprador,comentario,idTipoComentario,idVendedor}
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
                debug(`[%s] ${MessageError}`, rqUid, '404 tr_data_base'); // Ajustar el nombre de la base de datos
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'add-calificacion_comprador-404-DB',
                    Reason: 'BD error tr_data_base', // Ajustar el nombre de la base de datos
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'add-calificacion_comprador', Reason: err });
        }
    }
}