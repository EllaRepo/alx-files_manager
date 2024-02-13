import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const user = dbClient.db.collection('users');
    user.findOne({ email })
      .then((user) => {
        if (user) {
          return res.status(400).json({ error: 'Already exist' });
        }
        const hashedPwd = sha1(password);
        return user.insertOne({ email, password: hashedPwd });
      })
      .then((result) => {
        res.status(201).json({ id: result.insertedId, email });
      })
      .catch((err) => console.log(err));
  }
}

module.exports = UsersController;
