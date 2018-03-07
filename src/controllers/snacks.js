const model = require('../models/snack')

function create (req, res, next) {
  const result = model.create(req.body)
  if (result.errors) {
    return next({ status: 400, message: `Could not create new snack`, errors: result.errors })
  }
  res.status(201).json({ data: result })
}

function getAll (req, res, next) {
  const limit = req.query.limit
  const data = model.getAll(limit)
  res.status(200).json({ data })
}

function getById (req, res, next) {
  // console.log(req.params.id, "we got to controller");
  const id = req.params.id
  const data = model.getById(id)
  // console.log(Object.keys(data).length, "this is data in controller");
  if (Object.keys(data).length === 0) {
    res.status(404).json({error: {message: "File not found"}})
  } else {
    res.status(200).json({ data })
  }
}

function changeDetails (req, res, next) {
  const id = req.params.id
  const body = req.body
  const data = model.changeDetails(id, body)
  if (Object.keys(data).length === 0) {
    res.status(404).json({error: {message: "File not found"}})
  } else {
    res.status(200).json({ data })
  }
}

function deleteSnack (req, res, next) {
  const id = req.params.id
  const data = model.deleteSnack(id)
  if (Object.keys(data).length === 0) {
    res.status(404).json({error: {message: "File not found"}})
  } else {
    res.status(200).json({ data })
  }
}


module.exports = { getAll, create, getById, changeDetails, deleteSnack }
