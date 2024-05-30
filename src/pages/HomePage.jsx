import { useEffect, useRef } from "react";
import { setTrainer } from "../store/slices/trainer.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './styles/HomePage.css';
import imagen from '../../public/images/pokedex.png';

const HomePage = () => {
  
  const inputTrainer = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainer(inputTrainer.current.value.trim()))
    navigate('/pokedex')
  };


  return (
    <div className="home__container">
      <header className="home__header">
        <img className="home__img" src={imagen} />
      </header>
      <p className="home__p"><span>¡Hi trainer!</span> <span>if you want to find you favorite pokemon, please give me your trainer name</span></p>
      <form className="home__form" onSubmit={handleSubmit}>
        <input className="home__input" ref={inputTrainer} type="text" placeholder="insert your trainer name" />
        <button className="home__button">Start</button>
      </form>
      <footer className="home__footer"></footer>
    </div>
  )
};

export default HomePage;