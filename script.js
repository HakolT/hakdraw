document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas");
    const body = document.querySelector('body');
    const ctx = canvas.getContext("2d");
    const theInput = document.getElementById("favcolor");
    const lineOutput = document.getElementById("ageOutputId");
    const clrs = document.querySelectorAll(".clr");
    const clearBtn = document.querySelector(".clear");
    const saveBtn = document.querySelector(".save");

    let theColor = '';
    let lineW = 5;
    let prevX = null;
    let prevY = null;
    let draw = false;

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx.lineWidth = lineW;

    body.style.backgroundColor = "#FFFFFF";

    theInput.addEventListener("input", function() {
        theColor = theInput.value;
        body.style.backgroundColor = theColor;
    }, false);

    document.getElementById("ageInputId").oninput = function() {
        draw = false;
        lineW = this.value;
        lineOutput.innerHTML = lineW;
        ctx.lineWidth = lineW;
    };

    clrs.forEach(clr => {
        clr.addEventListener("click", () => {
            ctx.strokeStyle = clr.dataset.clr;
        });
    });

    clearBtn.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    saveBtn.addEventListener("click", () => {
        let data = canvas.toDataURL("image/png");
        let a = document.createElement("a");
        a.href = data;
        a.download = "sketch.png";
        a.click();
    });

    canvas.addEventListener("mousedown", (e) => {
        draw = true;
        prevX = e.clientX;
        prevY = e.clientY;
    });

    canvas.addEventListener("mouseup", () => {
        draw = false;
        prevX = null;
        prevY = null;
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!draw) return;

        let currentX = e.clientX;
        let currentY = e.clientY;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        prevX = currentX;
        prevY = currentY;
    });
});
