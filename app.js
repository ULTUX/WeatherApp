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
var timer;

function changeNumber(val, getVal, setVal) {
    if (val != getVal()) {
        var range = val - getVal();
        var increment = range / 100;
        var step = Math.abs(Math.floor(100 / (10 + Math.floor(range))));
        clearInterval(timer);
        timer = setInterval(() => {
            setVal((getVal() + increment).toPrecision(4));
            if (Math.abs(val - getVal()) < Math.abs(range / 10)) {
                clearInterval(timer);
                setVal(val);
            }
        }, step);
    }

}

setInterval(() => {
    if (isInit) {
        fetch("http://178.183.121.110/").then((resp) => {
            resp.json().then((resp => {
                changeNumber(parseFloat(resp["temp"]), getTemp, setTemp);
                changeNumber(parseFloat(resp["hum"]), getHum, setHum);
                changeNumber(parseFloat(resp["temp_2"]), getAltTemp, setAltTemp);
            }));
        });
    } else {
        fetch("http://178.183.121.110/").then((resp) => {
            resp.json().then((resp) => {
                setTemp(parseFloat(resp["temp"]));
                setHum(parseFloat(resp["hum"]));
                setAltTemp(parseFloat(resp["temp_2"]));
                isInit = true;
            });
        });
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