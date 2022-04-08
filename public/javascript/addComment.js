async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_content = document.querySelector('.comment-content').value.trim();
  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    if (comment_content) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            comment_content
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
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);


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


  document.querySelector(".delete-comment-form").addEventListener('submit', deleteCommentHandler);