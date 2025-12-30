const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
// We import your actual app to test endpoints
// Ensure you export app from server.js (module.exports = app)
const app = require('../server'); 

let mongoServer;

beforeAll(async () => {
    await mongoose.disconnect(); 
    
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});


afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User Auth & Management Tests', () => {
    
    // 1. Model Logic: Password Hashing
    test('Should hash password when saving user', async () => {
        const user = new User({ 
            fullName: 'Test User', 
            email: 'hash@test.com', 
            password: 'password123' 
        });
        await user.save();
        expect(user.password).not.toBe('password123');
    });

    // 2. Model Logic: Default Values
    test('Should set default role and status', async () => {
        const user = new User({ 
            fullName: 'Role Test', 
            email: 'role@test.com', 
            password: 'password123' 
        });
        expect(user.role).toBe('user');
        expect(user.status).toBe('active');
    });

    // 3. API: Registration Flow
    test('POST /api/auth/signup - Success', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                fullName: 'New User',
                email: 'new@test.com',
                password: 'password123'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
    });

    // 4. API: Validation Check
    test('POST /api/auth/signup - Fail on duplicate email', async () => {
        await User.create({ fullName: 'Existing', email: 'dup@test.com', password: 'password123' });
        const res = await request(app)
            .post('/api/auth/signup')
            .send({ fullName: 'New', email: 'dup@test.com', password: 'password123' });
        expect(res.statusCode).toBe(400);
    });

    // 5. API: Login Security
    test('POST /api/auth/login - Fail with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'new@test.com', password: 'wrongpassword' });
        expect(res.statusCode).toBe(401);
    });

    // 6. Security: Protected Route Access
    test('GET /api/users - Should block unauthorized users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(401); // No token provided
    });

    // 7. Admin Logic: Status Change Check
    test('Admin should be able to toggle user status', async () => {
        const user = await User.create({ 
            fullName: 'To Deactivate', 
            email: 'deact@test.com', 
            password: 'password123' 
        });
        user.status = 'inactive';
        await user.save();
        const updatedUser = await User.findOne({ email: 'deact@test.com' });
        expect(updatedUser.status).toBe('inactive');
    });
});