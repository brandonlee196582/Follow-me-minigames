//@ts-check
/** @type {HTMLCanvasElement} */
//@ts-ignore canvas is an HTMLCanvasElement
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
//@ts-ignore
const ctx = canvas.getContext("2d");
 canvas.width = 2042;
 canvas.height = 1532;
//  canvas.width = 3000;
//  canvas.height = 3000;

let width = 100;
let height = 100;

var shadowFredImg = document.getElementById("fredSprites");

var extraSpritesImg = document.getElementById("extraSprites");

var coverImg = document.getElementById("cover");

var fredRoomImg1 = document.getElementById("fredRoom");

var bonnieImg = document.getElementById("BonnieSprites");



class BonnieMove {
	constructor() {

		
		this.image = bonnieImg
		this.x = 475;

		this.y = 214;

		this.sx = 0;

		this.sy = 0;

		this.sWidth = 194;

		this.sHeight = 198;

		this.width = 400;

		this.height = 400;
		
	}
	

	move(xMod, yMod, sxMod, syMod) {
		this.x = this.x + xMod;
		this.y = this.y + yMod;

		
		this.sy = syMod;
		
	  

		


		
		
// console.log(this.x, this.y)
	};

	draw(){ if (bonnieImg !== null) {
			// @ts-ignore
			ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height)
		}}
	}

	class error {
		constructor() {
			this.image = extraSpritesImg;
			this.x = 0;
			this.y = 0;
			this.sx = 801;
			this.sy = 5560;
			
			this.width = 400;
			this.height = 200;
			this.sWidth = 199;
			this.sHeight = 96;
		}
		 moveFrame(xMod, yMod, sxMod, syMod) {
			this.x = this.x + xMod;
			this.y = this.y + yMod;
			this.sx = this.sx + sxMod;
			this.sy = this.sy + syMod;
			
			
			
	
		}
		draw() {
			if (coverImg !== null)
			// @ts-ignore
			{ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height)}
		}
	}

	class followMe {
		constructor() {
			this.image = extraSpritesImg;
			this.x = 0;
			this.y = 0;
			this.sx = 801;
			this.sy = 5323;
			
			this.width = 600;
			this.height = 100;
			this.sWidth = 574;
			this.sHeight = 73;
		}
		 moveFrame(xMod, yMod, sxMod, syMod) {
			this.x = this.x + xMod;
			this.y = this.y + yMod;
			this.sx = this.sx + sxMod;
			this.sy = this.sy + syMod;
			
			
			
	
		}
		draw() {
			if (coverImg !== null)
			// @ts-ignore
			{ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height)}
		}
	}
	
class cover {
	constructor() {
		this.image = coverImg;
		this.x = 0;
		this.y = 0;
		this.sx = 2045;
		this.sy = 0;
		
		this.width = canvas.width;
		this.height = canvas.height;
		this.sWidth = 889;
		this.sHeight = 586;
	}
	 moveFrame(xMod, yMod, sxMod, syMod) {
		this.x = this.x + xMod;
		this.y = this.y + yMod;
		this.sx = this.sx + sxMod;
		this.sy = this.sy + syMod;
		
		
		

	}
	draw() {
		if (coverImg !== null)
		// @ts-ignore
		{ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height)}
	}
}


class Room1 {
	constructor() {
		this.image = fredRoomImg1;
		this.x = 0;
		this.y = 0;
		
		this.sx = 417;
		this.sy = 179;
		this.sWidth = 176;
		this.sHeight = 130;
		this.width = canvas.width;
		this.height = canvas.height;
	}
	moveRoom(xMod, yMod, sxMod, syMod) {
		this.x = this.x + xMod;
		this.y = this.y + yMod;
		this.sx = this.sx + sxMod;
		this.sy = this.sy + syMod;
	}
	draw() {
		if (fredRoomImg1 !== null) {
			// @ts-ignore
			ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height)}
	}
}


class shadowFreddyMove {
	constructor() {

		this.image = shadowFredImg
		this.x = 999000;

		this.y = 999000;

		this.sx = 0;

		this.sy = 0;

		this.sWidth = 194;

		this.sHeight = 198;

		this.width = 400;

		this.height = 400;
		
	}
	

	move(xMod, yMod, sxMod, syMod) {
		this.x = this.x + xMod;
		this.y = this.y + yMod;
		
		
		this.sy = syMod;

	};

	draw() {
			// @ts-ignore
			ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height)
		}
	}

	let building1 = new Room1 ();
	building1.draw();
	
	let shadowFred = new shadowFreddyMove ();
	shadowFred.draw();
	
	let Bonnie = new BonnieMove ();
	Bonnie.draw();

	let makeCover = new cover ();
	makeCover.draw();

	let err = new error ();
	err.draw();
	let shadowTalk = new followMe ();
	shadowTalk.draw();
	
	const BonnieMoveRight = () => {
		Bonnie.move(5, 0, 0, 400)
	}
	const BonnieMoveLeft = () => {
		Bonnie.move(-5, 0, 0, 200)
	}
	const BonnieMoveUp = () => {
		Bonnie.move(0, -5, 0, 600)
	}
	const BonnieMoveDown = () => {
		Bonnie.move(0, 5, 0, 0)
	}
	

const ShadowFredMoveRight = () => {
	shadowFred.move(40, 0, 0, 400)
}
const ShadowFredMoveLeft = () => {
	shadowFred.move(40, 0, 0, 200)
}
const ShadowFredMoveUp = () => {
	shadowFred.move(0, -40, 0, 600)
}
const ShadowFredMoveDown = () => {
	shadowFred.move(0, 40, 0, 0)
}


let collumNum = 3;
let rowNum = 1;
let roomNum = 3;
let shawdowMoving = false;
	let FredRoomMove = function() {
		clearInterval(3)
		clearInterval(4)
		clearInterval(5)
		clearInterval(6)
		clearInterval(7)
		clearInterval(8)
		clearInterval(9)
		clearInterval(10)
		clearInterval(11)
		clearInterval(12)
		clearInterval(13)
		clearInterval(14)
		clearInterval(15)
		clearInterval(16)
		clearInterval(17)
	
		
		shadowFred = new shadowFreddyMove();
		let randNum = Math.random();
		shadowFred
		randNum

		if(randNum > 0.5){shadowFred.x = 999999; shadowFred.y = 999999; inRoom = false};
		if(randNum < 0.5){shadowFred.draw(); shadowFred.x = 785; shadowFred.y = 500; inRoom = true};
		if(building1.sy === 46){rowNum = 0}
		if(building1.sy === 179){rowNum = 1}
		if(building1.sy === 312){rowNum = 2} 
		if(building1.sy === 445){rowNum = 3} 
		if(building1.sy === 578){rowNum = 4}
	
		if(building1.sy === 65){collumNum = 1}
		if(building1.sx === 241){collumNum = 2}
		if(building1.sx === 417){collumNum = 3}
		if(building1.sx === 593){collumNum = 4}
		if(building1.sx === 769){collumNum = 5}
		
	if(collumNum === 5 && rowNum === 0){
	roomNum = 0};
	
	if(collumNum === 1 && rowNum === 1){
	roomNum = 1};
	
	if(collumNum === 2 && rowNum === 1){
	roomNum = 2};
	
	if(collumNum === 3 && rowNum === 1){
	roomNum = 3};
	
	if(collumNum === 4 && rowNum === 1){
	roomNum = 4};
	
	if(collumNum === 5 && rowNum === 1){
	roomNum = 5};
	
	if(collumNum === 2 && rowNum === 2){
	roomNum = 6};
	
	if(collumNum === 3 && rowNum === 2){
	roomNum = 7};
	
	if(collumNum === 4 && rowNum === 2){
	roomNum = 8};
	
	if(collumNum === 5 && rowNum === 2){
	roomNum = 8.5};
	
	if(collumNum === 2 && rowNum === 3){
	roomNum = 9};
	
	if(collumNum === 4 && rowNum === 3){
	roomNum = 10};
	
	if(collumNum === 2 && rowNum === 4){
	roomNum = 11};
	
	if(collumNum === 3 && rowNum === 4){
	roomNum = 12};
	
	if(collumNum === 4 && rowNum === 4){
	roomNum = 13};

if(roomNum === 0 ){};
if(roomNum === 1 ){setInterval(ShadowFredMoveRight, 500); console.log("moving right"); shawdowMoving = true};

if(roomNum === 2 ){setInterval(ShadowFredMoveRight, 500); console.log("moving right"); shawdowMoving = true};

if(roomNum === 3 ){setInterval(ShadowFredMoveRight, 500); console.log("moving right"); shawdowMoving = true};

if(roomNum === 4 ){setInterval(ShadowFredMoveRight, 500); console.log("moving right"); shawdowMoving = true};

if(roomNum === 5){setInterval(ShadowFredMoveUp, 500); console.log("moving up"); shawdowMoving = true};

if(roomNum === 6 ){setInterval(ShadowFredMoveRight, 500); console.log("moving right"); shawdowMoving = true};

if(roomNum === 7 ){setInterval(ShadowFredMoveRight, 500); console.log("moving right"); shawdowMoving = true};

if(roomNum === 8 ){setInterval(ShadowFredMoveUp, 500); console.log("moving up"); shawdowMoving = true};

if(roomNum === 8.5 ){setInterval(ShadowFredMoveUp, 500); console.log("moving up"); shawdowMoving = true};

if(roomNum === 9 ){setInterval(ShadowFredMoveDown, 500); console.log("moving down"); shawdowMoving = true};

if(roomNum === 10 ){setInterval(ShadowFredMoveUp, 500); console.log("moving up"); shawdowMoving = true};

if(roomNum === 11 ){setInterval(ShadowFredMoveRight, 500); console.log("moving right"); shawdowMoving = true};

if(roomNum === 12 ){setInterval(ShadowFredMoveRight, 500); console.log("moving right"); shawdowMoving = true};

if(roomNum === 13 ){setInterval(ShadowFredMoveUp, 500); console.log("moving up"); shawdowMoving = true};

	}
	
	
	let inRoom = false;
		





			let update = (timestamp) => {				
				ctx.clearRect(0, 0, canvas.width, canvas.height)



	const eventRoomChange = new Event("roomChange", {}); 

				if(Bonnie.sx > 200)
				{Bonnie.sx = 0};

				if(shadowFred.sx > 200)
				{shadowFred.sx = 0};

	
				if (Bonnie.x > 1945)
				{Bonnie.x = -80; Bonnie.y = Bonnie.y; building1.sx = building1.sx + 176; FredRoomMove()}
				if (Bonnie.x < -310)
				{Bonnie.x = 1715; Bonnie.y = Bonnie.y; building1.sx = building1.sx - 176; FredRoomMove()}
				if (Bonnie.y > 1519)
				{Bonnie.y = 4; Bonnie.x = Bonnie.x; building1.sy = building1.sy + 133; FredRoomMove()}
				if (Bonnie.y < -391)
				{Bonnie.y = 1149; Bonnie.x = Bonnie.x; building1.sy = building1.sy - 133; FredRoomMove()} 
		

				
				if (shadowFred.x > 2042){inRoom = false}
				if (shadowFred.x < -100){inRoom = false}
				if (shadowFred.y > 1532){inRoom = false}
				if (shadowFred.y < 0){inRoom = false}
				console.log(building1.sx, building1.sy, "Building room cord", roomNum, inRoom, rowNum, collumNum)
		let erro = false;
		if(roomNum === 0 ){erro = true}	else {erro = false}

		if(roomNum === 0){inRoom = false}
	   building1.draw();
	   if(roomNum === 0){shadowFred.x = 999999; shadowFred.y = 999999} else{shadowFred.draw();}
		Bonnie.draw();
		if(inRoom === true){shadowTalk.draw()};
		if(erro === true){shadowTalk.y = -100} else {shadowTalk.y = 0};
		if(roomNum === 0){	err.draw();};
		makeCover.draw();
		
		
		requestAnimationFrame(update)
	
			}
			requestAnimationFrame(update) 
const spriteChangerBonnie = () => {
	Bonnie.sx = Bonnie.sx +200
}

setInterval(spriteChangerBonnie, 500)

const spriteChangerShadowFred = () => {
	shadowFred.sx = shadowFred.sx +200
	
}
const coverMove = () => {
	makeCover.sx = makeCover.sx +200
	
}



setInterval(spriteChangerShadowFred, 500)

	

window.addEventListener("keypress", (event) => {
	let pressedKey = event.key.toUpperCase();
		if (pressedKey === "D") {
		
	Bonnie.move(5, 0, 0, 400);
	}
	if (pressedKey === "A") {
	

		Bonnie.move(-5, 0, 0, 200);
		}
	
	if (pressedKey === "W") { 
	
		
		Bonnie.move(0, -5, 0, 600);	
	}
	if (pressedKey === "S") {
		
		Bonnie.move(0, 5, 0, 0);
		
	
}});