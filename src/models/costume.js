const uuid = require('uuid/v4')
const costumes = []

function create (body) {
  const errors = []
  const name = body.name
  const desc = body.desc
  const price = body.price
  const tags = []

  let response
  if (!name) {
    errors.push('name is required')
    response = { errors }
  } else if (price < '.01') {
    errors.push("price must be more than .01")
    response = { errors }
  } else {
    const costume = { id: uuid(), name, desc, price, tags }
    costumes.push(costume)
    response = costume
  }
  return response
}

function createTag (costumeID, body) {
  const errors = []
  const name = body.name
  const color = body.color
  let hex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  let response;
  for (var i = 0; i < costumes.length; i++) {
    if (costumes[i].id === costumeID) {
      if (name.length > 10) {
        errors.push('name must be 10 characters max')
        response = {errors}
        return response
      }
      if (hex.test(color) === false) {
        errors.push('color must be a valid hex code')
        response = {errors}
        return response
      }
          const tag = {id: uuid(), name, color}
          let newTags = costumes[i].tags
          newTags.push(tag)
          costumes[i].tags = newTags
          response = costumes[i]
          return response
    } else {
    errors.push('Costume ID not found')
    response = {errors}
    return response
    }
  }
}

function getAll (limit) {
  return limit ? costumes.slice(0, limit) : costumes
}

function getTags (costumeID) {
  for (var i = 0; i < costumes.length; i++) {
    if (costumes[i].id === costumeID) {
      return costumes[i].tags
    } else {
      let errors = []
      errors.push('Costume ID not found')
      response = {errors}
      return response
    }
  }
}

function changeTag (costumeID, tagID, body) {
  let response;
  let newName = body.name
  let newColor = body.color
  let errors = []
  let hex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

  for (var i = 0; i < costumes.length; i++) {
    if (costumes[i].id === costumeID) {
      for (var j = 0; j < costumes[i].tags.length; j++) {
        if (costumes[i].tags[j].id === tagID) {
          if (newName === undefined) {
            newName = costumes[i].tags[j].name
          }
          if (newColor === undefined) {
            newColor = costumes[i].tags[j].color
          }
          if (newName.length > 10) {
            errors.push('name must be 10 characters max')
            response = {errors}
            return response
          }
          if (hex.test(newColor) === false) {
            errors.push('color must be a valid hex code')
            response = {errors}
            return response
          }
        costumes[i].tags[j].name = newName
        costumes[i].tags[j].color = newColor
        response = costumes[i].tags[j]
        return response
        } else {
          errors.push('tag ID not found')
          response = {errors}
          return response
        }
      }
    } else {
      errors.push('Costume ID not found')
      response = {errors}
      return response
    }
  }
}

function deleteTag (costumeID, tagID) {
  let response;
  for (var i = 0; i < costumes.length; i++) {
    if (costumes[i].id === costumeID) {
      for (var j = 0; j < costumes[i].tags.length; j++) {
        if (costumes[i].tags[j].id === tagID) {
          response = tagID + " " + costumes[i].tags[j].name + " - Tag Deleted"
          costumes[i].tags.splice(j, 1)
          return response
        } else {
          let errors = []
          errors.push('tag ID not found')
          response = {errors}
        }
      }
      return response
    } else {
      let errors = []
      errors.push('Costume ID not found')
      response = {errors}
      return response
    }
  }
}

function getById (id) {
  for (var i = 0; i < costumes.length; i++) {
    if (costumes[i].id === id) {
      return costumes[i]
    }
  }
  return {}
}

function changeDetails (id, body) {
  for (var i = 0; i < costumes.length; i++) {
    if (costumes[i].id === id) {
      const name = !body.name ? costumes[i].name : body.name
      const desc = !body.desc ? costumes[i].desc : body.desc
      const price = !body.price ? costumes[i].price : body.price
      const tags = body.tags
      costumes[i] = {
        id,
        name,
        desc,
        price,
        tags
      }
        return costumes[i]
      } else return {}
  }
}

function deleteCostume(id) {
  for (var i = 0; i < costumes.length; i++) {
    if (costumes[i].id === id) {
      let deletedCostume = costumes[i]
      costumes.splice(i, 1)
        return deletedCostume
      }
        return {}
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
