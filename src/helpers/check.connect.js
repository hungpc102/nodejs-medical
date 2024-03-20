'use strict'

const mongoose = require('mongoose')
const _SECONDS = 5000
const os = require('os')
const process = require('process')

// count connect
const countConnect = () =>{
    const numConnection = mongoose.connect.length
    console.log(`Number of connect:: ${numConnection}`)
} 

//check over load
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connect.length
        const numCore = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss; 
        // Example maxium number of connections based on number osf cores
        const maxConnections = numCore * 5;

        console.log(`Active connections:: ${numConnection}`)
        console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`)

        if(numConnection > maxConnections){
            console.log('Connect overload detected!')
            // notify.send(...)
        }
    }, _SECONDS) // Monitor 5000 seconds
}

module.exports = {
    countConnect,
    checkOverload
}