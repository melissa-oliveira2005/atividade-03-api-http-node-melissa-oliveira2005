//Código do servidor
import http from 'http';
import getRawBody from 'raw-body';

//Variação 3 > recurso/requerimentos
const hostname = '127.0.0.1';
const PORT = 3000;
const recurso = '/health';

let requerimentos = [];
let nextId = 1;

function sendJsonResponse(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Servidor rodando!' }));

    if (req.method === 'GET' && req.url === '/health') {
        return sendJsonResponse(res, 200, { status: 'ativo' });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});