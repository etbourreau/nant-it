var framerate = 30
var margin = 15
var time = {}
var needles = []

function setup() {
	frameRate(framerate)
	createCanvas(windowWidth, windowWidth)
	//millis
	needles.push(new Needle(1/2*0.95, 1/50, 200, 1000, {left:true}))
	needles.push(new Needle(1/2*0.95, 1/50, 200, 1000, true))
	//seconds
	needles.push(new Needle(1/2*0.85, 1/40, 150, 60))
	//minutes
	needles.push(new Needle(1/2*0.6, 1/30, 100, 60))
	//hours
	needles.push(new Needle(1/2*0.3, 1/20, 50, 12))
}

function draw() {
	
	checkCanvasSize()	
	
	clear()
	time = this.generateTime()
	timeShow = JSON.parse(JSON.stringify(time))

	timeShow.seconds += timeShow.millis/1000
	timeShow.minutes += map(timeShow.seconds, 0, 60, 0, 1)
	timeShow.hours += map(timeShow.minutes, 0, 60, 0, 1)
	
	needles[0].changeState(time.seconds%2)
	needles[0].drawArc(timeShow.millis)
	needles[1].changeState(time.seconds%2)
	needles[1].drawArc(timeShow.millis)

	needles[2].drawArc(timeShow.seconds)
	needles[2].drawNeedle(timeShow.seconds)

	needles[3].drawArc(timeShow.minutes)
	needles[3].drawNeedle(timeShow.minutes)

	needles[4].drawArc(timeShow.hours)
	needles[4].drawNeedle(timeShow.hours)
	
	strokeWeight(needles[1].w*width)
	stroke(255)
	point(width/2, height/2)
	
	drawNumeric(time)
}

function checkCanvasSize(){
	let min = (windowWidth<windowHeight)?windowWidth:windowHeight
	if(width!=min || height!=min){
		resizeCanvas(min,min)
	}
}

function generateTime(){
	let millis = (new Date()).getTime()+' '
	millis = millis.substr(-4, 3)
	
	let seconds = (new Date()).getSeconds()
	let minutes = (new Date()).getMinutes()
	let hours = (new Date()).getHours()
	return {
		millis: parseInt(millis),
		seconds: seconds,
		minutes: minutes,
		hours: hours
	}
}

function drawNumeric(data){
	strokeWeight(1)
	stroke(255)
	fill(0)
	textSize(height/10)
	textAlign(CENTER)
	data.hours = (data.hours<10)? '0'+data.hours:data.hours
	data.minutes = (data.minutes<10)? '0'+data.minutes:data.minutes
	data.seconds = (data.seconds<10)? '0'+data.seconds:data.seconds
	text(data.hours+' : '+data.minutes+' : '+data.seconds, width/2, height/4*3)
}

class Needle{
	constructor(h, w, color, range, half = false){
		this.w = w
		this.h = h
		this.color = color
		this.range = range
		this.half = half
		if(this.half){
			this.state = 0
		}
	}
	
	drawNeedle(value){
		push()
		translate(width/2, height/2)
		noFill()
		let angle = map(value, 0, this.range, 0, 360)
		angleMode(DEGREES)
		rotate(angle-180)
		strokeWeight(this.w*width)
		stroke(this.color)
		line(0, 0, 0, this.h*width)
		pop()
	}
	
	changeState(state){
		this.state = state
	}
	
	drawArc(value){
		push()
		translate(width/2, height/2)
		noFill()
		angleMode(DEGREES)
		strokeWeight(this.w*width)
		stroke(this.color)
		rotate(-90)
		if(this.half){
			if(this.half.left){
				scale(1, -1)
			}
			if(this.state == 0){
				let angle = map(value, 0, this.range, 0, 180)
				arc(0, 0, this.h*2*width, this.h*2*width, 0, angle)
			}else{
				let angle = map(value, 0, this.range, 180, 0)
				arc(0, 0, this.h*2*width, this.h*2*width, angle, 180)
			}
		}else{
			let angle = map(value, 0, this.range, 0, 360)
			arc(0, 0, this.h*2*width, this.h*2*width, 0, angle)
		}
		pop()
	}
}
