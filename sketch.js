let port;
let writer, reader;
let slider;


function setup() {
  createCanvas(400, 400);

  if ("serial" in navigator){
    let button = createButton("connect");
    button.position(0, 0);
    button.mousePressed(connect);

    slider = createSlider(0, 255, 127);
    slider.position(10, 50);
    slider.style('width', '100px');
  }
}

function draw() {
  background(220);

  if (reader){
    serialRead(background(150, 600, 100));
  }

  if (writer){
    writer.write(new Uint8Array([  slider.value()  ]));
  }
}

async function serialRead(){
  while (true){
    const { value, done } = await reader.read();
    if (done){
      reader.releaseLock();
      break;
    }
    console.log(value);
  }
}

async function connect(){
  port = await navigator.serial.requestPort();

  await port.open({ baudRate: 9600 });

  writer = port.writable.getWriter();
  reader = port.readable.getReader();
}

