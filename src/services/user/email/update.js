const verifyEmail = async (db, email, id) => {
    const result = await db.select('email').from('user').where('email', email).andWhere('id', '<>', id).first()

    if (result) {
        return Promise.reject(new Error('E-mail already exists'))
    }
}

const edit = async (db, email, id) => {
    return await db.update('email', email).from('user').where('id', id)
}

const update = async (db, email, id) => {
    await verifyEmail(db, email, id)
    await edit(db, email, id)
}

module.exports = update
