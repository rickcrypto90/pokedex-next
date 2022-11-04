import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react'
import Left from './Left'
import Right from './Right';



function Pokedex() {
    //LOGIC
    const [state, setState] = useState({
        root: "https://pokeapi.co/api/v2/pokemon/",
        pokemonData: {},
        pokemonIndex: null,
        speciesData: {},
        pokemonSprites: [],
        loading: false
    });

    const [id, setId] = useState(1)
    //UTILITY

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return
        }
        changePokemon()
    }, [id])
    function UpdateState(param) {
        setState(prev => ({ ...prev, ...param }))
    }

    function pokemonRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    // DISPLAY POKEMONS
    function nextPokemon() {
        setId(prevId => prevId + 1)

    }
    function previusPokemon() {
        id !== 1 && setId(prevId => prevId - 1)

    }

    function changePokemon() {
        UpdateState({ loading: true })
        // ROOT REQUEST
        const request = `${state.root}${id}`;
        axios.get(request, {
            cache: "force-cache"
        }).then(res => {
            UpdateState({ pokemonData: res.data, pokemonIndex: res.data.id, pokemonSprites: [res.data.sprites.front_default, res.data.sprites.back_default] })

            return res.data
        })
            // DATA REQUEST
            .then(res =>
                axios.get(res.species.url).then(res => {

                    UpdateState({
                        speciesData: res.data, loading: false, description: pokemonRandom(
                            res.data.flavor_text_entries.filter(e => e.language.name === "it").map(e => e.flavor_text)
                        )
                    })

                })
            )

    }

    // MOVE INTO POKEDEX FUNCTIONS


    function handleChange(e) {
        let value = Number(e.target.value)
        setState(state => ({ ...state, ...{ pokemonIndex: value } }))

    }
    function pickPokemon(e) {
        e.preventDefault()
        setId(state.pokemonIndex)

    }

    return (
        <>
            <section className='pokedex'>
                <Left pokemonData={state} speciesData={state.speciesData} />
                <div className="divider">
                    <div className="gap" />
                    <div className="hinge" />
                    <div className="gap" />
                    <div className="hinge" />
                    <div className="gap" />
                </div>
                <Right data={state.pokemonData}>
                    <div className="panel-row controls">
                        <div className="button" onClick={previusPokemon} />
                        <form className='controlli'>
                            <input
                                type="number"
                                className="screen num-input"
                                placeholder={id}
                                onChange={handleChange}
                            />
                            <button type="submit" className="submit" onClick={pickPokemon} />
                        </form>
                        <div className="button" onClick={nextPokemon} />


                    </div>
                </Right>


            </section>
        </>




    )

}

export default Pokedex