#!/usr/bin/env node

/**
 * Module dependencies.
 */
 import debugLib from 'debug';
 import http from 'http';
 import app from '../app';
 import { sequelizeMySQL } from '../database/database';

 const debug = debugLib('bdb:server');

 /**
  * Get port from environment and store in Express.
  */
 const port: string | number | false = normalizePort(process.env.PORT || '9084');
 app.set('port', port);
 debug('Port set to:', port);

 /**
  * Create HTTP server.
  */
 const server: http.Server | undefined = http.createServer(app);
 debug('Server created');

 /**
  * Listen on provided port, on all network interfaces.
  */
 server.listen(port);
 server.on('error', onError);
 server.on('listening', onListening);

 /**
  * Normalize a port into a number, string, or false.
  */
 function normalizePort(val: string) {
	 const nPort = parseInt(val, 10);
	 if (isNaN(nPort)) {
		 return val;
	 }
	 if (nPort >= 0) {
		 return nPort;
	 }
	 return false;
 }

 /**
  * Event listener for HTTP server 'error' event.
  */
 function onError(error: any) {
	 if (error.syscall !== 'listen') {
		 throw error;
	 }

	 const bind = typeof port === 'string'
		 ? `Pipe ${port}`
		 : `Port ${port}`;

	 // handle specific listen errors with friendly message
	 switch (error.code) {
		 case 'EACCES':
			 debug(`${bind} requires elevated privileges`);
			 process.exit(1);
			 break;
		 case 'EADDRINUSE':
			 debug(`${bind} is already in use`);
			 process.exit(1);
			 break;
		 default:
			 throw error;
	 }
 }

 /**
  * Event listener for HTTP server 'listening' event.
  */
 function onListening() {
	 const addr = (server as http.Server).address();
	 const bind = typeof addr === 'string'
		 ? `pipe ${addr}`
		 : `port ${(addr as any).port}`;
	 debug(`Listening on ${bind}`);
 }

 /**
  * Validate the connection with the database using the ORM
  */
 sequelizeMySQL
	 .authenticate()
	 .then()
	 .catch((err) => {
		 debug('Unable to connect to the database:', err);
	 });
