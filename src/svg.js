import "./styles.css";
import { SVG } from "@svgdotjs/svg.js";

function drawCircle()
{
    let width = 400
    let height = 400

    const canvas = SVG()
    .addTo('#app')
    .size(width, height)
    .attr("style", "border: 2px solid white")
    .viewbox(-200, -200, width, height)

    // Create window
    const circle1 = canvas.circle()
    .radius(90)
    .fill("transparent")
    .stroke("#E4FBFF")
    .attr("stroke-width", 7)
    .attr("stroke-dasharray", "0.2 0.8")
    .attr("stroke-dashoffset", "0.1")
    .attr("pathLength", 60)

    const circle2 = canvas.circle()
    .radius(90)
    .fill("transparent")
    .stroke("#E90064")
    .attr("stroke-width", 7)
    .attr("stroke-dasharray", "0.2 4.8")
    .attr("stroke-dashoffset", "0.1")
    .attr("pathLength", 60)

    const hourHand = canvas.group()
    .id("hour_hand")

    hourHand.add(
        canvas.line(0, 0, 0, -50)
        .stroke("#ffffff")
        .attr("stroke-width", 2)
        .attr("stroke-linecap", "round")
    )
    hourHand.add(
        canvas.line(0, -12, 0, -50)
        .stroke("#ffffff")
        .attr("stroke-width", 7)
        .attr("stroke-linecap", "round")
    )

    const minuteHand = canvas.group()
    .id("minute_hand")

    minuteHand.add(
        canvas.line(0, 0, 0, -80)
        .stroke("#ffffff")
        .attr("stroke-width", 2)
        .attr("stroke-linecap", "round")
    )

    minuteHand.add(
        canvas.line(0, -12, 0, -80)
        .stroke("#ffffff")
        .attr("stroke-width", 7)
        .attr("stroke-linecap", "round")
    )

    const secondHand = canvas.group()
    .id("second_hand")

    secondHand.add(
        canvas.line(0, 12, 0, -80)
        .stroke("#E90064")
    )
}

drawCircle();

const hoursElement = document.getElementById("hour_hand");
const minutesElement = document.getElementById("minute_hand");
const secondsElement = document.getElementById("second_hand");

function animate() {
  const date = new Date();

  const hour = date.getHours() + date.getMinutes() / 60;
  const minute = date.getMinutes() + date.getSeconds() / 60;
  const second = date.getSeconds() + date.getMilliseconds() / 1000;

  hoursElement.setAttribute("transform", `rotate(${(360 / 12) * hour})`);
  minutesElement.setAttribute("transform", `rotate(${(360 / 60) * minute})`);
  secondsElement.setAttribute("transform", `rotate(${(360 / 60) * second})`);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);