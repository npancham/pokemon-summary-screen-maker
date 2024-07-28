import { useContext, useEffect } from "react";
import { DataContext, TabContext, UserInputContext } from "./page";
import { capitalizeFirstLetters } from "./helperFunctions";

export default function TrainerMemoTab() {
    const { allNatures, allCharacteristics } = useContext(DataContext);
    const { activeTab } = useContext(TabContext);
    const { setChosenNature, setChosenCharacteristic, setChosenMeetingDate, setChosenMeetingArea, setChosenMeetingLevel } = useContext(UserInputContext);

    const initializeSelectValues = () => {
        if (allNatures && allCharacteristics) {
            setChosenNature(allNatures[0].name);
            setChosenCharacteristic(allCharacteristics[0].description);
        }
    }

    useEffect(initializeSelectValues, [allNatures, allCharacteristics]);

    const valueToState = (event: any) => {
        switch (event.target.name) {
            case "nature":
                setChosenNature(event.target.value);
                break;
            case "characteristic":
                setChosenCharacteristic(event.target.value);
                break;
            case "meeting-date":
                setChosenMeetingDate(event.target.value);
                break;
            case "meeting-area":
                setChosenMeetingArea(event.target.value);
                break;
            case "meeting-level":
                setChosenMeetingLevel(event.target.value);
                break;
        }
    }

    return (
        <div id="trainer-memo" className={activeTab == "tab-trainer-memo" ? "" : "hidden"}>
            <div className="py-3">
                <label htmlFor="nature" className="font-medium">Nature:</label>
                <select className="shadow border rounded w-full py-2 px-3 leading-tight" name="nature" id="nature" onChange={valueToState}>
                    {
                        allNatures == undefined ? null : allNatures.map((nature: {name: string, url: string}) => (
                            <option key={nature.name} value={nature.name}>
                                {capitalizeFirstLetters(nature.name, "-", " ")}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="py-3">
                <label htmlFor="characteristic" className="font-medium">Characteristic:</label>
                <select className="shadow border rounded w-full py-2 px-3 leading-tight" name="characteristic" id="characteristic" onChange={valueToState}>
                    {
                        allCharacteristics == undefined ? null : allCharacteristics.map((characteristic: {description: string, url: string}) => (
                            <option key={characteristic.description} value={characteristic.description}>{characteristic.description}</option>
                        ))
                    }
                </select>
            </div>

            <div className="py-3">
                <label htmlFor="meeting-date" className="font-medium">Meeting Date:</label>
                <input className="shadow border rounded w-full py-2 px-3 leading-tight"
                    type="date" id="meeting-date" name="meeting-date" onChange={valueToState}
                />
            </div>

            <div className="py-3">
                <label htmlFor="meeting-area" className="font-medium">Meeting Area:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="text" maxLength={20} id="meeting-area" name="meeting-area" placeholder="1 to 20 characters" onChange={valueToState}
                />
            </div>

            <div className="py-3">
                <label htmlFor="meeting-level" className="font-medium">Meeting Level:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="number" min="1" max="100" id="meeting-level" name="meeting-level" placeholder="Between 1 and 100" onChange={valueToState}
                />
            </div>
        </div>
    )
}