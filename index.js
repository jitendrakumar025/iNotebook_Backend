const connectToMongo=require("./db");
const express = require('express')
connectToMongo();
const app = express()
const port = 5000
const cors=require('cors')
// Set up a whitelist and check against it:
var whitelist = ['https://inotebook-te8u.onrender.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
app.use(express.json())
app.get('/', (req, res) => {
  res.send("Hello From Backend")
});
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))
 app.listen(port,  () => {
   console.log(`Example app listening at https://inotebook-backend-i6wz.onrender.com`)
 })
