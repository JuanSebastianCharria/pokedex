import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import './styles/PokeInfoPage.css'
import imagen from '../../public/images/pokedex.png'

const PokeInfoPage = () => {

  const {name} = useParams()

  const [pokemons, getPokemons] = useFetch()

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    getPokemons(url)
  }, [name])


  return (
    <div className="info__general__container">
      <main className="info__container">
          <article className="info__header__container">
            <header className="info__header">
              <img className="info__header__img" src={imagen} alt="" />
            </header>
          </article>
          <section className="info__first__card">
              <header className={`info__card__header bg__${pokemons?.types[0].type.name}`}>
                <img className="info__card__img" src={pokemons?.sprites.other['official-artwork'].front_default} alt="" />
              </header>
              <h2 className={`info__id info__idname__${pokemons?.types[0].type.name}`}>#{pokemons?.id}</h2>
              <div className="info__name__container"> 
                <hr className="info__hr__left" />
                  <h2 className={`info__name info__idname__${pokemons?.types[0].type.name}`}>{pokemons?.name}</h2>
                <hr className="info__hr__right" />
              </div>

              <ul className="info__characteristics">
                <li><span className="info__weight">Weight</span> <br /> <span className="info__wg__value">{pokemons?.weight}</span></li>
                <li><span className="info__height">Height</span> <br /> <span className="info__wg__value">{pokemons?.height}</span></li>
              </ul>             
        <div className="info__typeskill__container">
          <div className="info__type__container">
            <span className="info__type__title">Types</span>
            <ul className="info__type">
              {pokemons?.types.map(type => (
                <li className="info__type__label" key={type.type.url}>
                  <span className={`info__type__value info__type__${pokemons?.types[0].type.name}`}>{type.type.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="info__skill__container">
            <span className="info__skill__title">Skills</span>
            <ul className="info__skill">
              {pokemons?.abilities.map(ability => (
                <li className="info__skill__label" key={ability.ability.url}>
                  <span className="info__skill__value">{ability.ability.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="info__stats__card">
          <h2 className="info__title__stats">Stats</h2>
          <hr className="info__hr__stats" />
          <ul className="info__stats__container">
            {pokemons?.stats.map(info => (
              <li className="card__stats__list" key={info.stat.url}>
                <div className="info__stats__header">
                  <span className="info__stats__label">{info.stat.name}</span>
                  <span className={`info__stats__value text__${pokemons?.types[0].type.name}`}>
                    {info.base_stat} / 150
                  </span>
                </div>
                <div className="bar-container">
                  <div
                    className="bar"
                    style={{ width: `${(info.base_stat / 150) * 100}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        </section>
      </main>
      <main className="info__second__card">
        <section className="info__moves__container">
              <h2 className="info__moves__title">Movements</h2>
              <hr className="info__hr__moves"/>
                <ul className="info__moves__list">
                  {pokemons?.moves.map(info => (
                    <li className="info__moves__label" key={info.move.url}>
                      <span className="info__moves__value">{info.move.name}</span>
                    </li>
                  ))
                  }
                </ul>
        </section>
      </main>
    </div>
  )
}

export default PokeInfoPage