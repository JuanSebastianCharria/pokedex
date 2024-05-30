import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import useFetch from "../hooks/useFetch"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import './styles/PokedexPage.css'
import imagen from '../../public/images/pokedex.png'
import Pagination from "../components/Pagination"


const PokedexPage = () => {

  const [searchedName, setSearchedName] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')

  const trainer = useSelector(states => states.trainer)

  const [pokemons, getPokemons, getTypePokemon] = useFetch();

  useEffect(() => {
    if (typeSelected === 'allPokemons') {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0'
      getPokemons(url)
    } else {
      getTypePokemon(typeSelected)
    }
  }, [typeSelected])

  const inputName = useRef()

  const handleSearch = e => {
    e.preventDefault()
    setSearchedName(inputName.current.value.trim().toLowerCase())
  }

  const callbackFilter = poke => {
    const filterName = poke.name.includes(searchedName)
    return filterName
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [quantsPages, setQuantsPages] = useState(25)

  const limitPages = currentPage * quantsPages
  const startPages = limitPages - quantsPages

  const pages = pokemons?.results.slice(startPages, limitPages)

  const totalPages = Math.ceil((pokemons?.results.length) / quantsPages)


  return (
    <div className="pokepage__container">
      <article className="pokepage__header__container">
      <header className="pokepage__header">
        <img className="pokepage__header__img" src={imagen} alt="" />
      </header>
      </article>
      <p className="pokepage__p"><span>Welcome {trainer},</span> here you will find your favorite pokemon</p>
      <div className="form__input__container">
        <form className="pokepage__form" onSubmit={handleSearch}>
          <input className="pokepage__input" ref={inputName} type="text" placeholder='Find a pokemon'/>
          <button className="pokepage__button">Search</button>
        </form>
      <form className="pokepage__filter">
        <SelectType 
          setTypeSelected={setTypeSelected}
        />
      </form>
      </div>

      <div className="pagination__container">
        <Pagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        />
      </div>

      <div className="pokecards">
        {
          pokemons && pokemons.results.filter(callbackFilter).length === 0
          ? <h2>There are no pokemon that contain the filter characters</h2>
          : 
          ( 
            pages?.filter(callbackFilter).map(poke => (
              <PokeCard 
                key={poke.url}
                poke={poke}
              />
          )))
          
        }
      </div>
    </div>
  )
}

export default PokedexPage