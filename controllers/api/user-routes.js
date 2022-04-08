const router = require('express').Router();
const { User} = require("../../models"); 
const withAuth = require('../../utils/auth');



router.get('/', async (req, res) => {
    try {
        const data = await User.findAll({
            attributes: {exclude: ['password']}
        });
        res.json(data);
    }
    catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
  });


router.get('/:id', async (req, res) => {
    try {
        const data = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            }
        });
        if(!data){
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/',async (req, res) => {
    
    try{
        const data = await User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password
          });
          req.session.save(() => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;
        
            res.json(data);
          });
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
  });

 
router.put('/:id',withAuth, async (req, res) => {
    try{
        const data = await User.update(req.body, {
            where: {
              id: req.params.id
            }
          });
          if(!data[0]){
            res.status(404).json({ message: 'No user found with this id' });
          return;
          }
          res.json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
  });

  
router.delete('/:id', withAuth, async (req, res) => {
    try{
        const data = await User.destroy({
            where: {
              id: req.params.id
            }
          });
          if (!data) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
  });

  router.post('/login', async (req, res) => {
      let data = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if(!data){
        res.status(400).json({ message: 'No user with that email address!' });
          return;
      }
      const validPw = data.checkPassword(req.body.password);
        if (!validPw) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
        }
        req.session.save(() => {
          
          req.session.user_id = data.id;
          req.session.username = data.username;
          req.session.loggedIn = true;
    
          res.json({ user: data, message: 'You are now logged in!' });
        });
  });

    router.post('/logout', (req, res) => {
      if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      }
      else {
        res.status(404).end();
      }
    });



module.exports = router;