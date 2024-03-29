import React from 'react';
import { Link } from 'react-router-dom';


const NavigationBar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'gray', padding: '1rem 2rem' ,border: '1px solid #535bf2',  borderRadius: '10px'}}>
      <h1 style={{color : "#7F00FF"}}>My Blogging Site..........</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
      <Link className="btn btn-link" to="/post_data">
      <button >
          Submit
        </button>
      </Link>
      <Link className="btn btn-link" to="/posts">
      <button>
          Posts
        </button>
      </Link>
        
      </div>


    
    </nav>
  );
};

export default NavigationBar;
