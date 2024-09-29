const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    creationDate: {
        type: Date,
        default: Date.now
      },
      habits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
      }]
    // googleId: { type: String },
});




UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);
