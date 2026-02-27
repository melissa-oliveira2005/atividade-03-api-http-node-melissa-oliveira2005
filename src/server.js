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

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Servidor rodando!' }));

    if (req.method === 'GET' && req.url === '/health') {
        return sendJsonResponse(res, 200, { status: 'ativo' });
    };

    if (req.method === 'POST' && req.url === recurso) {
        return sendJsonResponse(res, 200, requerimentos);
    };

    if (req.method === 'POST' && req.url.startsWith(`${recurso}/`)) {
        const id = Number(req.url.split('/')[2]);
        const encontrado = requerimentos.find(r => r.id === id);

        if (!encontrado) {
            return sendJsonResponse(res, 404, { error: 'Requerimento não encontrado' });
        }
        return sendJsonResponse(res, 200, encontrado);
    };

    if (req.method === 'POST' && req.url === recurso) {
        try {
            const body = await getRawBody(req);
            const data = JSON.parse(body.toString());

            const {estudante, categoria, observacao} = data;

            if (!estudante || !categoria || !observacao) {
                return sendJsonResponse(res, 422, {erro: 'Campos obrigatórios: estudante, categoria, observacao'});
            }
            
            const novo = {
                id: nextId++,
                estudante,
                categoria,
                observacao
            };

            requerimentos.push(novo);
            return sendJson(res, 201, novo);
        } catch (err) {
            return sendJson(res, 400, { erro: 'JSON inválido'});
        }
    }

    return sendJson(res, 404, { erro: 'Rota não encontrada' });
                   
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});