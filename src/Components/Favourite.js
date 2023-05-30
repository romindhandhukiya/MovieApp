import React, { Component } from 'react';
import { movies } from './getMovies';

class Favourite extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            currgenre:'All Genres',
            movies: [],
            currText:'',
            limit:5,
            currPage:1
        }
    }
    componentDidMount(){
        let data = JSON.parse(localStorage.getItem("movies") || "[]")
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
                
        let tmparr=[];
        data.forEach((movieObj) =>{
            if(!tmparr.includes(genreids[movieObj.genre_ids[0]])){
                tmparr.push(genreids[movieObj.genre_ids[0]])
            }
        })
        tmparr.unshift('All Genres')
        this.setState({
            genres:[...tmparr],
            movies:[...data]
        })
    }
    handleGenre =(genre)=> {
        this.setState({
            currgenre:genre
        })
    }
    sortPopularityDec =() =>{
        let tmp = this.state.movies
        tmp.sort(function(obj1, obj2){
            return obj2.popularity - obj1.popularity;
        })
        this.setState({
            movies:[...tmp]
        })
    }
    sortPopularityInc =() =>{
        let tmp = this.state.movies
        tmp.sort(function(obj1, obj2){
            return obj1.popularity - obj2.popularity;
        })
        this.setState({
            movies:[...tmp]
        })
    }
    sortRatingDec =() =>{
        let tmp = this.state.movies
        tmp.sort(function(obj1, obj2){
            return obj2.vote_average - obj1.vote_average;
        })
        this.setState({
            movies:[...tmp]
        })
    }
    sortRatingInc =() =>{
        let tmp = this.state.movies
        tmp.sort(function(obj1, obj2){
            return obj1.vote_average - obj2.vote_average;
        })
        this.setState({
            movies:[...tmp]
        })
    }
    handlePageChange = (page) => {
        this.setState({
            currPage:page
        }) 
    }
    handleDelete = (id) => {
        let newArr = []
        newArr = this.state.movies.filter((movieObj) => movieObj.id != id)
        this.setState({
            movies:[...newArr]
        })
        localStorage.setItem('movies', JSON.stringify(newArr))
    }

    render() {
        const movie = movies.results
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
                
        // this.setState({
        //     genres : [...tmparr]
        // })
        let filterGenre =[]
        if(this.state.currText===''){
            filterGenre = this.state.movies
        }else{
            filterGenre = this.state.movies.filter((movieObj)=>{
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase())
            })
        }
        // if(this.state.currgenre === "All Genres"){
        //     filterGenre = this.state.movies
        // }
        if(this.state.currgenre !== "All Genres"){
            filterGenre = this.state.movies.filter((movieObj)=> genreids[movieObj.genre_ids[0]]===this.state.currgenre)
        }
        let pages = Math.ceil(filterGenre.length/this.state.limit)
        let pagesArr = []
        for(let i=1; i<=pages; i++){
            pagesArr.push(i)
        }
        let startIndex = (this.state.currPage-1)*this.state.limit;
        let endIndex = startIndex+ this.state.limit;
        filterGenre = filterGenre.slice(startIndex, endIndex);

        return (
            <div>
                <>
                    <div className="main">
                        <div className="row">
                            <div className="col-lg-3">
                                <ul className="list-group favourites-genres">
                                    {
                                        this.state.genres.map((genre) => (
                                            this.state.currgenre === genre ?
                                            <li className="list-group-item" style={{background:'#3f51b5', color:'white', fontWeight:'bold', cursor:'pointer'}}>{genre}</li> :
                                            <li className="list-group-item" style={{background:'white', color:'#3f51b5', cursor:'pointer'}} onClick={()=> this.handleGenre(genre)}>{genre}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="col-lg-9 favourites-table col-sm-12">
                                <div className="row">
                                    <input type="text" className="input-group-text col-6" placeholder='Search movie' value={this.state.currText} onChange={(e)=> this.setState({currText: e.target.value})}/>
                                    <input type="number" className="input-group-text col-6" placeholder='Rows count' value={this.state.limit} onChange={(e) => this.setState({limit: e.target.value})}/>
                                </div>
                                <div className="row">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col" className='text-center'>Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col"><i className='fas fa-sort-up' onClick={this.sortPopularityDec}></i>Popularity<i className='fas fa-sort-down' onClick={this.sortPopularityInc}></i></th>
                                                <th scope="col"><i className='fas fa-sort-up' onClick={this.sortRatingDec}></i>Rating<i className='fas fa-sort-down' onClick={this.sortRatingInc}></i></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className='align-middle'>
                                            {
                                                filterGenre.map((movieObj)=>(
                                                    <tr>
                                                        <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt="" style={{width:'7rem', paddingRight:'1rem'}} />{movieObj.title}</td>
                                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td><button type="button" className="btn btn-danger" onClick={() => this.handleDelete(movieObj.id)}>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            {
                                                pagesArr.map((page)=>{
                                                    return <li className="page-item"><a className="page-link" style={{cursor:'pointer'}} onClick={() => this.handlePageChange(page)}>{page}</a></li>
                                                })
                                            }
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        );
    }
}

export default Favourite;
