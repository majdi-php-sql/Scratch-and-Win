/**
Scratch and Win Game - Project Description & Algorithm
Project Overview
I developed a Scratch and Win game using HTML, CSS, and JavaScript that allows users to reveal hidden images by scratching off a black cover. The scratching effect is smooth and realistic, mimicking the experience of physically scratching a lottery ticket. Each time the page is refreshed, the images are randomly repositioned, ensuring a dynamic experience.

Key Features
Scratch-Off Effect: Clicking and dragging the mouse gradually erases the black cover, revealing the hidden image underneath.
Realistic Scratching: The erased area is circular and gradually clears with every movement, just like using a real eraser.
Randomized Image Placement: Every time the page reloads, the images are shuffled, creating a new arrangement.
Smooth User Experience: Uses the canvas element to achieve a high-performance erasing effect.

How I Built It
I structured the project into three main files:

HTML (index.html) - Defines the game layout and structure.
CSS (style.css) - Styles the images, black covers, and grid layout.
JavaScript (script.js) - Handles the scratch effect and image randomization.

All images are stored inside an images/ folder, and the game automatically loads and shuffles them on page refresh.

Detailed Algorithm
Step 1: Load the Images
I created an array of image file paths.
I shuffled the array using sort(() => Math.random() - 0.5), ensuring a new arrangement on each refresh.
I dynamically generated image cards for each image and inserted them into the game container.
Step 2: Apply the Scratch Cover
For each image, I created a canvas element that sits on top of the image.
I filled the canvas with a black rectangle to completely cover the image.
Each canvas was set to the same width and height as the image, ensuring full coverage.
Step 3: Implement the Scratching Effect
I detected when the user presses the mouse down (mousedown) on the canvas.
While the user moves the mouse (mousemove), I tracked the cursor position relative to the canvas.
I used arc(x, y, 15, 0, 2 * Math.PI) to erase a small circular portion of the black cover at the cursor position.
The "destination-out" blending mode was applied to create a transparent effect, revealing the image below.
If the user lifts the mouse (mouseup or mouseleave), scratching stops until they click again.
Step 4: Ensure Smooth Interaction
Prevented accidental erasing by only allowing scratching when the user holds down the mouse button.
Stopped erasing when the user releases the mouse, ensuring precise control.
Limited the erasing radius to 15 pixels, making the effect gradual and realistic.
Final Thoughts
By combining HTML, CSS, and JavaScript, I created an engaging Scratch and Win game with a realistic scratch-off effect. The use of the canvas element allowed me to efficiently manipulate pixel-based erasing while keeping performance smooth. The image randomization feature ensures a fresh experience on every playthrough.

Future Improvements:
Add a winning condition (e.g., if a specific image is revealed).
Implement a mobile-friendly touch-based scratch effect.
Introduce animations or sound effects for a richer user experience.

This project showcases my ability to create interactive JavaScript-based applications with dynamic elements, smooth UI effects, and user engagement in mind. 

Majdi M. S. Awad
*/
document.addEventListener("DOMContentLoaded", function () {
    const images = [
        'images/1.PNG', 'images/2.JPG', 'images/3.PNG', 'images/4.PNG',
    'images/5.PNG', 'images/6.PNG', 'images/7.PNG', 'images/8.PNG',
    'images/9.PNG', 'images/10.JPG', 'images/11.JPG', 'images/12.PNG','images/13.PNG', 'images/14.JPG', 'images/15.JPG',
	'images/16.PNG'
    ];

    // Shuffle images on page load
    images.sort(() => Math.random() - 0.5);

    const gameContainer = document.getElementById("gameContainer");

    images.forEach(imgSrc => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Hidden Image";

        const canvas = document.createElement("canvas");
        canvas.classList.add("scratch-cover");
        canvas.width = 140;
        canvas.height = 140;
        
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        card.appendChild(img);
        card.appendChild(canvas);
        gameContainer.appendChild(card);

        let isScratching = false;

        canvas.addEventListener("mousedown", function () {
            isScratching = true;
        });

        canvas.addEventListener("mouseup", function () {
            isScratching = false;
        });

        canvas.addEventListener("mouseleave", function () {
            isScratching = false;
        });

        canvas.addEventListener("mousemove", function (event) {
            if (!isScratching) return;

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fill();
        });
    });
});
