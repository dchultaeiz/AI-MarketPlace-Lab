const { app } = require('@azure/functions');

app.http('demoInfo', {
    methods: ['GET', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        // Respuesta al preflight CORS
        if (request.method === 'OPTIONS') {
            return {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            };
        }

        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:5173'
            },
            jsonBody: {
                app: "AI Marketplace Lab",
                status: "OK",
                service: "Azure Function",
                database: "H2 in-memory",
                message: "Demo cloud operativa",
                timestamp: new Date().toISOString()
            }
        };
    }
});