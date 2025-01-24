import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import passport from 'passport';
import { connectDB } from './db.js';
import { userRouter } from './api/v1/routes/admin/user.js';
import { loginRouter } from './api/v1/routes/admin/login.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './api/v1/swagger/swaggersDocs.js'; 
import cors from 'cors';
import { vegetableRouter } from './api/v1/routes/admin/vegetable.js';
import { vegetablesRouter } from './api/v1/routes/manager/vegetable.js';
import { adminAuthMiddleware } from './api/v1/middleware/adminAuthMiddleware.js';
import { managerAuthMiddleware } from './api/v1/middleware/managerAuthMiddleware.js';


dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(bodyParser.json()); // Use body-parser for JSON parsing
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize()); 
app.use(cors());// Initialize Passport.js

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(adminAuthMiddleware); 
app.use(managerAuthMiddleware); 

// Routes
app.use('/v1/admin', userRouter);
app.use('/v1/adminLogin', loginRouter);
app.use('/v1/admin/vegetable', vegetableRouter);
 app.use('/v1/manager/vegetable', vegetablesRouter); 

// Error handling for unsupported routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler for unexpected errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
