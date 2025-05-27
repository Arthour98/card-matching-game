let images=document.querySelectorAll('.image');
let imagepaths=['asos.png','dama.png','jack.jpg','king.jpg','jocker.png'];
let flipCounter=document.getElementById('counter-flips');
let flipCount=0;
let repeatedPaths = imagepaths.flatMap(path => Array(4).fill(path));
repeatedPaths.sort(() => Math.random() - 0.5);
let replayButton=document.getElementById('replay');
let gamecount=0;
let firstImage = null;
let secondImage = null;
let windowWidth=document.getElementById('window-width')



Array.from(images).map(image=>image.draggable=false) //->to avoid cheating :P


////Image related functions ..
function setImages()
{
    document.addEventListener('DOMContentLoaded',function()
    {
    images.forEach(image=>
    {
    image.src=repeatedPaths.pop();
    });});
}

 function setNewImages()
{
let newImages= imagepaths.flatMap(path => Array(4).fill(path)).sort(() => Math.random() - 0.5);
    images.forEach(image=>
    {
    image.src=newImages.pop();
    });

}

function hideImages()
{
images.forEach(image=>image.classList.add("hidden"));
}

function showImages()
{
images.forEach(image=>
{
image.addEventListener('click', flipPath);
});
}
////////

function resetGame()
{
flipCount=0;
flipCounter.textContent='flips : '+flipCount;
setNewImages();
setTimeout(hideImages,1500);
}

////flip logic
function flipPath(event) {
let clickedImage = event.target;        
    if (clickedImage.classList.contains('hidden')) {
        flipCount++;
        flipCounter.textContent = 'Flips: ' + flipCount;
    if (flipCount > 30) {
            flipCounter.textContent='Flips : ' + flipCount + '  -Yo Missing some chromosomes bro :)';        
        }
    }
    
    clickedImage.classList.remove('hidden');          
if (!firstImage)
     {
    firstImage = clickedImage;
    }
    else if (!secondImage) {            
    secondImage = clickedImage;

 if (firstImage.src === secondImage.src)
{
  firstImage = null;
  secondImage = null;
} 
else {
                    
setTimeout(() => {
firstImage.classList.add('hidden');
secondImage.classList.add('hidden');
firstImage = null;
secondImage = null;
}, 500); 
}}
showWin();
}
///////

/////end session
function showWin()
{
let modal=document.getElementById('modal-replay');
const revealedAll=Array.from(images).every(image=>!image.classList.contains('hidden'));
if(revealedAll)
{
modal.style.display='flex';
modal.firstChild.innerHTML='You won';
}
}
//////////


replayButton.onclick=function()
{
let modal=document.getElementById('modal-replay');
modal.style.display='none';
gamecount++;
resetGame();
}


setImages();
showImages();
setTimeout(hideImages,1500);

















