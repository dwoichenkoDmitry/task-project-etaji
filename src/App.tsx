import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {HomeScreen} from "./screens/HomeScreen";
import {FullTaskScreen} from "./screens/FullTaskScreen";




export default function App(){

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="fullTask" element={<FullTaskScreen />} />
        </Routes>
      </BrowserRouter>
  )
}
