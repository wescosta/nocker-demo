import log from "./logger";

const handle = res => (err, data) => {
  if (err) {
    log.error(err)
    res.status(500).json(err === 'object' ? err : {err})
  }
  else
    res.status(data ? 200 : 404).json(data || {})
}

export default handle