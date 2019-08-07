const normalizePort = val => {
  const portVal = parseInt(val);

  if (isNaN(portVal)) return val;

  if (portVal >= 0) {
    return portVal;
  }

  return false;
};

const onError = error => {
  if (![error.syscall].includes('listen')) throw error;

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  switch(error.code) {
    case 'EACESS':
      console.error(bind, ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind, ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe' + addr
    : 'port' + addr.port;

    debug('Listening on ' + bind);
};

//
const app = require('./app');
const http = require('http');
const debug = require('debug')('nodestr:server');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('server rodando na porta ', port);