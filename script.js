/*This is our randomizer machine
it takes input in the form of one of the character types
then returns and randomly selected char type using JS Math functions
*/
function randomizer(i) {
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';
  var numbers = [0,1,2,3,4,5,6,7,8,9];
  var specialChar = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; //remember to escape special chars like " and \ with a single \

  switch (i) {
    case "L":
      return alphabet[(Math.floor(Math.random() * alphabet.length))];
    case "U":
      return (alphabet[(Math.floor(Math.random() * alphabet.length))]).toUpperCase();
    case "N":
      return numbers[Math.floor(Math.random() * numbers.length)];
    case "S":
      return specialChar[(Math.floor(Math.random() * (specialChar.length)))];
  }
}

function generatePassword(){
  //initialize prompt user for input to zero and emptystring
  var inputLength = 0;
  var inputTypes = "";

  /* -------- Let's do input validation -------------
    on both the password length 
    and the character types chosen
    password length should be between 8 and 128 inclusive
    at least one character type should be chosen
  ----------------------------------------------------*/

  //check inputLenth meets validation requirements, if no then continue to prompt for valid input 
  while (inputLength <8 || inputLength > 128) {
    inputLength = parseInt(prompt("Input the number of charachters for your password. \r\nIt must be a minimum of 8 and maximum of 128.","8"));
  }
  // exiting validation loop with valid input we can utilize
  console.log(inputLength);

  //check inputTypes meet validation requirements, if no then continue to prompt for valid input
  while (!inputTypes.includes("L") && !inputTypes.includes("U") && !inputTypes.includes("N") && !inputTypes.includes("S") ){
    inputTypes = prompt("Input the types of characters you want included. \r\nType one or more of the following to choose that type: \r\nL for lowercase \r\nU for uppercase \r\nN for number \r\nS for special characters", "LUNS");
  }
  // exiting while loop with valid input we can utilize
  // lets put the charTypes into an array
  // while stripping the input string of any blank spaces added during input
  var charTypes = (inputTypes.replace(/\s*/g, '')).split("");
  console.log(charTypes);


  /* ----- Let's Build the Password Now -------
  Here is where the magic happens
  We need to generate a password given the 
  valid inputs and ensure that it is
  random enough to be secure 
  ---------------------------------------------*/
  var i; //index for our array
  var makeItSo = "";

  //using a for/of loop on our charTypes array to ensure we get at least one of each of the chosen charTypes
  for (i of charTypes){
    makeItSo += randomizer(i);
    console.log(makeItSo);
  }

  // now fill out the rest of the password with random values until we reach desired length
  for (let lenCounter = makeItSo.length; lenCounter < inputLength; lenCounter++) {
    var randoChoices = "LUNS".split("");
    console.log(randoChoices);
    makeItSo += randomizer(randoChoices[Math.floor(Math.random() * randoChoices.length)])
    console.log(makeItSo);
  }

  return makeItSo;  // finally return the password to the browser
}

/* Code provided by assignment to call a funciton to generate the password */
// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword(); //ensure we pass the validated input parameters
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

alert("Click the 'Generate Password' button on the page to begin");
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

