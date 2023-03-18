import "./styles.css";
import { SVG } from "@svgdotjs/svg.js";

let degree = 0
let boxWidth = 0
let boxHeight = 0
let remainingWidth = 0
let remainingHeight = 0
function packedBoxes(input) {
  const output = {
    design: {
      width: input.design.w,
      height: input.design.h,
    },
    placed: [
    ]
  }

  let horiMargin = input.design.margin.h
  let vertMargin = input.design.margin.v
  let padding = input.boxPadding
  
  let totalWidth = input.design.w - (horiMargin * 2)
  let totalHeight = input.design.h - (vertMargin * 2)

  let x = horiMargin, y = vertMargin;

  remainingWidth = totalWidth
  remainingHeight = totalHeight

  let filledHeight = 0;

  for(let i = 0; i < input.boxes.length; i++)
  {
    boxWidth = input.boxes[i].w;
    boxHeight = input.boxes[i].h;

    if(degree == 0)
      checkWidthHeight(boxWidth, boxHeight, remainingWidth, remainingHeight);

    if(remainingWidth < totalWidth)
      x = horiMargin + totalWidth - remainingWidth;
    else
      x = horiMargin;
    
    if(remainingHeight < totalHeight)
      y = vertMargin + totalHeight - remainingHeight;
    else
      y = vertMargin
    
    if(boxWidth > 0 && boxHeight > 0)
      output.placed.push({x: x, y: y, w: boxWidth, h: boxHeight, degree: degree, color: input.boxes[i].color});
    
    remainingWidth = remainingWidth - boxWidth - padding;
    
    if(filledHeight < boxHeight)
      filledHeight = boxHeight;
    
    let rotatedWidth = 0
    if(((i + 1) < input.boxes.length) && (input.boxes[i + 1].w > remainingWidth))
    {
      rotatedWidth = input.boxes[i + 1].h

      if(rotatedWidth < remainingWidth)
      {
        degree = 90
      }
      else
      {
        degree = 0

        remainingWidth = totalWidth;
        remainingHeight = remainingHeight - filledHeight - padding;
        filledHeight = 0;

        if(remainingHeight < 0)
          remainingHeight = 0

        if(remainingWidth < 0)
          remainingWidth = 0
      }
    }
  }

  // Answer of this program. will be sent as a JSON. 
  return output
}

//Function to check whether the width/height is less than available width/height
function checkWidthHeight(bW, bH, remainingWidth, remainingHeight) {
  if((bW > remainingWidth) && (boxHeight > remainingHeight))
  {
    if((bW - remainingWidth) > (boxHeight - remainingHeight))
    {
      let remaining = bW - remainingWidth;

      boxHeight = getRemaining(bH, bW, remaining);
      boxWidth = remainingWidth;
    }
    else
    {
      let remaining = boxHeight - remainingHeight;

      boxWidth = getRemaining(bW, bH, remaining)
      boxHeight = remainingHeight;
    }
  }
  else if(bW > remainingWidth)
  {
    let remaining = bW - remainingWidth;

    boxHeight = getRemaining(bH, bW, remaining)
    boxWidth = remainingWidth;
  }
  else if(boxHeight > remainingHeight)
  {
    let remaining = boxHeight - remainingHeight;

    boxWidth = getRemaining(bW, bH, remaining)
    boxHeight = remainingHeight;
  }
}

//Function to get Remaining Width/Height
function getRemaining(attr1, attr2, remaining) {
  return (attr1 - (attr1 * (remaining / attr2)));
}

function drawBoxes(output) {
  const width = output.design.width
  const height = output.design.height
  
  const canvas = SVG()
    .addTo('#boxes')
    .size(width, height)
    //.attr("style", "border: 2px solid white")
    .viewbox(0, 0, width, height)
    .attr("preserveAspectRatio", "xMinYMin meet")
  
  // Create window
  const window = canvas.rect(width, height)
    .fill("yellow")
    .stroke("#E4FBFF")

  //TODO::  loop through all the output and draw here // placed all will be draw
  output.placed.forEach(element => {

    const x = element.x
    const y = element.y
    const width = element.w
    const height = element.h
    const degree = element.degree
    const color = element.color

    let attr = ""
    if(degree > 0)
    {
      let rotatedWidth = height
      let rotatedHeight = width
      let ratio = remainingHeight / rotatedHeight
      attr = "scale(" + ratio + ") rotate(" + degree + "," + (x + (width/2)) + "," +  (y + (height/2)) + ") translate(" + (rotatedHeight - x + (input.design.margin.h * ratio) - (input.boxPadding * (1 / ratio))) + " " + -(((rotatedWidth + input.design.margin.v) * (1 / ratio)) + input.boxPadding) + ")"
    }
    
    // Create boxes
    const boxes = canvas.rect(width, height)
    .x(x)
    .y(y)
    .fill(color)
    .attr("transform", attr)
  });
}


const input = {
  boxes: [
    {
      w: 20, h: 10, color: "red"
    },
    {
      w: 120, h: 20, color: "blue"
    },
    {
      w: 300, h: 70, color: "green"
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