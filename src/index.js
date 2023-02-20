import "./styles.css";
import { SVG } from "@svgdotjs/svg.js";



function packedBoxes(input) {
  const output = {
    design: {
      width: input.design.w,
      height: input.design.h,
    },
    placed: [
      // {
      //   x: 10,
      //   y: 5,
      //   w: 20,
      //   h: 10,
      //   color: "red"
      // }, 
      // {
      //   x: 35,
      //   y: 5,
      //   w: 120,
      //   h: 20,
      //   color: "blue"
      // }, 
      // {
      //   x: 10,
      //   y: 30,
      //   w: 160,
      //   h: 32,
      //   color: "green"
      // }
    ]
  }

  let horiMargin = input.design.margin.h
  let vertMargin = input.design.margin.v
  let padding = input.boxPadding
  
  let totalWidth = input.design.w - (horiMargin * 2)
  let totalHeight = input.design.h - (vertMargin * 2)

  let x = horiMargin, y = vertMargin;

  let remainingWidth = totalWidth
  let remainingHeight = totalHeight

  let filledHeight = 0;

  for(let i = 0; i < input.boxes.length; i++)
  {
    let boxWidth = input.boxes[i].w;
    let boxHeight = input.boxes[i].h;

    if((boxWidth > remainingWidth) && (boxHeight > remainingHeight))
    {
      if((boxWidth - remainingWidth) > (boxHeight - remainingHeight))
      {
        let remaining = boxWidth - remainingWidth;

        boxHeight = boxHeight - (boxHeight * (remaining / boxWidth));
        boxWidth = remainingWidth;
      }
      else
      {
        let remaining = boxHeight - remainingHeight;

        boxWidth = boxWidth - (boxWidth * (remaining / boxHeight));
        boxHeight = remainingHeight;
      }
    }
    else if(boxWidth > remainingWidth)
    {
      let remaining = boxWidth - remainingWidth;

      boxHeight = boxHeight - (boxHeight * (remaining / boxWidth));
      boxWidth = remainingWidth;
    }
    else if(boxHeight > remainingHeight)
    {
      let remaining = boxHeight - remainingHeight;

      boxWidth = boxWidth - (boxWidth * (remaining / boxHeight));
      boxHeight = remainingHeight;
    }
    
    if(remainingWidth < totalWidth)
      x = horiMargin + totalWidth - remainingWidth;
    else
      x = horiMargin;
    
    if(remainingHeight < totalHeight)
      y = vertMargin + totalHeight - remainingHeight;
    else
      y = vertMargin

    if(boxWidth > 0 && boxHeight > 0)
      output.placed.push({x: x, y: y, w: boxWidth, h: boxHeight});
    
    remainingWidth = remainingWidth - boxWidth - padding;
    
    if(filledHeight < boxHeight)
      filledHeight = boxHeight;
    
    if(((i + 1) < input.boxes.length) && (input.boxes[i + 1].w > remainingWidth))
    {
      remainingWidth = totalWidth;
      remainingHeight = remainingHeight - filledHeight - padding;
      filledHeight = 0;

      if(remainingHeight < 0)
        remainingHeight = 0

      if(remainingWidth < 0)
        remainingWidth = 0
    }
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
    .stroke("white")
  });
}


const input = {
  boxes: [
    {
      w: 20, h: 10
    },
    {
      w: 120, h: 20
    },
    {
      w: 300, h: 70
    }
  ],
  design: {
    w: 280,
    h: 100,
    margin: {
      h: 10,
      v: 5
    },
  },

  boxPadding: 5
}
const result = packedBoxes(input)
drawBoxes(result)


// const input1 = {
//   boxes: [
//     {
//       w: 120, h: 50
//     },
//     {
//       w: 300, h: 80
//     },
//     {
//       w: 440, h: 40
//     },
//     {
//       w: 500, h: 300
//     },
//     {
//       w: 100, h: 80
//     }
//   ],
//   design: {
//     w: 500,
//     h: 400,
//     margin: {
//       h: 10,
//       v: 10
//     },
//   },

//   boxPadding: 5
// }

// const result1 = packedBoxes(input1)
// drawBoxes(result1)