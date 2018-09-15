import React, { Component } from 'react'; 
import axios from 'axios'
import { API_URL, API_KEY } from '../../../config';
import Navigation from '../Navigation';
import MovieInfo from './MovieInfoBar';
import MovieInfoBar from './MovieInfoBar';
import FourColGrid from '../FourColGrid';
import Actor from '../Actor';
import Spinner from '../Spinner';
import _ from 'lodash';
import './styles/Movie.css';

class Movie extends Component {
    state = {
        movie: null,
        actors: null,
        directors: [],
        loading: false 
    }
        
    componentDidMount() {
        this.fetchItems()
    }
        fetchItems = async () => {
            try{
                const res = await axios.get(`${API_URL}/movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`)
                const { data } = await res
                return console.log(data)
            } catch (err) {
                return console.log(err)
            }           
        }

    render() {
        return (
            <div className="rmdb-movie">
            {this.state.movie ? 
            <div>
            <Navigation movie={this.props.location.movieName} />
            <MovieInfo movie={this.state.movie} directors={this.state.directors} />
            <MovieInfoBar time={this.state.movie.runtime} budget={this.state.movie.budget}  revenue={this.state.revenue} />

            </div>
            :
            null }
            {this.state.actors ? 
                <div className="rmdb-movie-grid">
                <FourColGrid header={'Actors'}>
    
                {this.state.actors.map( (element, i) => {
                    return <Actor key={i} actor={element} />
                })} 
                </FourColGrid>   
                </div>
                : null }
                {!this.state.actors && !this.state.loading ? <h1> No Movie Found! </h1> : null}
                {this.state.loading ? <Spinner /> :null}
            
            }

            </div>
        )
    }
}

export default Movie;
