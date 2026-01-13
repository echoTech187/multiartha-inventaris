const { userModel } = require('../model/User');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      res.status(200).json({ success: true, users: users, responseText: 'OK' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
    }
  }
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.getUserById(id);
        if (!user) {    
            res.status(404).json({ success: false, message: 'Akun tidak ditemukan', responseText: 'USER_NOT_FOUND' });
        } else {
            res.status(200).json({ success: true, user: user, responseText: 'OK' });
        }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
    }
  }

    async createUser(req, res) {
        try {
            const { fullname, username, email, password, role_id } = req.body;
            
            const newUser = await userModel.createUser({ fullname, username, email, password, role_id });
            res.status(201).json({ success: true, user: newUser, responseText: 'USER_CREATED' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deletedUser = await userModel.deleteUser(id);
            if (!deletedUser) {
                res.status(404).json({ success: false, message: 'Akun tidak ditemukan', responseText: 'USER_NOT_FOUND' });
            } else {
                res.status(200).json({ success: true, message: 'Akun berhasil dihapus', responseText: 'USER_DELETED' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }
    }
}

module.exports = new UserController();