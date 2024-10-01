const containerEl = document.getElementsByClassName('container')[0];
const inptEl = document.getElementById('inpt');
const subcontainer = document.createElement('div');

// Append the subcontainer to the container
containerEl.appendChild(subcontainer); 

const displayData = (dataList) => {
    subcontainer.innerHTML = ''; // Clear previous content
    dataList.forEach(element => {
        const characterDiv = document.createElement('div'); // New div for each character
        characterDiv.classList.add('subcontainer'); // Add class for styling

        const headingEl = document.createElement('h1'); // Create a new heading for each character
        const para = document.createElement('p'); // Create a new paragraph for each character
        const imgEl = document.createElement('img'); // Create a new image for each character
        const deleteIconEl = document.createElement('h4'); // Create delete icon
        
        headingEl.innerHTML = element.name; // Set character name
        para.innerHTML = element.gender; // Set character gender
        deleteIconEl.textContent = '✕'; // Delete icon content

        // Set attributes for the image
        imgEl.src = element.image ? element.image : 'https://w7.pngwing.com/pngs/901/413/png-transparent-gallery-images-photos-thumbnail.png';
        imgEl.alt = element.name; // Set alt attribute for the image

        // Add classes for styling
        imgEl.classList.add('character-image'); // Class for the image
        deleteIconEl.classList.add('delete-icon'); // Class for the delete icon

        // Event listener for the delete icon to remove the item
        deleteIconEl.addEventListener('click', () => {
            const updatedDataList = dataList.filter(item => item.name !== element.name);
            displayData(updatedDataList); // Re-render the updated list
        });

        // Append the elements to the characterDiv
        characterDiv.appendChild(imgEl);
        characterDiv.appendChild(headingEl); 
        characterDiv.appendChild(para); 
        characterDiv.appendChild(deleteIconEl);
        
        // Append the characterDiv to the subcontainer
        subcontainer.appendChild(characterDiv);
    });
}

const filteringData = (searchInput, dataList) => {
    const filteredData = dataList.filter(element => {
        return element.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    
    displayData(filteredData); // Display the filtered data
}

let dataList = [];
const getCastingData = async () => {
    const url = 'https://hp-api.onrender.com/api/characters';
    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            console.log(response.status);
            return;
        }
        const data = await response.json();
        console.log(data);

        dataList = data; // Store the data for filtering
        displayData(dataList); // Display all characters initially
        
        inptEl.addEventListener('input', (event) => {
            filteringData(event.target.value, dataList); // Call filteringData with the input value
        });
        
    } catch (e) {
        console.log(e);
    }
}

window.addEventListener('load', () => {
    getCastingData();
});
