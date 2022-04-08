const router = require('express').Router();
const sequelize = require('../db/connection');
const { Post, User, Comment } = require('../models'); 

router.get('/',async (req, res) => {
    try{

        let data = await Post.findAll({
            attributes: [
              'id',
              'post_content',
              'title',
              'created_at',
            ],
            include: [
              {
                model: Comment,
                attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['user_name']
                }
              },
              {
                model: User,
                attributes: ['user_name']
              }
            ]
          });
        // serialize data before passing to template
        const blogPosts = data.map(post => post.get({ plain: true }));
        console.log(blogPosts);
        res.render('dashboard', { blogPosts, loggedIn: true});
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
  });

  router.get("/edit/:id", async (req, res) => {
      let data = await Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'post_content',
          'title',
          'created_at',
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['user_name']
            }
          },
          {
            model: User,
            attributes: ['user_name']
          }
        ]
      });
      const blogPost = data.get({ plain: true });
      res.render('edit-post', {blogPost, loggedIn: true});
  })

  module.exports = router;