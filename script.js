// Define probabilities outside of event handlers
var probabilities = [0.4, 0.3, 0.5, 0.3, 0.3, 0.3, 0.4, 0.5, 0.4, 0.5, 0.6, 0.8, 0.7, 0.3, 0.8, 0.5, 0.8, 0.5, 0.8, 0.5]; 

function weightedRandomIndex(probabilities) {
    var sum = 0;
    probabilities.forEach(function(probability) {
        sum += probability;
    });
    
    var rand = Math.random() * sum;
    for (var i = 0; i < probabilities.length; i++) {
        rand -= probabilities[i];
        if (rand < 0) return i;
    }

    return probabilities.length - 1; // Return last index if no others are selected
}

function showImageAndName() {
    // Pick a random name and image
    let items = document.querySelectorAll('#name-image-map div');
    let index = weightedRandomIndex(probabilities); // Use our custom function
    let item = items[index];
    let name = item.getAttribute('data-name');
    let imagePath = item.getAttribute('data-image-path');

    // Set the name and image
    document.querySelector('#banner-name').innerText = name;
    document.querySelector('#banner-image').src = imagePath;

    // Reset and re-trigger the animation
    let container = document.querySelector('#image-container');
    container.style.animation = 'none';

    setTimeout(function() {
        // Check which animation was last played and play the other one
        if(container.style.animationName === 'fadeInSlideIn') {
            container.style.animation = 'fadeInSlideIn2 0.5s forwards';
        } else {
            container.style.animation = 'fadeInSlideIn 0.5s forwards';
        }
    }, 10);
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.action-button').addEventListener('click', function() {
        this.style.display = 'none'; // hide the button

        // Show the image and name
        document.querySelector('#image-container').style.display = 'flex';
        document.querySelector('#refresh-button').style.display = 'block';  // Show the refresh button

        showImageAndName(); // Set the initial image and name
    });

    document.querySelector('#refresh-button').addEventListener('click', showImageAndName);
});
