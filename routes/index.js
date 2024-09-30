/**
 * Sets the application's routes
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
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
router.get('/status', async (req, res) => AppController.getStatus(req, res));

/**
 * Endpoint to obtain statistics about the application
 * @name GET /stats
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
router.get('/stats', async (req, res) => AppController.getStats(req, res));

/**
 * Endpoint to register a new user.
 * @name POST /users
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
router.post('/users', async (req, res) => UsersController.postNew(req, res));

/**
 * Endpoint to initiate user connection.
 * @name GET /connect
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
router.get('/connect', async (req, res) => AuthController.getConnect(req, res));

/**
 * Endpoint to terminate user connection.
 * @name GET /disconnect
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
router.get('/disconnect', async (req, res) => AuthController.getDisconnect(req, res));

/**
 * Endpoint to fetch the details of the authenticated user.
 * @name GET /users/me
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
router.get('/users/me', async (req, res) => UsersController.getMe(req, res));

/**
 * Endpoint to upload a file.
 * @name POST /files
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
router.post('/files', async (req, res) => FilesController.postUpload(req, res));

/**
 * Endpoint to retrieve a file document by its ID.
 * @name GET /files/:id
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
router.get('/files/:id', async (req, res) => FilesController.getShow(req, res));

/**
 * Endpoint to list all file documents for a user.
 * @name GET /files
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
router.get('/files', async (req, res) => FilesController.getIndex(req, res));

export default router;
