
const db = require('../../config/server');
class AuthModel {
    async getUserByUsername(username) {

        const query = 'SELECT a.*, b.role_name as role FROM users a INNER JOIN roles b ON a.role_id = b.id WHERE a.username = ?';
        const [rows] = await db.execute(query, [username]);
        return rows[0];
    }
}

module.exports = new AuthModel();