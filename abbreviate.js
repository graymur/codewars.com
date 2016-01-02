var dv = console.log.bind(console);

function getDividers(string) {
    return string.match(/([^a-z]+)/gi);
}

function getWords(string) {
    return string.match(/([a-z]+)/gi);
}

function doAbbreviate(string) {
    if (string.length > 3) {
        string = string[0] + (string.length - 2) + string[string.length - 1];
    }

    return string;
}

function abbreviate(string) {
    var abbreviated = getWords(string).map(doAbbreviate);
    var dividers = getDividers(string) || [];

    return abbreviated.reduce(function (carry, element, index) {
        carry += element + (dividers[index] || '');
        return carry;
    }, '');
}

dv(abbreviate('wolf is yellow'));
dv(abbreviate('wolf-is-yellow'));
dv(abbreviate('wolf-is yellow'));
dv(abbreviate('You need, need not want, to complete this code-wars mission'));
