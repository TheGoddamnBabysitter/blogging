import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PostData = () => {
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');

  const handleSubmit = async (event) => {
    // event.preventDefault();
   
if (title === '' || paragraph === "") {
    alert("Please type someting")
}else{
    
    try {
        const response = await fetch('http://localhost:5000/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, paragraph, edit:0}),
         
        });
       
        
        if (!response.ok) {
          throw new Error('Something went wrong');
          
        }
  
        const data = await response.json();
        console.log(data.message); // setSuccessMessage(data.message); // Update success message state
        
      
      } catch (error) {
        console.error('Error submitting data:', error);
        // Handle errors appropriately (e.g., display error message)
      }
      
}


  };

  return (
    <>
     <form
    id='myForm'
      onSubmit={handleSubmit}
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
          defaultValue={title}
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
        // value={paragraph}
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
      <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '0.7rem 1rem', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Submit
      </button>
    </form>
 
    <Link to="/">
      <button>
          Home
        </button>
      </Link>
    </>
   
    
  );
};

export default PostData;
