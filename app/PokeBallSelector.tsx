import { useContext, useState } from "react";
import { DataContext, UserInputContext } from "./page";
import { capitalizeFirstLetters } from "./helperFunctions"

export default function PokeBallSelector() {
    const { allPokeBalls } = useContext(DataContext);
    const { chosenPokeBall, setChosenPokeball } = useContext(UserInputContext);

    const [ modalIsOpen, setModalOpen ] = useState<boolean>(false);

    const toggleModal = () => {
        if (!modalIsOpen) {
            setModalOpen(true);
        } else {
            setModalOpen(false);
        }
    }

    const closeModal = (event: any) => {
        // The selector modal closes when it loses focus (onBlur event). 
        // This happens when an element outside the modal takes focus, but also when one of the buttons within it is clicked.
        // In the latter case, the onClick event of the corresponding button should still be triggered.
        if (event.relatedTarget && event.relatedTarget.nodeName === "BUTTON" && event.relatedTarget.value.includes("ball")) {
            event.relatedTarget.click();
        }

        setModalOpen(false);
    }

    const selectPokeBall = (event: any) => {
        setChosenPokeball(event.target.value);
    }

    return (
        <div>
            <label className="font-medium">Poké Ball:</label>
            {
                (allPokeBalls == undefined || chosenPokeBall == undefined) ? null : <div className="relative">
                    <button className="shadow border rounded w-full py-2 pl-3 pr-1 leading-tight grid grid-cols-2" onBlur={closeModal} onClick={toggleModal}>
                        <div className="flex gap-x-3">
                            <div><img src={`${capitalizeFirstLetters(chosenPokeBall, "-", "_")}_summary_IV.png`} className="h-5 w-5"></img></div>
                            <div>{capitalizeFirstLetters(chosenPokeBall, "-", " ")}</div>
                        </div>
                        <div className="absolute right-px"><img className="h-5 w-5" src="Poké_Ball_icon.png"></img></div>
                    </button>
                    <div className={modalIsOpen ? "absolute bg-white shadow-xl border border-slate-500 w-full h-96 grid overflow-y-scroll bottom-10" : "hidden"}>
                        {
                            allPokeBalls.map((pokeBall: { name: string, url: string }) => (
                                <button key={pokeBall.name} value={pokeBall.name} onClick={selectPokeBall} className="px-3 flex gap-x-3 hover:bg-blue-500 hover:text-white">
                                    <div><img src={`${capitalizeFirstLetters(pokeBall.name, "-", "_")}_summary_IV.png`} className="h-5 w-5"></img></div>
                                    <div>{capitalizeFirstLetters(pokeBall.name, "-", " ")}</div>
                                </button>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}