import sha1 from 'sha1';
import dbClient from '../utils/db';

const UsersController = {
  postNew: async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const user = dbClient.db.collection('users');
    user.findOne({ email }, (err, usr) => {
      if (usr) {
        res.status(400).json({ error: 'Already exist' });
      } else {
        const hashedpwd = sha1(password);
        user.insertOne(
          {
            email,
            password: hashedpwd,
          },
        ).then((result) => {
          res.status(201).json({ id: result.insertedId, email });
        }).catch((err) => console.log(err));
      }
    });
  },

};

module.exports = UsersController;
