import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import component from './components.json' assert { type: 'json' }; 
import specification from './openapi.json' assert { type: 'json' }; 

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Project Backend API',
            version: '1.0.0',
            description: 'APIs for the My Project backend',
        },
        servers: [
            {
                url: 'http://localhost:3000/v1',
                description: 'Dev server',
            },
        ],
        paths: specification.paths,
        components: component.components,
    },
    apis: ['routes/*.js'],
};

const swaggerDocsV1 = swaggerJsDoc(swaggerOptions);

export default swaggerDocsV1;
