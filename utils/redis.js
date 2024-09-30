import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Redis client for managing connections and data.
 */
class RedisClient {
  /**
   * Initializes a new RedisClient instance.
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;

    // Handle connection errors
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });

    // Handle successful connection
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks if the Redis connection is active
   * @returns {boolean} True if connected, false otherwise.
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Retrieves the value for a specified key.
   * @param {String} key - The key to retrieve.
   * @returns {Promise<String | Object>}:
   * The value associated with the key, or null if not found.
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Stores a key-value pair with an expiration time.
   * @param {String} key - The key to store
   * @param {String | Number | Boolean} value - The value to store
   * @param {Number} duration - The expiration time in seconds
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  /**
   * Deletes the value for a specified key
   * @param {String} key - The key to remove
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
