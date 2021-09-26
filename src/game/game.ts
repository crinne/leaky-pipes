import SpriteSheet from "./SpriteSheet";
import { loadImage, loadMap } from "./loaders";
import { scaleCanvas } from "./utils";
import Tiles from "./img/tiles.png";

interface GameLevel {
  code: string;
  degree: number;
  rotate: number;
}

class Game {
  socket: WebSocket;
  gameLevel!: GameLevel[][];
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  sprites!: SpriteSheet;
  canvasWidth!: number;
  canvasHeight!: number;
  gridHeght!: number;
  gridWidth!: number;
  gameStarted: boolean;
  constructor(level: number, canvas: HTMLCanvasElement) {
    this.gameStarted = false;
    this.socket = new WebSocket("wss://hometask.eg1236.com/game-pipes/");
    this.setupSocketListener();
    this.socket.onopen = () => this.socket.send(`new ${level}`);
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
  }

  async setup() {

    // var event = new CustomEvent("cat", {
    //   detail: {
    //     hazcheeseburger: true
    //   }
    // });

    // this.canvas.dispatchEvent(event);
    // // setup verify button
    // const template = document.createElement("template");
    // template.innerHTML = buttonTemplate;
    // const container = document.getElementById("game-controllers")!; //!.appendChild(template.content);
    // container.appendChild(template.content);
    // document.getElementById("lp-verify-btn")!.addEventListener("click", (e) => {
    //   this.socket.send("verify");
    // });
    // setup sprites
    const image = await loadImage(Tiles);
    this.sprites = new SpriteSheet(image, 32, 32);
    this.definePipes();

    await this.waitForSocketConnection();
    // get the map
    this.socket.send("map");
  }

  async setupGame() {
    this.gridHeght = this.gameLevel.length;
    this.gridWidth = this.gameLevel[0].length;

    this.canvasHeight = this.gridHeght * 32;
    this.canvasWidth = this.gridWidth * 32;
    scaleCanvas(this.canvas, this.context, this.canvasWidth, this.canvasHeight);

    // setup event listeners?
    this.setupEventListeners();

    // darw the board
    for (let i = 0; i < this.gridHeght; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        this.sprites.drawTile(this.gameLevel[i][j].code, this.context, j, i);
      }
    }
  }

  setupEventListeners() {

    this.canvas.addEventListener("verify", (e) => {
      this.socket.send("verify");
    });


    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      const x = Math.floor((mousePos.x / this.canvasWidth) * this.gridWidth);
      const y = Math.floor((mousePos.y / this.canvasHeight) * this.gridHeght);

      this.sprites.rotate(this.gameLevel[y][x], this.context, x, y);
      this.socket.send(`rotate ${y} ${x}`);
    });
  }

  definePipes = () => {
    this.sprites.define("╻", 0, 0);
    this.sprites.define("┳", 0, 1);
    this.sprites.define("╺", 0, 2);
    this.sprites.define("╹", 0, 3);
    this.sprites.define("┗", 1, 0);
    this.sprites.define("┃", 1, 1);
    this.sprites.define("┛", 1, 2);
    this.sprites.define("┣", 1, 3);
    this.sprites.define("┏", 2, 0);
    this.sprites.define("┫", 2, 1);
    this.sprites.define("┻", 2, 2);
    this.sprites.define("╋", 2, 3);
    this.sprites.define("━", 3, 0);
    this.sprites.define("┓", 3, 1);
    this.sprites.define("╸", 3, 2);
  };

  waitForSocketConnection(level = 0) {
    return new Promise<void>((resolve, reject) => {
      if (level === 5) {
        console.log("No connection made");
        return reject();
      }
      setTimeout(() => {
        if (this.socket.readyState === 1) {
          console.log("Connection is made");
          return resolve();
        } else {
          console.log("wait for connection...");
          this.waitForSocketConnection(++level);
        }
      }, 200);
    });
  }

  // this.socket.send('verify')
  setupSocketListener() {
    this.socket.onmessage = (event) => {
      const regex = /^[^:]+\s*/;
      const keyword = event.data.match(regex)[0];

      if (keyword === "new") {
        console.log("setup");

        this.setup();
      } else if (keyword === "map") {
        console.log("get the map");

        this.gameLevel = loadMap(event.data);
        this.setupGame();
      } else if (keyword === "rotate") {
        console.log("do rotate stuff");
      } else if (keyword === "verify") {
        const message = event.data.includes('Incorrect') ? 'You lost': 'You Win';

        const verifyeEvent = new CustomEvent("game-result", {
          detail: {
            message: message
        }});

        this.canvas.dispatchEvent(verifyeEvent)
      }
    };
  }
}

export default Game;
