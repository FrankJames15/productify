import type { Request, Response } from 'express';

import * as queries from '../db/queries.ts';
import { getAuth } from '@clerk/express';

// @route: /api/products
// @method: POST
// @desc: add new product
// @access: PRIVATE
export async function addProduct(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { title, description, imageUrl } = req.body;

        if (!title || !description || !imageUrl) {
            res.status(400).json({
                error: "Tittle, Description, and Image Url are required"
            })
            return
        }

        const product = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId
        })

        res.status(201).json(product);
        
    } catch (error) {
        console.error("Error creating product: ", error);
        res.status(500).json({ error: "Failed to create product" });
    }
}

// @route: /api/products
// @method: GET
// @desc: get all products
// @access: PUBLIC
export async function getAllProducts(req:Request, res:Response) {
    try {
        const products = await queries.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log("Error getting products:", error);
        res.status(500).json({
            error: "Failed to get products"
        });
    }
}

// @route: /api/products/:userId
// @method: GET
// @desc: get products by current user
// @access: PRIVATE
export async function getMyProducts(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });
    
        const products = await queries.getProductsByUserId(userId);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error getting user products: ", error);
        res.status(500).json({error: "Failed to get user products"})
    }
}

// @route: /api/products/:id
// @method: GET
// @desc: get product by ID
// @access: PUBLIC 
export async function getProductById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const product = await queries.getProductById(id);

        if (!product) return res.status(404).json({ error: "Product not found" });
    } catch (error) {
        console.error("Error getting product: ", error);
        res.status(500).json({error: "Failed to get product"})
    }
}

// @route: /api/products/
// @method: PATCH
// @desc: update product
// @access: PRIVATE
export async function upateProduct(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const { title, description, imageUrl } = req.body;

        // check if product exist 
        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        // check if it belong the current user
        if (existingProduct.userId !== userId) {
            res.status(403).json({ error: "You can only update your own product" })
            return;
        }

        // update product
        const proudct = await queries.updateProduct(id, {
            title,
            description,
            imageUrl
        })

        res.status(200).json(proudct);

    } catch (error) {
        console.error("Error updating product: ", error);
        return res.status(500).json({error: "Failed to udpate product"})
    }
}

// @route: /api/products/:id
// @method: DELETE
// @desc: delete product
// @access: PRIVATE
export async function deleteProduct(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            res.status(404).json({ error: "Unauthorized" });
            return;
        }

        const { id } = req.params;
        
        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        if (existingProduct.userId !== userId) {
            res.status(403).json({ error: "You can only delete your own product" });
            return;
        }

        await queries.deleteProduct(id);
        res.status(200).json({message: "Product deleted successfully"})
        
    } catch (error) {
        console.error("Error deleting product: ", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
}