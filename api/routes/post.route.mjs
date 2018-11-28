import Router from "express";
import multer from "multer";
import handle from "../utils/res.handler"
import Post from "../model/post.model";

const upload = multer()

export default Router()
  .get('/', (req, res) => res.redirect('/1/10'))
  .get('/:id', (req, res) => Post.findById(req.params.id, handle(res)))
  .get('/:page/:limit', (req, res) => {
    let {page, limit} = req.params

    page  = parseInt(page)
    limit = parseInt(limit)

    Post.paginate({}, {page, limit}, handle(res))
  })
  .put('/:id', upload.array(), (req, res) => Post.updateOne({_id: req.params.id}, req.body, handle(res)))
  .post('/',   upload.array(), (req, res) => Post.save(req.body, handle(res)))
  .delete('/:id', (req, res) => Post.deleteOne( {_id: req.params.id}, handle(res)))