# Connect With MongoDB
1. MongoDB Register 
2. MongoDB Try Free
https://www.mongodb.com/try 
3. Create Cluster 
4. Connect > User Create (bgjo)
5. Choose a Connection Method > Connect Your Application 
6. Connection String Copy
```
mongodb+srv://bgjo:<password>@boiler-plate.zzxzr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```
7. Install Mongoose (for connecting application with mongoDB cluster)
```
npm install mongoose --save
```
8. connecting with mongoDB 
index.js
```
const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bgjo:test1234!!@boiler-plate.zzxzr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('Mongo DB Connected Successfully!'))
  .catch(err => console.log(err))

  
app.get('/', (req, res) => {
  res.send('Hello World!~~안녕하세요~')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

9. npm run start
