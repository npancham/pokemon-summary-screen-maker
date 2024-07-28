import { useContext, useEffect } from "react";
import { DataContext, TabContext, UserInputContext } from "./page";
import { capitalizeFirstLetters } from "./helperFunctions";

export default function PokemonSkillsTab() {
    const { allAbilities } = useContext(DataContext);
    const { activeTab } = useContext(TabContext);
    const { setChosenAbility, setChosenHp, setChosenAttack, setChosenDefense, setChosenSpecialAttack, setChosenSpecialDefense, setChosenSpeed } = useContext(UserInputContext);

    const initializeSelectValues = () => {
        if (allAbilities) {
            setChosenAbility(allAbilities[0].name);
        }
    }

    useEffect(initializeSelectValues, [allAbilities]);

    const valueToState = (event: any) => {
        switch (event.target.name) {
            case "ability":
                setChosenAbility(event.target.value);
                break;
            case "hp":
                setChosenHp(event.target.value);
                break;
            case "attack":
                setChosenAttack(event.target.value);
                break;
            case "defense":
                setChosenDefense(event.target.value);
                break;
            case "sp-attack":
                setChosenSpecialAttack(event.target.value);
                break;
            case "sp-defense":
                setChosenSpecialDefense(event.target.value);
                break;
            case "speed":
                setChosenSpeed(event.target.value);
                break;
        }
    }

    return (
        <div id="pokemon-skills" className={activeTab == "tab-pokemon-skills" ? "" : "hidden"}>
            <div className="py-3 grid grid-rows-2">
                <label htmlFor="ability" className="font-medium">Ability:</label>
                <select className="shadow border rounded w-full py-2 px-3 leading-tight" name="ability" id="ability" onChange={valueToState}>
                    {
                        allAbilities == undefined ? null : allAbilities.map((ability: {name: string, url: string}) => (
                            <option key={ability.name} value={ability.name}>
                                {capitalizeFirstLetters(ability.name, "-", " ")}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="py-3">
                <p className="font-medium">Stats:</p>

                <div className="grid grid-cols-1 py-1">
                    <div className="grid grid-rows-2 place-items-center">
                        <label htmlFor="hp">HP:</label>
                        <input className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight"
                            type="number" min="1" max="999" id="hp" name="hp" placeholder="1 - 999" onChange={valueToState}
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-1">
                    <div className="grid grid-rows-2 place-items-center">
                        <label htmlFor="attack">Attack:</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                            type="number" min="1" max="999" id="attack" name="attack" placeholder="1 - 999" onChange={valueToState}
                        />
                    </div>
                    <div className="grid grid-rows-2 place-items-center">
                        <label htmlFor="defense">Defense:</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                            type="number" min="1" max="999" id="defense" name="defense" placeholder="1 - 999" onChange={valueToState}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-1">
                    <div className="grid grid-rows-2 place-items-center">
                        <label htmlFor="sp-attack">Special Attack:</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                            type="number" min="1" max="999" id="sp-attack" name="sp-attack" placeholder="1 - 999" onChange={valueToState}
                        />
                    </div>
                    <div className="grid grid-rows-2 place-items-center">
                        <label htmlFor="sp-defense">Special Defense:</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                            type="number" min="1" max="999" id="sp-defense" name="sp-defense" placeholder="1 - 999" onChange={valueToState}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 py-1">
                    <div className="grid grid-rows-2 place-items-center">
                        <label htmlFor="speed">Speed:</label>
                        <input className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight"
                            type="number" min="1" max="999" id="speed" name="speed" placeholder="1 - 999" onChange={valueToState}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}