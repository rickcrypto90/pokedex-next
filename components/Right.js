import React from 'react'

export default function Right(props) {
    function padding(stat, val, sep, len) {
        val = val || "xx";
        let output = `
        ${stat.toString()}${sep.repeat(len - (val.toString().length + stat.toString().length))}${val.toString()}`;
        return output;
    }

    const stati = props.data.stats
    const tipi = props.data.types
    const moves = props.data.moves
    const abilities = props.data.abilities
    return (
        <div className="panel right-panel">
            <div className="panel-row">
                <div className="type-list">
                    <div className="panel-header">Types</div>
                    <div className="type-box">
                        {tipi ? tipi.map(t => {
                            const type = t.type.name;
                            return <div className={"type " + type}>{type}</div>;
                        }) : "Loading"}
                    </div>
                </div>
                <div className="type-list">
                    <div className="panel-header">Stats</div>

                    <div className='screen'>
                        {stati ? stati.map(s => {
                            const name = s.stat.name;
                            const value = s.base_stat;

                            return <div className="stat-line">
                                {padding(name, value, ".", 20)}
                            </div>
                        }) : "loading"}
                    </div>
                </div>

            </div>

            <div className="panel-row">
                <div className="type-list">
                    <div className="panel-header">Moves</div>
                    <div className='screen'>{moves ? moves.slice(0, 4).map((item) => <p className='move-name'>{(item.move.name)}</p>) : "loading"}</div>
                </div>
                <div className="type-list">
                    <div className="panel-header">Abilities</div>
                    <div className='screen'>  {abilities ? abilities.map(item => <p className='move-name'>{item.ability.name}</p>) : "loading"}</div>
                </div>
            </div>
            {props.children}

        </div>
    )
}