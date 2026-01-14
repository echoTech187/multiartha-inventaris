const ProductModel = require('../model/Product');
const { verifyToken } = require('../../libraries/utils');
class ProductController {
    async index(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 5;
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * limit;

            const search = req.query.search || '';

            const users = await ProductModel.getAllProducts(limit, offset, search);
            return res.status(200).json({ success: true, data: users.data, responseText: 'OK', total: users.total, pageLength: limit, currentPage: offset, totalPage: Math.ceil(users.total / limit) });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message, responseText: 'SERVER_ERROR' });
        }
    }
    async show(req, res) {
        const { id } = req.params;
        const result = await ProductModel.getProductById(id);
        return res.json(result[0]);
    }
    async store(req, res) {
        try {
            const { name, price, description, stock } = req.body;
            const result = await ProductModel.createProduct({ name, stock, description, price });
            if (!result) {
                return res.status(400).json({ success: false, message: 'Product not created', responseText: 'PRODUCT_NOT_CREATED' });
            } else {
                return res.status(200).json({ success: true, message: 'Product created', responseText: 'PRODUCT_CREATED' });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ success: false, message: error.message, responseText: 'PRODUCT_NOT_CREATED' });
            }
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }

    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, price, description, stock } = req.body;
            const result = await ProductModel.updateProduct(id, { name, price, description, stock });
            if (!result) {
                return res.status(400).json({ success: false, message: 'Product not updated', responseText: 'PRODUCT_NOT_UPDATED' });
            } else {
                return res.status(200).json({ success: true, message: 'Product updated', responseText: 'PRODUCT_UPDATED' });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ success: false, message: error.message, responseText: 'PRODUCT_NOT_CREATED' });
            }
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }

    }

    async sellProduct(req, res) {
        const header = req.header('Authorization');
        const token = header && header.split(' ')[1];
        const decoded = await verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Unauthorized', responseText: 'UNAUTHORIZED' });
        }
        try {
            const { id } = req.params;
            const { amount } = req.body;
            const productExistRows = await ProductModel.getProductById(id);
            const productExist = productExistRows[0];

            if (!productExist) {
                return res.status(400).json({ success: false, message: 'Barang tidak ditemukan', responseText: 'PRODUCT_NOT_FOUND' });
            } else {
                if (productExist.stock < amount) {
                    return res.status(400).json({ success: false, message: 'Stok Barang tidak cukup', responseText: 'INSUFFICIENT_STOCK' });
                }

                const result = await ProductModel.sellProduct({ product_id: id, quantity: amount, user_sell_id: decoded.user.id });
                if (!result) {
                    return res.status(400).json({ success: false, message: 'Barang tidak bisa dijual', responseText: 'PRODUCT_NOT_SOLD' });
                } else {
                    const productIncrement = await ProductModel.stockIncrement(id, amount);
                    if (!productIncrement) {
                        return res.status(400).json({ success: false, message: 'Gagal mengurangi stok barang', responseText: 'PRODUCT_STOCK_NOT_UPDATED' });
                    } else {
                        return res.status(200).json({ success: true, message: 'Barang berhasil dijual', responseText: 'PRODUCT_SOLD' });
                    }
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ success: false, message: error.message, responseText: 'PRODUCT_NOT_CREATED' });
            }
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }

    }
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const result = await ProductModel.deleteProduct(id);
            if (!result) {
                return res.status(400).json({ success: false, message: 'Barang tidak bisa dihapus', responseText: 'PRODUCT_NOT_DELETED' });
            } else {
                return res.json({ success: true, message: 'Barang berhasil dihapus', responseText: 'PRODUCT_DELETED' });
            }

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ success: false, message: error.message, responseText: 'PRODUCT_NOT_CREATED' });
            }
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }
    }

    async productSellReport(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 5;
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * limit;

            const search = req.query.search || '';

            const users = await ProductModel.productSellReport(limit, offset, search);
            return res.status(200).json({ success: true, data: users.data, responseText: 'OK', total: users.total, pageLength: limit, currentPage: offset, totalPage: Math.ceil(users.total / limit) });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan server', responseText: 'SERVER_ERROR' });
        }
    }
}

module.exports = new ProductController();
