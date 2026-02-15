import type { Request, Response } from "express";
import * as queries from "../db/queries.ts";

import { getAuth, requireAuth } from "@clerk/express";

export async function addComment(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });
             
        
        const { content } = req.body;
        if (!content) return res.status(400).json({ error: "Comment content is required" })
            
        // verify if product exist
        const { productId } = req.params;
        const product = await queries.getProductById(productId);
        if (!product) return res.status(404).json({ error: "Product not found" });

        const comment = await queries.createComment({
            content,
            userId,
            productId
        })

        res.status(201).json(comment);
    } catch (error) {
        console.error("Error adding comment: ", error);
        res.status(500).json({error: "Failed to add comment"})
    }
}

export async function deleteComment(req: Request, res: Response) {
    try {
        // check if user is authenticated
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized access" });

        
        // check if comment exist
        const { commentId } = req.params;
        const existingComment = await queries.getCommentById(commentId);
        if (!existingComment) return res.status(404).json({ error: "Comment not found" });

        // check if it's belong to current user
        if (existingComment.userId !== userId) return res.status(403).json({
            error: "You can only delete your own comment"
        })
        
        await queries.deleteComment(commentId);
        res.status(403).json({
            message: "Comment deleted successfully"
        })
    } catch (error) {
        console.error("Error deleting comment: ", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
}