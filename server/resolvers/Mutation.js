let { photos, id } = require('./data');

module.exports = {
    postPhoto(parent, args) {
        const newPhoto = {
            id: id++,
            ...args.input,
            created: new Date(),
        }
        photos.push(newPhoto)
        return newPhoto
    }
}
