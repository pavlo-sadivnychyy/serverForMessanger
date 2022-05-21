
const mongoose = require('mongoose');

let basicSetup = () => {
    beforeEach((done)=>{
        // runs before the first test case
        mongoose.connect('mongodb+srv://pavlosad:120798Pavlo@cluster0.yp6xw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')   // connection to the data base
        done()
    })

    afterAll((done)=>{                       // runs after the last test case
        mongoose.disconnect()
        done()
    })
}

module.exports = basicSetup;
