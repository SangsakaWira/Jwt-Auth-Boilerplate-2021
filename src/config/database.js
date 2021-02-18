const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost/auth-database', {
	useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => console.log('DB connected'))

module.exports = mongoose