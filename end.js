const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreButton");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const finalScore = document.getElementById("finalScore");

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  console.log("button is clicked");
};
