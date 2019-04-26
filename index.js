let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  theme: "hg-theme-default hg-theme-ios",
  layout: {
    default: [
      "q w e r t y u i o p {bksp}",
      "{alt} a s d f g h j k l \u00f1",
      "{shift} z x c v b n m , .",
      "{space} {downkeyboard}"
    ],
    shift: [
      "Q W E R T Y U I O P {bksp}",
      "{alt} A S D F G H J K L \u00f1",
      "{shiftactivated} Z X C V B N M , .",
      "{space} {downkeyboard}"
    ],
    alt: [
      "1 2 3 4 5 6 7 8 9 0 {bksp}",
      `{default} @ # $ & * ( ) ' "`,
      "{shift} % - + = / ; : ! ?",
      "{space} {downkeyboard}"
    ]
  },
  display: {
    "{alt}": ".?123",
    "{shift}": "\u21e7",
    "{shiftactivated}": "\u21e9",
    "{bksp}": "\u21e6",
    "{altright}": ".?123",
    "{downkeyboard}": "\u23e8",
    "{space}": " space ",
    "{default}": "ABC"
  }
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", event => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function sendMsg(msg){
    console.log("send message: " + msg);
    var dataxml = $.xmlrpc.document('SetMsgToPanels', [msg]);
    var dataxmlstr = new XMLSerializer().serializeToString(dataxml);
    $.ajax({
        url: "http://" + window.location.hostname + ":8001",
        type: "POST",
        crossDomain: true,
        data: dataxmlstr
    });
}

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);

  if(button == "{downkeyboard}"){
      sendMsg(document.querySelector(".input").value);
  }

  if (button.includes("{") && button.includes("}")) {
    handleLayoutChange(button);
  }
}

function handleLayoutChange(button) {
  let currentLayout = keyboard.options.layoutName;
  let layoutName;

  switch (button) {
    case "{shift}":
    case "{shiftactivated}":
    case "{default}":
      layoutName = currentLayout === "default" ? "shift" : "default";
      break;

    case "{alt}":
    case "{altright}":
      layoutName = currentLayout === "alt" ? "default" : "alt";
      break;
    default:
      break;
  }

  if (layoutName) {
    keyboard.setOptions({
      layoutName: layoutName
    });
  }
}
