const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resultDiv = document.getElementById("result");
const prizeText = document.getElementById("prize");
const claimButton = document.getElementById("claimButton");
const spinSound = document.getElementById("spinSound");

const prizes = [
    { text: "10% OFF", color: "red" },
    { text: "20% OFF", color: "black" }
];

const segments = 8; // number of segments on the wheel
const degPerSegment = 360 / segments;

function drawWheel() {
    for (let i = 0; i < segments; i++) {
        const startAngle = (i * degPerSegment) * (Math.PI / 180);
        const endAngle = ((i + 1) * degPerSegment) * (Math.PI / 180);

        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, startAngle, endAngle);
        ctx.fillStyle = i % 2 === 0 ? prizes[0].color : prizes[1].color;
        ctx.fill();

        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(startAngle + (degPerSegment / 2) * (Math.PI / 180));
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 20px Arial";
        ctx.fillText(prizes[i % 2].text, 230, 10);
        ctx.restore();
    }
}

drawWheel();

spinButton.addEventListener("click", () => {
    spinSound.play(); // Reproduce el sonido
    const spinAngle = Math.floor(Math.random() * 360) + 360 * 5;
    const actualSpin = spinAngle % 360;
    const prizeIndex = Math.floor(((360 - actualSpin + degPerSegment / 2) % 360) / degPerSegment);
    const prize = prizes[prizeIndex % prizes.length].text;

    canvas.style.transition = "transform 5s ease-out";
    canvas.style.transform = `rotate(${spinAngle}deg)`;

    setTimeout(() => {
        canvas.style.transition = "none";
        canvas.style.transform = `rotate(${actualSpin}deg)`;

        resultDiv.style.display = "block";
        prizeText.innerText = `¡Has ganado ${prize}!`;
        const message = `Hola quiero crear un usuario y reclamar mi bonificación`;
        const whatsappLink = `https://wa.me/5492975815752?text=${encodeURIComponent(message)}`;
        claimButton.href = whatsappLink;
        window.location.href = whatsappLink;
    }, 5000);
});
