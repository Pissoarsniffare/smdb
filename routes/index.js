const express = require('express')
const router = express.Router()


const pool = require('../db')

router.get('/movies/:id', async function (req, res) {
  console.log(req.params.id)
  res.render('index.njk', { 
    title: 'SMDB',
    message: 'Välkommen till min movie databse'
  })
})

 router.get('/movies', async function (req, res) {
   try {
     const [movies] = await pool.promise().query('SELECT * FROM samuel_movie JOIN samuel_movie_score ON samuel_movie.id = samuel_movie_score.movie_id;')
     //res.json({ movie })
     console.log(movies)
    return res.render('index.njk', {
      title: 'SMDB',
      movies
    })
   } catch (error) {
     console.log(error)
     res.sendStatus(500)
   }
 })

 router.get('/movies', function (req, res) {
  res.render('movie.njk', { 
    title: 'NYCKELN TILL DIN MAMMA',
    message: 'Välkommen till NYCKELN TILL DIN MAMMA'
  })
})

router.get('/', function (req, res) {
  res.render('index.njk', { 
    title: 'SMDB', })
})


// router.get('/story/:id', function (req, res) {
//   console.log(req.params.id)
//   const part = story.parts.find((part) => part.id === parseInt(req.params.id))
//   if (!part) {
//     res.status(404).render('404.njk', { title: '404' })
//     return
//   }
//   res.render('part.njk', { title: part.name, part: part })
// })

module.exports = router
