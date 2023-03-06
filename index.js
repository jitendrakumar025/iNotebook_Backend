const connectToMongo=require("./db");
const express = require('express')
connectToMongo();
const app = express()
const port = 5000
const cors=require('cors')

app.use(cors( 
     origin=[ "http://localhost:3000","https://inotebook-te8u.onrender.com"
       ]
))
app.use(express.json())
app.get('/', (req, res) => {
  res.send("Hello From Backend")
});
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))
app.listen(port,  () => {
  console.log(`Example app listening at https://inotebook-backend-i6wz.onrender.com`)
})
