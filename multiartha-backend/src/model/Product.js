const db = require('../../config/server');
class ProductModel {
    async getAllProducts(limit = 10, offset = 0, search = '') {
        const limitVal = Number(limit);
        const offsetVal = Number(offset);
        const query = `SELECT * FROM products ${search ? `WHERE name LIKE '%${search}%'` : ''} ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
        const [rows] = await db.execute(query, [limitVal, offsetVal]);
        const countQuery = 'SELECT COUNT(*) as total FROM products';
        const [countRows] = await db.execute(countQuery);
        const total = countRows[0].total;
        return {
            data: rows,
            total: total
        };
    }

    async getProductBySlug(slug) {
        const query = 'SELECT * FROM products WHERE slug = ?';
        const [rows] = await db.execute(query, [slug]);
        return rows[0];
    }

    async getProductById(id) {
        const query = 'SELECT * FROM products WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows;
    }

    async createProduct({ name, stock, description, price }) {
        const query = 'INSERT INTO products (name,stock, price,description,createdAt) VALUES (?, ?, ?, ?, NOW())';
        const [result] = await db.execute(query, [name, stock, price, description ?? ""]);
        return { id: result.insertId, name, stock, price, description };
    }

    async updateProduct(id, { name, price, description, stock }) {
        const query = 'UPDATE products SET name = ?, price = ? ,stock = ?, description = ?, updatedAt = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [name, price, stock, description ?? "", id]);
        return result.affectedRows > 0;
    }
    async stockIncrement(id, quantity) {
        const query = 'UPDATE products SET stock = stock - ? , updatedAt = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [quantity, id]);
        return result.affectedRows > 0;
    }
    async sellProduct({ product_id, quantity, user_sell_id }) {
        const query = 'INSERT INTO product_report_sells (product_id, amount, user_sell_id, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())';
        const [result] = await db.execute(query, [product_id, quantity, user_sell_id]);
        return result.affectedRows > 0;
    }
    async deleteProduct(id) {
        const query = 'DELETE FROM products WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0;
    }
    async productSellReport(limit = 10, offset = 0, search = '') {
        const limitVal = Number(limit);
        const offsetVal = Number(offset);
        const query = `SELECT a.id,b.name as product_name,c.fullname as user_entry_name, a.amount, a.createdAt FROM product_report_sells a INNER JOIN products b ON a.product_id = b.id INNER JOIN users c ON a.user_sell_id = c.id ${search ? `WHERE b.name LIKE '%${search}%' OR c.fullname LIKE '%${search}%'` : ''} ORDER BY a.id DESC LIMIT ${limit} OFFSET ${offset}`;
        const [rows] = await db.execute(query, [limitVal, offsetVal]);
        const countQuery = 'SELECT COUNT(*) as total FROM product_report_sells';
        const [countRows] = await db.execute(countQuery);
        const total = countRows[0].total;
        return {
            data: rows,
            total: total
        };
    }
}

module.exports = new ProductModel();