// import { useState } from 'react';
// import Modal from 'react-modal';

// function HomePage() {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const token = localStorage.getItem('token');
//     const response = await fetch('http://localhost:8000/posts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         title: title,
//         content: content,
//       }),
//     });

//     if (response.ok) {
//       setModalIsOpen(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome to ClassBlog</h1>
//       <button onClick={() => setModalIsOpen(true)}>Create new post</button>

//       <Modal isOpen={modalIsOpen}>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Title:
//             <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
//           </label>
//           <br />
//           <label>
//             Content:
//             <textarea value={content} onChange={(event) => setContent(event.target.value)}></textarea>
//           </label>
//           <br />
//           <button type="submit">Submit</button>
//           <button onClick={() => setModalIsOpen(false)}>Cancel</button>
//         </form>
//       </Modal>
//     </div>
//   );
// }

// export default HomePage;
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

function HomePage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        content: content,
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
    }
  };

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

  return (
    <div>
      <h1>Welcome to ClassBlog</h1>
      <button onClick={() => setModalIsOpen(true)}>Create new post</button>

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
          <button type="submit">Submit</button>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </form>
      </Modal>

      {/* Render all the posts */}
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>{post.user_id.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
