const db = require('../../config/server');

class RoleModel {
    async getAllRoles() {
        const query = 'SELECT * FROM roles';
        const [rows] = await db.execute(query);
        return rows;
    }
}

module.exports = new RoleModel();