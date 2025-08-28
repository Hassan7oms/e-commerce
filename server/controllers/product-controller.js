const Product = require('../models/product-model');


exports.createProduct = async (req, res) => {
    try {
        const { title,slug, description,categoryID,attributes,variant} = req.body;
        const images =req.file? req.file.filename : '';
        const newProduct = new Product({ title,slug, description,categoryID,images,attributes,variant });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.getProductBySlug= async (req, res) => {
    try {
        const { slug } = req.params.route;
        const product = await Product.findOne({ slug }).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.softDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product soft deleted', product: deletedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.setUnActiveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product set to inactive', product: updatedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.setActiveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, { isActive: true }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product set to active', product: updatedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
  


