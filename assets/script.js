function randomizer(i) {
/*This is our randomizer machine
it takes input in the form of one of the character types
then returns and randomly selected char type using JS Math functions
*/

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = [0,1,2,3,4,5,6,7,8,9];
  const specialChar = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // remember to escape special chars like " and \ with a single \

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

function getInput() {
  // initialize prompt user for input to zero and emptystring
  let passLength = 0;
  let inputTypes = "";

  /* -------- Let's do input validation -------------
    on both the password length 
    and the character types chosen
    password length should be between 8 and 128 inclusive
    at least one character type should be chosen
  ----------------------------------------------------*/

  // check inputLenth meets validation requirements, if no then continue to prompt for valid input 
  while (passLength <8 || passLength > 128) {
    passLength = parseInt(prompt("Input the number of charachters for your password. \r\nIt must be a minimum of 8 and maximum of 128.","8"));
    if (isNaN(passLength)|| passLength == null){
      alert ("you must input a valid number. Please try again.")
      passLength = 0;
    }
  }

  // check inputTypes meet validation requirements, if no then continue to prompt for valid input
  while (!inputTypes.includes("L") && !inputTypes.includes("U") && !inputTypes.includes("N") && !inputTypes.includes("S") ){
    inputTypes = prompt("Input the types of characters you want included. \r\nType one or more of the following to choose that type: \r\nL for lowercase \r\nU for uppercase \r\nN for number \r\nS for special characters", "LUNS");
    // lets set the input string to all uppercase chars correcting any lowercase l,u,n,s char inputs
    inputTypes = inputTypes.toUpperCase();
    // lets remove any nonvalid characters from the input string
    let validator = inputTypes.match(/(L|U|N|S)/g);
    if (validator == null ) {
      alert ("You must input a value of L, U, N and/or S. Please try again.")
      inputTypes = "";
    } else if(validator.length >4){
      alert ("You have input too many character types. Please try again.")
      inputTypes = "";
    } else {
      inputTypes = validator;
    }
  }
  
  return [passLength, inputTypes];
}

function evenMoreRandom(inputString) {
  /* ----Shuffle the results of makeItSo------
    Since makeItSo is generated using 
    simple concatenation this function ensures 
    the first n chars of the password are 
    not necessarily always equivalent to the 
    input 
    Here we use the Fisher-Yates algorithm
  --------------------------------------------*/
  inputString = inputString.split("");
  for (let i = inputString.length -1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1)); // generate random index from 0 to i
    [inputString[i], inputString[j]] = [inputString[j], inputString[i]];// swap elements array[i] and array[j]
  }
  return inputString.join("");
}

function generatePassword(){
  
  /* ----- Let's Build the Password -------
  Here is where the magic happens
  We need to generate a password given two 
  valid inputs: length and character type to be incuded
  ---------------------------------------------*/
  let i; //initialize the index for our array of charTypes
  let makeItSo = ""; //initialize password to empty string

  // get inputs
  const [inputLength, charTypes] = getInput();

  //using a for/of loop on our charTypes array to ensure we get at least one of each of the chosen charTypes
  for (i of charTypes){
    makeItSo += randomizer(i);
  }

  // now fill out the rest of the password with random values until we reach desired length
  for (let lenCounter = makeItSo.length; lenCounter < inputLength; lenCounter++) {
    let randoChoices = charTypes; // only use chosen types to fill rest of length
    makeItSo += randomizer(randoChoices[Math.floor(Math.random() * randoChoices.length)]);
  }
  makeItSo = evenMoreRandom(makeItSo);
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

