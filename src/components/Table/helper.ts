

export const getInputPlaceholder = (c: number) => {
    switch (c) {
        case 1:
            return { 1: 'Enter value' }

        case 2:
            return {
                1: 'Min value',
                2: 'Max value',
            }

        default:
            return {};
    }
}


export const getInputName = (c: number, i: number, name: string,) => {
    if (c === 1) {
        return name
    };

    if (c === 2) {
        if (i === 0) {
            return `start${name}`
        }

        if (i === 1) {
            return `end${name}`
        }
    }
}