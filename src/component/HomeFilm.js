import DoctorS from '../img/drs.PNG'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {  ArrowRightShort,CaretRightFill} from "react-bootstrap-icons";

const keyapi= '08a7cbb1d8fe54cae31787a3e5bc00d2'
function HomeFilm() {
  const [FilmList, setFilmList] = useState ([])
  const [text, setText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  const getFilm = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${keyapi}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setFilmList(json.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

      useEffect(() => {
        if (text !== '' ) {  
          const Searching = async () => {
            try {
              const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${keyapi}&query=${text}`
              );
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const json = await response.json();
              setFilmList(json.results);
              setRefreshing(false); 
            } catch (error) {
              console.error('Error searching for movies:', error);
            }
          };
            Searching();
        } else if (refreshing) {
          getFilm(); 
          setText('');
        } else {
          getFilm(); 
        }
      }, [text, refreshing]);
      
  
  
  return (
    <>
    <section  id="carousel">
        <div className="container mx-auto mt-4 ">
        {/* <!-- Carousel --> */}
            <div id="demo" className="carousel slide" data-bs-ride="carousel">
             {/* <!-- navbar --> */}
              <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                  <a className="navbar-brand" href="#carousel"><h1>Movielist</h1></a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="mynavbar">
                     <input className="form-control mx-auto" 
                      type="text"
                      placeholder="What do you want to watch?"   
                      onChange={(e) => setText(e.target.value)}
                       />
                      <form className="btn-all d-flex">
                      <button className="btn-login btn btn-danger me-2" type="button">Login</button>
                      <button className="btn-register btn btn-danger" type="button">Register</button>
                    </form>
                  </div>
                </div>
              </nav>

              {/* <!-- teks --> */}
                <div className="container">
                  <div className=" Doctor row pt-4 ">
                    <div className="colom-1 col-md-6 col-sm-12 mt-4">
                      <h1>Doctor Strange in the Multiverse of <br/> Madness </h1>
                      <p>Lorem ipsum dolor sit amet,consectetur adipisicing elit,sed do euismod tempor incididunt ut labore et dolore magna aliqua</p>
                    </div>
                    <form className="d-flex">
                      <button className="btn-trailer btn btn-danger me-2" type="button"><CaretRightFill size={20}/>WATCH TRAILER</button>
                    </form>
                  </div>
                </div>
                
            {/* <!-- Indicators/dots --> */}
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>
            {/* <!-- The slideshow/carousel --> */}
            <div className="carousel-inner pb-3 pt-3 "> 
                <div className="carousel-item active">
                <img src={DoctorS} alt="doctor-strange" className="d-block w-100" height="500px"/>
                </div>
                <div className="carousel-item">
                <img src={DoctorS} alt="doctor-strange" className="d-block w-100" height="500px" />
                </div>
                <div className="carousel-item">
                <img src={DoctorS} alt="doctor-strange" className="d-block w-100" height="500px"/>
                </div>
            </div>
            {/* <!-- Left and right controls/icons --> */}
            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
            </div>
        </div>
    </section>

    <div className='container mx-auto mt-4 pb-3 pt-3'>
      <div className='all-film '>
       <div className='tittle d-flex'>
      <h2 className='h'>Popular Movie</h2>
      <h5 className='span ml-auto'>See All Movie<ArrowRightShort size={40} color='red' /></h5>
      </div>
          <div className='listfilm'>
              {FilmList.map((film)=>(
                <>
               <Link to={`/movie/${film.id}`}>
                <img className='img'
                key={film.id}
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
                />
                </Link>
                </>
              ))}
            </div>
          </div>
    </div>
  </>
  )
}

export default HomeFilm


 