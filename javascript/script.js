//blackJackGame
var blackJackGame =
{
	'you':{'score-span':'#your-blackjack-result','div':'#your-box','score':0},
	'dealer':{'score-span':'#dealer-blackjack-result','div':'#dealer-box','score':0},
	'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
	'cardMaps':{'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':1},
	'wins' : 0,
	'losses': 0,
	'draws' : 0,
	'isStand': false,
	'turnsOver':false,
};

const YOU = blackJackGame['you']
const DEALER =blackJackGame['dealer']
const hitSound = new Audio('sounds/swish.m4a');
const lostSound = new Audio('sounds/aww.mp3');
const winSound = new Audio('sounds/cash.mp3');

document.querySelector('#hit-button').addEventListener('click',blackJackHit);
document.querySelector('#deal-button').addEventListener('click',blackJackDeal);
document.querySelector('#stand-button').addEventListener('click',dealerLogic);


function blackJackHit()
{	
	if(blackJackGame['isStand']=== false)
	{
		let card = randomCards();
		showCards(card,YOU);
		calculateScore(card,YOU);
		//console.log(YOU['score']);
		showScore(YOU);
	}
}

function randomCards()
{

	let randomIndex = Math.floor(Math.random()*13);
	//console.log(randomIndex);
	return blackJackGame['cards'][randomIndex];
}

function showCards(card,activePlayer)
{
	if(activePlayer['score']<=21)
	{
		var image=document.createElement('img');
		image.src=`images/${card}.png`;
		//image.src='images/Q.png';
		document.querySelector(activePlayer['div']).appendChild(image);
		hitSound.play();
	}
}

function blackJackDeal()
{
	if(blackJackGame['turnsOver']===true)	
	{	
		blackJackGame['isStand']=false;	
		//showResult(computeWinner());
		let yourImages = document.querySelector('#your-box').querySelectorAll('img');
		let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
	//	computeWinner();

		for(i=0;i<yourImages.length;i++)
		{
			yourImages[i].remove();
		}
		for(i=0;i<dealerImages.length;i++)
		{
			dealerImages[i].remove();
		}

		YOU['score'] = 0;
		DEALER['score'] = 0;

		document.querySelector('#your-blackjack-result').textContent = 0;
		document.querySelector('#dealer-blackjack-result').textContent = 0;
		document.querySelector('#your-blackjack-result').style.color = 'white';
		document.querySelector('#dealer-blackjack-result').style.color =' white';

		

		document.querySelector('#blackjack-reset').textContent =' lets play';
		document.querySelector('#blackjack-reset').style.color =' black';

		blackJackGame['turnsOver'] = true;
	
	}
}


function calculateScore(card,activePlayer)
{
	activePlayer['score'] += blackJackGame['cardMaps'][card];
}
function showScore(activePlayer)
{
	if(activePlayer['score']>21)
	{
		document.querySelector(activePlayer['score-span']).textContent='BUST!';
		document.querySelector(activePlayer['score-span']).style.color='red';
		
	}
	else
	{
		document.querySelector(activePlayer['score-span']).textContent = activePlayer['score'];
	}
}

function dealerLogic()
{
	blackJackGame['isStand']=true;
	let card = randomCards();
	showCards(card,DEALER);
	calculateScore(card,DEALER);
	showScore(DEALER);	

	if(DEALER['score'] > 15)
	{
		blackJackGame['turnsOver']=true;
		showResult(computeWinner());
	}
}	
function computeWinner()
{
	let winner;
	if(YOU['score'] <=21)
	{
		if(YOU['score'] > DEALER['score'] || DEALER['score']>21)
		{
			blackJackGame['wins']++;
			winner=YOU;

		}
		else if(YOU['score']===DEALER['score'])
		{
			blackJackGame['draws']++;

		}
		else if(YOU['score']<DEALER['score'])
		{
			blackJackGame['losses']++;
			winner=DEALER;
  
		}
	}
	else if( YOU['score']>21 && DEALER['score']<=21)
	{
		blackJackGame['losses']++;
		winner=DEALER;		
	}
	else if(YOU['score']>21 && DEALER['score']>21)
	{
		blackJackGame['draws']++;

	}
	//console.log('winner',winner);
	console.log(blackJackGame);
	return winner;
}

function showResult(winner)
{	
	if(blackJackGame['turnsOver']=true)
	{
		let messageshow,messageColor;
		if(winner === YOU)
		{
			document.querySelector('#wins').textContent = blackJackGame['wins'];
			messageshow ='you won';
			messageColor = 'green';
			winSound.play();
		}
		else if(winner === DEALER)
		{
			document.querySelector('#loses').textContent = blackJackGame['losses'];
			messageshow = 'You lost';
			messageColor =  'red';
			lostSound.play();
		}
		else
		{
			document.querySelector('#draws').textContent = blackJackGame['draws'];
			messageshow = 'Draw';
			messageColor = 'Yellow';
		}

		document.querySelector('#blackjack-reset').textContent = messageshow;
		document.querySelector('#blackjack-reset').style.color = messageColor;
	}
}