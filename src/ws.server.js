
const ws = require('ws');
const logger = require('./utils/logger');

const PING_INTERVAL_MS = 10 * 1000; // 58 seconds

const message = (type, data) => Buffer.from(JSON.stringify({ type, data }));

/* eslint-disable no-param-reassign */
class WebSocketServer {
  /**
   * Creates a new web socket server instance
   *
   * @param { Object } server - a node.js http.Server instance
   * @param { String } path - accept socket upgrade requests on this path
   */
  constructor(server, path) {
    this.server = new ws.Server({
      server,
      path,
    });
    this.transmitted = 0;
    this.stateListeners = new Set();
    this.stateTimer = undefined;
    setTimeout(this.ping.bind(this), PING_INTERVAL_MS);
  }

  /**
   * Broadcasts a message to all connected clients
   *
   * @param { string } type - the event type broadcast
   * @param { Object } data - the event payload
   */
  async broadcast(type, data) {
    const msg = message(type, data);
    this.server.clients.forEach((socket) => {
      if (socket.readyState === ws.OPEN) {
        this.sendTo(socket, msg);
      }
    });
  }

  start() {
    this.server.on('connection', this.onConnection.bind(this));
  }

  onConnection(socket) {
    socket.isAlive = true;
    socket.on('pong', () => { socket.isAlive = true; });
    socket.on('error', () => { socket.terminate(); });
    this.emit('connected', {
      send: async (type, data) => this.sendTo(socket, message(type, data), { binary: true }),
      state: async state => this.sendTo(socket, state),
    });
    ws.send('something');
  }

  sendTo(socket, msg) {
    try {
      socket.send(msg, { binary: true });
      this.transmitted = this.transmitted + msg.byteLength;
    } catch (e) {
      logger.error(`failed to send to socket \n ${e}`);
    }
  }

  ping() {
    logger.info(`WebSocket Server: Total number of clients: ${this.server.clients.size}`);
    logger.info(`WebSocket Server: Total bytes transmitted: ${this.transmitted}`);
    this.server.clients.forEach((socket) => {
      if (socket.isAlive) {
        socket.isAlive = false;
        socket.ping();
      } else {
        socket.terminate();
        logger.info(`WebSocket client Disconnected. Total number of clients: ${this.server.clients.size}`);
      }
    });
    setTimeout(this.ping.bind(this), PING_INTERVAL_MS);
  }
}

module.exports = WebSocketServer;
