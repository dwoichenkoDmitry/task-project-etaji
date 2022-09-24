import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {HomeScreen} from "./screens/HomeScreen";
import {FullTaskScreen} from "./screens/FullTaskScreen";
import {PostReader} from "./screens/PostReader";
import {useDispatch} from "react-redux";
import {UpdatePost} from "./screens/UpdatePost";
import {Bag} from "./screens/Bag";


export default function App(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({type: 'ASYNC_LOAD'})
    },[])




  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="fullTask/:typeScreen/:id" element={<FullTaskScreen />} />
            <Route path="addPost" element={<PostReader />} />
            <Route path="updatePost/:id" element={<UpdatePost />} />
            <Route path="bag" element={<Bag />} />
        </Routes>
      </BrowserRouter>
  )
}
