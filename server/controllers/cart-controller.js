const CartModel = require('../models/cart-model');
const ProductModel = require('../models/product-model');
exports.getCartByuserId= async(req,res) =>{
    try{
        const userId = req.params.userId;
        const cartItems = await cart.find({userId}).populate('productId');
        res.json(cartItems);
    } catch(err){
        res.status(500).json({error: err.message})
    }
    
}

exports.addproductToUserCart= async(req,res) =>{
    try{
        const {userId,productId,quantity} = req.body;
        let cart = await CartModel.find({userId})
        const product = await ProductModel.findById(productId);
        const price = product.price;
        const title = product.name;

       
        cart.items.push({productId,quantity,price,title});
        await newItem.save();
        res.status(201).json(newItem);
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.removeFromCart= async(req,res) =>{
    try{
        const {userId,productId} = req.body;
        let cart = await CartModel.findOne({userId});
        if(!cart){
            return res.status(404).json({message:'Cart not found'});
        }
        const index = cart.items.findIndex(item => item.productId.toString() === productId);
        if(index > -1){
            cart.items.splice(index,1);
            await cart.save();
            return res.json(cart);
        } else{
            return res.status(404).json({message:'Product not in cart'});
        }
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}
exports.clearCart= async(req,res) =>{
    try{
        const {userID} = req.body;
        let cart = await CartModel.findOne({userID});
        if(!cart){
            return res.status(404).json({message:'Cart not found'});
        }
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();
        return res.json(cart);
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.createCart= async(userID)=>{
    const cart = new CartModel({userID});
    await cart.save();
    return cart;

}