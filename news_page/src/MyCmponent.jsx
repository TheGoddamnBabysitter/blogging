import React, { useState } from 'react';

function MyComponent() {
  const [isHidden, setIsHidden] = useState(true); // Initial visibility state

  const toggleVisibility = () => {
    setIsHidden(!isHidden); // Update state on click
  };

  return (
    <div>
      <button onClick={toggleVisibility}>{isHidden ? 'Show' : 'Hide'}</button>
      {isHidden ? null : <div id="myElement">This element can be hidden/shown</div>}
    </div>
  );
}

export default MyComponent;
