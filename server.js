const app = require("./src/app");


// const PORT = process.env.PORT || 3056
const PORT = process.env.PORT || 3305


const server = app.listen( PORT, () => {
    console.log(`WSV eComemerce start with  ${PORT}`)
})



// process.on('SIGINT', () => {
//     server.close( () => console.log('Exit Server Experss'))
//     // notify.send( ping...)
// })