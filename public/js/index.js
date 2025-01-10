// Dummy Data
import '@babel/polyfill';

import { renderPosts } from './renderPost';
import { getPosts } from './api/post';

let currentPage = 1; // Tracks the current page
const postsPerPage = 10; // Number of posts per page
let totalPosts = 0; // Total number of posts
let currentSearch = ''; // Current search query
let blogPosts = []; // Stores fetched posts

const loginBtn = document.querySelector('.btn__login');
const signupBtn = document.querySelector('.btn__signup');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');

// Fetch and Render Posts
const fetchAndRenderPosts = async () => {
  const postContainer = document.getElementById('blog-posts');
  const response = await getPosts(currentPage, postsPerPage, currentSearch);

  totalPosts = response.data.result; // Update total posts count
  blogPosts = response.data.posts; // Store fetched posts globally

  renderPosts(postContainer, blogPosts);

  renderPagination();
};

// Render Pagination
const renderPagination = () => {
  const paginationContainer = document.getElementById('pagination');
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (totalPages <= 1) {
    paginationContainer.innerHTML = ''; // No pagination needed
    return;
  }

  let buttons = '';

  for (let i = 1; i <= totalPages; i++) {
    buttons += `
      <button 
        class="btn ${
          i === currentPage ? 'btn-primary' : 'btn-outline-primary'
        } mx-1"
        data-page="${i}"
      >
        ${i}
      </button>
    `;
  }

  paginationContainer.innerHTML = buttons;
};

// Handle Pagination Button Clicks
document.getElementById('pagination').addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    currentPage = parseInt(event.target.getAttribute('data-page'));
    fetchAndRenderPosts();
  }
});

// Handle Search
document.getElementById('search-form').addEventListener('submit', event => {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  currentSearch = searchInput.value.trim();
  currentPage = 1; // Reset to first page on new search
  fetchAndRenderPosts();
});

// Toggle Read More/Read Less
document.getElementById('blog-posts').addEventListener('click', event => {
  if (event.target.classList.contains('read-more')) {
    const postId = event.target.getAttribute('data-id');
    const contentDiv = document.getElementById(`content-${postId}`);
    const post = blogPosts.find(post => post.id === parseInt(postId));

    if (contentDiv.textContent.endsWith('...')) {
      contentDiv.textContent = post.content;
      event.target.textContent = 'Read Less';
    } else {
      contentDiv.textContent = post.content.substring(0, 100) + '...';
      event.target.textContent = 'Read More';
    }
  }
});

// Initialize
fetchAndRenderPosts();

// Open modals when buttons are clicked
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
  });
}

if (signupBtn) {
  signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'block';
  });
}

// Close modals when the close button is clicked
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', event => {
    const modalId = event.target.getAttribute('data-modal');
    document.getElementById(modalId).style.display = 'none';
  });
});

// Close modals when clicking outside the modal content
window.addEventListener('click', event => {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});
