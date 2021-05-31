const express = require('express')
const app = express()
const path = require('path')
const authenticateUser = require('./middlewares/authentificateMiddleware')
const postController = require('./controller/postController')

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

app.use('/posts', authenticateUser)

app.get('/posts', postController.getAllPost)
app.get('/posts/:id', postController.getPostById)
app.post('/posts', postController.addNewPost)
app.put('/posts/:id', postController.updatePost)
app.delete('/posts/:id', postController.deletePost)

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen(5000, () =>
  console.log('=======You are connected to : http://localhost:5000 =======')
)
