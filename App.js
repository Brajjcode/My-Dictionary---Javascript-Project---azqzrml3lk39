// Get DOM elements

const url='https://api.dictionaryapi.dev/api/v2/entries/en/';
let searches=[];

// const def= document.getElementById('defination');

// function definationInput(){

// }
let defination=document.getElementById('defination');

function Defination(data,word){

     if(data && data.length>0)
     {
        
    const wordData = data[0]; // Assuming there is only one word entry in the array
    
    if(wordData.word){
 
    const firstMeaning= wordData.meanings[0];
    const firstDefinition = firstMeaning.definitions[0].definition;

    console.log(firstDefinition);
       
    defination.innerHTML='';
    defination.innerHTML=  `Defination :${firstDefinition}`; 
    searches.push({word,firstDefinition});
    localStorage.setItem("searches", JSON.stringify(searches));

    }
     
    }  

    else{
        console.error("Invalid Api response");
        defination.innerHTML='';
        defination.innerHTML=`<h3>Sorry pal, we couldn't find definitions for the word you were looking for</h3>`;
     }    

    }


async function fetchdata(query){
    
try{
    let response= await fetch(`${url}${query}`);
    let data= await response.json();
    console.log(data);
    Defination(data,query);
         
}

catch(error)
{
    console.log(error);    
  //  defination.innerHTML=`<h3>Could not find the word </h3>`
    
}
}

const srcbtn=document.getElementById('search');
const text=document.getElementById('searchinput');

srcbtn.addEventListener('click',()=>{
let textval=text.value;
fetchdata(textval);
})

 function toggleHistorypage(){

    const mainPage= document.getElementById("mainpage");
    const historyPage=document.getElementById("historyPage");
    
    if(mainPage.classList.contains("hidden")){
        mainPage.classList.remove("hidden");
        historyPage.classList.add("hidden");
    }
    else{
        mainPage.classList.add("hidden");
        historyPage.classList.remove("hidden");
        loadHistory();
    }

 }




function loadHistory(){

    let historyContainer=document.getElementById('container');
   historyContainer.innerHTML='';

    searches.forEach((search,index)=>{
        //const card= document.createElement("div");
      // card.classList.add("card");
       
     // const content=document.createElement('div');
      //  content.classList.add('content');
        historyContainer.innerHTML+=`    <div class="card" id="card">
        <div class="content">
            <div class="heading">${search.word}</div>
            <div class="meaning">
               ${search.firstDefinition}
            </div>
            <button id="X"  onclick="deleteItems(${index})">X</button>
        </div>
        </div> `;

     //   card.appendChild(content);
    //   historyContainer.appendChild(card);
    })
}



const historybtn= document.getElementById('history')

historybtn.addEventListener('click',()=>{
    if(historybtn.innerHTML===`history`)
    {
        historybtn.innerHTML=`Search`;
    }
    else if(historybtn.innerHTML===`Search`)
    {
        historybtn.innerHTML=`history`;
    //    window.location.reload();

    }
    toggleHistorypage();
})

function deleteItems(index)
{
    let indexToDelte=parseInt(index);
    searches.splice(indexToDelte,1);
    saveSearchesToLocalStorage();
  let card= document.getElementById('card')
  let historyContainer=document.getElementById('container');

  historyContainer.removeChild(card);
  loadHistory();

}
function saveSearchesToLocalStorage() {
    localStorage.setItem('searches', JSON.stringify(searches));
}