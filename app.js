let canvas, canvasContext
let ballX = 75
let ballY = 75
let ballSpeedX = 5
let ballSpeedY = 7
const PADDLE_WIDTH = 100
const PADDLE_THICKNESS = 10
const PADDLE_DIST_FROM_EDGE = 25
let paddleX = 400

window.onload = function() {
    canvas = document.getElementById('gameCanvas')
    canvasContext = canvas.getContext('2d')

    let framesPerSecond = 30
    this.setInterval(updateAll, 1000/framesPerSecond)
    canvas.addEventListener('mousemove', updateMousePos)
}

function updateMousePos(e) {
    let rect = canvas.getBoundingClientRect()
    let root = document.documentElement
    let mouseX = e.clientX - rect.left - root.scrollLeft
    // paddleX = mouseX - rect.top - root.scrollTop
    paddleX = mouseX - PADDLE_WIDTH/2
}
function updateAll() {
    moveAll()
    drawAll() 
}

function ballReset() {
    ballX = canvas.width/2
    ballY = canvas.height/2
}

function moveAll() {
    ballX += ballSpeedX
    ballY += ballSpeedY

    if(ballX < 0) {
        ballSpeedX *= -1
    }
    if(ballX > canvas.width) {
        ballSpeedX *= -1
    }
    if(ballY < 0) {
        ballSpeedY *= -1
    }
    if(ballY > canvas.height) {
        ballReset()
    }
    let paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE
    let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS
    let paddleLeftEdgeX = paddleX
    let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH

    if(ballY > paddleTopEdgeY &&
        ballY < paddleBottomEdgeY &&
        ballX > paddleLeftEdgeX &&
        ballX < paddleRightEdgeX) {
            ballSpeedY *= -1
            let centerOfPaddleX = paddleX + PADDLE_WIDTH/2
            let ballDistFromPaddleCenterX = ballX - centerOfPaddleX
            ballSpeedX = ballDistFromPaddleCenterX * 0.35
        }
}
function drawAll() {
    colorRect(0,0, canvas.width, canvas.height, 'black')
    colorCircle(ballX, ballY, 10, 'white')
    colorRect(paddleX, canvas.height-PADDLE_THICKNESS,
                PADDLE_WIDTH, PADDLE_THICKNESS, 'white')
}
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)
    
}
function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle= fillColor
    canvasContext.beginPath()
    canvasContext.arc(centerX,centerY, radius, 0, Math.PI*2, true)
    canvasContext.fill()
}