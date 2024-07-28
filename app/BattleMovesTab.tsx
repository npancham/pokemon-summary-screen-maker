import { useContext, useEffect } from "react";
import { DataContext, TabContext, UserInputContext } from "./page";
import { capitalizeFirstLetters } from "./helperFunctions";

export default function BattleMovesTab() {
    const { allMoves } = useContext(DataContext);
    const { activeTab } = useContext(TabContext);
    const { setChosenMove1, setChosenMove2, setChosenMove3, setChosenMove4 } = useContext(UserInputContext);

    const initializeSelectValues = () => {
        if (allMoves) {
            setChosenMove1(allMoves[0].name);
            setChosenMove2("-");
            setChosenMove3("-");
            setChosenMove4("-");
        }
    }

    useEffect(initializeSelectValues, [allMoves]);

    const valueToState = (event: any) => {
        switch (event.target.name) {
            case "move1":
                setChosenMove1(event.target.value);
                break;
            case "move2":
                setChosenMove2(event.target.value);
                break;
            case "move3":
                setChosenMove3(event.target.value);
                break;
            case "move4":
                setChosenMove4(event.target.value);
                break;
        }
    }

    return (
        <div id="battle-moves" className={activeTab == "tab-battle-moves" ? "" : "hidden"}>
            <p className="font-medium">Moves:</p>
            <div className="grid grid-cols-2 gap-4 py-3">
                <div className="grid grid-rows-2 place-items-center">
                    <label htmlFor="move1">Move 1:</label>
                    <select className="shadow border rounded w-full py-2 px-3 leading-tight" name="move1" id="move1" onChange={valueToState}>
                        {
                            allMoves == undefined ? null : allMoves.map((move: {name: string, url: string}) => (
                                <option key={move.name} value={move.name}>{capitalizeFirstLetters(move.name, "-", " ")}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="grid grid-rows-2 place-items-center">
                    <label htmlFor="move2">Move 2:</label>
                    <select className="shadow border rounded w-full py-2 px-3 leading-tight" name="move2" id="move2" onChange={valueToState}>
                        <option value="-">---</option>
                        {
                            allMoves == undefined ? null : allMoves.map((move: {name: string, url: string}) => (
                                <option key={move.name} value={move.name}>{capitalizeFirstLetters(move.name, "-", " ")}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="grid grid-rows-2 place-items-center">
                    <label htmlFor="move3">Move 3:</label>
                    <select className="shadow border rounded w-full py-2 px-3 leading-tight" name="move3" id="move3" onChange={valueToState}>
                        <option value="-">---</option>
                        {
                            allMoves == undefined ? null : allMoves.map((move: {name: string, url: string}) => (
                                <option key={move.name} value={move.name}>{capitalizeFirstLetters(move.name, "-", " ")}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="grid grid-rows-2 place-items-center">
                    <label htmlFor="move4">Move 4:</label>
                    <select className="shadow border rounded w-full py-2 px-3 leading-tight" name="move4" id="move4" onChange={valueToState}>
                        <option value="-">---</option>
                        {
                            allMoves == undefined ? null : allMoves.map((move: {name: string, url: string}) => (
                                <option key={move.name} value={move.name}>{capitalizeFirstLetters(move.name, "-", " ")}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}