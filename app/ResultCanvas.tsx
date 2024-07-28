import localFont from "next/font/local";
import { useContext, useEffect, useRef, useState } from "react";
import { TabContext, UserInputContext } from "./page";
import { addLeadingZeros, capitalizeFirstLetters } from "./helperFunctions";

const dpFont = localFont({
    src: "./pokemon-dp-pro.ttf",
    display: "swap"
});

const apiBaseUrl = "https://pokeapi.co/api/v2";

const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

export default function ResultCanvas() {
    const canvasRef1 = useRef<HTMLCanvasElement>(null);
    const canvasRef2 = useRef<HTMLCanvasElement>(null);
    const canvasRef3 = useRef<HTMLCanvasElement>(null);
    const canvasRef4 = useRef<HTMLCanvasElement>(null);
    const downloadLinkRef1 = useRef<HTMLAnchorElement>(null);
    const downloadLinkRef2 = useRef<HTMLAnchorElement>(null);
    const downloadLinkRef3 = useRef<HTMLAnchorElement>(null);
    const downloadLinkRef4 = useRef<HTMLAnchorElement>(null);
    const refreshLinkRef = useRef<HTMLAnchorElement>(null);
    
    const { activeTab, generalTabIsValid, pokemonInfoTabIsValid, trainerMemoTabIsValid, pokemonSkillsTabIsValid, battleMovesTabIsValid } = useContext(TabContext);
    const { 
        chosenNickname, chosenImage, chosenGender, chosenLevel, chosenPokeBall, chosenItem,
        chosenPokedexNumber, chosenSpecies, chosenType1, chosenType2, chosenOt, chosenTrainerGender, chosenIdNumber,
        chosenNature, chosenCharacteristic, chosenMeetingDate, chosenMeetingArea, chosenMeetingLevel,
        chosenAbility, chosenHp, chosenAttack, chosenDefense, chosenSpecialAttack, chosenSpecialDefense, chosenSpeed,
        chosenMove1, chosenMove2, chosenMove3, chosenMove4 
    } = useContext(UserInputContext);

    const [activeCanvas, setActiveCanvas] = useState<string>("canvas-div-1");

    const lightFontTextColor = "#F8F8F8";
    const lightFontShadowColor = "#505050";
    const darkFontTextColor = "#101820";
    const darkFontShadowColor = "#A8B8B8";
    const redFontTextColor = "#E82010";
    const redFontShadowColor = "#F8A8B8";
    const maleFontTextColor = "#0070F8";
    const maleFontShadowColor = "#78B8E8";
    const femaleFontTextColor = "#F83820";
    const femaleFontShadowColor = "#E09890";

    const typeBoxInnerWidth = 30;
    const typeBoxInnerHeight = 10;
    
    const typeBoxMap: {
        [type: string]: { label: string, boxColor: string, upperShadowColor: string, lowerShadowColor: string }
    } = {
        "normal": {label: "NORMAL", boxColor: "#a8a878", upperShadowColor: "#d8d8c0", lowerShadowColor: "#705848"},
        "fighting": {label: "FIGHT", boxColor: "#c03028", upperShadowColor: "#f08030", lowerShadowColor: "#484038"},
        "flying": {label: "FLYING", boxColor: "#a890f0", upperShadowColor: "#c8c0f8", lowerShadowColor: "#705898"},
        "poison": {label: "POISON", boxColor: "#a040a0", upperShadowColor: "#d880b8", lowerShadowColor: "#483850"},
        "ground": {label: "GROUND", boxColor: "#e0c068", upperShadowColor: "#f8f878", lowerShadowColor: "#886830"},
        "rock": {label: "ROCK", boxColor: "#b8a038", upperShadowColor: "#e0c068", lowerShadowColor: "#886830"},
        "bug": {label: "BUG", boxColor: "#a8b820", upperShadowColor: "#d8e030", lowerShadowColor: "#789010"},
        "ghost": {label: "GHOST", boxColor: "#705898", upperShadowColor: "#a890f0", lowerShadowColor: "#483850"},
        "steel": {label: "STEEL", boxColor: "#b8b8d0", upperShadowColor: "#d8d8c0", lowerShadowColor: "#807870"},
        "fire": {label: "FIRE", boxColor: "#f08030", upperShadowColor: "#f8d030", lowerShadowColor: "#c03028"},
        "water": {label: "WATER", boxColor: "#6890f0", upperShadowColor: "#98d8d8", lowerShadowColor: "#807870"},
        "grass": {label: "GRASS", boxColor: "#78c850", upperShadowColor: "#c0f860", lowerShadowColor: "#588040"},
        "electric": {label: "ELECTR", boxColor: "#f8d030", upperShadowColor: "#f8f878", lowerShadowColor: "#b8a038"},
        "psychic": {label: "PSYCHC", boxColor: "#f85888", upperShadowColor: "#f8c0b0", lowerShadowColor: "#906060"},
        "ice": {label: "ICE", boxColor: "#98d8d8", upperShadowColor: "#d0f8e8", lowerShadowColor: "#9090a0"},
        "dragon": {label: "DRAGON", boxColor: "#7038f8", upperShadowColor: "#b8a0f8", lowerShadowColor: "#483890"},
        "dark": {label: "DARK", boxColor: "#705848", upperShadowColor: "#a8a878", lowerShadowColor: "#484038"},
        "unknown": {label: "???", boxColor: "#68a090", upperShadowColor: "#70c8b0", lowerShadowColor: "#206860"}
    };

    const calculateTotalExperience = (levelString: string) => {
        const level = parseInt(levelString);

        if (level === 1) {
            return 0;
        } else {
            return level**3;
        }
    }
    
    const calculateExperienceToNextLevel = (levelString: string) => {
        const level = parseInt(levelString);

        if (level === 1) {
            return 8;
        } else if (level === 100) {
            return 0;
        } else {
            return (level + 1)**3 - level**3;
        }
    }

    const showNextCanvas = () => {
        switch (activeCanvas) {
            case "canvas-div-1":
                setActiveCanvas("canvas-div-2");
                break;
            case "canvas-div-2":
                setActiveCanvas("canvas-div-3");
                break;
            case "canvas-div-3":
                setActiveCanvas("canvas-div-4");
                break;
        }
    }

    const showPreviousCanvas = () => {
        switch (activeCanvas) {
            case "canvas-div-2":
                setActiveCanvas("canvas-div-1");
                break;
            case "canvas-div-3":
                setActiveCanvas("canvas-div-2");
                break;
            case "canvas-div-4":
                setActiveCanvas("canvas-div-3");
                break;
        }
    }

    const newCreation = () => {
        if (refreshLinkRef.current) {
            const confirmNewCreation = confirm("All progress will be lost upon starting a new creation.\nContinue anyway?");

            if (confirmNewCreation) {
                refreshLinkRef.current.click();
            }
        }
    }

    const downloadResult = () => {
        if (canvasRef1.current && canvasRef2.current && canvasRef3.current && canvasRef4.current) {
            const canvasUrl1 = canvasRef1.current.toDataURL();
            const canvasUrl2 = canvasRef2.current.toDataURL();
            const canvasUrl3 = canvasRef3.current.toDataURL();
            const canvasUrl4 = canvasRef4.current.toDataURL();
            const downloadLink1 = downloadLinkRef1.current;
            const downloadLink2 = downloadLinkRef2.current;
            const downloadLink3 = downloadLinkRef3.current;
            const downloadLink4 = downloadLinkRef4.current;

            if (downloadLink1 && downloadLink2 && downloadLink3 && downloadLink4) {
                downloadLink1.href = canvasUrl1;
                downloadLink1.download = "filename1.png";

                downloadLink2.href = canvasUrl2;
                downloadLink2.download = "filename2.png";

                downloadLink3.href = canvasUrl3;
                downloadLink3.download = "filename3.png";

                downloadLink4.href = canvasUrl4;
                downloadLink4.download = "filename4.png";

                downloadLink1.click();
                downloadLink2.click();
                downloadLink3.click();
                downloadLink4.click();
            }
        }
    }

    const renderText = (
        context: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, textColor: string, shadowColor: string, textAlign: CanvasTextAlign = "start"
    ) => {
        context.font = `${fontSize}px ${dpFont.style.fontFamily}`;
        context.textAlign = textAlign;
        context.strokeStyle = shadowColor;
        context.lineWidth = 1;
        context.strokeText(text, x + 0.5, y + 0.5);
        context.fillStyle = textColor;
        context.fillText(text, x, y);
    }

    const renderTextOverMultipleLines = (
        context: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, textColor: string, shadowColor: string, verticalSpacing: number, textAlign: CanvasTextAlign = "start"
    ) => {
        context.font = `${fontSize}px ${dpFont.style.fontFamily}`;
        context.textAlign = textAlign;

        const linesArray = text.split("\n");

        for (let i = 0; i < linesArray.length; i++) {
            context.strokeStyle = shadowColor;
            context.lineWidth = 1;
            context.strokeText(linesArray[i], x + 0.5, y + 0.5 + verticalSpacing * i);
            context.fillStyle = textColor;
            context.fillText(linesArray[i], x, y + verticalSpacing * i);
        }
    }

    const renderTypeBox = (
        context: CanvasRenderingContext2D, type: string, x: number, y: number
    ) => {
        let boxColor;
        let boxUpperShadowColor;
        let boxLowerShadowColor;
        let label;

        if (type in typeBoxMap) {
            boxColor = typeBoxMap[type].boxColor;
            boxUpperShadowColor = typeBoxMap[type].upperShadowColor;
            boxLowerShadowColor = typeBoxMap[type].lowerShadowColor;
            label = typeBoxMap[type].label;
        } else {
            boxColor = typeBoxMap["unknown"].boxColor;
            boxUpperShadowColor = typeBoxMap["unknown"].upperShadowColor;
            boxLowerShadowColor = typeBoxMap["unknown"].lowerShadowColor;
            label = typeBoxMap["unknown"].label;
        }

        context.fillStyle = boxColor;
        context.fillRect(x, y + 2, typeBoxInnerWidth + 2, typeBoxInnerHeight);
        context.fillRect(x + 1, y + 1, typeBoxInnerWidth, typeBoxInnerHeight + 2);
        context.fillStyle = boxUpperShadowColor;
        context.fillRect(x, y + 1, 1, 1);
        context.fillRect(x + 1, y, typeBoxInnerWidth, 1);
        context.fillRect(x + typeBoxInnerWidth + 1, y + 1, 1, 1);
        context.fillStyle = boxLowerShadowColor;
        context.fillRect(x, y + typeBoxInnerHeight + 2, 1, 1);
        context.fillRect(x + 1, y + typeBoxInnerHeight + 3, typeBoxInnerWidth, 1);
        context.fillRect(x + typeBoxInnerWidth + 1, y + typeBoxInnerHeight + 2, 1, 1);
        renderText(context, label, x + (typeBoxInnerWidth + 2) / 2, y + 10, 12, lightFontTextColor, boxLowerShadowColor, "center");
    }

    const renderTypeBoxes = (
        context: CanvasRenderingContext2D, type1: string, type2: string, x: number, y: number
    ) => {
        if (type2 === "-" || type1 === type2) {
            renderTypeBox(context, type1, x - (typeBoxInnerWidth + 2) / 2 + 1, y - 10);
        } else {
            renderTypeBox(context, type1, x - (typeBoxInnerWidth + 2) - 1, y - 10);
            renderTypeBox(context, type2, x + 1, y - 10);
        }
    }

    const renderProfileImage = (context: CanvasRenderingContext2D, profileImage: HTMLImageElement) => {
        const originalWidth = profileImage.width;
        const originalHeight = profileImage.height;

        let scaleFactor;

        if (originalWidth > originalHeight) {
            scaleFactor = 80 / originalWidth
        } else {
            scaleFactor = 80 / originalHeight;
        }

        const scaledWidth = profileImage.width * scaleFactor;
        const scaledHeight = profileImage.height * scaleFactor;

        context.drawImage(profileImage, 20 + (64 - scaledWidth) / 2, 72 + (64 - scaledHeight) / 2, scaledWidth, scaledHeight);
    }

    const renderPokeballImage = (context: CanvasRenderingContext2D, pokeballImage: HTMLImageElement) => {
        context.drawImage(pokeballImage, 8, 25, pokeballImage.width, pokeballImage.height);
    }

    const renderGeneral = (context: CanvasRenderingContext2D, profileImage: HTMLImageElement, pokeballImage: HTMLImageElement) => {
        renderText(context, chosenNickname.toUpperCase(), 23, 36, 16, lightFontTextColor, lightFontShadowColor);

        if (chosenGender === "male") {
            renderText(context, "♂", 88, 36, 16, maleFontTextColor, maleFontShadowColor);
        } else if (chosenGender === "female") {
            renderText(context, "♀", 88, 36, 16, femaleFontTextColor, femaleFontShadowColor);
        }
 
        renderText(context, parseInt(chosenLevel).toString(), 23, 52, 16, darkFontTextColor, darkFontShadowColor);

        if (chosenItem === "-") {
            renderText(context, "None", 7, 188, 16, darkFontTextColor, darkFontShadowColor);
        } else {
            renderText(context, capitalizeFirstLetters(chosenItem, "-", " "), 7, 188, 16, darkFontTextColor, darkFontShadowColor);
        }

        if (profileImage.complete) {
            renderProfileImage(context, profileImage);
        } else {
            profileImage.onload = () => {
                renderProfileImage(context, profileImage);
            }
        }

        if (pokeballImage.complete) {
            renderPokeballImage(context, pokeballImage);
        } else {
            pokeballImage.onload = () => {
                renderPokeballImage(context, pokeballImage);
            }
        }
    }

    const renderPokemonInfo = (context: CanvasRenderingContext2D) => {
        renderText(context, addLeadingZeros(parseInt(chosenPokedexNumber), 3), 216, 52, 16, darkFontTextColor, darkFontShadowColor, "center");
        renderText(context, chosenSpecies.toUpperCase(), 216, 68, 16, darkFontTextColor, darkFontShadowColor, "center");
        renderTypeBoxes(context, chosenType1, chosenType2, 216, 83);

        if (chosenTrainerGender === "male") {
            renderText(context, chosenOt, 216, 100, 16, maleFontTextColor, maleFontShadowColor, "center");
        } else if (chosenTrainerGender === "female") {
            renderText(context, chosenOt, 216, 100, 16, femaleFontTextColor, femaleFontShadowColor, "center");
        }

        renderText(context, addLeadingZeros(parseInt(chosenIdNumber), 5), 216, 116, 16, darkFontTextColor, darkFontShadowColor, "center");
        renderText(context, calculateTotalExperience(chosenLevel).toString(), 236, 148, 16, darkFontTextColor, darkFontShadowColor, "end");
        renderText(context, calculateExperienceToNextLevel(chosenLevel).toString(), 236, 180, 16, darkFontTextColor, darkFontShadowColor, "end");
    }

    const renderTrainerMemo = (context: CanvasRenderingContext2D) => {
        renderText(context, chosenNature.substring(0, 1).toUpperCase() + chosenNature.substring(1), 111, 52, 16, redFontTextColor, redFontShadowColor);
        renderText(context, " nature.", 111 + context.measureText(chosenNature.substring(0, 1).toUpperCase() + chosenNature.substring(1)).width, 52, 16, darkFontTextColor, darkFontShadowColor);
        
        const date = new Date(chosenMeetingDate);
        renderText(context, `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`, 111, 68, 16, darkFontTextColor, darkFontShadowColor);
        renderText(context, chosenMeetingArea, 111, 84, 16, redFontTextColor, redFontShadowColor);
        renderText(context, `Met at Lv. ${parseInt(chosenMeetingLevel).toString()}.`, 111, 100, 16, darkFontTextColor, darkFontShadowColor);
        renderText(context, `${chosenCharacteristic}.`, 111, 132, 16, darkFontTextColor, darkFontShadowColor);

        let foodPreference;

        switch (chosenNature) {
            case "lonely": case "adamant": case "naughty": case "brave":
                foodPreference = "spicy";
                break;
            case "bold": case "impish": case "lax": case "relaxed":
                foodPreference ="sour";    
                break;
            case "modest": case "mild": case "rash": case "quiet":
                foodPreference = "dry";
                break;
            case "calm": case "gentle": case "careful": case "sassy":
                foodPreference = "bitter";
                break;
            case "timid": case "hasty": case "jolly": case "naive":
                foodPreference = "sweet";
                break;
        }

        if (foodPreference) {
            renderText(context, "Likes", 111, 148, 16, darkFontTextColor, darkFontShadowColor);
            renderText(context, ` ${foodPreference}`, 111 + context.measureText("Likes").width, 148, 16, redFontTextColor, redFontShadowColor);
            renderText(context, " food.", 111 + context.measureText("Likes").width + context.measureText(` ${foodPreference}`).width, 148, 16, darkFontTextColor, darkFontShadowColor);
        } else {
            renderText(context, "Happily eats anything.", 111, 148, 16, darkFontTextColor, darkFontShadowColor);
        }
    }

    const renderPokemonSkills = (context: CanvasRenderingContext2D) => {
        renderText(context, `${parseInt(chosenHp).toString()}/${parseInt(chosenHp).toString()}`, 212, 44, 16, darkFontTextColor, darkFontShadowColor, "center");
        renderText(context, parseInt(chosenAttack).toString(), 215, 68, 16, darkFontTextColor, darkFontShadowColor, "center");
        renderText(context, parseInt(chosenDefense).toString(), 215, 84, 16, darkFontTextColor, darkFontShadowColor, "center");
        renderText(context, parseInt(chosenSpecialAttack).toString(), 215, 100, 16, darkFontTextColor, darkFontShadowColor, "center");
        renderText(context, parseInt(chosenSpecialDefense).toString(), 215, 116, 16, darkFontTextColor, darkFontShadowColor, "center");
        renderText(context, parseInt(chosenSpeed).toString(), 215, 132, 16, darkFontTextColor, darkFontShadowColor, "center");

        renderText(context, capitalizeFirstLetters(chosenAbility, "-", " "), 167, 156, 16, darkFontTextColor, darkFontShadowColor);

        fetch(`${apiBaseUrl}/ability/${chosenAbility}`)
            .then(res => res.json())
            .then(json => {
                const dpEntry = json.flavor_text_entries.filter((entry: {flavor_text: string, language: {name: string, url: string}, version_group: {name: string, url: string}}) => {
                    return entry.version_group.name === "diamond-pearl";
                })[0];

                renderTextOverMultipleLines(context, dpEntry.flavor_text, 111, 172, 16, darkFontTextColor, darkFontShadowColor, 16);
            });
    }

    const renderBattleMove = (context: CanvasRenderingContext2D, index: number, move: string) => {
        if (move !== "-") {
            fetch(`${apiBaseUrl}/move/${move}`)
                .then(res => res.json())
                .then(json => {
                    const type = json.type.name;
                    const pp = json.pp;

                    renderTypeBox(context, type, 135, 35 + (index - 1) * 32);
                    renderText(context, capitalizeFirstLetters(move,  "-", " "), 168, 46 + (index - 1) * 32, 16, lightFontTextColor, lightFontShadowColor);
                    renderText(context, "PP", 183, 60 + (index - 1) * 32, 16, darkFontTextColor, darkFontShadowColor);
                    renderText(context, `${pp}/${pp}`, 226, 60 + (index - 1) * 32, 16, darkFontTextColor, darkFontShadowColor, "center");
                });
        } else {
            renderText(context, "-", 168, 46 + (index - 1) * 32, 16, lightFontTextColor, lightFontShadowColor);
            renderText(context, "--", 226, 60 + (index - 1) * 32, 16, darkFontTextColor, darkFontShadowColor, "center");
        }
    }

    const renderBattleMoves = (context: CanvasRenderingContext2D) => {
        // If a certain move slot is left empty ("-") in the UI, render an empty entry in the move list on the canvas only after all the entries that actually contain a move.
        // Also, if a certain move is selected in more than one move slot in the UI, only render it once in the move list on the canvas.
        // 
        // Example: 
        // The selected moves in the UI are: 1. Thunderbolt, 2. Thunderbolt, 3. -, 4. Quick Attack
        // The rendered moves on the canvas will be: 1. Thunderbolt, 2. Quick Attack, 3. -. 4. -

        const allChosenMoves = [chosenMove1, chosenMove2, chosenMove3, chosenMove4];
        let renderedMoves: string[] = [];
        let movesToCheck = [...allChosenMoves];
        let indexInRenderedList = 1;

        for (let chosenMove of allChosenMoves) {
            if (chosenMove !== "-" && !renderedMoves.includes(chosenMove)) {
                renderBattleMove(context, indexInRenderedList, chosenMove);
                renderedMoves.push(chosenMove);
                indexInRenderedList++;
            }

            movesToCheck = movesToCheck.filter(move => move !== chosenMove);
        }

        for (let i = indexInRenderedList; i <= 4; i++) {
            renderBattleMove(context, i, "-");
        }
    }

    const renderResult = (
        context1: CanvasRenderingContext2D, context2: CanvasRenderingContext2D, context3: CanvasRenderingContext2D, context4: CanvasRenderingContext2D,
        imageTemplate1: HTMLImageElement, imageTemplate2: HTMLImageElement, imageTemplate3: HTMLImageElement, imageTemplate4: HTMLImageElement,
        profileImage: HTMLImageElement, pokeballImage: HTMLImageElement
    ) => {
        context1.setTransform(2, 0, 0, 2, 0, 0);
        context1.drawImage(imageTemplate1, 0, 0);
        renderGeneral(context1, profileImage, pokeballImage);
        renderPokemonInfo(context1);

        context2.setTransform(2, 0, 0, 2, 0, 0);
        context2.drawImage(imageTemplate2, 0, 0);
        renderGeneral(context2, profileImage, pokeballImage);
        renderTrainerMemo(context2);

        context3.setTransform(2, 0, 0, 2, 0, 0);
        context3.drawImage(imageTemplate3, 0, 0);
        renderGeneral(context3, profileImage, pokeballImage);
        renderPokemonSkills(context3);

        context4.setTransform(2, 0, 0, 2, 0, 0);
        context4.drawImage(imageTemplate4, 0, 0);
        renderGeneral(context4, profileImage, pokeballImage);
        renderBattleMoves(context4);
    }

    useEffect(() => {
        // Preload the local font, so it is available when needed to be used
        if (canvasRef1.current) {
            const canvas1 = canvasRef1.current;
            const context1 = canvas1.getContext("2d");

            if (context1) {
                context1.font = `10px ${dpFont.style.fontFamily}`;
                context1.fillText("", 0, 0);
            }
        }
    }, [])

    useEffect(() => {
        if (activeTab == "tab-canvas" && generalTabIsValid && pokemonInfoTabIsValid && trainerMemoTabIsValid && pokemonSkillsTabIsValid && battleMovesTabIsValid && canvasRef1.current && canvasRef2.current && canvasRef3.current && canvasRef4.current) {
            setActiveCanvas("canvas-div-1");

            const canvas1 = canvasRef1.current;
            const context1 = canvas1.getContext("2d");

            const canvas2 = canvasRef2.current;
            const context2 = canvas2.getContext("2d");

            const canvas3 = canvasRef3.current;
            const context3 = canvas3.getContext("2d");

            const canvas4 = canvasRef4.current;
            const context4 = canvas4.getContext("2d");

            if (context1 && context2 && context3 && context4) {
                context1.imageSmoothingEnabled = false;    
                context2.imageSmoothingEnabled = false;
                context3.imageSmoothingEnabled = false;            
                context4.imageSmoothingEnabled = false;

                const imageTemplate1 = new Image(256, 192);
                const imageTemplate2 = new Image(256, 192);
                const imageTemplate3 = new Image(256, 192);
                const imageTemplate4 = new Image(256, 192);
                const profileImage = new Image();
                const pokeballImage = new Image(15, 15);

                imageTemplate1.onload = () => {
                    if (imageTemplate1.complete && imageTemplate2.complete && imageTemplate3.complete && imageTemplate4.complete && profileImage.complete && pokeballImage.complete) {
                        renderResult(context1, context2, context3, context4, imageTemplate1, imageTemplate2, imageTemplate3, imageTemplate4, profileImage, pokeballImage);
                    }
                }

                imageTemplate2.onload = () => {
                    if (imageTemplate1.complete && imageTemplate2.complete && imageTemplate3.complete && imageTemplate4.complete && profileImage.complete && pokeballImage.complete) {
                        renderResult(context1, context2, context3, context4, imageTemplate1, imageTemplate2, imageTemplate3, imageTemplate4, profileImage, pokeballImage);
                    }
                }

                imageTemplate3.onload = () => {
                    if (imageTemplate1.complete && imageTemplate2.complete && imageTemplate3.complete && imageTemplate4.complete && profileImage.complete && pokeballImage.complete) {
                        renderResult(context1, context2, context3, context4, imageTemplate1, imageTemplate2, imageTemplate3, imageTemplate4, profileImage, pokeballImage);
                    }
                }

                imageTemplate4.onload = () => {
                    if (imageTemplate1.complete && imageTemplate2.complete && imageTemplate3.complete && imageTemplate4.complete && profileImage.complete && pokeballImage.complete) {
                        renderResult(context1, context2, context3, context4, imageTemplate1, imageTemplate2, imageTemplate3, imageTemplate4, profileImage, pokeballImage);
                    }
                }

                profileImage.onload = () => {
                    if (imageTemplate1.complete && imageTemplate2.complete && imageTemplate3.complete && imageTemplate4.complete && profileImage.complete && pokeballImage.complete) {
                        renderResult(context1, context2, context3, context4, imageTemplate1, imageTemplate2, imageTemplate3, imageTemplate4, profileImage, pokeballImage);
                    }
                }

                pokeballImage.onload = () => {
                    if (imageTemplate1.complete && imageTemplate2.complete && imageTemplate3.complete && imageTemplate4.complete && profileImage.complete && pokeballImage.complete) {
                        renderResult(context1, context2, context3, context4, imageTemplate1, imageTemplate2, imageTemplate3, imageTemplate4, profileImage, pokeballImage);
                    }
                }

                imageTemplate1.src = "Diamond_summary_1.png";
                imageTemplate2.src = "Diamond_summary_2.png";
                imageTemplate3.src = "Diamond_summary_3.png";
                imageTemplate4.src = "Diamond_summary_4.png";

                if (chosenImage) {
                    profileImage.src = URL.createObjectURL(chosenImage);
                }

                if (chosenPokeBall) {
                    pokeballImage.src = `${capitalizeFirstLetters(chosenPokeBall, "-", "_")}_summary_IV.png`;
                }
            }
        }
    }, [activeTab])

    return (
        <div id="result" className={activeTab == "tab-canvas" ? "" : "hidden"}>
            <div className="relative">
                <div id="canvas-div-1" className={activeCanvas === "canvas-div-1" ? "" : "hidden"}>
                    <canvas ref={canvasRef1} width="512" height="384"></canvas>
                </div>
                <div id="canvas-div-2" className={activeCanvas === "canvas-div-2" ? "" : "hidden"}>
                    <canvas ref={canvasRef2} width="512" height="384"></canvas>
                </div>
                <div id="canvas-div-3" className={activeCanvas === "canvas-div-3" ? "" : "hidden"}>
                    <canvas ref={canvasRef3} width="512" height="384"></canvas>
                </div>
                <div id="canvas-div-4" className={activeCanvas === "canvas-div-4" ? "" : "hidden"}>
                    <canvas ref={canvasRef4} width="512" height="384"></canvas>
                </div>

                <button className={"absolute top-1/2 left-0 p-3 rounded text-xl text-white bg-slate-500 bg-opacity-50" + " " + (activeCanvas !== "canvas-div-1" ? "hover:bg-slate-600" : "")} onClick={showPreviousCanvas}>❮</button>
                <button className={"absolute top-1/2 right-0 p-3 rounded text-xl text-white bg-slate-500 bg-opacity-50" + " " + (activeCanvas !== "canvas-div-4" ? "hover:bg-slate-600" : "")} onClick={showNextCanvas}>❯</button>
            </div>

            <div className="flex flex-col justify-between place-items-center p-8">
                <ul className="grid grid-cols-2 gap-10 py-3">
                    <li>
                        <button className={"w-28 h-10 rounded font-bold bg-red-500 text-white"} onClick={newCreation}>New</button>
                        <a ref={refreshLinkRef} href="/"></a>
                    </li>
                    <li>
                        <button className={"w-28 h-10 rounded font-bold bg-green-500 text-white"} onClick={downloadResult}>Download</button>
                        <a ref={downloadLinkRef1}></a>
                        <a ref={downloadLinkRef2}></a>
                        <a ref={downloadLinkRef3}></a>
                        <a ref={downloadLinkRef4}></a>
                    </li>
                </ul>
            </div>
        </div>
    )
}