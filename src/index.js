import "./styles.css";
import { SVG } from "@svgdotjs/svg.js";


const input = {
  boxes: [
    {
      w: 20, h: 10
    },
    {
      w: 120, h: 20
    },
    {
      w: 200, h: 40
    }
  ],
  design: {
    w: 180,
    h: 100,
    margin: {
      h: 10,
      v: 5
    },
  },

  boxPadding: 5
}


function packedBoxes(input) {
  const output = {
    design: {
      width: input.design.w,
      height: input.design.h,
    },
    placed: [
      {
        x: 10,
        y: 5,
        w: 20,
        h: 10,
        color: "red"
      }, 
      {
        x: 35,
        y: 5,
        w: 120,
        h: 20,
        color: "blue"
      }, 
      {
        x: 10,
        y: 30,
        w: 160,
        h: 32,
        color: "green"
      }
    ]
  }

  // Answer of this program. will be sent as a JSON. 
  return output
}

function drawBoxes(output) {
  const width = output.design.width
  const height = output.design.height
  

  const canvas = SVG()
    .addTo('#app')
    .size(width, height)
    .viewbox(0, 0, width, height)
  
  
  // Create window
  const window = canvas.rect(width, height)
    .stroke("white")
   

  //TODO::  loop through all the output and draw here // placed all will be draw
  output.placed.forEach(element => {

    const x = element.x
    const y = element.y
    const width = element.w
    const height = element.h
    const color = element.color

    // Create boxes
    const boxes = canvas.rect(width, height)
    .x(x)
    .y(y)
    .stroke(color)
  });
}


const result = packedBoxes(input)
drawBoxes(result)
