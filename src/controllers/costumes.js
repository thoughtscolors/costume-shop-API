const model = require('../models/costume')

function create (req, res, next) {
  const result = model.create(req.body)
  if (result.errors) {
    return next({ status: 400, message: `Could not create new costume`, errors: result.errors })
  }
  res.status(201).json({ data: result })
}

function createTag (req, res, next) {
  console.log(req.params.id, req.body, "id and body in controller");
  const costumeID = req.params.id
  const body = req.body
  const result = model.createTag(costumeID, body)
  if (result.errors) {
    return next({ status: 400, message: `Could not create new tag`, errors: result.errors })
  }
  res.status(201).json({ data: result })
}

function getTags(req, res, next) {
  const costumeID = req.params.id
  const result = model.getTags(costumeID)
  if (result.errors) {
    return next({ status: 400, message: `Could not get tag`, errors: result.errors })
  }
  res.status(201).json({ data: result })
}

function changeTag(req, res, next) {
  const costumeID = req.params.id
  const tagID = req.params.tagid
  const result = model.changeTag(costumeID, tagID)
  if (result.errors) {
    return next({ status: 400, message: `Could not modify tag`, errors: result.errors })
  }
  res.status(201).json({ data: result })
}

function deleteTag(req, res, next) {
  const costumeID = req.params.id
  const tagID = req.params.tagid
  const result = model.deleteTag(costumeID, tagID)
  if (result.errors) {
    return next({ status: 400, message: `Could not delete tag`, errors: result.errors })
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

function deleteCostume (req, res, next) {
  const id = req.params.id
  const data = model.deleteCostume(id)
  if (Object.keys(data).length === 0) {
    res.status(404).json({error: {message: "File not found"}})
  } else {
    res.status(200).json({ data })
  }
}


module.exports = {
  getAll,
  create,
  getById,
  changeDetails,
  deleteCostume,
  createTag,
  getTags,
  changeTag,
  deleteTag
}
