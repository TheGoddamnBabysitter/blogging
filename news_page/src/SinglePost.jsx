import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SinglePost = () => {
    const [isHidden, setIsHidden] = useState(true); 
    const [title, setTitle] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [singlePost, setSinglePost] = useState({});
    const [msgShow, setMsgShow] = useState(false)
    let { id } = useParams();
    useEffect(() => {
        fetch(
            `http://localhost:5000/posts/${id}`
          )
            .then((response) => response.json())
            .then((data) => {
              // Handle fetched data (e.g., update state or display it)
              // console.log(data);
             console.log(data);
             setSinglePost(data)
             setParagraph(data.post)
             setTitle(data.title)
             if (data.edit > 0) {
                setMsgShow(!msgShow)
             }
            })
            .catch((error) => {
              // Handle errors
              console.error(error);
            });
      }, []);


      const handleSubmit = async (event) => {
        event.preventDefault();
        fetch(`http://localhost:5000/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, paragraph , edit: singlePost.edit+1}),
          });
          setSinglePost({title: title, post: paragraph, edit:singlePost.edit+1})
          setIsHidden(!isHidden);
          setMsgShow(true)
      };
      const toggleVisibility = () => {
        setIsHidden(!isHidden); // Update state on click
      };

    return (
       <div>
        {!isHidden ? null: <div>
            <Link to="/">
      <button>
          Home
        </button>
      </Link>
            <h1>{title}</h1>
            <h3>{paragraph}</h3>
            {!msgShow ? null: <p>Edited {singlePost.edit} times.</p>}
            <button onClick={toggleVisibility}>Update</button>
        </div>}
         
        
        <div>
        {isHidden ? null : <div
     
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '350px',
        margin: '2rem auto',
        padding: '2rem',
        border: '4px solid #ccc', /* Thicker border */
        borderRadius: '10px',
      }}
    >
      <div
        // style={{
        //   display: 'flex',
        //   justifyContent: 'space-between',
        //   width: '100%',
        //   marginBottom: '1rem',
        // }}
      >
        <label htmlFor="title" style={{ display: 'block', marginBottom: '0.7rem', fontWeight: 'bold', color: 'rgb(255 255 255)'}}>
          Title:
        </label>
      
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={singlePost.title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your title here" /* Added placeholder text */
          style={{
            padding: '0.7rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '1rem',
            // width: '100%',
            // minHeight: '100px',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#007bff'; /* Change border color on focus */
          }}
          onBlur={(e) => {
            if (e.target.value === '') {
              e.target.style.borderColor = '#ccc'; /* Reset border color on blur */
            } else {
              e.target.style.transform = 'translateY(-1.2rem) scale(0.8)'; /* Apply floating label style on value */
            }
          }}
        />
      </div>
      <label htmlFor="paragraph" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'rgb(255 255 255)'}}>
        Paragraph:
      </label>
      <textarea
        id="paragraph"
        name="paragraph"
        defaultValue={singlePost.post}
        onChange={(e) => setParagraph(e.target.value)}
        placeholder="Write your paragraph here" /* Added placeholder text */
        style={{
          padding: '0.7rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          marginBottom: '1rem',
          width: '100%',
          minHeight: '100px',
        }}
      />
      <br />
      <div style={{ display : "flex" ,justifyContent: "space-between"}}>
    
      
      <button  onClick={handleSubmit} type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '0.7rem 1rem', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Update
      </button>
      </div>
    </div>}
        </div>
        
        
       </div>
    );
};

export default SinglePost;