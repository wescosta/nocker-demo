import Router from "express";

export default Router()
  .get('/health', (req, res) => {
    res.json({ok: 200, desc: 'Server up and running. \\o/'})
  })
