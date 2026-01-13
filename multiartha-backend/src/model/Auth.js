
const db = require('../../config/server');
class AuthModel {
    async getUserByUsername(username) {

        const query = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await db.execute(query, [username]);
        return rows[0];
    }
}

module.exports = new AuthModel();