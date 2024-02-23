//@ts-check
/** @type {HTMLCanvasElement} */
//@ts-ignore canvas is an HTMLCanvasElement
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
//@ts-ignore
const ctx = canvas.getContext("2d");
canvas.width = 2042;
canvas.height = 1532;

let width = 100;
let height = 100;

var shadowFredImg = new Image();
shadowFredImg.src = "./images/shadow-Fred.png";

var extraSpritesImg = new Image();
extraSpritesImg.src = "./images/extra-sprites.png";

var coverImg = new Image();
coverImg.src = "./images/pixel-cover.png";

var fredRoomImg1 = new Image();
fredRoomImg1.src = "./images/fredRoom.png";

var bonnieImg = new Image();
bonnieImg.src = "./images/BonnieSprites.png";

const up = [0, -40, 0, 600];
const down = [0, 40, 0, 0];
const left = [];
const right = [40, 0, 0, 400];

class Room {
    static allRooms = [];
    static currentRoom = null;

    constructor(room, cordinates, moveShadow, obstacles) {
        this.room = room;
        this.cordinates = cordinates;
        this.moveShadow = moveShadow;
        this.obstacles = obstacles;
        this.intervals = [];
    }

    static getCurrentRoom() {
        return this.currentRoom;
    }

    static setCurrentRoom(newRoom) {
        this.currentRoom = newRoom;
    }

    static getAllRooms() {
        return this.allRooms;
    }

    static addRoom(roomToAdd) {
        this.allRooms.push(roomToAdd);
    }
}

Room.addRoom(new Room(1, { x: 65, y: 46 }, null, []));
Room.addRoom(new Room(2, { x: 65, y: 179 }, right, []));
Room.addRoom(new Room(3, { x: 65, y: 312 }, null, []));
Room.addRoom(new Room(4, { x: 65, y: 445 }, null, []));
Room.addRoom(new Room(5, { x: 65, y: 578 }, null, []));
Room.addRoom(new Room(6, { x: 241, y: 46 }, null, []));
Room.addRoom(
    new Room(7, { x: 241, y: 179 }, right, [
        { xFrom: -305, xTo: 80, yFrom: 134, yTo: -391 },
        { xFrom: -305, xTo: 1945, yFrom: -150, yTo: -391 },
        { xFrom: 1545, xTo: 1945, yFrom: 134, yTo: -391 },
    ])
);
Room.addRoom(new Room(8, { x: 241, y: 312 }, right, []));
Room.addRoom(new Room(9, { x: 241, y: 445 }, up, []));
Room.addRoom(new Room(10, { x: 241, y: 578 }, right, []));
Room.addRoom(new Room(11, { x: 417, y: 46 }, null, []));
Room.addRoom(
    new Room(12, { x: 417, y: 179 }, right, [
        { xFrom: -305, xTo: 80, yFrom: 134, yTo: -391 },
        { xFrom: -305, xTo: 1945, yFrom: -150, yTo: -391 },
        { xFrom: 1545, xTo: 1945, yFrom: 134, yTo: -391 },
    ])
);
Room.addRoom(new Room(13, { x: 417, y: 312 }, right, []));
Room.addRoom(new Room(14, { x: 417, y: 445 }, null, []));
Room.addRoom(new Room(15, { x: 417, y: 578 }, right, []));
Room.addRoom(new Room(16, { x: 593, y: 46 }, null, []));
Room.addRoom(
    new Room(17, { x: 593, y: 179 }, right, [
        { xFrom: -305, xTo: 80, yFrom: 134, yTo: -391 },
        { xFrom: -305, xTo: 1945, yFrom: -150, yTo: -391 },
        { xFrom: 1545, xTo: 1945, yFrom: 134, yTo: -391 },
    ])
);
Room.addRoom(new Room(18, { x: 593, y: 312 }, up, []));
Room.addRoom(new Room(19, { x: 593, y: 445 }, up, []));
Room.addRoom(new Room(20, { x: 593, y: 578 }, up, []));
Room.addRoom(new Room(21, { x: 769, y: 46 }, null));
Room.addRoom(new Room(22, { x: 769, y: 179 }, up, []));
Room.addRoom(new Room(23, { x: 769, y: 312 }, up, []));
Room.addRoom(new Room(24, { x: 769, y: 445 }, null, []));
Room.addRoom(new Room(25, { x: 769, y: 578 }, null, []));

Room.setCurrentRoom(Room.getAllRooms()[11]);
let shadowInRoom = false;
let bonnieWalkCycleInterval = null;

class BonnieMove {
    constructor() {
        this.x = 475;
        this.y = 214;
        this.sx = 0;
        this.sy = 0;
        this.sWidth = 194;
        this.sHeight = 198;
        this.width = 400;
        this.height = 400;
        this.moveSpeed = 5;
    }

    move(xMod, yMod, sxMod, syMod) {
        // @ts-ignore
        let xModChange = xMod;
        let yModChange = yMod;
        let allowUp = true;
        let allowDown = true;
        let allowLeft = true;
        let allowRight = true;
        // @ts-ignore
        Room.getCurrentRoom().obstacles.forEach((obstacle, index) => {
            let tContact = this.y >= obstacle.yTo;
            let bContact = this.y <= obstacle.yFrom;
            let lContact = this.x >= obstacle.xFrom;
            let rContact = this.x <= obstacle.xTo;
            let tolerance = 50;

            if (tContact && bContact && lContact && rContact) {
                if (
                    this.y - obstacle.yFrom <= tolerance ||
                    this.y - obstacle.yFrom <= -tolerance
                ) {
                    allowUp = false;
                }

                if (
                    this.y - obstacle.yTo <= tolerance ||
                    this.y - obstacle.yTo <= -tolerance
                ) {
                    allowDown = false;
                }
                if (
                    this.x - obstacle.xTo >= -tolerance ||
                    obstacle.xTo - this.x <= tolerance
                ) {
                    allowLeft = false;
                }
                if (
                    this.x - obstacle.xFrom <= tolerance ||
                    obstacle.xFrom - this.x >= -tolerance
                ) {
                    allowRight = false;
                }
            }
        });
        if (!allowUp) {
            if (yMod < 1) {
                yModChange = 0;
            }
        }
        if (!allowLeft) {
            if (xMod < 1) {
                xModChange = 0;
            }
        }
        if (!allowRight) {
            if (xMod > 1) {
                xModChange = 0;
            }
        }
        this.x = this.x + xModChange;
        this.y = this.y + yModChange;
        this.sy = syMod;
    }

    draw() {
        ctx.drawImage(
            bonnieImg,
            this.sx,
            this.sy,
            this.sWidth,
            this.sHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    getMoveSpeed() {
        return this.moveSpeed;
    }

    setMoveSpeed(newSpeed) {
        this.moveSpeed = newSpeed;
    }
}

class error {
    constructor() {
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
        ctx.drawImage(
            extraSpritesImg,
            this.sx,
            this.sy,
            this.sWidth,
            this.sHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

class followMe {
    constructor() {
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
        ctx.drawImage(
            extraSpritesImg,
            this.sx,
            this.sy,
            this.sWidth,
            this.sHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

class cover {
    constructor() {
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
        ctx.drawImage(
            coverImg,
            this.sx,
            this.sy,
            this.sWidth,
            this.sHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

class Room1 {
    constructor() {
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
        ctx.drawImage(
            fredRoomImg1,
            this.sx,
            this.sy,
            this.sWidth,
            this.sHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

class shadowFreddyMove {
    constructor() {
        this.image = shadowFredImg;
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
    }

    draw() {
        // @ts-ignore
        ctx.drawImage(
            this.image,
            this.sx,
            this.sy,
            this.sWidth,
            this.sHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

let building1 = new Room1();
let shadowFred = new shadowFreddyMove();
let Bonnie = new BonnieMove();
let makeCover = new cover();
let err = new error();
let shadowTalk = new followMe();

const moveShadowFred = (moveParams) => {
    shadowFred.move(moveParams[0], moveParams[1], moveParams[2], moveParams[3]);
};

let collumNum = 3;
let rowNum = 1;
let roomNum = 3;
let shawdowMoving = false;

let FredRoomMove = () => {
    let randNum = Math.random();

    const interval = {};

    Room.getAllRooms().forEach((room) => {
        room.intervals.forEach((interval, index) => {
            // @ts-ignore
            clearInterval(interval.id);
            delete room.intervals[index];
        });
    });

    // @ts-ignore
    Room.setCurrentRoom(
        Room.getAllRooms().find(
            (room) =>
                room.cordinates.x === building1.sx &&
                room.cordinates.y === building1.sy
        )
    );

    // @ts-ignore
    if (randNum > 0.5 || Room.getCurrentRoom().moveShadow === null) {
        shadowFred.x = 999999;
        shadowFred.y = 999999;
        shadowInRoom = false;
    }
    // @ts-ignore
    if (randNum < 0.5 && Room.getCurrentRoom().moveShadow !== null) {
        // shadowFred.draw();
        shadowFred.x = 785;
        shadowFred.y = 500;
        shadowInRoom = true;
    }

    // @ts-ignore
    if (Room.getCurrentRoom().moveShadow !== null && shadowInRoom === true) {
        let intervalId = setInterval(
            moveShadowFred,
            500,
            // @ts-ignore
            Room.getCurrentRoom().moveShadow
        );
        interval.id = intervalId;
        interval.start = Date.now();
        // @ts-ignore
        Room.getCurrentRoom().intervals.push(interval);
        shawdowMoving = true;
    }
    console.log(Room.getCurrentRoom());
};

let update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Bonnie.sx > 200) {
        Bonnie.sx = 0;
    }

    if (shadowFred.sx > 200) {
        shadowFred.sx = 0;
    }

    if (Bonnie.x > 1945) {
        Bonnie.x = -80;
        Bonnie.y = Bonnie.y;
        building1.sx = building1.sx + 176;
        FredRoomMove();
    }
    if (Bonnie.x < -310) {
        Bonnie.x = 1715;
        Bonnie.y = Bonnie.y;
        building1.sx = building1.sx - 176;
        FredRoomMove();
    }
    if (Bonnie.y > 1519) {
        Bonnie.y = 4;
        Bonnie.x = Bonnie.x;
        building1.sy = building1.sy + 133;
        FredRoomMove();
    }
    if (Bonnie.y < -391) {
        Bonnie.y = 1149;
        Bonnie.x = Bonnie.x;
        building1.sy = building1.sy - 133;
        FredRoomMove();
    }

    let erro = false;
    if (roomNum === 0) {
        erro = true;
    } else {
        erro = false;
    }
    building1.draw();
    shadowFred.draw();
    Bonnie.draw();
    if (shadowInRoom === true) {
        shadowTalk.draw();
    }
    if (erro === true) {
        shadowTalk.y = -100;
    } else {
        shadowTalk.y = 0;
    }
    // @ts-ignore
    if (Room.getCurrentRoom().room === 21) {
        err.draw();
    }
    makeCover.draw();

    Room.getAllRooms().forEach((room) => {
        room.intervals.forEach((interval, index) => {
            // @ts-ignore
            if (Date.now() - interval.start > 15000) {
                // @ts-ignore
                clearInterval(interval.id);
                delete room.intervals[index];
            }
        });
    });

    requestAnimationFrame(update);
};

requestAnimationFrame(update);

const spriteChangerBonnie = () => {
    Bonnie.sx = Bonnie.sx + 200;
};

// @ts-ignore
bonnieWalkCycleInterval = setInterval(
    spriteChangerBonnie,
    2500 / Bonnie.getMoveSpeed()
);

const spriteChangerShadowFred = () => {
    shadowFred.sx = shadowFred.sx + 200;
};
const coverMove = () => {
    makeCover.sx = makeCover.sx + 200;
};

setInterval(spriteChangerShadowFred, 500);

window.addEventListener("keypress", (event) => {
    let pressedKey = event.key.toUpperCase();
    if (pressedKey === "D") {
        Bonnie.move(Bonnie.getMoveSpeed(), 0, 0, 400);
    }
    if (pressedKey === "A") {
        Bonnie.move(-Bonnie.getMoveSpeed(), 0, 0, 200);
    }

    if (pressedKey === "W") {
        Bonnie.move(0, -Bonnie.getMoveSpeed(), 0, 600);
    }
    if (pressedKey === "S") {
        Bonnie.move(0, Bonnie.getMoveSpeed(), 0, 0);
    }
    if (pressedKey === "+") {
        if (Bonnie.getMoveSpeed() < 35) {
            Bonnie.setMoveSpeed(Bonnie.getMoveSpeed() + 5);
            clearInterval(bonnieWalkCycleInterval);
            bonnieWalkCycleInterval = setInterval(
                spriteChangerBonnie,
                2500 / Bonnie.getMoveSpeed()
            );
        }
    }
    if (pressedKey === "-") {
        if (Bonnie.getMoveSpeed() > 5) {
            Bonnie.setMoveSpeed(Bonnie.getMoveSpeed() - 5);
            clearInterval(bonnieWalkCycleInterval);
            bonnieWalkCycleInterval = setInterval(
                spriteChangerBonnie,
                2500 / Bonnie.getMoveSpeed()
            );
        }
    }
});
