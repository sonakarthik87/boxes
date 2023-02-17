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

  let x = 0, y = 0;
  let noOfBoxes = 0;
  for(let i = 0; i < input.boxes.length; i++)
  {
    let boxWidth = input.boxes[i].w;
    let boxHeight = input.boxes[i].h;

    if(i == 0)
    {
      if((boxWidth < totalWidth) && (boxHeight < totalHeight))
      {
        output.placed.push({x: horiMargin, y: vertMargin, w: boxWidth, h: boxHeight});
        x = x + boxWidth;

        if(boxHeight > y)
          y = boxHeight;
      }
      else
      {
        if(boxHeight > totalHeight)
        {
          let remaining = boxHeight - totalHeight;

          boxWidth = boxWidth - (boxWidth * (remaining / boxHeight));
          boxHeight = totalHeight;
        }
        else if(boxWidth > totalWidth)
        {
          let remaining = boxWidth - totalWidth;

          boxHeight = boxHeight - (boxHeight * (remaining / boxWidth));
          boxWidth = totalWidth;
        }
        
        output.placed.push({x: horiMargin, y: vertMargin, w: boxWidth, h: boxHeight});
        
        x = x + boxWidth;

        if(boxHeight > y)
          y = boxHeight;
      }
    }
    else
    {
      if((x + boxWidth) < totalWidth)
      {
        output.placed.push({x: horiMargin + x + padding, y: vertMargin, w: boxWidth, h: boxHeight});

        x = x + boxWidth;

        if(boxHeight > y)
          y = boxHeight;
      }
      else
      {
        x = 0;

        if((y + boxHeight) > totalHeight)
        {
          let remaining = (y + boxHeight) - totalHeight;

          boxWidth = boxWidth - (boxWidth * (remaining / boxHeight));
          boxHeight = totalHeight - y;

          output.placed.push({x: horiMargin + x, y: vertMargin + y + padding, w: boxWidth, h: boxHeight});

          break;
        }
        else if(boxWidth > totalWidth)
        {
          let remaining = boxWidth - totalWidth;

          boxHeight = boxHeight - (boxHeight * (remaining / boxWidth));
          boxWidth = totalWidth;

          output.placed.push({x: horiMargin + x, y: vertMargin + y + padding, w: boxWidth, h: boxHeight});
        
          x = x + boxWidth;

          y = y + boxHeight + padding;
        }
        else
        {
          output.placed.push({x: horiMargin + x, y: vertMargin + y + padding, w: boxWidth, h: boxHeight});
        
          x = x + boxWidth;

          y = y + boxHeight + padding;
        }
      }
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
      w: 30, h: 10
    },
    {
      w: 120, h: 20
    },
    {
      w: 300, h: 40
    }
  ],
  design: {
    w: 280,
    h: 100,
    margin: {
      h: 30,
      v: 30
    },
  },

  boxPadding: 10
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