import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { executeSQL } from '../database/database';
import { MessageError } from '../utilities/DebugUtilities';
import { ISellerQualificationResponse } from '../model/Response/ISellerQualificationResponse';


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
                debug(`[%s] ${MessageError}`, rqUid, '404 NOMBRE BASE DE DATOS '); // Ajustar el nombre de la base de datos
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'select-calificacion_vendedor-404-DB',
                    Reason: 'BD error NOMBRE BASE DE DATOS', // Ajustar el nombre de la base de datos
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'select-calificacion_vendedor', Reason: err });
        }
    }
}