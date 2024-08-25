import { useContext, useEffect } from "react";
import { DataContext, TabContext, UserInputContext } from "./page";
import { capitalizeFirstLetters } from "./helperFunctions";
import PokeBallSelector from "./PokeBallSelector";

export default function GeneralTab() {
    const { allGenders, allItems, allPokeBalls } = useContext(DataContext);
    const { activeTab } = useContext(TabContext);
    const { setChosenNickname, setChosenImage, setChosenGender, setChosenLevel, setChosenPokeball, setChosenItem } = useContext(UserInputContext);

    const initializeSelectValues = () => {
        if (allGenders && allItems && allPokeBalls) {
            setChosenGender(allGenders[0].name);
            setChosenPokeball(allPokeBalls[0].name);
            setChosenItem("-");
        }
    }

    useEffect(initializeSelectValues, [allGenders, allItems, allPokeBalls]);

    const valueToState = (event: any) => {
        switch (event.target.name) {
            case "nickname":
                setChosenNickname(event.target.value);
                break;
            case "upload-image":
                setChosenImage(event.target.files[0]);
                break;
            case "gender":
                setChosenGender(event.target.value);
                break;
            case "level":
                setChosenLevel(event.target.value);
                break;
            case "poke-ball":
                setChosenPokeball(event.target.value);
                break;
            case "item":
                setChosenItem(event.target.value);
                break;
        }
    }

    return (
        <div id="general" className={activeTab == "tab-general" ? "" : "hidden"}>
            <div className="py-3">
                <label htmlFor="nickname" className="font-medium">Nickname:</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="text" maxLength={10} id="nickname" name="nickname" placeholder="A text sequence containing 1 to 10 characters"
                    onChange={valueToState}
                />
            </div>

            <div className="py-3">
                <label htmlFor="upload-image" className="font-medium">Image:</label>
                <input
                    className="appearance-none w-full py-2 px-3 leading-normal"
                    type="file" id="upload-image" name="upload-image" accept="image/*"
                    onChange={valueToState}
                />
            </div>

            <div className="py-3">
                <label htmlFor="gender" className="font-medium">Gender:</label>
                <select className="shadow border rounded w-full py-2 px-3 leading-tight" name="gender" id="gender" onChange={valueToState}>
                    {
                        allGenders == undefined ? null : allGenders.map((gender: { name: string, url: string }) => (
                            <option key={gender.name} value={gender.name}>
                                {capitalizeFirstLetters(gender.name, "-", " ")}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="py-3">
                <label htmlFor="level" className="font-medium">Level:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="number" min="1" max="100" id="level" name="level" placeholder="An integer between 1 and 100" onChange={valueToState}
                />
            </div>

            <PokeBallSelector />

            <div className="py-3">
                <label htmlFor="item" className="font-medium">Held Item:</label>
                <select className="shadow border rounded w-full py-2 px-3 leading-tight" name="item" id="item" onChange={valueToState}>
                    <option value="-">---</option>
                    {
                        allItems == undefined ? null : allItems.map((item: { name: string, url: string }) => (
                            <option key={item.name} value={item.name}>
                                {capitalizeFirstLetters(item.name, "-", " ")}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}