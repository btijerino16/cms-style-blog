const router = require('express').Router(); 
const { Post} = require('../../models');
const sequelize = require('../../db/connection');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try{
        let data = await Post.findAll({
            attributes: [
              'id',
              'post_content',
              'title',
              'created_at',
            ],
            order: [['created_at', 'DESC']], 
          })

          res.json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
  });

  router.get('/:id', async (req, res) => {
      try{
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
          });

          if (!data) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
          res.json(data);

      }
      catch(error){
        console.log(error);
        res.status(500).json(error);
      }
    
  });

  router.post('/',withAuth,async (req, res) => {
    try{
        const data = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
          });
          res.json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
  });

  router.put('/:id',withAuth,async (req, res) => {
    try{
        const data = await Post.update(
            {
              title: req.body.title,
              post_content: req.body.post_content
            },
            {
              where: {
                id: req.params.id
              }
            });
          if (!data) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
          res.json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
  });

  
  router.delete('/:id',withAuth,async (req, res) => {
      try{
        const data = await Post.destroy({
            where: {
              id: req.params.id
            }
          });
          if (!data) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
          res.json(data);
      }
      catch(error){
        console.log(error);
        res.status(500).json(error);
      }
  });

  module.exports = router;