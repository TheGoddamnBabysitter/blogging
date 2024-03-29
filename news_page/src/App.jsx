import React from "react";
import {
 
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import PostData from "./PostData";
import NavigationBar from "./NavigationBar";
import Posts from "./Posts";
import SinglePost from "./SinglePost";



const App = () => {



  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavigationBar></NavigationBar>,
    },
    {
      path: "/post_data",
      element: <PostData></PostData>,
    },
    
    {
      path: "/posts",
      element: <Posts></Posts>,
      loader : ()=>{
          return fetch(`http://localhost:5000/posts`)
      }
    },
    {
      path: "/posts/:id",
      element: <SinglePost></SinglePost>,
    
    },
  ]);
  // console.log(`${campus}${version}${dep}: ${name}${id}`);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );

};

export default App;