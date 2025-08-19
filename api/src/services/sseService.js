const clients = new Map();

function registerClient(userId, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control':  'no-cache',
    Connection:       'keep-alive',
  });
  res.write('\n');
  clients.set(userId, res);
  res.req.on('close', () => clients.delete(userId));
}

function sendEvent(userId, eventName, payload) {
  const res = clients.get(userId);
  if (!res) return;
  res.write(`event: ${eventName}\n`);
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

module.exports = { registerClient, sendEvent };
