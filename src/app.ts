import express from 'express';
import actuator = require('express-actuator');
import path from 'path';
import config from './config';
import BuyerQualificationController from './controllers/BuyerQualificationController';
import SellerQualificationController from './controllers/SellerQualificationController';


const app = express();
const apiPath = config.apiPath;
const fullApiPath = `${apiPath}/V1/`;

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../static')));

// Configurar cabeceras y cors
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // NOSONAR
    res.header('Access-Control-Allow-Headers', '*'); // NOSONAR
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // NOSONAR
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE'); // NOSONAR
    next(); // NOSONAR
});


// add the controllers you need here
app.use(
    actuator({
        basePath: '/management',
    })
);

app.use(fullApiPath,SellerQualificationController,BuyerQualificationController);

export default app;
