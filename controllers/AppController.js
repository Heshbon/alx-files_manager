/**
 * AppController represents the main controller for the application
 */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

/**
 * AppController class to manage application status and statistics
 */
class AppController {
  /**
   * Retrieve the status of Redis and the database
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} JSON response containing the status of Redis and the database.
   */
  static async getStatus(req, res) {
    try {
      const redisStatus = redisClient.isAlive();
      const dbStatus = dbClient.isAlive();
      res.status(200).json({ redis: redisStatus, db: dbStatus });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Retrieve the count of users and files in the database.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} JSON response with the counts of users and files.
   */
  static async getStats(req, res) {
    try {
      const users = await dbClient.nbUsers();
      const files = await dbClient.nbFiles();
      res.status(200).json({ users, files });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AppController;
