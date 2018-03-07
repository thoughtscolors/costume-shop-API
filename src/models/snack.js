const uuid = require('uuid/v4')
const snacks = []

function create (body) {
  const errors = []
  const name = body.name
  const type = body.type
  const price = body.price
  const qty = body.qty

  let response
  if (!name) {
    errors.push('name is required')
    response = { errors }
  } else {
    const snack = { id: uuid(), name, type, price, qty }
    snacks.push(snack)
    response = snack
  }

  return response
}

function getAll (limit) {
  return limit ? snacks.slice(0, limit) : snacks
}

function getById (id) {
  // console.log(id, "we got to model");
  // console.log(snacks.length, "snacks length in model");
  for (var i = 0; i < snacks.length; i++) {
    // console.log(snacks[i].id === id, "model loop: if IDs match");
    if (snacks[i].id === id) {
      console.log(snacks[i]);
      return snacks[i]
    }
  }
  return {}
}

function changeDetails (id, body) {
  const name = body.name
  const type = body.type
  const price = body.price
  const qty = body.qty
  for (var i = 0; i < snacks.length; i++) {
    // console.log(snacks[i].id === id, "changeDetails model loop: if IDs match");
    if (snacks[i].id === id) {
      snacks[i] = {
        id,
        name,
        type,
        price,
        qty
      }
        return snacks[i]
      }
        return {}
  }
}

function deleteSnack(id) {
  for (var i = 0; i < snacks.length; i++) {
    // console.log(snacks[i].id === id, "deleteSnack model loop: if IDs match");
    if (snacks[i].id === id) {
      let deletedSnack = snacks[i]
      delete snacks[i]
        return deletedSnack
      }
        return {}
  }
}


module.exports = { getAll, create, getById, changeDetails, deleteSnack }
