const express = require('express')
const app = express()
//const connectDB = require('./config/db')
const path = require('path')

//Connect DB
//connectDB()

// PORT
const PORT = process.env.PORT || 4000 


// Users routes
app.use('/api/persons',require('./routes/persons'))
app.use('/api/graph',require('./routes/graph'))

//Serve static assets in production

if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')))
}


// App listening to the port
app.listen(PORT, () => console.log(`Server started on port : ${PORT}`))
