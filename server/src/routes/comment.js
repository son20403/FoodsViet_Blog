import express from 'express'
const router = express.Router()
import commentController from '../controllers/CommentController'
import middlewareAuth from '../middlewares/auth'

router.post('/create', middlewareAuth.verifyToken, commentController.create)
router.get('/get_all_comments', commentController.get_all_comments)
router.get('/getByPost', commentController.getByPost)
router.get('/detailCategory?:id', commentController.detail)

module.exports = router;
