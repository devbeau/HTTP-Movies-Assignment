import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
    title: '',
    director: '',
    metascore: ''
}

export default function EditMovie({movieList, setMovieList}){
    let {id} = useParams();
    console.log(id, movieList);
    let movie = movieList.filter(movie => {
        return movie.id === Number(id);
    });
    console.log(movie, id);
    movie = movie[0];
    let [formValues, setFormValues] = useState(movie);
    let history = useHistory();

    function onChange(event) {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    }

    function onSubmit(event){
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, formValues)
            .then(res => {
                let newList = movieList.reduce((acc, movie) =>  {
                    let retMovie;
                    if (movie.id === id){
                        retMovie = res.data;
                    } else retMovie = movie
                    return [...acc, retMovie]
                }, []);
                setMovieList(newList)
                history.push('/');
            }
            )
            .catch(err => console.log(err));
            
    }
    return (
        <form  onSubmit={onSubmit} className="edit-movie-form">
            <input
            name='title'
            type='text'
            value={formValues.title}
            onChange={onChange}
            />
            <input
            name='director'
            type='text'
            value={formValues.director}
            onChange={onChange}
            />
            <input
            name='metascore'
            type='text'
            value={formValues.metascore}
            onChange={onChange}
            />
            <button>submit</button>
        </form>
    )
}