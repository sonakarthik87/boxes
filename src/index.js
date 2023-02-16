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
    h: 100
  },
  margin: {
    h: 10,
    v: 5
  },
  padding: 5
}


function packedBoxes(input) {
  const output = {
    design: {
      width: input.design.w,
      height: input.design.h,
    },
    placed: [
      {
        x: 0,
        y: 0,
        w: 10,
        h: 20
      }, 
      {

      },
      {

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
  
  
  // Create sky
  const sky = canvas.rect(width, height)
    .stroke("white")
   

  //TODO::  loop through all the output and draw here // placed all will be draw
}


const result = packedBoxes(input)
drawBoxes(result)
