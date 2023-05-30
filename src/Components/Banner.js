import { movies } from "./getMovies";
import Carousel from 'react-bootstrap/Carousel';
import React, { Component } from 'react'

export default class Banner extends Component {
  render() {
    let min = 1;
    let max = 20;
    let rand = Math.floor(Math.random() * (max - min + 1)) + min;
    let movie1 = movies.results[rand]
    let movie2 = movies.results[rand+1]
    let movie3 = movies.results[rand+2]
    return (
        <>
        {
            movie1 === " " || movie2 === " " || movie3 === " " ?
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>:
            // <div className="card banner-card">
            //     <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}   alt={movie.title} className="card-img-top banner-img"/>
            //     {/* <div className="card-body"> */}
            //         <h3 className="card-title banner-title">{movie.original_title}</h3>
            //         <p className="card-text banner-text">{movie.overview}</p>
            //         {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            //     {/* </div> */}
            // </div>

            <Carousel fade className="banner-card" controls={false} indicators={false}>
                <Carousel.Item interval={1000}>
                    <img className="d-block w-100 banner-img" src={`https://image.tmdb.org/t/p/original${movie1.backdrop_path}`} alt={movie1.title}/>
                    <h3 className="card-title banner-title">{movie1.original_title}</h3>
                    <p className="card-text banner-text">{movie1.overview}</p>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img className="d-block w-100 banner-img" src={`https://image.tmdb.org/t/p/original${movie2.backdrop_path}`} alt={movie2.title}/>
                    <h3 className="card-title banner-title">{movie2.original_title}</h3>
                    <p className="card-text banner-text">{movie2.overview}</p>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img className="d-block w-100 banner-img" src={`https://image.tmdb.org/t/p/original${movie3.backdrop_path}`} alt={movie3.title}/>
                    <h3 className="card-title banner-title">{movie3.original_title}</h3>
                    <p className="card-text banner-text">{movie3.overview}</p>
                </Carousel.Item>
            </Carousel>
        }
        </>
    )
  }
}
