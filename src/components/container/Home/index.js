import React, { Component } from 'react';
import axios from 'axios'
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from '../../../config';
import HeroImage from '../HeroImage';
import SearchBar from '../SearchBar';
import FourColGrid from '../FourColGrid';
import MovieThumb from '../Movie/MovieThumb';
import LoadMoreBtn from '../LoadMoreBtn';
import Spinner from '../Spinner';
import './Home.css';
import _ from 'lodash';

class Home extends Component {
 state = {
     movies: [],
     heroImage: null, 
     loading: false,
     totalPages: 0, 
     searchTerm: '', 
     currentPage: undefined,
 }

componentDidMount(){
    this.fetchItems();
}

handleSearch = (value) => {
  this.searchItems(value)
}
searchItems = async (value) => {
    if(value){
        this.setState({
            movies: [],
            loading: true, 
        })
        try{
            const res = await axios.get(`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${value}`)
            const { data } = await res
            return this.setState({
                movies: data.results,
                loading: false,
            })
        } catch(err) {
                return console.log(err)
        } 
    } else {
        try{
            const res = await axios.get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
            const { data } = await res
            return this.setState({
                movies: data.results,
                heroImage: data.results[0],
                currentPage: data.page,
            })
        } catch(err) {
            return console.log(err)
        }
    }   
}

loadMoreItems = async () => {
    const { currentPage, movies, searchTerm } = this.state
    this.setState({ loading: true });
        try{
                const res = await axios.get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`)
                const { data } = await res
                console.log(data.page)
                return this.setState({
                    movies: [...movies , ...data.results],
                    heroImage: data.results[0],
                    currentPage: currentPage + 1,
                    loading: false,
                })
        } catch(err) {
                return console.log(err)
        } 
}


fetchItems = async () => {
    try{
        const res = await axios.get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        const { data } = await res
        console.log(data.page)
        return this.setState({
            movies: data.results,
            heroImage: data.results[0],
            currentPage: data.page,
        })
    } catch(err) {
        return console.log(err)
    }
}



 render() {
     const { movies, heroImage, searchTerm } = this.state
     console.log(searchTerm)
 return (
    <div className="rmdb-home">
    {heroImage ?
    <div>
        <HeroImage 
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
            title={heroImage.original_title}
            text={heroImage.overview}
        />
        <SearchBar handleSearch={this.handleSearch} />
    </div> 
    : null }
    <div className="rmdb-home-grid">
    <FourColGrid
        header={this.state.searchTerm ? 'Search Result' : 'Popular Movies'}
        loading={this.state.loading}
   >
    {_.map(movies, (element) => (
        <MovieThumb
                key={element.id}
                clickable={true}
                image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                movieId={element.id}
                movieName={element.original_title}
        />))}
    </FourColGrid>
    {this.state.loading ? <Spinner /> : null}
     <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />

   </div>

    </div>
    
    )
 }
}

export default Home; 