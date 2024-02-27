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
    title: 'SMDB',
  })
})

router.get('/newscore', async function (req, res) {
  const [movies] = await pool.promise().query('SELECT * FROM samuel_movie')
  console.log(movies)
  res.render('newscore.njk', { title: 'Ny score', movies })
})

router.post('/newscore', async function (req, res) {
  const score = req.body.score
  const description = req.body.score
  const movie = req.body.movie
  console.log(score, description)
  const [result] = await pool.promise().query('INSERT INTO samuel_movie_score (movie_id, score) VALUES (?, ?)',
    [movie, score])
  console.log(result)
  if (result.affectedRows === 1) {
    res.redirect('/movies')
  } else {
    res.redirect('/newscore')
  }
})

router.get('/newmovie', function (req, res) {
  res.render('newmovie.njk', { title: 'Ny film' })
})

router.post('/newmovie', async function (req, res) {
  const movie = req.body.movie
  const description = req.body.movie
  console.log(movie, description)
  const [result] = await pool.promise().query('INSERT INTO samuel_movie (movie_id, movie) VALUES (?, ?)',
    [movie])
  console.log(result)
  if (result.affectedRows === 1) {
    res.redirect('/movies')
  } else {
    res.redirect('/newscore')
  }
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
