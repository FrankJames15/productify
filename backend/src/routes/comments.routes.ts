import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import * as controller from "../controllers/comment.controller.ts";

const router = Router();

// POST /api/comments/:productId (private) - add comment to a product
router.post("/:productId", requireAuth(), controller.addComment);

// DELETE /api/comments/:commentId (private) - delete comment
router.delete("/:commentId", requireAuth(), controller.deleteComment);

export default router;