import axios from "axios";

const BASE_URL="https://api.themoviedb.org/3";
const TMDB_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTVkNWEwZWE4NWYyNjNiNDYxN2U0M2U3ZjcxZWJiZiIsInN1YiI6IjY1N2Q1MjQwZmQxNDBiMDc2YjgyMTJmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.juJ55RuO5MVjieOw5ptv2gV3MMkzhHgDPg67on6TW10";
const headers={
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi=async(url,params)=>{
    try{
        //desttructure data and get data using axios
        const {data}=await axios.get(BASE_URL + url,{
            headers,
            params,
        });
        return data;
    }
    catch(err){
        console.log(err);
        return err;
    }
}