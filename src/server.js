const express = require("express")

const app = express()

app.get("/", (response, request) => {

})

const PORT = 3333

app.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`))