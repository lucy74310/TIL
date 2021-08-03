1. init
  ```
  mkdir boiler-plate
  cd boiler-plate
  npm init 
  ```

2. express.js 다운로드
```
npm install express --save
```

3. index.js 생성 및 작성 
```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!~~안녕하세요~')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

4. package.json script add
```
 "scripts": {
    "start" : "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

5. npm run start