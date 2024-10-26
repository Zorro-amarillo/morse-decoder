const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let exprArr = [];
    let newSubArr;
    let resultArr = [];
    let resultStr = '';

    // Split an Expr into 10 Symbols (Encoded Letters)
    for (let i = 0; i < expr.length; i += 10) {
        exprArr.push([].concat(expr.slice(i, i + 10)));
    }

    // Split an Encoded Letter into 2 Symbols
    exprArr.forEach((subArr) => {
        newSubArr = [];

        for (let i = 0; i < subArr[0].length; i += 2) {
            newSubArr.push([].concat(subArr[0].slice(i, i + 2)));
        }

        resultArr.push(newSubArr);
    });

    // Replace '**' and Numbers with Spaces, Dots, Dashes, ''
    for (let i = 0; i < resultArr.length; i += 1) {
        resultArr[i].forEach((subArr) => {
            if (subArr[0] === '10') {
                subArr[0] = subArr[0].replace('10', '.');
            } else if (subArr[0] === '11') {
                subArr[0] = subArr[0].replace('11', '-');
            } else if (subArr[0] === '00') {
                subArr[0] = subArr[0].replace('00', '');
            }

            if (subArr.includes('**')) {
                resultArr[i] = [' '];
            }
        });
    }

    // Get Morse Letters
    for (let i = 0; i < resultArr.length; i += 1) {
        const morseLetter = resultArr[i].reduce((result, item) => {
            return `${result.toString()}${item.toString()}`;
        });

    // Get Decoded String
        if (morseLetter === ' ') {
            resultStr += morseLetter;
        }

        for (let key in MORSE_TABLE) {
            if (morseLetter === key) {
                resultStr += MORSE_TABLE[key];
            }
        }
    }

    return resultStr;
}

decode("00101010100000000010001011101000101110100000111111**********00001011110000111111000010111000101110100000111010");

module.exports = {
    decode
}