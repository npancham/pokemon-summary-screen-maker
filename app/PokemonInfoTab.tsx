import { useContext, useEffect } from "react";
import { DataContext, TabContext, UserInputContext } from "./page";
import { capitalizeFirstLetters } from "./helperFunctions";

export default function PokemonInfoTab() {
    const { allTypes } = useContext(DataContext);
    const { activeTab } = useContext(TabContext);
    const { setChosenPokedexNumber, setChosenSpecies, setChosenType1, setChosenType2, setChosenOt, setChosenTrainerGender, setChosenIdNumber } = useContext(UserInputContext);

    const initializeSelectValues = () => {
        if (allTypes) {
            setChosenType1(allTypes[0].name);
            setChosenType2("-");
            setChosenTrainerGender("male");
        }
    }

    useEffect(initializeSelectValues, [allTypes]);

    const valueToState = (event: any) => {
        switch (event.target.name) {
            case "dex-number":
                setChosenPokedexNumber(event.target.value);
                break;
            case "species":
                setChosenSpecies(event.target.value);
                break;
            case "type1":
                setChosenType1(event.target.value);
                break;
            case "type2":
                setChosenType2(event.target.value);
                break;
            case "ot":
                setChosenOt(event.target.value);
                break;
            case "trainer-gender":
                setChosenTrainerGender(event.target.value);
                break;
            case "id-number":
                setChosenIdNumber(event.target.value);
                break;
        }
    }

    return (
        <div id="pokemon-info" className={activeTab == "tab-pokemon-info" ? "" : "hidden"}>
            <div className="py-3">
                <label htmlFor="dex-number" className="font-medium">Pokédex Number:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="number" min="0" max="999" id="dex-number" name="dex-number" placeholder="Between 0 and 999" onChange={valueToState}
                />
            </div>

            <div className="py-3">
                <label htmlFor="species" className="font-medium">Species:</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="text" maxLength={10} id="species" name="species" placeholder="1 to 10 characters" onChange={valueToState}
                />
            </div>

            <p className="font-medium">Typing:</p>
            <div className="grid grid-cols-2 gap-4 py-3">
                <div className="grid grid-rows-2 place-items-center">
                    <label htmlFor="type1">Type 1:</label>
                    <select className="shadow border rounded w-full py-2 px-3 leading-tight" name="type1" id="type1" onChange={valueToState}>
                        {
                            allTypes == undefined ? null : allTypes.map((pokemonType: {name: string, url: string}) => (
                                <option key={pokemonType.name} value={pokemonType.name}>
                                    {capitalizeFirstLetters(pokemonType.name, "-", " ")}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="grid grid-rows-2 place-items-center">
                    <label htmlFor="type2">Type 2:</label>
                    <select className="shadow border rounded w-full py-2 px-3 leading-tight" name="type2" id="type2" onChange={valueToState}>
                        <option value="-">---</option>
                        {
                            allTypes == undefined ? null : allTypes.map((pokemonType: {name: string, url: string}) => (
                                <option key={pokemonType.name} value={pokemonType.name}>
                                    {capitalizeFirstLetters(pokemonType.name, "-", " ")}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="py-3">
                <label htmlFor="ot" className="font-medium">Original Trainer:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="text" maxLength={10} id="ot" name="ot" placeholder="1 to 10 characters" onChange={valueToState}
                />
            </div>

            <div className="py-3">
                <label htmlFor="trainer-gender" className="font-medium">Trainer Gender:</label>
                <select className="shadow border rounded w-full py-2 px-3 leading-tight" name="trainer-gender" id="trainer-gender" onChange={valueToState}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div className="py-3">
                <label htmlFor="id-number" className="font-medium">ID Number:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="number" min="0" max="99999" id="id-number" name="id-number" placeholder="Between 0 and 99999" onChange={valueToState}
                />
            </div>
        </div>
    )
}