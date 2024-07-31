const typingTest = document.querySelector(".typing-test p");
const inpField = document.querySelector(".wrapper .input-field");
const timeTag = document.querySelector(".result-details li:nth-child(1) span b");
const mistakeTag = document.querySelector(".result-details li:nth-child(2) span");
const wpmTag = document.querySelector(".result-details li:nth-child(3) span");
const cpmTag = document.querySelector(".result-details li:nth-child(4) span");
const tryAgainBtn = document.querySelector("button");

let timer,
    maxTime = 60, 
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

const paragraphs = [
   
];

function randomParagraph() {
    // Getting random number and it will always be less than the paragraphs length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingTest.innerHTML = "";

    // Splitting paragraph into individual characters and wrapping each one of them into a span and then adding this span inside p tag
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingTest.innerHTML += spanTag;
    });

    typingTest.querySelectorAll("span")[0].classList.add("active");

    // Focusing input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus());
    typingTest.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingTest.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        // Check if typed character matches the corresponding character in the paragraph
        if (typedChar == null) {
            charIndex--; // Decrement charIndex
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--; // Decrement mistakes
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                characters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes; // CPM counts correct characters only
    } else {
        clearInterval(timer);
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
