/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
// Sort all of the elements in the array from smallest to largest and update the swap counter
async function bubbleSort (array){
    for (let i = 0; i < array.length - 1 ; i++){    // Runs through the array
        for (let j = array.length - 1; j > 1; j--){ // Sortes the elements (Starts at the end of the array, compares the neighboring elements, and moves backwords to sort from right to left)
            if (array[j].value < array[j-1].value){ // If current value is less than the value of the previous element, they swap positions
                swap(array, j, j - 1);              // Swaps the values
                updateCounter(bubbleCounter);       // Updates the move count value
                await sleep ();                     // Pauses the process so user can see the swaps occur
            }
        }
    }
}

// TODO 3: Implement quickSort
// Sorts all the elements of the array from smallest to largest 
async function quickSort (array, left, right){
    if (right <= left){                               // Base case to stop function if the right value is already less than or equal to the left value
        return;                                       // Stops function and returns value
    }

    var index = await partition (array, left, right); // Creates a new variable called index that assigns the result of the partition function called

    if (left < index - 1){                            // If the left value is less than the index value - 1, call quickSort 
        await quickSort(array, left, index - 1);      // Calls quickSort function with the arguments array, left, and index - 1 
    }

    if (right > index){                               // If the right value is greater than the index value, call quickSort
        await quickSort(array, index, right);         // Calls quickSort function with the arguments array, index, and right
    }

}

// TODOs 4 & 5: Implement partition
// Figure out the new partition index for quickSort, decide on a pivot value to sort the array, move elements less than the pivot to the left / greater than to the right, and update the counter
async function partition (array, left, right){
    let pivot = array[Math.floor((right + left) / 2)].value; // selects pivot amount by dividing the middle element by 2 and rounding it 
    while (left < right){                   // Loop should run while the left value is less than the right value
        while (array[left].value < pivot){  // While the array's current left value is less than the pivot value, increase left by 1
            left++;                         // Increases left by 1
        }
        while (array[right].value > pivot){ // While the array's current right value is greater than the pivot value, decrease right by 1
            right--;                        // Decreases right by 1
        }
        if (left < right){                  // If the left is less than the right, they swap positions 
            swap(array, left, right);       // Swaps the values
            updateCounter(quickCounter);    // Updates the move count value
            await sleep();                  // Pauses the process so user can see the swaps occur
        }
    }
    return left + 1;                        // Returns the left value plus one
}

// TODO 1: Implement swap

function swap (array, i, j){ 
    var temp = array[i];   // Stores array in a temp variable
    array[i] = array[j];   // Stores j in index i
    array[j] = temp;       // Stores original i index into j
    drawSwap(array, i, j); // Visually draws the swapping
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}