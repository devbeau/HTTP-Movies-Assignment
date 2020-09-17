import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

let initialFormValues = {
    title: '',
    director: '',
    metascore: '',
    stars: '',
}

export default function AddMovie({movieList, setMovieList}){
    let [formValues, setFormValues] = useState(initialFormValues);
    let history = useHistory();

    function onChange(event) {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    }

    function onSubmit(event){
        event.preventDefault();
        let newMovie = {...formValues};
        let newArray = formValues.stars.split(' ');
        let returnArr = [];
        for (let i = 0; i < newArray.length - 1; i += 2){
            returnArr.push(newArray[i] + ' ' + newArray[i+1]);
        }
        newMovie.stars = returnArr;
        axios.post("http://localhost:5000/api/movies", newMovie)
            .then(res => {
                console.log(res.data);
                setMovieList(res.data);
                history.push('/');
            })
            .catch(err => console.log(err));
    }
    return (
        <form onSubmit={onSubmit} className="add-movie-form">
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
            <input
            name='stars'
            type='text'
            value={formValues.stars}
            onChange={onChange}
            />

            <button>submit</button>
        </form>
    )
}