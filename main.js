const gamepadInfo = document.getElementById("gamepad-info");
const textbox = document.getElementById("textbox");
const rAF = window.requestAnimationFrame;
const left_set = new Set();
const right_set = new Set();

window.addEventListener("gamepadconnected", function () {
    var gp = navigator.getGamepads()[0];
    gamepadInfo.innerHTML = "Controller id: " + gp.id;

    checkLoop();
});

window.addEventListener("gamepaddisconnected", function () {
    gamepadInfo.innerHTML = "Waiting for gamepad.";
});

function checkLoop() {
    var gp = navigator.getGamepads()[0];
    if (!gp)
        return;
    const point_left = { x: Math.round(gp.axes[0] * 127), y: Math.round(gp.axes[1] * -127) };
    const point_right = { x: Math.round(gp.axes[2] * 127), y: Math.round(gp.axes[3] * -127) };
    if (Math.abs(point_left.x) + Math.abs(point_left.y) > 30) left_set.add(point_left);
    if (Math.abs(point_right.x) + Math.abs(point_right.y) > 30) right_set.add(point_right);
    var text = "LEFT START\n";
    left_set.forEach((point)=>{ text += `${point.x}\t${point.y}\n`;});
    text += "LEFT END\n\nRIGHT START\n";
    right_set.forEach((point)=>{ text += `${point.x}\t${point.y}\n`;});
    text += "RIGHT END";
    textbox.value = text;
    rAF(checkLoop);
};