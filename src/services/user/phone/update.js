const verifyPhone = async (db, phone, id) => {
    const result = await db.select('phone').from('user').where('phone', phone).andWhere('id', '<>', id).first()

    if (result) {
        return Promise.reject(new Error('Phone already exists'))
    }
}

const edit = async (db, phone, id) => {
    return await db.update('phone', phone).from('user').where('id', id)
}

const update = async (db, phone, id) => {
    await verifyPhone(db, phone, id)
    await edit(db, phone, id)
}

module.exports = update
