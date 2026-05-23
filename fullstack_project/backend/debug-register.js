require('dotenv').config();
const connectDB = require('./config/db');
const controller = require('./controllers/authController');

(async () => {
  await connectDB();
  const req = {
    body: {
      username: 'debuguser',
      email: 'debug_' + Date.now() + '@example.com',
      password: 'TestPass123',
      phone: '1234567890'
    }
  };
  const res = {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; console.log('RESPONSE', this.statusCode, payload); return this; }
  };

  try {
    await controller.registerUser(req, res);
  } catch (err) {
    console.error('THREW', err);
  }
})();
