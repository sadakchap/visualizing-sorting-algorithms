let currentAlgo;
let arraySize;
let arr = [];
const sortbtn = document.getElementById('sort');
const sliderInput = document.getElementById('myRange');
const newArrayBtn = document.getElementById('newArray');

sliderInput.addEventListener("change", () =>{
    getRandomArray();
})

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

// for adding eventListener on each algo options
algoList = document.querySelectorAll('.algoname');
for (const a of algoList){
    a.addEventListener('click', function(event) {
        sortbtn.style.visibility = 'visible';  // making sorting btn visible
        // remove selectedAlgo class if present
        rm = document.querySelector('.selectedAlgo');
        if (rm){
            rm.className = 'algoname';
        }
        //  add selectedAlgo class to clicked element
        a.className = 'selectedAlgo';
        currentAlgo = a.innerText.split(' ')[0].toLowerCase();    // store selectedAlgo choice 
    })
}

function makeSlides(arr){
    centerBox = document.getElementById('center');

    // for removing slides
    var child = centerBox.lastElementChild;
    while(child){
        centerBox.removeChild(child);
        child = centerBox.lastElementChild;
    }

    /// for adding new slides
    eachWidth = (centerBox.clientWidth - arr.length - 20) / arr.length; // 20px padding of center box
    for( let i=0; i< arr.length; i++){
        const box = document.createElement('div');
        box.className = 'slide';
        box.style.width = `${eachWidth}px`;
        box.style.height = `${arr[i]}px`;
        box.style.background = '#f00';
        box.style.margin = '0 1px 0 0';
        centerBox.appendChild(box);
    }
    

}

document.getElementById('newArray').addEventListener('click', getRandomArray);

function getRandomArray(){
    arraySize = parseInt(document.getElementById('myRange').value); // array length
    // get center box
    centerBox = document.getElementById('center');
    console.log(`new random array size ${arraySize}`);
    height = centerBox.clientHeight - 15 ;
    
    arr = [];
    for (let x=0; x<arraySize; x++){
        arr[x] = Math.floor(Math.random() * height) + 10;
    }
    makeSlides(arr);
} 

async function swapi(arr, i, j, ms){
    a1 = arr[i];
    a2 = arr[j];
    // changing to selected colors
    a1.style.background = '#077d7d';
    a2.style.background = '#077d7d';
    await timer(ms);
    // swapping divs heights
    b = a1.style.height;
    a1.style.height = a2.style.height;
    a2.style.height = b;
    // changing to swapped colors after swapping
    a1.style.background = '#b509a0';
    a2.style.background = '#b509a0';
    await timer(ms);
    // changing back to primary color(normal)
    a1.style.background = '#f00';
    a2.style.background = '#f00';
}

function backToNormal(arr, n){
    for(let x=0; x<n; x++){
        arr[x].style.background = '#f00';
    }
}


async function insertionSort(arr, n, ms){
    let x, key, y;
    for(x=1;x<n;x++){

        arr[x].style.background = '#ff0';
        key = arr[x].style.height;
        await timer(ms);
        y = x - 1;
        while( y>=0 && parseInt(arr[y].style.height) > parseInt(key)){
            arr[ y + 1].style.height = arr[y].style.height;
            arr[ y + 1].style.background = '#077d7d';
            await timer(ms);
            arr[ y + 1].style.background = '#0f0';
            y= y-1;
        }
        arr[y+1].style.height = key ;
        arr[y+1].style.background = '#ff0';
        await timer(ms);

        arr[x].style.background = '#0f0';
        arr[y+1].style.background = '#0f0';
    }
}

async function qucikSort(divArr, l, h, ms){
    if(l<h){
        pi = await parition(divArr, l, h, ms)
        await qucikSort(divArr, l, pi-1, ms);
        await qucikSort(divArr, pi+1, h, ms);
    }
    for(let x=0; x<=h; x++){
        divArr[x].style.background = '#0f0';
    }
}

async function parition(divArr, l, h, ms){

    divArr[h].style.background = '#ff0'; // yellow key, pivot color
    let pi = parseInt(divArr[h].style.height);  
 
    let i = (l - 1)  // Index of smaller element

    for (j = l; j <= h- 1; j++)
    {
        // If current element is smaller than the pivot
        if (parseInt(divArr[j].style.height) < pi)
        {
            i++;
            await swapi(divArr, i, j, ms);          
        }
    }

    await swapi(divArr, i+1, h, ms); 
    divArr[h].style.background = '#f00';
    return (i + 1);
}

async function bubbleSort(divArr, n, ms){
    for(let i=0; i< n-1; i++){
        var c = false;
        for(j=0; j< n-i-1; j++){
            
            if (parseInt(divArr[j].style.height) > parseInt(divArr[j+1].style.height))
            {
                await swapi(divArr, j, j+1, ms);
                c= true;
            }
            
        }
        // changing color since this div is in right place now
        divArr[j].style.background = '#0f0';

        if (!c){
            // all array is sorted now
            for(let x=0; x<i; x++){
                divArr[x].style.background = '#0f0';
            }
            break;
        }
    }
}

async function heapify(divArr, n, i, ms){
    let largest = i; 
    let l = 2*i + 1;
    let r = 2*i + 2;
    
    if (l < n && parseInt(divArr[l].style.height) > parseInt(divArr[largest].style.height)) 
        largest = l; 
  
    if (r < n && parseInt(divArr[r].style.height) > parseInt(divArr[largest].style.height)) 
        largest = r; 


    if (largest != i) 
    { 
        await swapi(divArr, i, largest, ms);
        await heapify(divArr, n, largest, ms); 
    } 
}

async function heapSort(divArr, n, ms){
    for (let i = parseInt(n / 2) - 1; i >= 0; i--) 
        await heapify(divArr, n, i, ms ); 
    
    for (let i=n-1; i>=0; i--) 
    { 
        await swapi(divArr, 0, i, ms);
        // this div is sorted so green
        divArr[i].style.background = '#0f0';
        await heapify(divArr, i, 0, ms ); 
    }
}

///////////////////////////////////////////


async function merge(arr,  l,  m, r, ms, isFinalMerge) 
{ 
	let i, j, k; 
	let n1 = m - l + 1; 
    let n2 = r - m; 
    
    const revertColor = isFinalMerge ? '#0f0' : '#f00';

    let firstHalf=[], secondHalf=[]; 
    
	for (i = 0; i < n1; i++) 
        firstHalf.push( parseInt( arr[l + i].style.height ) ); 
	for (j = 0; j < n2; j++) 
        secondHalf.push( parseInt( arr[m + 1+ j].style.height ) ); 


	i = 0;
	j = 0;
    k = l;
	while (i < n1 && j < n2) 
	{         
        // L[i] = arr[l+i]  and R[j]=arr[m+1+j]
        if (firstHalf[i] <= secondHalf[j] ) 
		{
            arr[k].style.height = `${firstHalf[i]}px`; /// main line
            i++;
		} 
		else
        {
            arr[k].style.height = `${secondHalf[j]}px` ; // main line
            j++; 
        }
        k++; 
	} 

	while (i < n1) 
	{ 
        arr[k].style.height = `${firstHalf[i]}px`; 
		i++; 
		k++; 
	} 

	while (j < n2) 
	{ 
        arr[k].style.height = `${secondHalf[j]}px`; 
		j++; 
		k++; 
    } 
        
} 


async function mergeSort(arr,  l,  r, ms) 
{ 
	if (l < r) 
	{ 
		let m = l + parseInt((r-l)/2); 
		await mergeSort(arr, l, m, ms); 
        await mergeSort(arr, m+1, r, ms);
        const isFinalMerge = l+r+1 === arr.length;
        await merge(arr, l, m, r, ms, isFinalMerge); 
    }
} 

function delayTime(n){
    if (n <= 200 && n >= 150){
        return 5;
    }
    else if (n <= 150 && n >= 100) {
        return 15;
    } else if (n < 100 && n >= 80) {
        return 35;
    } else if (n < 80 && n >= 60) {
        return 75;
    } else if (n < 60 && n >= 40) {
        return 100;
    } else if (n < 40 && n >= 20) {
        return 500;
    } else { // for n<20 && n>4
        return 1000;
    }
}

async function sort(){

     // disabling all things
    document.getElementById('sort').setAttribute("disabled", "disabled");
    sliderInput.setAttribute("disabled", "disabled");
    newArrayBtn.setAttribute("disabled", "disabled");
    sliderInput.className = 'slider disabled';
    sliderInput.parentNode.className = 'disabled';
    newArrayBtn.className = 'disabled';

    // getting all divs
    var divArr = document.querySelectorAll('#center div');
    
    var n = divArr.length;
    const ms = delayTime(divArr.length);
    
    // deciding algorithm function to excute
    if(currentAlgo === 'bubble'){
        await bubbleSort(divArr, n, ms);
    }else if(currentAlgo === 'heap'){
        await heapSort(divArr, n, ms);
    }else if(currentAlgo === 'merge'){
        await mergeSort(divArr, 0, n -1, ms);

    }else if(currentAlgo === "insertion"){
        await insertionSort(divArr, n, ms);
    }else if(currentAlgo === 'quick'){
        await qucikSort(divArr, 0, n -1, ms);
    }else{
        alert('how did you clicked that button');
    }


    // turning back to noraml as all are sorted
    await timer(1000);
    backToNormal(divArr, n);

     // enabling all things 
    document.getElementById("sort").removeAttribute("disabled");
    sliderInput.removeAttribute("disabled");
    newArrayBtn.removeAttribute("disabled");
    sliderInput.className = 'slider';
    sliderInput.parentNode.className = '';
    newArrayBtn.className = '';


}

getRandomArray(); //calling for initail 

//todo
// ii. make a helper function for swapping and changing colors -- DRY
// i. correctly implement change colors when swapping or changing in  merge sort
// 1. generate only unique random values -- CANCELLED
// 2. good coloring on slides
// 3. DONE --- Disable "sort" btn and all other things once it has started sorting 
// 4. DONE --- implement merge sort
// 5. DONE --- correct implemented INSERTION ,QUICK, BUBBLE, HEAP