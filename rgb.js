/**
 * Created by User on 12.11.2015.
 */

var dv = console.log.bind(console);

function rgb(r, g, b){
    return [r, g, b].map(function (value) {
        if (value < 0) value = 0;
        if (value > 255) value = 255;
        value = value.toString(16);
        return value === '0' ? '00' : value;
    }).join('').toUpperCase();
}

dv(rgb(255, 255, 255)); // returns FFFFFF
dv(rgb(255, 255, 300)); // returns FFFFFF
dv(rgb(0,0,0)); // returns 000000
dv(rgb(148, 0, 211)); // returns 9400D3