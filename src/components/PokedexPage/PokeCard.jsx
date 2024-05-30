import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import './styles/PokeCard.css';

const PokeCard = ({poke}) => {

    const [pokemons, getPokemons] = useFetch();

    useEffect(() =>{
        getPokemons(poke.url)
    }, [])

    const navigate = useNavigate()
    
    const handleNavDetail = () => {
        navigate(`/pokemon/${pokemons.name}`)
    }

    return (
        <article className={`poke border__${pokemons?.types[0].type.name}`} onClick={handleNavDetail}>
            <header className={`poke__header  bg__${pokemons?.types[0].type.name}`}>
                <img className="poke__sprite" src={pokemons?.sprites.other['official-artwork'].front_default} alt="" />
            </header>
            <section className="poke__body">
                <h3 className="poke__name">{pokemons?.name}</h3>
                <ul className="poke__types">
                    {
                        pokemons?.types.map(typeInfo => (
                        <li className="poke__types__item" key={typeInfo.type.url}>{typeInfo.type.name}</li>
                    ))
                }
                </ul>
                <hr className="poke__hr" />
                <ul className="poke__stats">
                    {
                        pokemons?.stats.map(statInfo => (
                            <li className="poke__stats__item" key={statInfo.stat.url}>
                                <span className="poke__stats__label">{statInfo.stat.name}</span>
                                <span className="poke__stats__value">{statInfo.base_stat}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </article>
    )
}

export default PokeCard