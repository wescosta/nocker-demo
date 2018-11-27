const noop = () => {}

const handle = (res, next = noop) => (err, data) => {
  res.status(data ? 200 : 404).json(data)
  next()
}

export default handle