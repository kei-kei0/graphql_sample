const { DateTime } = require('./Type');

module.exports = {
    totalPhotos: (parent, args, { db }) => {
        return db.collection('photos').estimatedDocumentCount();
    },
    allPhotos: (parent, args, { db }) => {
        if (args && args.after) {
            return db.collection('photos').find({ created: { $gt: DateTime.serialize(args.after) }}).toArray()
        }
        return db.collection('photos').find().toArray();
    },
    totalUsers: (parent, args, { db }) => {
        return db.collection('users').estimatedDocumentCount();
    },
    allUsers: (parent, args, { db }) => {
        return db.collection('users').find().toArray();
    }
}
