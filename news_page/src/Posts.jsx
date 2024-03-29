import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom'; // Import useLoaderData

const Posts = () => {
   const gottenData = useLoaderData()
    const [posts, setPosts] = useState(gottenData); 


 

  const deletePost = async (e) => {
    const value= e.target.value;
    
    fetch(
      `http://localhost:5000/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({value}),
      }
    )
    const remaining = posts.filter(user => user._id !== value);

    setPosts(remaining)
   
    
  };

  return (
    <div>
        <Link to="/">
      <button>
          Home
        </button>
      </Link>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
            <div key={post._id}>
                 <div style={{
                display: 'flex',
                flexDirection: 'column',
               
                margin: '1rem', // Add margin for spacing
                border: '1px solid #ddd', // Optional border
                borderRadius: '5px', // Optional rounded corners
                padding: '1rem',
                
              }}>
                <h2>{post.title} </h2> {/* Title with h2 tag */}
                <p style={{ overflowWrap: 'break-word',
                 height: '90px',
                 width: '500px', // Adjust width as needed
                overflowX: 'hidden', /* Prevent horizontal overflow */
                overflowY: 'hidden', /* Enable vertical scroll if content overflows */
                textAlign: "left"
                
                }}>{post.post}</p> {/* Paragraph with text overflow handling */}
                <p style={{ overflowWrap: 'break-word',
                 
                 width: '300px', // Adjust width as needed
               
                overflowY: 'hidden', /* Enable vertical scroll if content overflows */
                textAlign: "left"
                
                }}>. . . . . . . . . . . . . . .<Link className="btn btn-link" to={`/posts/${post._id}`}>
                <button >
                   Read More
                  </button>
                </Link></p>
                <button value={post._id} onClick={deletePost}>Delete</button>
               
              </div>
              
            </div>
           
        ))}
      </ul>
      <Outlet /> {/* Display nested route content */}
    </div>
  );
};

export default Posts;

