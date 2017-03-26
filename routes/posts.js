'use strict';

const express = require('express');
const mysql = require('mysql');
const router = express.Router();

var database = 'blog';

var connection = mysql.createConnection({
  host: process.env.IP,
  user: 'admin',
  password: 'password',
  database: 'blog'
});

connection.connect(function(err) {
  if (err) {
    throw err;
  }
  else {
    console.log(`Connection to the ${database} database is nominal`);
  }
});

/* GET post listing. */
router.get('/', function(req, res) {
  let getAllPromise = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM posts;', function(error, results) {
      if (error) {
        throw error;
      }
      else {
        resolve(results);
      }
    });
  });

  getAllPromise.then((results) => {
    res.render('posts/index', {
      pageTitle: 'Posts',
      posts: results
    });
  });
});

/* CREATE new post. */
router.post('/', function(req, res) {
  var title = req.body.title;
  var body = req.body.body;
  let createPostPromise = new Promise((resolve, reject) => {
    connection.query("INSERT INTO posts (id,title,body) VALUES (NULL, ?, ?);", [title, body], function(error) {
      if (error) {
        throw error;
      }
      else {
        resolve();
      }
    });
  });

  createPostPromise.then(() => res.redirect('/posts'));
});

/* GET post create page. */
router.get('/new', function(req, res) {
  res.render('posts/new', {
    pageTitle: 'New Post'
  });
});

/* GET post by id. */
router.get('/:id', function(req, res) {
  let getSingle = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM posts WHERE id = ?;', [req.params.id], function(error, result) {
      if (error) {
        throw error;
      }
      else {
        resolve(result);
      }
    });
  });

  getSingle.then((result) => {
    res.render('posts/edit', {
      pageTitle: `Edit Post ${result[0].id}`,
      id: result[0].id,
      title: result[0].title,
      body: result[0].body
    });
  });
});

/* UPDATE post by id. */
router.post('/:id', function(req, res){
  let updatePostPromise = new Promise((resolve)=>{
    connection.query('UPDATE posts SET title= ?, body = ? WHERE posts.id = ?;',[req.body.title || null,req.body.body,req.params.id], function(error){
      if(error){
        throw error;
      } else {
        resolve();
      }
    });
  });
  updatePostPromise.then(() => res.redirect('/posts'));
});

/* DELETE post by id. */
router.delete('/:id', function(req, res){
  console.log(req.params.id)
  let deletePostPromise = new Promise((resolve)=>{
    connection.query('DELETE from posts WHERE id = ?;', [req.params.id], function(error) {
      if(error){
        throw error;
      } else {
        resolve();
      }
    });
  });
  deletePostPromise.then(() => res.redirect('/posts'));
});

module.exports = router;