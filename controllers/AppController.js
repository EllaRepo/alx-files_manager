const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const AppController = {
  getStatus: (req, res) => {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();

    const status = {
      redis: redisStatus,
      db: dbStatus,
    };

    res.status(200).json(status);
  },

  getStats: async (req, res) => {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();

      const stats = {
        users: usersCount,
        files: filesCount,
      };

      res.status(200).json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = AppController;
