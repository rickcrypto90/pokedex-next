export default function Left({ pokemonData }, { speciesData }) {
    return (
        <div className="panel left-panel">
            <div className="pokemon-name screen">
                {pokemonData.pokemonData.name}
                <span className="name-no">no. {pokemonData.pokemonData.id}</span>
                <div>
                    <img src={pokemonData.pokemonSprites[0]} alt="pokemon" className="pokemon-sprite" />
                    <div className="pokemon-description screen">{pokemonData.description}</div>
                </div>
            </div>
        </div>
    )





}