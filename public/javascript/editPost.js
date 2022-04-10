async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('.post-title').value.trim();
    const post_content = document.querySelector('.post-content').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          post_content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }

  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);

  async function deleteCommentHandler(event){
    event.preventDefault();
    const comment_id = event.target.id.replace("id-","");
    
    let response = await fetch('/api/comments/' + comment_id, {
      method: 'DELETE',
            body: JSON.stringify({
              comment_id,
            }),
            headers: {
              'Content-Type': 'application/json'
            }
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }


  document.querySelector('.delete-comment-form').addEventListener('submit', deleteCommentHandler);