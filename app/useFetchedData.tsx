import { useEffect, useState } from "react";

export default function useFetchedData() {
    const [allTypes, setAllTypes] = useState<[{ name: string, url: string }]>();
    const [allGenders, setAllGenders] = useState<[{ name: string, url: string }]>();
    const [allAbilities, setAllAbilities] = useState<[{ name: string, url: string }]>();
    const [allNatures, setAllNatures] = useState<[{ name: string, url: string }]>();
    const [allCharacteristics, setAllCharacteristics] = useState<[{ description: string, url: string }]>();
    const [allMoves, setAllMoves] = useState<[{ name: string, url: string }]>();
    const [allItems, setAllItems] = useState<[{ name: string, url: string }]>();
    const [allPokeBalls, setAllPokeBalls] = useState<[{ name: string, url: string }]>();

    useEffect(() => {
        fetch("/types.json")
            .then(res => res.json())
            .then(json => {
                // Exclude types introduced after gen IV, and spin-off game types
                const filteredTypes = json.filter((pokemonType: { name: string, url: string }) => {
                    const typeId = parseInt(pokemonType.url.split("/")[pokemonType.url.split("/").length - 2]);
                    return typeId <= 17;
                });
                setAllTypes(filteredTypes);
            });

        fetch("/genders.json")
            .then(res => res.json())
            .then(json => {
                setAllGenders(json);
            });

        fetch("/abilities.json")
            .then(res => res.json())
            .then(json => {
                // Exclude abilities introduced after gen IV, and spin-off game abilities
                const filteredAbilities = json.filter((ability: { name: string, url: string }) => {
                    const abilityId = parseInt(ability.url.split("/")[ability.url.split("/").length - 2]);
                    return abilityId <= 123;
                });
                const sortedAbilities = filteredAbilities.sort((ability1: { name: string, url: string }, ability2: { name: string, url: string }) => (
                    ability1.name.localeCompare(ability2.name)
                ));
                setAllAbilities(sortedAbilities);
            });

        fetch("/natures.json")
            .then(res => res.json())
            .then(json => {
                setAllNatures(json);
            });

        fetch("/characteristics.json")
            .then(res => res.json())
            .then(json => {
                setAllCharacteristics(json);
            });

        fetch("/moves.json")
            .then(res => res.json())
            .then(json => {
                // Exclude moves introduced after gen IV, and spin-off game moves
                const filteredMoves = json.filter((move: { name: string, url: string }) => {
                    const moveId = parseInt(move.url.split("/")[move.url.split("/").length - 2]);
                    return moveId <= 467
                });
                const sortedMoves = filteredMoves.sort((move1: { name: string, url: string }, move2: { name: string, url: string }) => (
                    move1.name.localeCompare(move2.name)
                ));
                setAllMoves(sortedMoves);
            });

        fetch("/held-items.json")
            .then(res => res.json())
            .then(json => {
                // Exclude items introduced after gen IV
                const filteredItems = json.filter((item: { name: string, url: string }) => {
                    const itemId = parseInt(item.url.split("/")[item.url.split("/").length - 2]);
                    return itemId <= 526;
                });
                const sortedItems = filteredItems.sort((item1: { name: string, url: string }, item2: { name: string, url: string }) => (
                    item1.name.localeCompare(item2.name)
                ));
                setAllItems(sortedItems);
            });

        fetch("/poke-balls.json")
            .then(res => res.json())
            .then(json => {
                // Exclude Poké balls introduced after gen IV
                const filteredPokeBalls = json.filter((pokeBall: { name: string, url: string }) => {
                    const pokeBallId = parseInt(pokeBall.url.split("/")[pokeBall.url.split("/").length - 2]);
                    return pokeBallId < 457;
                });
                setAllPokeBalls(filteredPokeBalls);
            });
    }, []);

    return { allTypes, allGenders, allAbilities, allNatures, allCharacteristics, allMoves, allItems, allPokeBalls };
}