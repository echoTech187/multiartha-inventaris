const UserModel = require('../model/User');
const { hashPassword } = require('../../libraries/password');

class UserController {
    async getAllUsers(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 5;
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * limit;

            const search = req.query.search || '';

            const users = await UserModel.getAllUsers(limit, offset, search);
            return res.status(200).json({ success: true, data: users.data, responseText: 'OK', total: users.total, pageLength: limit, currentPage: offset, totalPage: Math.ceil(users.total / limit) });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message, responseText: 'SERVER_ERROR' });
        }
    }
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserModel.getUserById(id);
            if (!user) {
                return res.status(404).json({ success: false, message: 'Akun tidak ditemukan', responseText: 'USER_NOT_FOUND' });
            } else {
                return res.status(200).json({ success: true, user: user, responseText: 'OK' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }
    }

    async createUser(req, res) {
        try {
            const { fullname, username, email, password, confirmPassword, role } = req.body;
            if (password !== confirmPassword) return res.status(400).json({ success: false, message: 'Password tidak cocok', responseText: 'PASSWORD_NOT_MATCH' });

            const newPassword = await hashPassword(password);
            const newUser = await UserModel.createUser({ fullname, username, email, newPassword, role });
            return res.status(201).json({ success: true, user: newUser, responseText: 'USER_CREATED' });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ success: false, message: error.message, responseText: 'SERVER_ERROR' });
            }
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }
    }
    async updateUser(req, res) {
        try {
            const { slug } = req.params;
            const { fullname, username, email, password, role } = req.body;

            const userExists = await UserModel.getUserBySlug(slug);

            if (!userExists) {
                return res.status(404).json({ success: false, message: 'Akun tidak ditemukan', responseText: 'USER_NOT_FOUND' });
            } else {
                let pass = '';
                if (password !== undefined) {
                    const newPassword = await hashPassword(password);
                    pass = newPassword;
                } else {
                    pass = userExists.password
                }
                const updatedUser = await UserModel.updateUser(slug, { fullname, username, email, pass, role });
                return res.status(200).json({ success: true, user: updatedUser, responseText: 'USER_UPDATED' });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ success: false, message: error.message, responseText: 'SERVER_ERROR' });
            }
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }
    }

    async updateRole(req, res) {
        try {
            const { slug } = req.params;
            const { role } = req.body;
            const updatedUser = await UserModel.updateRole(slug, role);
            if (!updatedUser) {
                return res.status(404).json({ success: false, message: 'Akun tidak ditemukan', responseText: 'USER_NOT_FOUND' });
            } else {
                return res.status(200).json({ success: true, user: updatedUser, responseText: 'USER_ROLE_UPDATED' });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ success: false, message: error.message, responseText: 'SERVER_ERROR' });
            }
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }
    }

    async deleteUser(req, res) {
        try {
            const { slug } = req.params;
            const deletedUser = await UserModel.deleteUser(slug);
            if (!deletedUser) {
                return res.status(404).json({ success: false, message: 'Akun tidak ditemukan', responseText: 'USER_NOT_FOUND' });
            } else {
                return res.status(200).json({ success: true, message: 'Akun berhasil dihapus', responseText: 'USER_DELETED' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }
    }
}

module.exports = new UserController();