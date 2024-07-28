"use client";

import { createContext, useState } from "react";
import useFetchedData from "./useFetchedData";
import TabNavigation from "./TabNavigation";
import GeneralTab from "./GeneralTab";
import PokemonInfoTab from "./PokemonInfoTab";
import TrainerMemoTab from "./TrainerMemoTab";
import PokemonSkillsTab from "./PokemonSkillsTab";
import BattleMovesTab from "./BattleMovesTab";
import ResultCanvas from "./ResultCanvas";

export const DataContext = createContext<any>(null);
export const TabContext = createContext<any>(null);
export const UserInputContext = createContext<any>(null);

export default function Home() {
  const { allTypes, allGenders, allAbilities, allNatures, allCharacteristics, allMoves, allItems, allPokeBalls } = useFetchedData();

  const [activeTab, setActiveTab] = useState("tab-general");
  const [generalTabIsValid, setGeneralTabValid] = useState<boolean>(false);
  const [pokemonInfoTabIsValid, setPokemonInfoTabValid] = useState<boolean>(false);
  const [trainerMemoTabIsValid, setTrainerMemoTabValid] = useState<boolean>(false);
  const [pokemonSkillsTabIsValid, setPokemonSkillsTabValid] = useState<boolean>(false);
  const [battleMovesTabIsValid, setBattleMovesTabValid] = useState<boolean>(false);

  const [chosenNickname, setChosenNickname] = useState<string>();
  const [chosenImage, setChosenImage] = useState<File>();
  const [chosenGender, setChosenGender] = useState<string>();
  const [chosenLevel, setChosenLevel] = useState<string>();
  const [chosenPokeBall, setChosenPokeball] = useState<string>();
  const [chosenItem, setChosenItem] = useState<string>();
  const [chosenPokedexNumber, setChosenPokedexNumber] = useState<string>();
  const [chosenSpecies, setChosenSpecies] = useState<string>();
  const [chosenType1, setChosenType1] = useState<string>();
  const [chosenType2, setChosenType2] = useState<string>();
  const [chosenOt, setChosenOt] = useState<string>();
  const [chosenTrainerGender, setChosenTrainerGender] = useState<string>();
  const [chosenIdNumber, setChosenIdNumber] = useState<string>();
  const [chosenNature, setChosenNature] = useState<string>();
  const [chosenCharacteristic, setChosenCharacteristic] = useState<string>();
  const [chosenMeetingDate, setChosenMeetingDate] = useState<string>();
  const [chosenMeetingArea, setChosenMeetingArea] = useState<string>();
  const [chosenMeetingLevel, setChosenMeetingLevel] = useState<string>();
  const [chosenAbility, setChosenAbility] = useState<string>();
  const [chosenHp, setChosenHp] = useState<string>();
  const [chosenAttack, setChosenAttack] = useState<string>();
  const [chosenDefense, setChosenDefense] = useState<string>();
  const [chosenSpecialAttack, setChosenSpecialAttack] = useState<string>();
  const [chosenSpecialDefense, setChosenSpecialDefense] = useState<string>();
  const [chosenSpeed, setChosenSpeed] = useState<string>();
  const [chosenMove1, setChosenMove1] = useState<string>();
  const [chosenMove2, setChosenMove2] = useState<string>();
  const [chosenMove3, setChosenMove3] = useState<string>();
  const [chosenMove4, setChosenMove4] = useState<string>();

  const tabValidationStates = { 
    generalTabIsValid, setGeneralTabValid, pokemonInfoTabIsValid, setPokemonInfoTabValid, trainerMemoTabIsValid, setTrainerMemoTabValid, pokemonSkillsTabIsValid, setPokemonSkillsTabValid, battleMovesTabIsValid, setBattleMovesTabValid
  };

  const userInputStates = {
    chosenNickname, setChosenNickname, chosenImage, setChosenImage, chosenGender, setChosenGender, chosenLevel, setChosenLevel, chosenPokeBall, setChosenPokeball, chosenItem, setChosenItem,
    chosenPokedexNumber, setChosenPokedexNumber, chosenSpecies, setChosenSpecies, chosenType1, setChosenType1, chosenType2, setChosenType2, chosenOt, setChosenOt, chosenTrainerGender, setChosenTrainerGender, chosenIdNumber, setChosenIdNumber,
    chosenNature, setChosenNature, chosenCharacteristic, setChosenCharacteristic, chosenMeetingDate, setChosenMeetingDate, chosenMeetingArea, setChosenMeetingArea, chosenMeetingLevel, setChosenMeetingLevel,
    chosenAbility, setChosenAbility, chosenHp, setChosenHp, chosenAttack, setChosenAttack, chosenDefense, setChosenDefense, chosenSpecialAttack, setChosenSpecialAttack, chosenSpecialDefense, setChosenSpecialDefense, chosenSpeed, setChosenSpeed,
    chosenMove1, setChosenMove1, chosenMove2, setChosenMove2, chosenMove3, setChosenMove3, chosenMove4, setChosenMove4
  };

  return (
    <DataContext.Provider value={{ allTypes, allGenders, allAbilities, allNatures, allCharacteristics, allMoves, allItems, allPokeBalls }}>
      <TabContext.Provider value={{ activeTab, setActiveTab, ...tabValidationStates }}>
        <UserInputContext.Provider value={{ ...userInputStates }}>
          <main>
            <TabNavigation>
              <GeneralTab />
              <PokemonInfoTab />
              <TrainerMemoTab />
              <PokemonSkillsTab />
              <BattleMovesTab />
              <ResultCanvas />
            </TabNavigation>
          </main>
        </UserInputContext.Provider>
      </TabContext.Provider>
    </DataContext.Provider>
  );
}
