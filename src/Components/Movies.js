import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1, 
            movies: [],
            favourites:[]
        }
    }
    async componentDidMount(){
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data = res.data
        this.setState({
            movies:[...data.results]
        })
    }
    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data = res.data
        this.setState({
            movies:[...data.results]
        })  
    }
    handleRight = () =>{
        let tmparr = [];
        for(let i=1; i<=this.state.parr.length+1; i++){
            tmparr.push(i);
        }
        this.setState({
            parr:[...tmparr],
            currPage:this.state.currPage+1
        }, this.changeMovies)
    }
    handleLeft = () =>{
        if(this.state.currPage !== 1){
            this.setState({
                currPage: this.state.currPage-1
            }, this.changeMovies)
        }
    }
    handleClick = (value) =>{
        if(value !== this.state.currPage){
            this.setState({
                currPage: value
            }, this.changeMovies)
        }
    }

    handleFavoutites = (movieObj) => {
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]')
        if(this.state.favourites.includes(movieObj.id)){
            oldData = oldData.filter((movie) => movie.id !== movieObj.id)
        }
        else{
            oldData.push(movieObj);
        }
        localStorage.setItem('movies', JSON.stringify(oldData));
        this.handleFavoutitesStates();
    }
    handleFavoutitesStates = () => {
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]')
        let tmp = oldData.map((movie) => movie.id)
        this.setState({
            favourites:[...tmp]
        })
    }

    render() {
    // let movie = movies.results
    return (
      <>
        {
            this.state.movies.length === 0?
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>:
            <div>
                <h3 className='text-center mt-4 md-1'><strong>Trending</strong></h3>
                <div className='movies-list'>
                    {
                        this.state.movies.map((movieObj)=> (
                            <div className="card movie-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                                <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}   alt={movieObj.title} className="card-img-top movie-img"/>
                                {/* <div className="card-body"> */}
                                    <h4 className="card-title movie-title">{movieObj.original_title}</h4>
                                    {/* <p className="card-text banner-text">{movieObj.overview}</p> */}
                                    <div className="button-wrapper" style={{display:'flex', width:'100%', justifyContent:'center'}}>
                                        {
                                            this.state.hover === movieObj.id &&
                                            <a className="btn btn-primary movie-btn" onClick={() => this.handleFavoutites(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove from Favourites":"Add to Favourites"}</a>
                                        }
                                    </div>
                                {/* </div> */}
                            </div>
                        ))
                    }

                    <div style={{display:'flex', justifyContent:'center'}}>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                                {
                                    this.state.parr.map((value)=> (
                                        <li class="page-item"><a class="page-link" onClick={() => this.handleClick(value)}>{value}</a></li>
                                    ))
                                }
                                <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
        }
      </>
    )
  }
}
