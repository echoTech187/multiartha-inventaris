const RoleModel = require('../model/Role');

class RoleController {
    async index(req, res) {
        try {
            const roles = await RoleModel.getAllRoles();
            return res.status(200).json({ success: true, responseText: 'OK', data: roles });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }
    }

}

module.exports = new RoleController();