
// declaration for the player ship class
var USS_Schwarzenegger = class {
	
	constructor(name) 
	{
		// add code here
		this.name = name;
		this.firepower  =  this.firepower = Math.floor(Math.random() * 3) + 3; //attack power
		this.hull = 10; //hit points 
		this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;  //listed as accuracy but is essentally evasion
		this.attack = function()
		{
			playerShot = (Math.floor(Math.random() * 3) + 6) / 10; //the attack accuracy        
		}
	}
	
}

// declaration for the enemy alien ship 
var Alien_Ship = class {
	
	constructor(name) {
		this.name = name;
		this.firepower  = this.firepower = Math.floor(Math.random() * 3) + 2; //attack power
		this.hull = Math.floor(Math.random() * 4) + 3;
		this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10; //listed as accuracy but is essentally evasion
		this.attack = function() 
		{
			enemyShot = (Math.floor(Math.random() * 3) + 6) / 10; //the attack accuracy
		}
	}
	
}
// declaration for the game/ rule check/ damage report/ handles if you win or lose and retreating 
var game = class{
	
	constructor(name) {
    
		this.name = name;
		this.check_win = function() 
		{
			
			
			if(playerShip.hull <= 0)// if the player ship health is zero or less if so the lose condition is fulfilled and you lose
			{
				console.log("%c You're ship has been destroyed. Game Over","color: red;");
				lose = true;
			}
			else if(currentEnemy.hull <= 0)
			{
				console.log("%c The enemy ship has been destroyed.","color: blue;"); // once the enemy ship has been destroyed
				if(enemyShips && enemyShips.length) // a check is run on the array to see if theres any remaining
				{
					console.log("There are " + enemyShips.length + " ships remaining ")
					currentEnemy = enemyShips.pop(); // a new ship is moved from the array into the enemy your engaging
					
					Withdraw(); // this calls the withdraw retreat function 
					
					console.log("a enemy approaches");
				}
				else 
				{  // if no enemy remains you fulfill the win condition and the game is over 
				   currentEnemy = ""; 
				   console.log("%c the enemy has been wiped out you win","color: blue;") 
				   win = true;
				}
			}
			else   // the battle will continue and will display the current remaining hit point for both parties.
			{   
				console.log("The battle continues");
				console.log("remaining player hull " + playerShip.hull);
				console.log("remaining enemy hull " + currentEnemy.hull);
			} 
			 
		}
	}
	
}

// variable declarations for game

var target = '';
var action = null; 
var playerShot =  0;
var enemyShot = 0;
var win = false;
var lose = false;

var retreatCnt = 0; // times retreated for the enemy attck penalty
var Play = true;
var shipCount = 0;
var difficulty = "";
var enemyShips = [];// array of ships
var retreat = "";
var setdifficulty = false;
var setRetreat = false;
var setContinue = false;

// win and loss count
var winCnt = 0;
var lossCnt = 0; 


//new declarations for the classes
var playerShip = new USS_Schwarzenegger('Schwarzenegger');
var gameApp = new game('game');

// sets the game difficulty and generates the enemy ships 
setDiff();
var currentEnemy = enemyShips.pop();
console.log(playerShip);
var continuePlay = ""; 

console.log("The game has started"); // you a story compostion dump and the rules explained 
alert("hit F12 to see the game play out") 
alert("Earth has been attacked by a horde of aliens! You are the captain of the USS Schwarzenegger") 
alert("On a mission to destroy every last alien ship. Battle the aliens as you try to destroy them");
alert("You can only fight one ship one at a time.");
alert("Should you destroy a ship you can choose to move on to the next or retreat");
alert("There is no shame in a strategic retreat if your odds dont look good");
alert("If you retreat you can repair your hull. However the next enemy will have increased firepower");
alert("and every subsuquent retreat will further increase the enemy firepower so weigh this carefully");


// this is where the game is played
while(Play==true)
{
    
	
	console.log("The round has started");
	
	playerShip.attack(); // the player generates his attack attempt
	currentEnemy.attack(); // the enemy generates his attack attempt
	
	// the player starts his attack and the accuray and evasion is displayed.
	console.log(" player attack: ")
	console.log("current player shot accuracy: " + playerShot)
	console.log("current enemy evasion: " + enemyShot)
	
	if(playerShot <= enemyShot)// if the player accuracy is below the enemy evasion/accuracy then the attack hits.
	{
		console.log("%c player attack lands the hull is dealt " + playerShip.firepower + " damage","color: blue;")
		currentEnemy.hull -= playerShip.firepower;
	}
	else
	{
		console.log(" player attack misses ")
	}

	if(currentEnemy.hull > 0) //a check is run to see if the enemy is destroyed and if not the enemy gets his turn
	{
		console.log(" enemy attack: ")	// same check is run in the case of the enemy
		playerShip.attack();
		currentEnemy.attack();
		console.log("current player evasion: " + playerShot)
		console.log("current enemy accuracy: " + enemyShot)
		if(enemyShot <= playerShot)
		{
			console.log("%c enemy attack lands the hull is dealt " + currentEnemy.firepower + " damage","color: red;")
			playerShip.hull -= currentEnemy.firepower;
		}
		else
		{
			console.log(" enemy attack misses ")
		}
	}
	// the game now checks to see if won lose condtions are fulfiled and continues the game. 
	gameApp.check_win();
	
	if(win == true || lose == true)// if the win or lose conditions are fulfilled you are asked if you want to play again.
	{
		setContinue == false;
		Continue();		
	}
}



function Continue()
{
	setContinue = false;
	while (setContinue == false)// check if you want to continue
	{
		continuePlay = prompt("do you want to continue", "yes or no");// if so everything is reset
		continuePlay = continuePlay.toLowerCase(); //if user inputs capitals
		
		if(continuePlay === null) 
		{
			continuePlay = "no";
		}
		
		if(continuePlay.localeCompare("yes") == 0) //check text for yes
		{
			Play = true;
			setContinue = true;
			enemyShips = [];			
			
		    playerShip = new USS_Schwarzenegger('Schwarzenegger');
            gameApp = new game('game');
			
			setDiff();
		    currentEnemy = enemyShips.pop();
			console.log(playerShip);
		    continuePlay = ""; 
		    
			retreatCnt = 0;
			win = false;	
			lose = false;
		}
		else if(continuePlay.localeCompare("no") == 0)//check text for no
		{
			Play = false;
			alert("Thanks for playing");
			setContinue = true;
		}

		else
		{	
			alert("you must type yes or no");
		}
	}
	
	
}

function Withdraw()
{
	while(setRetreat === false )
	{
		retreat = prompt("do you want to retreat", "yes or no");
		retreat = retreat.toLowerCase(); //if user inputs capitals
		
		if(retreat === null) 
		{
			retreat = "no";
		}
	    else if(retreat.localeCompare("yes") == 0) // if you choose to retreat 
		{
			setRetreat = true;    // player hull is increased by 5 but 
			retreatCnt += 1;
			playerShip.hull += 5;
   			currentEnemy.firepower += retreatCnt; // the next enemy firepower is increased but the times you retreated
			
		}
		else if(retreat.localeCompare("no") == 0)// combat continues
		{
			setRetreat = true;
		}
						
		else
		{	
			alert("you must type yes or no");
			setRetreat = true;
		} 
	}
	setRetreat = false; // resets your choice to retreat 
}

function setDiff()
{
	setdifficulty = false
	while(setdifficulty == false ){
		
		difficulty = prompt("what is your difficulty", "easy, normal, hard, or random"); 
		
		difficulty = difficulty.toLowerCase();//if user inputs capitals
		
		if(difficulty === null) 
		{
			difficulty = "normal"; //default difficulty
		}
		
		if(difficulty.localeCompare("easy") == 0) //generates 3 ships
		{
			shipCount = 1;
			for (var i = 1; i<=shipCount; i++)
			{
				const enemyShip = new Alien_Ship('enemyShip' + i);
				enemyShips.push(enemyShip);
				console.log(enemyShip);		
				setdifficulty = true;
			}
			
		}
		if(difficulty.localeCompare("normal") == 0) //generates 6 ships
		{
			shipCount = 6;
			for (var i = 1; i<=shipCount; i++)
			{
				const enemyShip = new Alien_Ship('enemyShip' + i);
				enemyShips.push(enemyShip);
				console.log(enemyShip);
				setdifficulty = true;
			}
	
		}
		if(difficulty.localeCompare("hard") == 0) //generates 10 ships
		{
			shipCount = 10;
			for (var i = 1; i<=shipCount; i++)
			{
				const enemyShip = new Alien_Ship('enemyShip' + i);
				enemyShips.push(enemyShip);
				console.log(enemyShip);	
				setdifficulty = true;
			}
		}
		if(difficulty.localeCompare("random") == 0) //generates 1 to 30 ships
		{
			shipCount = Math.floor(Math.random() * 30) + 1;
			for (var i = 1; i<=shipCount; i++)
			{
				const enemyShip = new Alien_Ship('enemyShip' + i);
				enemyShips.push(enemyShip);
				console.log(enemyShip);	
				setdifficulty = true;
			}
		}
		
		if(setdifficulty == false)
		{	
			alert("you must select a difficulty");
		}
		console.log(difficulty);
	}
}
