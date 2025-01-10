import axios from 'axios';

import { showAlert } from '../alert';

export const login = async (username, password) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:9000/api/v1/auth/login',
      data: { username, password },
    });
    if (response.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
