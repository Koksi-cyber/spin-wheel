const timer = document.querySelector('#timer');
const totalBet = document.querySelector('.total-bet-container');
const text = document.querySelector('.text');
const allBettersPrice = document.querySelectorAll('.price');
const betBtn = document.querySelector('#place-bet');
const wheel = document.querySelector('.top-circle');
const ccircle = document.querySelector('.content-circle');
const randWinner = Math.floor(Math.random() * allBettersPrice.length);
const chart = document.querySelector("#myChart");

arraysOfPrice = [];
let time = 10;
let currentTime = time;
let ranDeg = 10000;
let numOfSpin = 0;

// console.log(allBettersPrice[0].innerHTML);

function placeBet(){
  let bet = prompt("Enter bet amount");
  
  const dEle = document.createElement("div");
  dEle.innerHTML = bet;
  dEle.className = 'price';
  document.querySelector(".betters").appendChild(dEle);
  document.querySelector(".betters").style.display = "block";
}
0
//array of all betters price
allBettersPrice.forEach(element => {
  arraysOfPrice.push(Number(element.innerText));
});

let sum = arraysOfPrice.reduce((a,b)=>{
  return a+b;
});

// changing of total price
totalBet.innerHTML = sum;

// code section for the spining wheel
let countDownTimer = setInterval(()=>{

  currentTime--;
  if(currentTime >= 0){
    console.log(currentTime);
    timer.innerHTML = currentTime;
  }
  if(currentTime == 0)
  {
   
    // disable place bet button
    setInterval(()=>{
      // this method is to make the function make the chart rotate for 5s
      ++numOfSpin;
      chart.style.transition = "all 15s ease-out";
      betBtn.disabled = true;
      // spin wheel
      chart.style.transform = `rotate(${ranDeg}deg)`;

    }, 1000)

    setTimeout(()=>{
      handleWin();
    })

    setTimeout(()=>{
      reset();
    }, 20000)
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
    // options: {
    //     scales: {
    //         y: {
    //             beginAtZero: true
    //         }
    //     }
    // }
});


function reset(){
  currentTime = time;
  text.innerHTML = "Reset";
  timer.innerHTML = currentTime;
  chart.style.transform = `rotate(${0}deg)`;
  chart.style.transition = "None";
  betBtn.disabled = false;
} 

function handleWin(){
  //
  console.log("The winner is " + randWinner)
}