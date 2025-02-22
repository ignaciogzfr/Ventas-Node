require('dotenv').config()
console.log(process.env);

const express = require('express');
const app = express();

// app.set('env', 'development');
// app.set('env', 'local');

const port = process.env.PORT || 3000;
console.log(`PORT is: ${port}`);
console.log(`NODE_ENV is: ${process.env.NODE_ENV}`);


app.listen(port,()=>{
    console.log(`✅ Server running on port ${port}... ✅`);
})