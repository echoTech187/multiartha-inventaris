class UserModel {
    async getAllUsers() {
        const query = 'SELECT * FROM users';
        const [rows] = await db.execute(query);
        return rows;
    }

    async getUserById(id) {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }

    async createUser({ fullname, username, email, password, role_id }) {
        const query = 'INSERT INTO users (fullname, username, email, password, role_id) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [fullname, username, email, password, role_id]);
        return { id: result.insertId, fullname, username, email, password, role_id };
    }

    async deleteUser(id) {
        const query = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0;
    }

}

module.exports = new UserModel();