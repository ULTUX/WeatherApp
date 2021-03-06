let tempSpan = document.getElementById("tempval");
let humSpan = document.getElementById("humval");
let altTempSpan = document.getElementById("alttempval");
let isInit = false;

function setTemp(temp) {
    tempSpan.innerText = temp + "\u00B0C";
}

function setHum(hum) {
    humSpan.innerText = hum + "%";
}

function setAltTemp(temp) {
    altTempSpan.innerText = temp + "\u00B0C";
}

function getTemp() {
    return parseFloat(tempSpan.innerText.replace("\u00B0C", ""));
}

function getHum() {
    return parseFloat(humSpan.innerText.replace("%", ""));
}

function getAltTemp() {
    return parseFloat(altTempSpan.innerText.replace("\u00B0C", ""));
}
var timert;

function changeTemp(val) {
    if (val != getTemp()) {
        var range = val - getTemp();
        var increment = range / 100;
        var step = Math.abs(Math.floor(100 / (10 + Math.floor(range))));
        clearInterval(timert);
        timert = setInterval(() => {
            setTemp((getTemp() + increment).toPrecision(4));
            if (Math.abs(val - getTemp()) < Math.abs(range / 10)) {
                clearInterval(timert);
                setTemp(val);
            }
        }, step);
    }

}
var timerh;

function changeHum(val) {
    if (val != getHum()) {
        var range = val - getHum();
        var increment = range / 100;
        var step = Math.abs(Math.floor(100 / (10 + Math.floor(range))));
        clearInterval(timerh);
        timerh = setInterval(() => {
            setHum((getHum() + increment).toPrecision(4));
            if (Math.abs(val - getHum()) < Math.abs(range / 10)) {
                clearInterval(timerh);
                setHum(val);
            }
        }, step);
    }

}
var timerat;

function changeAltTemp(val) {
    if (val != getAltTemp()) {
        var range = val - getAltTemp();
        var increment = range / 100;
        var step = Math.abs(Math.floor(100 / (10 + Math.floor(range))));
        clearInterval(timerat);
        timerat = setInterval(() => {
            setAltTemp((getAltTemp() + increment).toPrecision(4));
            if (Math.abs(val - getAltTemp()) < Math.abs(range / 10)) {
                clearInterval(timerat);
                setAltTemp(val);
            }
        }, step);
    }

}

setInterval(() => {
    if (isInit) {
        fetch("http://178.183.121.110/").then((resp) => {
            resp.json().then((resp => {
                changeTemp(parseFloat(resp["temp"]));
                changeHum(parseFloat(resp["hum"]));
                changeAltTemp(parseFloat(resp["temp_2"]));
            }));
        });
    } else {
        fetch("http://178.183.121.110/").then((resp) => {
            resp.json().then((resp) => {
                setTemp((0.6 * parseFloat(resp["temp"])).toPrecision(4));
                setHum((0.6 * parseFloat(resp["hum"])).toPrecision(4));
                setAltTemp((0.6 * parseFloat(resp["temp_2"])).toPrecision(4));
            });
        });
        setTimeout(() => {
            fetch("http://178.183.121.110/").then((resp) => {
                resp.json().then((resp => {
                    changeTemp(parseFloat(resp["temp"]));
                    changeHum(parseFloat(resp["hum"]));
                    changeAltTemp(parseFloat(resp["temp_2"]));
                    isInit = true;
                }));
            });
        }, 100);
    }
}, 1000);

let bg = document.getElementsByClassName("bg-wideo");

window.onload = function () {
    document.getElementById("titlescreen").style.opacity = 1;
    if (Math.random() > 0.5)
        bg[0].style.opacity = 1;
    else bg[1].style.opacity = 1;
}

setInterval(() => {
    if (Math.random() > 0.5) {
        if (bg[1].style.opacity == 0 && bg[0].style.opacity == 1) {
            bg[1].style.opacity = 1;
            setTimeout(bg[0].style.opacity = 0, 1000);
        }
    } else {
        if (bg[0].style.opacity == 0 && bg[1].style.opacity == 1) {
            bg[0].style.opacity = 1;
            setTimeout(bg[1].style.opacity = 0, 1000);
        }
    }
}, 10000);