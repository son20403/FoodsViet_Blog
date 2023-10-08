import Comment from '../models/Comment'
import BaseController from './Controller'

class CommentController extends BaseController {
    constructor(model) {
        super(model)
        this.model = model
    }
    create = async (req, res) => {
        const id_customer = req.customer.id;
        const comment = req.body
        console.log("🚀 ~ file: CommentController.js:12 ~ CommentController ~ create= ~ comment:", comment)
        try {
            if (comment) {
                const modelComment = {
                    ...comment,
                    id_customer
                };
                const dataComment = await this.model(modelComment).save();
                if (dataComment) {
                    return res.status(200).json({
                        message: "Cảm ơn bạn đã bình luận!",
                    });
                } else {
                    return res.status(401).json({
                        message: "Bình luận thất bại!",
                    });
                }
            } else {
                return res.status(401).json({
                    message: "Bạn chưa nhập nội dung nào!",
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Có lỗi xảy ra",
                error: error._message,
            });
        }
    };
    getByPost = async (req, res) => {
        try {
            const id_post = req.query.id
            const dataCommentByPost = await this.model.find({ id_post });
            if (!dataCommentByPost) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(dataCommentByPost);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    get_all_comments = async (req, res) => {
        try {
            const data = await this.model.find();
            if (!data) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
}

const commentController = new CommentController(Comment)

module.exports = commentController