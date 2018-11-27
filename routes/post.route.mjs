import Router from "express";
import multer from "multer";
import post from "../model/post.model";
import handle from "../utils/res.handler"

const upload = multer()

export default Router()
  .get('/:id', (req, res, next) => post.findById(req.params.id, handle(res, next)))
  .get('/:page/:limit', (req, res, next) => {
    let {page, limit} = req.params

    post.paginate({}, page, limit, handle(res, next))
  })
  .get('/', (req, res, next) => {
    res.redirect('/1/10')
    next()
  })
  .delete('/:id', (req, res, next) => post.deleteOne( {_id: req.params.id}, handle(res, next)))
  .put('/:id', upload.array(), (req, res, next) => post.updateOne({_id: req.params.id}, req.body, handle(res, next)))
  .post('/', upload.array(), (req, res, next) => post.save(req.body, handle(res, next)))