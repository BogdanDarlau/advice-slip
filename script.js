const button = document.getElementById("button");
const adviceString = document.getElementById("advice");

function renderAdvice(myAdvice) {
  adviceString.textContent = myAdvice;
}

async function getAdvice() {
  const url = "https://api.adviceslip.com/advice";

  let myAdvice = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.slip.advice) {
      myAdvice = `${data.slip.advice}`;
    } else {
      myAdvice = data.myAdvice;
    }
  } catch (e) {
    console.log(e);
  }

  renderAdvice(myAdvice);

  tellMeAnAdvice(myAdvice);
}

function tellMeAnAdvice(myAdvice) {
  VoiceRSS.speech({
    key: "5ff4b1b6ab8143f488a977bc3a2f2a9c",
    src: myAdvice,
    hl: "en-us",
    v: "John",
    r: -0.5,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

button.addEventListener("click", getAdvice);
