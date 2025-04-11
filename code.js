let score= JSON.parse(localStorage.getItem('score')) || {  // LOCAL STORAGE GET ITEM HERE
  Wins: 0,
  Losses: 0,
  Ties: 0
  };

  updateScoreElement();
  /*
  if (!score){
      score = {
          Wins: 0,
          Losses: 0,
          Ties: 0
      };
  }
  */

  let isAutoPlaying=false;
  let intervalId;

  function autoPlay(){
    if(!isAutoPlaying){
      intervalId = setInterval(function(){
        const playerMove = pickComputerMove();
        play(playerMove);
      }, 1000)
      isAutoPlaying = true;
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }

  function play(playerSelection){
      const computerSelection = pickComputerMove();
      let result='';
      let playerStatus='';
      let computerStatus='';
      if(playerSelection==='shears'){
          if(computerSelection=='quartz'){
              result='YOU LOSE!';
          }
          else if(computerSelection=='parchment'){
              result='YOU WIN!';
          }
          else{
              result='it is a TIE.';
          }
      }
      else if(playerSelection==='parchment'){
          if(computerSelection=='quartz'){
              result='YOU WIN!';
          }
          else if(computerSelection=='parchment'){
              result='it is a TIE.';
          }
          else{
              result='YOU LOSE!';
          }
      }
      else{
          if(computerSelection=='quartz'){
              result='it is a TIE.';
          }
          else if(computerSelection=='parchment'){
              result='YOU LOSE!';
          }
          else{
              result='YOU WIN!';
          }

      }

      if(result==='YOU WIN!'){
          score.Wins++;
          playerStatus='winner';
          computerStatus='sad-pops';
      }
      else if(result==='YOU LOSE!'){
          score.Losses++;
          playerStatus='loser';
          computerStatus='happy-pops';
      }
      else{
          score.Ties++;
          playerStatus='neutral';
          computerStatus='happy-pops';
      }

      localStorage.setItem('score', JSON.stringify(score)); // LOCAL STORAGE SET ITEM HERE
      updateScoreElement();
      document.querySelector('.js-result').innerHTML=result;
      document.querySelector('.js-moves').innerHTML=`<img class="mood-icons" src="images/${playerStatus}.png" alt="player"> <img class="final-move-icon" src="images/${playerSelection}.png" alt="versus">
<img class="versus-icon" src="images/versus-icon.png" alt="versus"> <img class="final-move-icon" src="images/${computerSelection}.png" alt="versus">
<img class="mood-icons" src="images/${computerStatus}.png" alt="computer">`;

  }

  function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
  }

  function pickComputerMove(){
      const randomSelection= Math.random();
      let computerSelection='';

      if(randomSelection<1/3){
          computerSelection='quartz';
      }
      else if(randomSelection<2/3){
          computerSelection='parchment';
      }
      else{
          computerSelection='shears';
      }

      return computerSelection;
  }