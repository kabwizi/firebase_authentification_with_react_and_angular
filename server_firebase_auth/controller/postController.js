let postList = require('../postData')

const getAllPost = (req, res) => {
  res.json(postList)
}

const getPostById = (req, res) => {
  res.json(
    postList.filter((e) => {
      return e.id == req.params.id
    })
  )
}

const addNewPost = (req, res) => {
  if (req.body.title.trim() === '' || req.body.body.trim() === '') {
    res.status(404).json({ message: 'Post badly formatted' })
  } else {
    postList.push({
      id: postList.length + 1,
      title: req.body.title,
      body: req.body.body
    })
    res.status(201).json(postList[postList.length - 1])
  }
}

const updatePost = (req, res) => {
  if (postList.filter((e) => e.id === Number(req.params.id)).length < 1) {
    res.status(404).json({ message: 'Post not found' })
  } else if (req.body.title.trim() === '' || req.body.body.trim() === '') {
    res.status(404).json({ message: 'Post not found' })
  } else {
    postList = postList.map((e) => {
      if (e.id === Number(req.params.id)) {
        return {
          id: e.id,
          title: req.body.title,
          body: req.body.body
        }
      } else {
        return e
      }
    })
    res.status(200).json(postList.find((e) => e.id === Number(req.params.id)))
  }
}

const deletePost = (req, res) => {
  if (Number(req.params.id) <= postList.length) {
    if (postList.filter((e) => e.id === Number(req.params.id)).length < 1) {
      res.status(404).json({ message: 'Post not found' })
    } else {
      postList = postList.filter((e) => e.id !== Number(req.params.id))
      res.status(200).json({})
    }
  } else {
    res.status(404).json({ message: 'Post not found' })
  }
}

module.exports = { getAllPost, getPostById, addNewPost, updatePost, deletePost }
