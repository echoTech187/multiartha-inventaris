const db = require('../../config/server');
const { v4: uuid } = require('uuid');
class UserModel {
    async getAllUsers(limit = 10, offset = 0, search = '') {
        const limitVal = Number(limit);
        const offsetVal = Number(offset);
        const query = `SELECT a.*, b.role_name as role FROM users a INNER JOIN roles b ON a.role_id = b.id ${search ? `WHERE a.fullname LIKE '%${search}%' OR a.username LIKE '%${search}%' OR a.email LIKE '%${search}%'` : ''} ORDER BY a.id DESC LIMIT ${limit} OFFSET ${offset}`;
        const [rows] = await db.execute(query, [limitVal, offsetVal]);
        const countQuery = 'SELECT COUNT(*) as total FROM users';
        const [countRows] = await db.execute(countQuery);
        const total = countRows[0].total;
        return {
            data: rows,
            total: total
        };
    }

    async getUserById(id) {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }

    async getUserBySlug(slug) {
        const query = 'SELECT * FROM users WHERE slug = ?';
        const [rows] = await db.execute(query, [slug]);
        return rows[0];
    }


    async createUser({ fullname, username, email, newPassword, role }) {
        const query = 'INSERT INTO users (slug,fullname, username, email, password, role_id,createdAt) VALUES (?,?, ?, ?, ?, ?,NOW())';
        const [result] = await db.execute(query, [uuid(), fullname, username, email, newPassword, Number(role)]);
        return { id: result.insertId, fullname, username, email, newPassword, role };
    }

    async updateUser(slug, { fullname, username, email, pass, role }) {
        const query = 'UPDATE users SET fullname = ?, username = ?, email = ?, password = ?, role_id = ?, updatedAt = NOW() WHERE slug = ?';
        const [result] = await db.execute(query, [fullname, username, email, pass, Number(role), slug]);
        return result.affectedRows > 0;
    }

    async updateRole(slug, role_id) {
        const query = 'UPDATE users SET role_id = ? WHERE slug = ?';
        const [result] = await db.execute(query, [role_id, slug]);
        return result.affectedRows > 0;
    }


    async deleteUser(slug) {
        const query = 'DELETE FROM users WHERE slug = ?';
        const [result] = await db.execute(query, [slug]);
        return result.affectedRows > 0;
    }

}

module.exports = new UserModel();