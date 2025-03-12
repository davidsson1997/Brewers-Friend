// Let's start with an array of brews (temporary data)
let brews = [
    { 
        name: "Batch 32, Traditional - Orange Blossom", 
        startDate: "2025-02-25", 
        reminders: ["De-gas on 2025-02-27"], 
        latestGravity: "1.083",
        id: 1,
        bottlings: []
    },
    { 
        name: "Batch 33, Raspberry Melomel", 
        startDate: "2025-03-02", 
        reminders: ["Add nutrition (Fermaid-O 3.55g) on 2024-03-08"], 
        latestGravity: "0.998",
        id: 2,
        bottlings: []
    },
    { 
        name: "Batch 34, Bochet", 
        startDate: "2025-03-02", 
        reminders: ["Add nutrition (Fermaid-O 6.22g) on 2024-03-08"], 
        latestGravity: "1.033",
        id: 3,
        bottlings: []
    }
];

let storage = [
    { 
        name: "Batch 1, Sweet Traditional", 
        ABV: "12,5%",
        Final_Gravity: "1.022",
        Number_of_bottles: "23",
    },
    { 
        name: "Batch 2, Dry Traditional", 
        ABV: "11,5%",
        Final_Gravity: "0.998",
        Number_of_bottles: "18",
    },
    { 
        name: "Batch 41, Blackberry Melomel", 
        ABV: "11%",
        Final_Gravity: "1.015",
        Number_of_bottles: "17",
    },
    { 
        name: "Batch 13, Raspberry Melomel", 
        ABV: "11,2%",
        Final_Gravity: "1.025",
        Number_of_bottles: "11",
    },
    { 
        name: "Batch 3, Black currant", 
        ABV: "12%",
        Final_Gravity: "1.015",
        Number_of_bottles: "14",
    }
];

document.querySelectorAll('.navbar a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Function to calculate how long a brew has been fermenting
function getFermentationTime(startDate) {
    let start = new Date(startDate);
    let now = new Date();
    let diffInMs = now - start;

    let days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Function to display brews and reminders
function displayBrews() {

    let displayBrews = document.getElementById("activeBrewsList");

    if (!displayBrews) return;

    let brewList = document.getElementById("activeBrewsList");
    let reminderList = document.getElementById("remindersList");

    brewList.innerHTML = ""; // Clear existing brew list
    if (reminderList) {
        reminderList.innerHTML = ""; // Clear only if it exists (on index.html)
    }

    const isActiveBrewsPage = window.location.pathname.includes("activeBrews.html");

    brews.forEach((brew) => {
        let brewLi = document.createElement("li");
        brewLi.classList.add("brew-item"); // Add class for styling

        // **Create main container for Text & Buttons**
        let brewInfoContainer = document.createElement("div");
        brewInfoContainer.classList.add("brew-info-container"); // CSS will control layout

        // **Create Barrel GIF**
        let barrelGif = document.createElement("img");
        barrelGif.src = "src/barrel.gif"; 
        barrelGif.alt = "Brewing Barrel";
        barrelGif.classList.add("barrel");

        // **Create Brew Text**
        let brewTextContainer = document.createElement("div");
        brewTextContainer.classList.add("brew-text-container");

        let brewName = document.createElement("strong");
        brewName.textContent = brew.name;

        let gravityText = document.createElement("span");
        gravityText.textContent = ` - Latest Gravity: ${brew.latestGravity}`;

        let timerSpan = document.createElement("span");

        function updateTimer() {
            timerSpan.textContent = ` - Fermenting for ${getFermentationTime(brew.startDate)}`;
        }
        setInterval(updateTimer, 1000);
        updateTimer();

        brewTextContainer.appendChild(brewName);
        brewTextContainer.appendChild(gravityText);
        brewTextContainer.appendChild(timerSpan);

        // **Create Buttons (Only on Active Brews Page)**
        if (isActiveBrewsPage) {
            let buttonContainer = document.createElement("div");
            buttonContainer.classList.add("button-container");

            const bottleBrewButton = document.createElement("button");
            bottleBrewButton.textContent = "Bottle Brew";
            bottleBrewButton.classList.add("bottleBrewBtn");
            bottleBrewButton.setAttribute("data-id", brew.id);

            const finishBrewButton = document.createElement("button");
            finishBrewButton.textContent = "Finish Brew";
            finishBrewButton.classList.add("finishBrewBtn");
            finishBrewButton.setAttribute("data-id", brew.id);

            buttonContainer.appendChild(bottleBrewButton);
            buttonContainer.appendChild(finishBrewButton);

            // Append buttons **below** the text
            brewTextContainer.appendChild(buttonContainer);
        }

        // **Assemble Brew Info & Barrel**
        brewInfoContainer.appendChild(brewTextContainer); // Left side: Text + Buttons
        brewInfoContainer.appendChild(barrelGif); // Right side: Barrel

        brewLi.appendChild(brewInfoContainer);
        brewList.appendChild(brewLi);

        if (window.location.pathname.includes("index.html") && brew.reminders.length > 0) {
            brew.reminders.forEach((reminder) => {
                let reminderLi = document.createElement("li");
        
                let strongName = document.createElement("strong");
                strongName.textContent = brew.name; // Make name bold
        
                reminderLi.appendChild(strongName);
                reminderLi.appendChild(document.createTextNode(`: ${reminder}`)); // Add reminder text
        
                reminderList.appendChild(reminderLi);
            });
        }
        
    });
}
// Call the function when the page loads
displayBrews();

function displayStorage() {
    let storageList = document.getElementById("storageList");

    if (!storageList) return; // Exit if the element does not exist

    storageList.innerHTML = ""; // Clear existing storage list

    storage.forEach((batch) => {
        let batchLi = document.createElement("li");
        batchLi.classList.add("storage-item");

        let storageInfoContainer = document.createElement("div");
        storageInfoContainer.classList.add("storage-info-container");

        let batchName = document.createElement("strong");
        batchName.textContent = batch.name;

        let bottlesText = document.createElement("strong");
        bottlesText.textContent = ` - Bottles: ${batch.Number_of_bottles}`;

        let abvText = document.createElement("span");
        abvText.textContent = ` - ABV: ${batch.ABV}`;

        let fgText = document.createElement("span");
        fgText.textContent = ` - Final Gravity: ${batch.Final_Gravity}`;

       

        storageInfoContainer.appendChild(batchName);
        storageInfoContainer.appendChild(bottlesText);
        storageInfoContainer.appendChild(abvText);
        storageInfoContainer.appendChild(fgText);
        

        batchLi.appendChild(storageInfoContainer);
        storageList.appendChild(batchLi);
    });
}

// **Call Function When Page Loads**
document.addEventListener("DOMContentLoaded", displayStorage);

// Function to handle displaying the bottling modal
function openBottlingModal(brewId) {
    const modal = document.getElementById('bottleModal');
    const closeModal = document.getElementById('closeModal');
    
    const brew = brews.find(b => b.id === brewId);

    // Make the modal visible
    modal.style.display = 'block';
    
    // Attach event handler for the form submission
    document.querySelector("#bottleModal button").onclick = function () {
        const dateBottled = document.getElementById('bottledDate').value;
        const numBottles = document.getElementById('numberOfBottles').value;
        const finalABV = document.getElementById('finalABV').value;
        const finalGravity = document.getElementById('finalGravity').value;
        const notes = document.getElementById('notes').value;

        // Add bottling info to the selected brew
        brew.bottlings.push({
            dateBottled,
            numBottles,
            finalABV,
            finalGravity,
            notes
        });

        // Close the modal
        modal.style.display = 'none';

        // Optionally display or store the bottling information
        console.log(brew.bottlings);

        // Update the brews list
        displayBrews();
        
    };

    // Event listener to close the modal when the close button is clicked
    closeModal.onclick = function () {
        modal.style.display = 'none';
    };

    // Event listener to close the modal if the user clicks outside of it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Function to handle opening the Finish Brew modal
function openFinishBrewModal(brewId) {
    const modal = document.getElementById('finishBrewModal');
    const finishBrewText = document.getElementById('finishBrewText');
    const finishBrewYes = document.getElementById('finishBrewYes');
    const finishBrewNo = document.getElementById('finishBrewNo');
    const closeFinishModal = document.getElementById('closeFinishBrewModal'); // Close button for finish brew modal
    
    const brew = brews.find(b => b.id === brewId);
    
    // Set the text inside the finish brew modal
    finishBrewText.textContent = `Are you sure you want to finish brewing ${brew.name}?`;

    // Show the modal
    modal.style.display = 'block';

    // Handle "Yes" button click
    finishBrewYes.onclick = function () {
        // Mark the brew as finished (this is just an example, you can add logic as needed)
        brew.finished = true;

        // Close the modal
        modal.style.display = 'none';

        // Update the brews list
        displayBrews();
    };

    // Handle "No" button click
    finishBrewNo.onclick = function () {
        // Close the modal
        modal.style.display = 'none';
    };

    // Close the modal when the X button is clicked
    closeFinishModal.onclick = function () {
        modal.style.display = 'none';
    };
}

// Event listener for clicking "Bottle Brew" button
document.addEventListener("DOMContentLoaded", function () {
    let activeBrewsList = document.querySelector("#activeBrewsList");

    if (activeBrewsList) {
        activeBrewsList.addEventListener("click", function (e) {
            if (e.target && e.target.classList.contains("bottleBrewBtn")) {
                const brewId = parseInt(e.target.getAttribute("data-id"));
                openBottlingModal(brewId);
            }
            if (e.target && e.target.classList.contains("finishBrewBtn")) {
                const brewId = parseInt(e.target.getAttribute("data-id"));
                openFinishBrewModal(brewId);
            }
        });
    }
});


// Initially call displayBrews
displayBrews();
