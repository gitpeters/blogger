let allPosts;
export function renderPosts(postContainer, posts) {
  allPosts = posts;
  postContainer.innerHTML = posts
    .map(
      post => `
        <div class="col-md-6">
          <div class="card mb-4">
            <img src="${post.coverImage}" class="card-img-top" alt="${
        post.title
      }">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="text-muted">By ${post.User.firstName} ${
        post.User.lastName
      } in <span class="text-primary">${post.Category.name}</span></p>
              <p class="post-content" id="content-${post.id}">
                ${post.content.substring(0, 100)}...
              </p>
              <a class="read-more" data-id="${post.id}">Read More</a>
              <hr />
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">
                  <i class="bi bi-hand-thumbs-up"></i> ${
                    !post.likes ? 0 : post.likes
                  } Likes
                </span>
                <span class="text-muted">
                  <i class="bi bi-chat-dots"></i> ${
                    post.Comments.length
                  } Comments
                </span>
              </div>

              <!-- Comments Section -->
              ${
                post.Comments.length > 0
                  ? `  
                    <div class="mt-3">
                      <strong>Comments:</strong>
                      <div id="comments-${post.id}">
                        ${renderComments(
                          post.Comments.slice(0, 5),
                          post.id
                        )} <!-- Top 5 comments initially -->
                        ${
                          post.Comments.length > 5
                            ? `<button class="btn btn-link toggle-comments" data-post-id="${post.id}">See All Comments</button>`
                            : ''
                        }
                      </div>
                    </div>
                  `
                  : ''
              }
            </div>
          </div>
        </div>
      `
    )
    .join('');

  // Attach event listeners for "See All Replies" and "See All Comments" buttons
  const replyButtons = document.querySelectorAll('.toggle-replies');
  replyButtons.forEach(button => {
    button.addEventListener('click', event => {
      const commentId = event.target.getAttribute('data-comment-id') * 1;
      const postId = event.target.getAttribute('data-post-id') * 1;
      toggleReplies(commentId, postId);
    });
  });

  const commentButtons = document.querySelectorAll('.toggle-comments');
  commentButtons.forEach(button => {
    button.addEventListener('click', event => {
      const postId = event.target.getAttribute('data-post-id');
      toggleComments(event, postId); // Pass event and postId
    });
  });
}

// Helper function to render replies (top 3 initially)
// Helper function to render replies (top 3 initially)
function renderReplies(replies, all) {
  if (all) {
    return replies
      .map(
        reply => `
        <div class="reply d-flex justify-content-between">
          <p>${reply.content}</p>
          <small>${reply.repliedBy}</small>
        </div>
      `
      )
      .join('');
  } else {
    return replies
      .slice(0, 2) // Top 3 replies
      .map(
        reply => `
        <div class="reply d-flex justify-content-between">
          <p>${reply.content}</p>
          <small>${reply.repliedBy}</small>
        </div>
      `
      )
      .join('');
  }
}

// Helper function to render comments (top 5 initially) along with top 3 replies for each comment
function renderComments(comments, postId) {
  return comments
    .map(
      comment => `
        <div class="comment">
          <p>${comment.content}</p>
          <div class="d-flex justify-content-between">
            <small>By ~ <strong>${comment.commentedBy}</strong></small>
            <span class="text-muted">${comment.replies.length} Replies</span>
          </div>
          <div id="replies-${comment.id}">
            ${renderReplies(
              comment.replies,
              false
            )} <!-- Render top 3 replies here -->
            ${
              comment.replies.length > 2
                ? `<button class="btn btn-link toggle-replies" data-comment-id="${comment.id}" data-post-id="${postId}">See All Replies</button>`
                : ''
            }
          </div>
        </div>
      `
    )
    .join('');
}

// Toggle function to show all replies when "See All Replies" is clicked
function toggleReplies(commentId, postId) {
  const repliesDiv = document.getElementById(`replies-${commentId}`);
  const button = repliesDiv.querySelector('button');
  const post = allPosts.find(post => post.id === postId); // Find the post by ID
  const comment = post.Comments.find(c => c.id === commentId); // Find the comment by ID

  if (button.textContent === 'See All Replies') {
    // Render all replies
    repliesDiv.innerHTML = `
      ${renderReplies(comment.replies, true)} <!-- Render all replies -->
      <button class="btn btn-link toggle-replies" data-comment-id="${commentId}" data-post-id="${postId}">See Less</button>
    `;
  } else {
    // Render top 3 replies
    repliesDiv.innerHTML = `
      ${renderReplies(comment.replies, false)} <!-- Render top 3 replies -->
      ${
        comment.replies.length > 2
          ? `<button class="btn btn-link toggle-replies" data-comment-id="${commentId}" data-post-id="${postId}">See All Replies</button>`
          : ''
      }
    `;
  }

  // Reattach event listener
  const newButton = repliesDiv.querySelector('button');
  if (newButton) {
    newButton.addEventListener('click', () => toggleReplies(commentId, postId));
  }
}

// Toggle function to show all comments when "See All Comments" is clicked
function toggleComments(event, postId) {
  const commentsDiv = document.getElementById(`comments-${postId}`);
  const button = event.target; // Button that was clicked
  const post = allPosts.find(post => post.id === postId); // Find the post by ID

  if (button.textContent === 'See All Comments') {
    // Render all comments
    commentsDiv.innerHTML = `
      ${renderComments(post.Comments, postId)} <!-- Render all comments -->
      <button class="btn btn-link toggle-comments" data-post-id="${postId}">See Less</button>
    `;
  } else {
    // Render top 5 comments
    commentsDiv.innerHTML = `
      ${renderComments(
        post.Comments.slice(0, 5),
        postId
      )} <!-- Render top 5 comments -->
      ${
        post.Comments.length > 5
          ? `<button class="btn btn-link toggle-comments" data-post-id="${postId}">See All Comments</button>`
          : ''
      }
    `;
  }

  // Reattach event listener
  const newButton = commentsDiv.querySelector('button');
  if (newButton) {
    newButton.addEventListener('click', event => toggleComments(event, postId));
  }
}
