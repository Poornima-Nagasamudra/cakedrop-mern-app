const mongoose = require('mongoose')

const configureDB = () => {
    const connection_url = 'mongodb://127.0.0.1:27017/CakeDrop-2025'
    mongoose.connect(connection_url   )
        .then(() =>{     
            console.log('Connected to MongoDB database'); 
        })
        .catch((error) =>{     
            console.error('Error connecting to MongoDB database', error); 
        });
}

module.exports = configureDB