export const capitalizeFirstLetters = (multiWordString: string, oldSeparator: string, newSeparator: string) => {
    let words = multiWordString.split(oldSeparator);

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].substring(0, 1).toUpperCase() + words[i].substring(1);
    }

    return words.join(newSeparator);
}

export const addLeadingZeros = (number: number, desiredLength: number) => {
    const currentLength = number.toString().length;

    if (desiredLength > currentLength) {
        const nZerosToAdd = desiredLength - currentLength;
        return `${"0".repeat(nZerosToAdd)}${number.toString()}`;
    } else {
        return number.toString();
    }
}

export const isValidInputText = (textString: string | undefined, characterLimit: number) => {
    if (textString && textString.trim() && textString.trim().length <= characterLimit) {
        return true;
    }

    return false;
}

export const isValidInputNumber = (numberString: string | undefined, minValue: number, maxValue: number) => {
    if (numberString && parseFloat(numberString) && parseFloat(numberString) >= minValue && parseFloat(numberString) <= maxValue && parseFloat(numberString) % 1 === 0) {
        return true
    }

    return false;
}

export const isValidInputDate = (dateString: string | undefined) => {
    if (dateString && !isNaN(new Date(dateString).valueOf())) {
        return true;
    }

    return false;
}