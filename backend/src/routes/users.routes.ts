import { Router } from 'express';
import { syncUser } from '../controllers/user.controller.ts';
import { requireAuth } from '@clerk/express';

const router = Router();

// @route: /api/user/sync
// @method: POST
// @desc: sync the clerk user to the database
router.post('/sync', requireAuth(),syncUser);


export default router;