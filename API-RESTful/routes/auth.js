const express = require('express');
const router = express.Router();
const {
  register,
  login,
  refreshToken
} = require('../controllers/authController');
const {
  registerValidation,
  loginValidation,
  refreshTokenValidation
} = require('../middleware/validation');
const authenticateToken = require('../middleware/auth');

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/refresh', refreshTokenValidation, refreshToken);

// Protected route example
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Protected route accessed successfully',
    user: req.user
  });
});


module.exports = router;

