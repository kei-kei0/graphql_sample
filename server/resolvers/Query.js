const { photos } = require('./data');
const { DateTime } = require('./Type');

module.exports = {
    totalPhotos: () => photos.length,
    allPhotos: (parent, args) => {
        if (args && args.after) {
            return photos.filter(photo => {
                return DateTime.parseValue(photo.created) >= DateTime.parseValue(args.after);
            })
        }
        return photos;
    }
}
