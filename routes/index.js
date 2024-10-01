/**
 * Defines the routes for the application
 */

import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const router = Router();

/**
 * Route to check the application status
 * @name GET /status
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/status', AppController.getStatus);

/**
 * Endpoint to obtain statistics about the application
 * @name GET /stats
 * @param {Object} req - Express request object.
 * @param {Object} res - Express request object.
 */
router.get('/stats', AppController.getStats);

/**
 * Endpoint to register a new user.
 * @name POST /users
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/users', async (req, res) => {
  try {
    await UsersController.postNew(req, res);
  } catch (error) {
    console.error('Error in POST /users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Endpoint to initiate user connection.
 * @name GET /connect
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/connect', AuthController.getConnect);

/**
 * Endpoint to terminate user connection.
 * @name GET /disconnect
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/disconnect', AuthController.getDisconnect);

/**
 * Endpoint to fetch the details of the authenticated user.
 * @name GET /users/me
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/users/me', async (req, res) => {
  try {
    await UsersController.getMe(req, res);
  } catch (error) {
    console.error('Error in GET /users/me:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Endpoint to upload a file.
 * @name POST /files
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/files', FilesController.postUpload);

/**
 * Endpoint to retrieve a file document by its ID.
 * @name GET /files/:id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/files/:id', FilesController.getShow);

/**
 * Endpoint to list all file documents for a user.
 * @name GET /files
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/files', FilesController.getIndex);

export default router;
