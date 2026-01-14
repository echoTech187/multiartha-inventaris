const AuthModel = require('../model/Auth');
const { generateToken, authenticateToken, verifyToken, destroyToken } = require('../../libraries/utils');
const { comparePassword } = require('../../libraries/password');
class AuthController {
    async login(req, res) {
        const { username, password } = req.body;
        const userExists = await AuthModel.getUserByUsername(username);
        if (!userExists) {
            return res.status(404).json({ success: false, message: 'Akun tidak ditemukan', responseText: 'USER_NOT_FOUND' });
        }
        const passwordMatch = await comparePassword(password, userExists.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Password salah', responseText: 'WRONG_PASSWORD' });
        }
        const token = await generateToken(userExists);
        if (!token) {
            return res.status(401).json({ success: false, message: 'Akses ditolak', responseText: 'ACCESS_DENIED' });
        } else {
            return res.status(200).json({ success: true, token: token, user: userExists.fullname, responseText: 'OK', message: 'Login berhasil', description: `Selamat datang di MultiArtha ${userExists.fullname}` });
        }
    }

    async userInfo(req, res) {
        const authorization = authenticateToken(req, res);
        if (!authorization) {
            return res.status(401).json({ success: false, message: 'Akses ditolak, token tidak valid', responseText: 'UNAUTHORIZED' });
        }
        try {
            const userAuth = await verifyToken(req.header('Authorization').split(' ')[1]);
            const { username } = userAuth.user;
            const userExists = await AuthModel.getUserByUsername(username);
            if (userExists.length === 0) {
                return res.status(404).json({ success: false, message: 'Akun tidak ditemukan', responseText: 'USER_NOT_FOUND' });
            } else {
                const userDisplay = {
                    slug: userExists.slug,
                    fullname: userExists.fullname,
                    username: userExists.username,
                    email: userExists.email,
                    role: userExists.role,
                    avatar: userExists.avatar
                };
                return res.status(200).json({
                    success: true, user: userDisplay, responseText: 'OK'
                });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }
    }

    async authStatus(req, res) {
        const authorization = authenticateToken(req, res);
        if (!authorization) {
            return res.status(401).json({ success: false, message: 'Akses ditolak, token tidak valid', responseText: 'UNAUTHORIZED' });
        }
        try {
            const userAuth = await verifyToken(req.header('Authorization').split(' ')[1]);
            const { username } = userAuth.user;
            const userExists = await AuthModel.getUserByUsername(username);
            if (userExists.length === 0) {
                return res.status(404).json({ success: false, message: 'Akun tidak ditemukan', responseText: 'USER_NOT_FOUND' });
            } else {
                return res.status(200).json({ success: true, responseText: 'OK' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }
    }

}

module.exports = new AuthController();