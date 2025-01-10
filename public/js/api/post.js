import axios from 'axios';

/**
 * Fetch posts with pagination and search
 * @param {number} page - Current page number
 * @param {number} limit - Number of posts per page
 * @param {string} search - Search query (optional)
 */
export const getPosts = async (page = 1, limit = 10, searchKey = '') => {
  try {
    const response = await axios.get('http://localhost:9000/api/v1/blogs', {
      params: { page, limit, searchKey },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], total: 0, page: 1, limit };
  }
};
