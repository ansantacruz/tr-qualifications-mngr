import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { executeSQL } from '../database/database';
import { MessageError } from '../utilities/DebugUtilities';
import { IBuyerQualificationResponse } from '../model/Response/IBuyerQualificationResponse';


const debug = debugLib('tc:BuyerQualificationDataSource');

export default class BuyerQualificationDataSource {


    public static readonly getBuyerQualification = async (): Promise<IBuyerQualificationResponse> => {
        debug('Starts the database query of the search configuration');
        try {
            const rqUid = 'test';
            const result = await executeSQL(
                `select ven_id as idVendedor, CONCAT(venUsu.usu_nombre, ' ', venUsu.usu_apellido) as nombreVendedor, com_id as idComprador , CONCAT(comUsu.usu_nombre, ' ', comUsu.usu_apellido) as nombreComprador ,cco_descripcion as comentario , tca_descripcion as calificacion , tca_valor as porcentajeCalificacion,  DATE(cco_fechaCreacion) as fechaComentario  from tr_data_base.calificacion_comprador
                inner join tr_data_base.vendedor on cco_vendedor = ven_id
                inner join tr_data_base.comprador on cco_comprador = com_id
                inner join tr_data_base.usuario as venUsu on ven_usuario = venUsu.usu_id
                inner join tr_data_base.tipo_calificacion on cco_tipoCalificacion = tca_id
                inner join tr_data_base.usuario as comUsu on com_usuario = comUsu.usu_id;`,
                QueryTypes.SELECT,
                {}
            );
            if (result) {
                return Promise.resolve(result);
            } else {
                debug(`[%s] ${MessageError}`, rqUid, '404 NOMBRE BASE DE DATOS '); // Ajustar el nombre de la base de datos
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'SELECT-SEARCH_CONFIG-ENTITY-404-DB',
                    Reason: 'BD error NOMBRE BASE DE DATOS', // Ajustar el nombre de la base de datos
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH_CONFIG-ENTITY', Reason: err });
        }
    }
}