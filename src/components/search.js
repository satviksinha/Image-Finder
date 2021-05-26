import React,{useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import ImageResults from './imageresults';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const Search = () => {
    const classes = useStyles();
    const [searchText,SetsearchText] = useState("");
    const [amount,Setamount] = useState(15);
    const [apiUrl] = useState("https://pixabay.com/api");
    const [apiKey] = useState("21789894-6626b43e5308f3fbb1aab939f");
    const [images,Setimages] = useState([]);

    useEffect(() => {
      if(searchText === '')
      {
        Setimages([]);
      }
      else{
        axios.get(`${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}`)
        .then(res => Setimages(res.data.hits))
        .catch(err => console.log(err));
      }
    }, [searchText,apiKey,apiUrl,amount]);

    console.log(images);

    return (
        <div>
            <TextField id="outlined-basic"
             name="searchText"
             value={searchText}
             onChange={ (e) => SetsearchText(e.target.value)}
             label="Search"
             variant="outlined"
            fullWidth />
            <br></br>
            <FormControl  className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Amount</InputLabel>
            <Select
            name="amount"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={amount}
            onChange={(e) => Setamount(e.target.value)}
            autoWidth
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            </FormControl>
            {images.length >0 ? (<ImageResults images={images} />) : null}
        </div>
    )
}

export default Search;
