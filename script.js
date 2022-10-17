const timer = document.querySelector('#timer');
const totalBet = document.querySelector('.total-bet-container');
const text = document.querySelector('#text');
const allBettersPrice = document.querySelectorAll('.price');
const betBtn = document.querySelector('#place-bet');
const randWinner = Math.floor(Math.random() * allBettersPrice.length);
const chart = document.querySelector("#myChart");

arraysOfPrice = [120, 200, 400];
const time = 10;
let currentTime = time;
let ranDeg = 0;


function handleWin(actualDeg) {
  let zeroAve = Math.ceil(360 / arraysOfPrice.length);
  const winningSymbolNr = Math.ceil(actualDeg / zeroAve);
  console.log("The winner is " + winningSymbolNr)
}

//array of all betters price
allBettersPrice.forEach(element => {
  arraysOfPrice.push(Number(element.innerText));
});

let sum = arraysOfPrice.reduce((a, b) => {
  return a + b;
});

// changing of total price
totalBet.innerHTML = sum;

// code section for the spining wheel
let countDownTimer = setInterval(() => {
  currentTime--;
  if (currentTime > 0) {
    timer.innerHTML = currentTime;
  }
  if (currentTime == 0) {
    text.style.display="none";
    deg = Math.floor(5000 + Math.random() * 5000);
    chart.style.transition = "all 10s ease-out";
    chart.style.transform = `rotate(${deg}deg)`;
    betBtn.disabled = true;
    document.querySelector(".text").innerHTML = "Wait for next round" ;
    document.querySelector(".spinning-text").style.display = "block";

    chart.addEventListener("transitionend", () => {
      chart.style.transition = 'none';
      const actualDeg = deg % 360;
      // console.log(actualDeg);
      chart.style.transform = `rotate(${actualDeg}deg)`;
      handleWin(actualDeg);
      betBtn.disabled = false;
      currentTime = time;
      text.style.display = "block";
      document.querySelector(".spinning-text").style.display = "none";
      document.querySelector(".text").innerHTML = "Start" ;
      document.querySelector("#timer").innerHTML = currentTime;
    })
  }
}, 1000);

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: arraysOfPrice,
      backgroundColor: [
        'red',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 0
    }]
  },
});

function bet() {
  // this function allows users to place bet

  // click of the place bet button and enter an amount
  // create a div with .better class and a child element of .i-bet with inner span class

  /*
   using a temporary prompt box to get input
   CHANGE LATER 
  */

  let userInput = prompt("Enter bet amount: ");
  let ibetDiv = document.createElement("div");
  let priceContainer = document.createElement("span");
  ibetDiv.classList.add("i-bet");
  priceContainer.classList.add("price");
  priceContainer.innerHTML = userInput;
  ibetDiv.append(priceContainer);
  document.querySelector(".betters").append(ibetDiv);

  allBettersPrice.push(userInput);
}
