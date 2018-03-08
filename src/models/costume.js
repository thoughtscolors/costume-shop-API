const uuid = require('uuid/v4')
const costumes = []

function create (body) {
  const errors = []
  const name = body.name
  const desc = body.desc
  const price = body.price
  console.log(price);
  const tags = []

  let response
  if (!name) {
    errors.push('name is required')
    response = { errors }
  } else if (price < '.01') {
    errors.push("price must be more than .01")
    response = { errors }
  } else {
    const costume = { id: "12345", name, desc, price, tags }
    costumes.push(costume)
    response = costume
  }
  return response
}

function createTag (costumeID, body) {
  console.log(costumeID, body, "createTag in model");
  const errors = []
  const name = body.name
  const color = body.color
  console.log(name, color, errors);
  let response;
  for (var i = 0; i < costumes.length; i++) {
    console.log(costumes[i].id === costumeID, "models createTag matching IDs")
    if (costumes[i].id === costumeID) {
      console.log("were in the if");
      if (name.length > 10) {
        errors.push('name must be 10 characters max')
        response = {errors}
      } else if (color.length !== 7 || color[0] !== '#') {
        errors.push('color must be a valid hex code')
        response = {errors}
      } else {
        console.log('did we get here');
        console.log(costumes.tags);
          const tag = {id: uuid(), name, color}
          let newTags = costumes[i].tags
          newTags.push(tag)
          costumes[i].tags = newTags
          response = costumes[i]
      }
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
    console.log(costumes[i].id === costumeID, "models getTags matching IDs")
    if (costumes[i].id === costumeID) {
      console.log("getTags if inside");
      return costumes[i].tags
    } else {
      let errors = []
      errors.push('Costume ID not found')
      response = {errors}
      return response
    }
  }
}

function changeTag (costumeID, tagID) {
  let response;
  for (var i = 0; i < costumes.length; i++) {
    console.log(costumes[i].id === costumeID, "models getTags matching IDs")
    if (costumes[i].id === costumeID) {
      for (var j = 0; j < costumes[i].tags.length; j++) {
        if (costumes[i].tags[j].id === tagID) {
          response = costumes[i].tags[j].id + " - ID found"
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

function deleteTag (costumeID, tagID) {
  let response;
  for (var i = 0; i < costumes.length; i++) {
    console.log(costumes[i].id === costumeID, "models getTags matching IDs")
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
  const name = body.name
  const type = body.type
  const price = body.price
  const tags = body.tags
  for (var i = 0; i < costumes.length; i++) {
    if (costumes[i].id === id) {
      costumes[i] = {
        id,
        name,
        desc,
        price,
        tags
      }
        return costumes[i]
      }
        return {}
  }
}

function deleteCostume(id) {
  for (var i = 0; i < costumes.length; i++) {
    if (costumes[i].id === id) {
      let deletedCostume = costumes[i]
      delete costumes[i]
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
