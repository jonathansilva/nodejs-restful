const bcrypt = require('bcrypt')

const generateHash = async password => {
    const hash = await bcrypt.hash(password, 10)

    return hash
}

const edit = async (db, hash, id) => {
    return await db.update('password', hash).from('user').where('id', id)
}

const update = async (db, password, id) => {
    const hash = await generateHash(password)

    await edit(db, hash, id)
}

module.exports = update
