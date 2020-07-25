const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreButton");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
const finalScore = document.getElementById("finalScore");

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();
  // console.log("button is clicked");
  const hScore = {
    score: mostRecentScore,
    username: username.value,
  };
  highScore.push(hScore);
  highScore.sort((a, b) => b.score - a.score);
  highScore.splice(5);
  localStorage.setItem("highScore", JSON.stringify(highScore));
  window.location = "index.html";
};
