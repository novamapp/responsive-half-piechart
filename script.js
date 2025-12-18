total = 5_000
totalFormatted = new Intl.NumberFormat().format(total)

const canvas = document.querySelector('#halfPieChart')
const updateBtn = document.querySelector('#updateBtn')

input = [
    {
        "rgba": toRGBAString([38,35,34,0.6]),
        "percentage": 0.05
    },
    {
        "rgba": toRGBAString([99,55,44,0.5]),
        "percentage": 0.25
    },
    {
        "rgba": toRGBAString([201,125,96,0.7]),
        "percentage": 0.3
    },
    {
        "rgba": toRGBAString([255,188,181,0.4]),
        "percentage": 0.35
    },
    {
        "rgba": toRGBAString([242,229,215,0.4]),
        "percentage": 0.05
    }
]

function draw() {
    const totalAmountElement = document.querySelector('#totalAmount')
    totalAmountElement.textContent = totalFormatted
    const canvasCSS = getComputedStyle(canvas)

    const CANVAS_WIDTH = parseInt(canvasCSS.width.replace(/\D/g,''))
    const CANVAS_HEIGHT = parseInt(canvasCSS.height.replace(/\D/g,''))
    const INNER_CIRCLE_RADIUS = CANVAS_HEIGHT * 15 / 20
    const OUTER_CIRCLE_RADIUS = INNER_CIRCLE_RADIUS * 1.11
    const ARC_STROKE_WIDTH = INNER_CIRCLE_RADIUS * 0.2

    const ctx = canvas.getContext('2d')
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    
    drawNextArc(0, Math.PI, ctx, CANVAS_WIDTH, CANVAS_HEIGHT, OUTER_CIRCLE_RADIUS, ARC_STROKE_WIDTH)

    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)'
    ctx.beginPath()
    ctx.arc(
        CANVAS_WIDTH / 2, CANVAS_HEIGHT, // center
        INNER_CIRCLE_RADIUS,
        Math.PI, Math.PI * 2, // (start angle, end angle),
        false
    )
    ctx.fill()
}

function drawNextArc(
    counter, startAngle, ctx, 
    CANVAS_WIDTH, CANVAS_HEIGHT, OUTER_CIRCLE_RADIUS, ARC_STROKE_WIDTH
) {
    if (counter >= input.length) {
        return
    }
    currentInput = input[counter]
    endAngle = startAngle + (currentInput['percentage'] * Math.PI)
    drawCurrentArc(
        currentInput['rgba'],
        startAngle,
        endAngle,
        ctx, CANVAS_WIDTH, CANVAS_HEIGHT, OUTER_CIRCLE_RADIUS, ARC_STROKE_WIDTH
    )
    drawNextArc(counter + 1, endAngle,ctx, 
        CANVAS_WIDTH, CANVAS_HEIGHT, OUTER_CIRCLE_RADIUS, ARC_STROKE_WIDTH)
}

function drawCurrentArc(
    rgbaValue, startAngle, endAngle, ctx, 
    CANVAS_WIDTH, CANVAS_HEIGHT, OUTER_CIRCLE_RADIUS, ARC_STROKE_WIDTH
) {
    ctx.lineWidth = ARC_STROKE_WIDTH
    ctx.strokeStyle = rgbaValue
    ctx.beginPath()
    ctx.arc(
        CANVAS_WIDTH / 2, CANVAS_HEIGHT, // center(x, y)
        OUTER_CIRCLE_RADIUS,
        startAngle,
        endAngle,
        false
    )
    ctx.stroke()
}

function toRGBAString(arr) {
    str = 'rgba('
    
    for(let i=0; i<arr.length; i++) {
        if (i == arr.length - 1) {
            str += `${arr[i]})`
        } else {
            str += `${arr[i]}, `
        }
    }
    return str
}

draw()