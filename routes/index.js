const express = require('express')
const router = express.Router()


const pool = require('../db')

router.get('/movies/:id', async function (req, res) {
  console.log(req.params.id)
  const [result] = await pool.promise().query('SELECT * FROM samuel_movie JOIN samuel_movie_score ON samuel_movie.id = samuel_movie_score.movie_id where samuel_movie.id = ?', [req.params.id])
  // sql fråga som hämtar från databasen med id
  // sen ploppa in datan i movie.njk template och rendera fin sida
  
  const movie = result[0]
  console.log(movie)

  res.render('movie.njk', { 
    title: 'SMDB',
    message: 'Välkommen till min movie databse',
    movie
  })
})

 router.get('/movies', async function (req, res) {
   try {
     const [movies] = await pool.promise().query('SELECT * FROM samuel_movie JOIN samuel_movie_score ON samuel_movie.id = samuel_movie_score.movie_id;')
     //res.json({ movie })
     console.log(movies)
    return res.render('movies.njk', {
      title: 'SMDB',
      movies
    })
   } catch (error) {
     console.log(error)
     res.sendStatus(500)
   }
 })


router.get('/', function (req, res) {
  res.render('index.njk', { 
    title: 'SMDB', })
})

router.get('/newmovie', function (req, res) {
  res.render('newbreed.njk', { title: 'Ny film'} { 
    title: 'SMDB', })
})

router.post('/newmovie', async function (req, res) {
  console.log(req.body)
  res.json(req.body)
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
