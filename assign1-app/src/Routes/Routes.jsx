import React from "react";
import {
    BrowserRouter as Router,
    Routes, Route
} from "react-router-dom";
import { Home } from "../Pages/Home";
import { Empty } from 'antd';
import { MovieList } from "../Pages/MovieList";
import { Favourites } from "../Pages/Favourites";
import { MovieDetails } from "../Pages/MovieDetails";

export function Routings() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/movie-list' element={<MovieList/>}></Route>
                    <Route path='/movie-details/:id' element={<MovieDetails/>}></Route>
                    <Route path='/favourites' element={<Favourites/>}></Route>
                    <Route path="*" element={<Empty/>}/>
                </Routes>
            </Router>
        </div>
    );
}
