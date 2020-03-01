const update = async (db, nickname, id) => {
    return await db.update('nickname', nickname).from('user').where('id', id)
}

module.exports = update
