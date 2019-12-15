let currentAlgo;
let arraySize;
let arr = [];
const sortbtn = document.getElementById('sort');
const sliderInput = document.getElementById('myRange');
const newArrayBtn = document.getElementById('newArray');

sliderInput.addEventListener("input", getRandomArray);

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
        document.getElementsByClassName('algo-overview')[0].style.display = "block";
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


async function merge(arr,  l,  m, r, isFinalMerge, animations)
{ 
	let i, j, k; 
	let n1 = m - l + 1; 
    let n2 = r - m; 

    let firstHalf=[], secondHalf=[]; 
    for (i = 0; i < n1; i++) {
        firstHalf.push(arr[l+i]);        
    }
    for (j = 0; j < n1; j++) {
        secondHalf.push(arr[m+1+j]);        
    }
    
	i = 0;
	j = 0;
    k = l;
    while (i < n1 && j < n2) 
	{         
        // firstHalf[i] = arr[l+i]  and secondHalf[j]=arr[m+1+j]
        animations.push([l+i, m+1+j]);
        animations.push([l+i, m+1+j]);

        if (firstHalf[i] <= secondHalf[j] ) 
		{
            animations.push([l+i, firstHalf[i]]);
            arr[k] = firstHalf[i]; /// main line
            i++;
		} 
		else
        {
            animations.push([m+1+j, secondHalf[j]]);
            arr[k] = secondHalf[j] ; // main line
            j++; 
        }
        k++; 
	} 

	while (i < n1) 
	{ 
        animations.push([l+i, l+i]);
        animations.push([l+i, l+i]);
        animations.push([l+i, firstHalf[i]]);

        arr[k] = firstHalf[i]; 
		i++; 
		k++; 
	} 

	while (j < n2) 
	{ 
        animations.push([m+1+j, m+1+j]);
        animations.push([m+1+j, m+1+j]);
        animations.push([m+1+j, secondHalf[j]]);
        arr[k] = secondHalf[j]; 
		j++; 
		k++; 
    } 
        
} 


async function mergeSort(arr,  l,  r, animations)
{ 
	if (l < r) 
	{ 
		let m = l + parseInt((r-l)/2); 
		await mergeSort(arr, l, m, animations); 
        await mergeSort(arr, m+1, r, animations);
        const isFinalMerge = l+r+1 === arr.length;
        await merge(arr, l, m, r, isFinalMerge, animations); 
    }
    // await timer(ms);
    // for (let x = l; x <= r; x++) {
    //     arr[x].style.background = '#0f0';
    // }
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

function setOverviewInfo(time, space, stable, memory, recursive, comparsion){
    document.getElementById("timeComplex").innerHTML = time;
    document.getElementById("spaceComplex").innerText = space;
    document.getElementById("stability").innerText = stable;
    document.getElementById("memory").innerText = memory;
    document.getElementById("recursive").innerText = recursive;
    document.getElementById("swapi").innerText = comparsion;
}
function removeOverviewInfo(){
    document.getElementById("timeComplex").innerHTML = '';
    document.getElementById("spaceComplex").innerText = '';
    document.getElementById("stability").innerText = '';
    document.getElementById("memory").innerText = '';
    document.getElementById("recursive").innerText = '';
    document.getElementById("swapi").innerText = '';
}

async function sort(){

    // for algo overview
    document.getElementsByClassName('algo-overview')[0].style.display = "block"; 

    // displaying selected sort Info
    document.getElementById(currentAlgo + "Info").style.display = "block";

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
    if (currentAlgo === 'bubble') {
        
        // setting algo-overview values
        setOverviewInfo("O(n<sup>2</sup>)", "In-Place", "Stable", "Internal", "Non-Recursive", "Yup!");

        // calling bubbleSortFunction
        await bubbleSort(divArr, n, ms);

        
    }else if(currentAlgo === 'heap'){
        
        // setting algo-overview values
        setOverviewInfo("O(n logn)", "In-Place", "UnStable", "Internal", "Non-Recursive", "Yup!");

        await heapSort(divArr, n, ms); // calling heapSort        
        
    } else if (currentAlgo === 'merge') {

        // setting algo-overview values
        setOverviewInfo("O(n logn)", "Out-Of-Place", "Stable", "External", "Recursive", "Yup!");

        const animations = [];
        const realArray = [];
        for (const elm of document.getElementsByClassName('slide')) {
            realArray.push(parseInt(elm.style.height));
        };

        await mergeSort(realArray, 0, realArray.length -1, animations);
        console.log(animations);

        for (let x = 0; x < animations.length; x++) {
            const arrayBars = document.getElementsByClassName('slide');
            const isColorChange = x % 3 !== 2;
            if(isColorChange){
                const [barOneIdx, barTwoIdx] = animations[x];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = x % 3 === 0 ? '#077d7d' : '#f00';
                barOneStyle.background = color;
                barTwoStyle.background = color;
                await timer(ms);
            }else{

                const [barOneIdx, newHeight] = animations[x];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }
        }


    } else if (currentAlgo === "insertion") {

        // setting algo-overview values
        setOverviewInfo("O(n<sup>2</sup>)", "In-Place", "Stable", "Internal", "Non-Recursive", "Yup!");

        await insertionSort(divArr, n, ms);
    }else if(currentAlgo === 'quick'){

        // setting algo-overview values
        setOverviewInfo("O(n logn)", "In-Place", "UnStable", "Internal", "Recursive", "Yup!");

        await qucikSort(divArr, 0, n -1, ms);
    }else{
        alert('how did you clicked that button');
    }


    // turning divs color back to noraml as all are sorted
    await timer(1000);
    backToNormal(divArr, n);

     // enabling all things 
    document.getElementById("sort").removeAttribute("disabled");
    sliderInput.removeAttribute("disabled");
    newArrayBtn.removeAttribute("disabled");
    sliderInput.className = 'slider';
    sliderInput.parentNode.className = '';
    newArrayBtn.className = '';

    // hiding selected sort Info and overview info
    setTimeout(() => {
        document.getElementById( currentAlgo + "Info").style.display = "none";
        document.getElementsByClassName('algo-overview')[0].style.display = "none";
    }, 100);

    // remove overview Info
    removeOverviewInfo();

}

getRandomArray(); //calling for initail 

//todo
// ii. DONE --- make a helper function for swapping and changing colors -- DRY
// i. correctly implement change colors when swapping or changing in  merge sort
// 1. CANCELLED --- generate only unique random values 
// 2. good coloring on slides
// 3. DONE --- Disable "sort" btn and all other things once it has started sorting 
// 4. DONE --- implement merge sort
// 5. DONE --- correct implemented INSERTION ,QUICK, BUBBLE, HEAP