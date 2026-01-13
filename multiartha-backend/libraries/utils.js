const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};

const authenticateToken = (req, res) => {
    const header = req.header('Authorization');
    const token = header && header.split(' ')[1];
    if (!token) {
        return false;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (req.fullname !== decoded.fullname) {
            return false;
        } else {
            return true;
        }

    } catch (error) {
        return false;
    }
};

const destroyToken = (req) => {
    const tokenStore = req.header('Authorization');
    const token = tokenStore && tokenStore.split(' ')[1];
    if (!token) {
        return false;
    }
    return jwt.verify(token);
};
module.exports = { generateToken, verifyToken, authenticateToken, destroyToken };