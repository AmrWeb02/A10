const quotesContainer = document.getElementById("quotes");
const textBox = document.getElementById("textBox");
const myTimer = document.getElementById("timer");
const btn = document.getElementById("againBtn");
let cpm = document.getElementById("cpm");
let wpm = document.getElementById("wpm");
let words= 0;
let chars= 0;
let myQuote = "";
let userArray = [];
let quotesArray = [];
let i=0;
let complete = false;
let counting = false;
let currentTime=0;
let targetTime=0;
let remainingTime=0;
let remainingTimeSec=0;

let countdown;
let cont=false;
let concatQuote;
let newQuoteArray = [];
document.addEventListener("DOMContentLoaded",loadQuote)
btn.addEventListener("click",hardReset)
textBox.addEventListener("input",validator)

function hardReset(){
    if(counting===true){
        clearInterval(countdown); 
        counting=false;
    }
    quotesContainer.innerHTML = "";
    textBox.value = "";
    userArray = [];
    quotesArray=[];
    i=0;
    myTimer.innerText = 60;
    loadQuote();
}
function loadQuote(){
    if(textBox.hasAttribute("readonly")){
        textBox.removeAttribute("readonly")
    }
    quoteData = fetch(`https://api.quotable.io/random`).then( responseData => { return responseData.json() } )
    .then( (dataObject) => initializer(dataObject) ) 
    .catch( error => console.log(error) )
}
function initializer(dataObject){
    myQuote = dataObject.content;
    if(quotesArray.length>0){
        concatQuote = " " + myQuote;
    }
    else{
        concatQuote = myQuote;
    }
    newQuoteArray = concatQuote.split("");
    quotesArray.push(...newQuoteArray);

    newQuoteArray.forEach( (element,index) =>{
        const span = document.createElement("span");
        span.innerText = element;
        quotesContainer.append(span);
    })
}
function validator(event){
    //document.querySelectorAll("span") or quotesArray
    if(!counting) {
        timerCounter();
    }
    userArray = textBox.value.split("");
    if(userArray[i]==null){
        console.log("del");
        i--;
        document.querySelectorAll("span")[i].classList.remove("correct");
        document.querySelectorAll("span")[i].classList.remove("wrong");
    }
    else{
        if(quotesArray[i] === userArray[i]){
            //console.log(i);
            document.querySelectorAll("span")[i].classList.add("correct");
            document.querySelectorAll("span")[i].classList.remove("wrong");
            ++i;
        }
        else{
            document.querySelectorAll("span")[i].classList.add("wrong");
            //console.log(i);
            document.querySelectorAll("span")[i].classList.remove("correct");
            ++i;
        }
    }
    if(JSON.stringify(userArray) === JSON.stringify(quotesArray) && (userArray.length === quotesArray.length)){
        console.log("Nice!");
        // words = textBox.value.split(" ").filter( word => word!=="").length;
        // chars = textBox.value.length;

        // cont=true;
        loadQuote();
    }
    else {
        // words = textBox.value.split(" ").filter( word => word!=="").length;
        // chars = textBox.value.length;
    }
}

function timerCounter(){
    counting=true;
    currentTime = Date.now();
    targetTime = currentTime + (60 * 1000);
    countdown = setInterval(function(){
        currentTime = Date.now();
        remainingTime = targetTime - currentTime;
        remainingTimeSec = Math.round(remainingTime / 1000);

        if(remainingTimeSec<0){
            clearInterval(countdown);
            counting=false;
            textBox.setAttribute("readonly","readonly");
            words = textBox.value.split(" ").filter( word => word!=="").length;
            chars = textBox.value.length;
            wpm.innerText=`WPM:${Math.round( (words/60)*60 )}`;
            cpm.innerText=`CPM:${Math.round( (chars/60)*60 )}`;
        }
        else{
            myTimer.innerText = remainingTimeSec;
            complete = true;
        }
    },1000)
}

//In this case, the .split(" ") method splits the string by spaces, resulting in an array ["The", "quick", "brown", "fox"]. Then, the .filter(word => word !== "") filters out any empty strings from the array, resulting in ["The", "quick", "brown", "fox"]. Finally, .length returns the number of non-empty strings, which is 4, representing the number of words.