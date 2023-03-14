import { useState, useEffect } from 'react';

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [commentId, setCommentId] = useState(null);
  
    const handleContentChange = (event) => {
      setContent(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token');
      const body = { content, createdAt: Date.now() };
  
      if (commentId) {
        const response = await fetch(`https://classblog-server.onrender.com/comments/${commentId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
  
        if (response.ok) {
          const updatedComment = await response.json();
          setComments(comments.map(comment => comment._id === updatedComment._id ? updatedComment : comment));
          setContent('');
          setCommentId(null);
        }
      } else {
        const response = await fetch(`https://classblog-server.onrender.com/posts/${postId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
  
        if (response.ok) {
          const comment = await response.json();
          setComments([...comments, comment]);
          setContent('');
        }
      }
    };
  
    const handleEdit = (comment) => {
      setContent(comment.content);
      setCommentId(comment._id);
    };
  
    const handleDelete = async (commentId) => {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://classblog-server.onrender.com/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setComments(comments.filter(comment => comment._id !== commentId));
      }
    };
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      const fetchComments = async () => {
        const response = await fetch(`https://classblog-server.onrender.com/posts/${postId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setComments(data);
      };
      fetchComments();
    }, [postId]);
  
    return (
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Add a comment:
            <input type="text" value={content} onChange={handleContentChange} />
          </label>
          <button className='button' type="submit">{commentId ? 'Update' : 'Submit'}</button>
        </form>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.content}</p>
            <p>Commented by: {comment.user_id.username} on {new Date(comment.createdAt).toLocaleString()}</p>
            <button className='button' onClick={() => handleEdit(comment)}>Edit</button>
            <button className='delete-button' onClick={() => handleDelete(comment._id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
  
export default Comments;
