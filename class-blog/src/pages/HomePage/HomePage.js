    import { useState, useEffect } from 'react';
    import Modal from 'react-modal';
    import Comments from '../../components/Comments';

    Modal.setAppElement('#root');

    function HomePage() {
    // State for controlling the new post modal
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // State for holding the values of the new post form inputs
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // State for holding the lists of posts
    const [posts, setPosts] = useState([]);
    // State for holding the post ID being edited
    const [postId, setPostId] = useState('');

    // Function to handle form submission for creating a new post
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
      
        if (postId) {
          // If postId exists, update an existing post
          const response = await fetch(`http://localhost:8000/posts/${postId}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify({
              title: title,
              content: content,
            }),
          });
      
          if (response.ok) {
            setModalIsOpen(false);
            // After a post is updated, fetch all the posts again and update the state
            const postsResponse = await fetch('http://localhost:8000/posts', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const postsData = await postsResponse.json();
            setPosts(postsData);
            setPostId('');
            setTitle('');
            setContent('');
          }
        } else {
          // If postId does not exist, create a new post
          const response = await fetch('http://localhost:8000/posts', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              title: title,
              content: content,
              createdAt: Date.now(),
            }),
          });
      
          if (response.ok) {
            setModalIsOpen(false);
            // After a new post is created, fetch all the posts again and update the state
            const postsResponse = await fetch('http://localhost:8000/posts', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const postsData = await postsResponse.json();
            setPosts(postsData);
            setTitle('');
            setContent('');
          }
        }
      };
      
      

    // Effect to fetch all posts when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchPosts = async () => {
        const postsResponse = await fetch('http://localhost:8000/posts', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        const postsData = await postsResponse.json();
        setPosts(postsData);
        };
        fetchPosts();
    }, []);

        // Function to handle deleting a post
        const handleDelete = async (postId) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
        // If the post is deleted, fetch all the posts again and update the state
        const postsResponse = await fetch('http://localhost:8000/posts', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        const postsData = await postsResponse.json();
        setPosts(postsData);
        }
    };

    const handleUpdate = (post) => {
        setTitle(post.title);
        setContent(post.content);
        setPostId(post._id);
        setModalIsOpen(true);
      };
      

    return (
        <div>
        <h1>Welcome to ClassBlog</h1>
        <button onClick={() => setModalIsOpen(true)}>Create new post</button>

        {/* Modal for creating a new post */}
    <Modal isOpen={modalIsOpen}>
        <form onSubmit={handleSubmit}>
            <label>
            Title:
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <br />
            <label>
            Content:
            <textarea value={content} onChange={(event) => setContent(event.target.value)}></textarea>
            </label>
            <br />
            <button type="submit">{postId ? 'Update' : 'Submit'}</button>
            <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </form>
    </Modal>


        {/* Render all the posts, adding edit and delete buttons */}
        <ul>
            {posts.map((post) => (
            <li key={post._id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>posted by {post.user_id.username} on {new Date(post.createdAt).toLocaleString()} </p>
                <button onClick={() => handleUpdate(post)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
                <Comments postId={post._id} />            
            </li>
            ))}
        </ul>
    </div>
    );
    }

    export default HomePage;
