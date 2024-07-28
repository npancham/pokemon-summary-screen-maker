import { useContext } from "react";
import { TabContext, UserInputContext } from "./page";
import { isValidInputDate, isValidInputNumber, isValidInputText } from "./helperFunctions";

export default function TabNavigation({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { activeTab, setActiveTab, setGeneralTabValid, setPokemonInfoTabValid, setTrainerMemoTabValid, setPokemonSkillsTabValid, setBattleMovesTabValid } = useContext(TabContext);
    const { 
        chosenNickname, chosenImage, chosenGender, chosenLevel, chosenPokeBall, chosenItem,
        chosenPokedexNumber, chosenSpecies, chosenType1, chosenType2, chosenOt, chosenTrainerGender, chosenIdNumber,
        chosenNature, chosenCharacteristic, chosenMeetingDate, chosenMeetingArea, chosenMeetingLevel,
        chosenAbility, chosenHp, chosenAttack, chosenDefense, chosenSpecialAttack, chosenSpecialDefense, chosenSpeed,
        chosenMove1, chosenMove2, chosenMove3, chosenMove4
    } = useContext(UserInputContext);

    const changeTab = (event: any) => {
        setActiveTab(event.target.value);
    }

    const toNextStep = () => {
        const invalidFields = [];

        switch (activeTab) {
            case "tab-general":
                if (!isValidInputText(chosenNickname, 10)) {
                    invalidFields.push("Nickname");
                }

                if (!isValidInputNumber(chosenLevel, 1, 100)) {
                    invalidFields.push("Level");
                }

                if (invalidFields.length !== 0) {
                    let message = `Please enter a valid value for the following ${invalidFields.length === 1 ? "field" : "fields"}:\n`;
                    message += invalidFields.join(", ");
                    alert(message);
                } else {
                    setGeneralTabValid(true);
                    setActiveTab("tab-pokemon-info");
                }

                break;
            case "tab-pokemon-info":
                if (!isValidInputNumber(chosenPokedexNumber, 1, 999)) {
                    invalidFields.push("Pokédex Number");
                }

                if (!isValidInputText(chosenSpecies, 10)) {
                    invalidFields.push("Species");
                }

                if (!isValidInputText(chosenOt, 10)) {
                    invalidFields.push("OT");
                }

                if (!isValidInputNumber(chosenIdNumber, 1, 99999)) {
                    invalidFields.push("ID Number");
                }

                if (invalidFields.length !== 0) {
                    let message = `Please enter a valid value for the following ${invalidFields.length === 1 ? "field" : "fields"}:\n`;
                    message += invalidFields.join(", ");
                    alert(message);
                } else {
                    setPokemonInfoTabValid(true);
                    setActiveTab("tab-trainer-memo");
                }

                break;
            case "tab-trainer-memo":
                if (!isValidInputDate(chosenMeetingDate)) {
                    invalidFields.push("Meeting Date");
                }

                if (!isValidInputText(chosenMeetingArea, 20)) {
                    invalidFields.push("Meeting Area");
                }

                if (!isValidInputNumber(chosenMeetingLevel, 1, 100)) {
                    invalidFields.push("Meeting Level");
                }

                if (invalidFields.length !== 0) {
                    let message = `Please enter a valid value for the following ${invalidFields.length === 1 ? "field" : "fields"}:\n`;
                    message += invalidFields.join(", ");
                    alert(message);
                } else {
                    setTrainerMemoTabValid(true);
                    setActiveTab("tab-pokemon-skills");
                }

                break;
            case "tab-pokemon-skills":
                if (!isValidInputNumber(chosenHp, 1, 999)) {
                    invalidFields.push("HP");
                }

                if (!isValidInputNumber(chosenAttack, 1, 999)) {
                    invalidFields.push("Attack");
                }

                if (!isValidInputNumber(chosenDefense, 1, 999)) {
                    invalidFields.push("Defense");
                }

                if (!isValidInputNumber(chosenSpecialAttack, 1, 999)) {
                    invalidFields.push("Special Attack");
                }

                if (!isValidInputNumber(chosenSpecialDefense, 1, 999)) {
                    invalidFields.push("Special Defense");
                }

                if (!isValidInputNumber(chosenSpeed, 1, 999)) {
                    invalidFields.push("Speed");
                }

                if (invalidFields.length !== 0) {
                    let message = `Please enter a valid value for the following ${invalidFields.length === 1 ? "field" : "fields"}:\n`;
                    message += invalidFields.join(", ");
                    alert(message);
                } else {
                    setPokemonSkillsTabValid(true);
                    setActiveTab("tab-battle-moves");
                }

                break;
            case "tab-battle-moves":
                setBattleMovesTabValid(true);
                setActiveTab("tab-canvas");
                break;
        }
    }

    const toPreviousStep = () => {
        switch (activeTab) {
            case "tab-pokemon-info":
                setActiveTab("tab-general");
                break;
            case "tab-trainer-memo":
                setActiveTab("tab-pokemon-info");
                break;
            case "tab-pokemon-skills":
                setActiveTab("tab-trainer-memo");
                break;
            case "tab-battle-moves":
                setActiveTab("tab-pokemon-skills");
                break;
            case "tab-canvas":
                setActiveTab("tab-battle-moves");
                break;
        }
    }

    return (
        <div className="flex flex-col min-h-screen justify-between place-items-center p-8">
            <div>
                <ul className="grid grid-cols-5 gap-10 py-1 place-items-center">
                    <li className={"flex flex-col items-center w-32 py-1 border-solid border-b-4" + " " + (activeTab == "tab-general" ? "text-blue-500 font-bold border-blue-500" : "border-white border-opacity-0")}>
                        <button value="tab-general" onClick={changeTab}>General</button>
                    </li>
                    <li className={"flex flex-col items-center w-32 py-1 border-solid border-b-4" + " " + (activeTab == "tab-pokemon-info" ? "text-blue-500 font-bold py-1 border-solid border-b-4 border-blue-500" : "border-white border-opacity-0" + " " + (activeTab == "tab-general" ? "text-gray-500" : ""))}>
                        <button value="tab-pokemon-info" disabled={activeTab == "tab-general"} onClick={changeTab}>Pokémon Info</button>
                    </li>
                    <li className={"flex flex-col items-center w-32 py-1 border-solid border-b-4" + " " + (activeTab == "tab-trainer-memo" ? "text-blue-500 font-bold py-1 border-solid border-b-4 border-blue-500" : "border-white border-opacity-0" + " " + (activeTab == "tab-general" || activeTab == "tab-pokemon-info" ? "text-gray-500" : ""))}>
                        <button value="tab-trainer-memo" disabled={activeTab == "tab-general" || activeTab == "tab-pokemon-info"} onClick={changeTab}>Trainer Memo</button>
                    </li>
                    <li className={"flex flex-col items-center w-32 py-1 border-solid border-b-4" + " " + (activeTab == "tab-pokemon-skills" ? "text-blue-500 font-bold py-1 border-solid border-b-4 border-blue-500" : "border-white border-opacity-0" + " " + (activeTab == "tab-general" || activeTab == "tab-pokemon-info" || activeTab == "tab-trainer-memo" ? "text-gray-500" : ""))}>
                        <button value="tab-pokemon-skills" disabled={activeTab == "tab-general" || activeTab == "tab-pokemon-info" || activeTab == "tab-trainer-memo"} onClick={changeTab}>Pokémon Skills</button>
                    </li>
                    <li className={"flex flex-col items-center w-32 py-1 border-solid border-b-4" + " " + (activeTab == "tab-battle-moves" ? "text-blue-500 font-bold py-1 border-solid border-b-4 border-blue-500" : "border-white border-opacity-0" + " " + (activeTab == "tab-general" || activeTab == "tab-pokemon-info" || activeTab == "tab-trainer-memo" || activeTab == "tab-pokemon-skills" ? "text-gray-500" : ""))}>
                        <button value="tab-battle-moves" disabled={activeTab == "tab-general" || activeTab == "tab-pokemon-info" || activeTab == "tab-trainer-memo" || activeTab == "tab-pokemon-skills"} onClick={changeTab}>Battle Moves</button>
                    </li>
                </ul>
                <ul className="grid grid-cols-1 py-1 place-items-center">
                    <li className={activeTab == "tab-canvas" ? "text-blue-500 font-bold" : "hidden"}>
                        ––––––––––<button value="tab-canvas" className="px-5">Result</button>––––––––––
                    </li>
                </ul>
            </div>

            {children}

            <ul className="grid grid-cols-2 gap-10 py-3">
              <li>
                <button className={"w-28 h-10 rounded font-bold" + " " + (activeTab == "tab-general" ? "bg-gray-200 text-gray-500 disabled" : "bg-blue-500 text-white")} onClick={toPreviousStep}>❮ Previous</button>
              </li>
              <li>
                <button className={"w-28 h-10 rounded font-bold" + " " + (activeTab == "tab-canvas" ? "bg-gray-200 text-gray-500 disabled" : "bg-blue-500 text-white")} onClick={toNextStep}>Next ❯</button>
              </li>
            </ul>
        </div>
    )
}