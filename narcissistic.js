var dv = console.log.bind(console);

function narcissistic(value) {
    var power = value.toString().length;
    var sum = 0;

    for (var i = 0; i < power; i++) {
        sum += Math.pow(parseInt(value.toString()[i]), power);
    }

    return sum === value;
}

dv(narcissistic(7));
dv(narcissistic(153));
dv(narcissistic(371));
dv(narcissistic(1634));
dv(narcissistic(1635));