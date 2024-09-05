let saveAllImages = true; // Toggle this variable to enable or disable saving all images
let saveDelay = 200; // Delay in milliseconds between saves
let draftMode = true;
let currentIndex = 287; // Index to track the current entry being displayed

function saveAllEntries() {
	if (saveAllImages) {
		let i = 0; // Start index

		function saveNextEntry() {
			if (i < firstNames.length) {
				currentIndex = i;
				displayCurrentEntry(); // Display the entry to ensure the canvas is updated

				// Generate a filename for the entry
				let fileName = `${restOfNames[i]}_${firstNames[i]}_Front.png`;
				saveCanvas(fileName); // Save the canvas with the generated filename

				i++; // Move to the next index
				setTimeout(saveNextEntry, saveDelay); // Call the function again after the delay
			}
		}

		saveNextEntry(); // Start the saving process
	}
}

let ppNeueMachina;
let ppNeueMachinaUltrabold;
let disketMono;

let profilePics = {}; // Object to hold profile pictures
let profilePicsPath = []; // Array to hold image paths

let firstNames = [];
let restOfNames = [];
let titles = [];
let departments = [];
let depts = [];
let pronouns = [];
let regions = [];
let cities = [];
let yearsOfService = [];
let taskForces = [];
let teamName = [];
let employeeNum = [];
let images = {}; // Object to hold image objects
let imagesLoaded = {}; // Track loaded images

let fillColor;
// Define colors for each task force
const taskForceColors = {
	"COBRA FORCE": "#191919",
	"TIGER FORCE": "#D53E22",
	"WOLF FORCE": "#F0F3F7",
	"EAGLE FORCE": "#2854C5",
	DEFAULT: "#F1F1F1", // Fallback color
};

let table; // p5.Table to hold the CSV data

function preload() {
	// Load the fonts
	ppNeueMachina = loadFont("Orbitron-Regular.ttf");
	ppNeueMachinaUltrabold = loadFont("Orbitron-Black.ttf");
	disketMono = loadFont("Disket-Mono-Bold.ttf");

	// Load the CSV data
	table = loadTable("data3.csv", "csv", "header");
}

function setup() {
	createCanvas(1200, 900);
	background("#F1F1F1");
	angleMode(DEGREES);
	drawGrid();
	loadData(); // Load data from the CSV
	currentNumText();
}

function draw() {
	// No longer needed as we handle everything in displayCurrentEntry()
}

function loadData() {
	// Clear existing data
	firstNames = [];
	restOfNames = [];
	titles = [];
	departments = [];
	depts = [];
	regions = [];
	pronouns = [];
	cities = [];
	yearsOfService = [];
	taskForces = [];
	teamName = [];
	employeeNum = [];
	images = {}; // Reset images object
	imagesLoaded = {}; // Reset loaded images tracker

	// Read the CSV data
	for (let r = 0; r < table.getRowCount(); r++) {
		let row = table.getRow(r);
		firstNames.push(row.getString(0));
		restOfNames.push(row.getString(1));
		titles.push(row.getString(2));
		departments.push(row.getString(3));
		pronouns.push(row.getString(4));
		cities.push(row.getString(5));
		yearsOfService.push(row.getString(6));
		taskForces.push(row.getString(7));
		teamName.push(row.getString(8));
		regions.push(row.getString(11));
		depts.push(row.getString(12));
		employeeNum.push(row.getString(13));

		// Append "PORTRAITS/" to the image path
		let imagePath = `PORTRAITS/${row.getString(10)}`;
		profilePicsPath.push(imagePath);
		loadImageAsync(imagePath, row.getString(10)); // Load image asynchronously
	}
}

function loadImageAsync(imagePath, fileName) {
	loadImage(
		imagePath,
		(img) => {
			images[fileName] = img; // Use file name as key
			imagesLoaded[fileName] = true;
			checkImagesLoaded(); // Check if all images are loaded
		},
		(err) => {
			console.log(`Failed to load image ${imagePath}:`, err);
			imagesLoaded[fileName] = true; // Mark as loaded to not stall
			checkImagesLoaded(); // Check if all images are loaded
		}
	);
}

function checkImagesLoaded() {
	if (profilePicsPath.every((path) => imagesLoaded[path.split("/").pop()])) {
		displayCurrentEntry(); // Display the first entry after all images are loaded
	}
}

function displayCurrentEntry() {
	background(220); // Clear the canvas
	drawGrid(); // Redraw the grid

	// Convert everything to uppercase
	let firstNameText = firstNames[currentIndex].toUpperCase(); // First name in all caps
	let lastNameText = restOfNames[currentIndex].toUpperCase(); // Last name in all caps
	let pronounText = pronouns[currentIndex].toUpperCase(); // Pronouns in all caps
	let roleText = titles[currentIndex].toUpperCase(); // Role in all caps
	let cityText = cities[currentIndex].toUpperCase(); // City in all caps
	let departmentText = departments[currentIndex].toUpperCase(); // Department in all caps
	let taskForceText = taskForces[currentIndex].toUpperCase(); // Task Force in all caps
	let teamNameText = teamName[currentIndex].toUpperCase(); // Team Name in all caps

	// Display image with 50% opacity
	let imageFileName = table.getRow(currentIndex).getString(10); // Get the image file name
	if (images[imageFileName]) {
		push();
		tint(255, 200); // Apply 50% opacity
		blendMode(MULTIPLY); // Set blend mode to multiply
		image(images[imageFileName], 26, 226 - 60, 323, 323); // Draw the image
		pop();
	}

	// Determine text color based on task force
	const currentTaskForce = taskForces[currentIndex].toUpperCase();
	const textColor =
		currentTaskForce === "EAGLE FORCE" || currentTaskForce === "COBRA FORCE"
			? "#F1F1F1"
			: "#000000"; // Default color for other task forces

	// TEXT FOR ROLE AND CITY
	push();
	textSize(32);
	textLeading(33);
	textFont(ppNeueMachina);
	textAlign(CENTER, CENTER);
	let roleCityFormatted = `${roleText}\n-\n${cityText}`; // Format Role and City
	fill("#000000"); // Set text color
	text(roleCityFormatted, 25, 25, 1150, 140);
	pop();

	// Generate ID
	let firstThreeFirstName = firstNameText.substring(0, 3);
	let formattedYears = employeeNum[currentIndex];
	let formattedYearsWithLeadingZero = formattedYears.padStart(3, "0"); // Ensure it's 3 digits
	let firstThreeDepartment = departmentText.substring(0, 3);
	let id = `${firstThreeFirstName}${formattedYearsWithLeadingZero}${firstThreeDepartment}`;

	// Add space between each character
	let idWithSpaces = id.split("").join("  ");

	// TEXT FOR ID
	push();
	textSize(20);
	textFont(ppNeueMachina);
	textAlign(CENTER, CENTER);
	fill("#000000"); // ID text color
	text(idWithSpaces, 25, 800, 325, 90);
	pop();

	// TEXT FOR TEAM NAME
	push();
	textSize(32);
	textFont(ppNeueMachinaUltrabold);
	textAlign(CENTER, CENTER);
	fill("#000000"); // Set text color
	text(teamNameText, 350, 460 - 60, 412.5, 90);
	pop();

	// Set fill color based on task force
	fillColor = taskForceColors[currentTaskForce] || taskForceColors["DEFAULT"];

	// Draw rectangles with the fill color
	push();
	fill(fillColor);
	rect(350, 225 - 60, 825, 235); // Name rectangle
	pop();

	// TEXT FOR FIRST AND LAST NAMES
	push();
	textFont(ppNeueMachinaUltrabold);
	textSize(70);
	let firstNameTextWidth = textWidth(firstNameText); // Calculate the width of the first name
	fill(textColor); // Set text color
	text(firstNameText, 375, 125 + 160, 1150, 200); // Display first name
	textSize(40);
	text(lastNameText, 375, 175 + 160, 1150, 200); // Display last name
	pop();

	//350, 225, 825, 235

	// TEXT FOR PRONOUNS
	push();
	textFont(ppNeueMachina);
	textSize(40);
	let pronounStartX = 375 + firstNameTextWidth + 20; // Position pronouns with some padding after the first name
	fill(textColor); // Set text color
	text(pronounText, pronounStartX, 125 + 160, 1150, 200);
	pop();

	// TEXT FOR TASK FORCE
	push();
	textSize(32);
	fill("#000000"); // Set text color
	textFont(ppNeueMachinaUltrabold);
	textAlign(CENTER, CENTER);
	text(taskForceText, 762, 460 - 60, 413, 90);
	pop();

	currentNumText();

	// Draw shapes grid based on data
	let currentRegion = regions[currentIndex];
	let currentDept = depts[currentIndex];
	let currentDensity = 0.1 * (parseInt(yearsOfService[currentIndex]) + 2); // Default density
	let gridRows = parseInt(yearsOfService[currentIndex]) * 2 + 1; // Rows based on years of service + 3

	drawShapesGrid(
		0.5,
		currentRegion,
		currentDept,
		currentDensity,
		fillColor,
		gridRows
	);
}

function drawGrid() {
	push();
	strokeWeight(1.5);
	noFill();

	// Draw rectangles with no fill
	rect(25, 25, 1150, 140);
	rect(25, 225 - 60, 325, 325);
	rect(350, 225 - 60, 825, 235);
	rect(350, 460 - 60, 412.5, 90);
	rect(762, 460 - 60, 413, 90);
	rect(25, 550 - 60, 325, 325 + 60);
	rect(350, 550 - 60, 825, 325 + 60);
	pop();
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		currentIndex = currentIndex > 0 ? currentIndex - 1 : firstNames.length - 1;
		displayCurrentEntry(); // Update display with the new entry
	} else if (keyCode === RIGHT_ARROW) {
		currentIndex = currentIndex < firstNames.length - 1 ? currentIndex + 1 : 0;
		displayCurrentEntry(); // Update display with the new entry
	} else if (key === "s") {
		// Press 'S' to save all entries
		saveAllEntries();
	}
}

// Function to draw a grid of shapes based on scale, region, dept, density, fill color, and number of rows
function drawShapesGrid(scale, region, dept, density, fillColor, gridRows) {
	push();
	let baseDiameter = 100 * scale;
	let smallerDiameter = baseDiameter * 0.8;
	let spacing = 20 * scale;

	let gridCols = Math.ceil((895 / 385) * gridRows); // Calculate columns to maintain square grid within the reduced rectangle
	let cellSize = baseDiameter + spacing;

	// Apply buffer to region dimensions
	let buffer = 30;
	let regionX = 350 + buffer - (70 * 1) / gridRows;
	let regionY = 550 - 60 + buffer;
	let regionWidth = 825 - 2 * buffer;
	let regionHeight = 325 + 60 - 2 * buffer;

	if (fillColor === "#F0F3F7") {
		fillColor = "#000000";
	}

	fill(fillColor);
	noStroke();

	// Calculate the maximum grid size that fits within the buffered region
	let gridWidth = gridCols * cellSize;
	let gridHeight = gridRows * cellSize;

	// Calculate scaling factor if grid exceeds region dimensions
	let scaleX = regionWidth / gridWidth;
	let scaleY = regionHeight / gridHeight;

	let finalScale = min(scaleX, scaleY); // Take the smaller scale to ensure the grid fits

	// Recalculate the grid dimensions with the final scale
	cellSize *= finalScale;
	gridWidth = gridCols * cellSize;
	gridHeight = gridRows * cellSize;

	// Calculate the top-left position of the grid to center it within the buffered region
	let startX = regionX + (regionWidth - gridWidth) / 2;
	let startY = regionY + (regionHeight - gridHeight) / 2;

	// Custom shape rotation based on department
	let rotationAngle = getRotationAngle(dept);

	// Loop to create the grid with staggered rows
	for (let i = 0; i < gridCols; i++) {
		for (let j = 0; j < gridRows; j++) {
			// Offset every other row by half a cell size
			let x = startX + i * cellSize + cellSize / 2 + ((j % 2) * cellSize) / 2;
			let y = startY + j * cellSize + cellSize / 2;

			// Alternate between dept shape and region shape
			if ((i + j) % 2 === 0) {
				// Draw the dept shape
				drawCustomShape(x, y, rotationAngle, scale * finalScale);
			} else {
				// Draw the region shape
				drawRegionShape(
					x,
					y,
					baseDiameter * finalScale,
					smallerDiameter * finalScale,
					region
				);
			}
		}
	}
	pop();
}

// Function to get the rotation angle based on the department
function getRotationAngle(dept) {
	switch (dept) {
		case "OPERATE":
			return 0;
		case "SERVICE":
			return 60;
		case "DIRECT":
			return 120;
		case "ANALYZE":
			return 180;
		case "DELIVER":
			return 240;
		case "EXPAND":
			return 300;
		default:
			return 0; // Default rotation if dept is not recognized
	}
}

// Function to draw the region shape based on the provided region
function drawRegionShape(x, y, baseDiameter, smallerDiameter, region) {
	switch (region) {
		case "NAW":
			arc(x, y, baseDiameter, baseDiameter, 90, 270, CLOSE);
			break;
		case "EU":
			arc(x, y, baseDiameter, baseDiameter, 180, 360, OPEN);
			break;
		case "NAC":
			ellipse(x, y, smallerDiameter, smallerDiameter);
			break;
		case "ASIA":
			arc(x, y, baseDiameter, baseDiameter, 0, 180, OPEN);
			break;
		case "NAE":
			arc(x, y, baseDiameter, baseDiameter, -90, 90, CLOSE);
			break;
	}
}

// Function to draw the custom shape with rotation and scaling
function drawCustomShape(x, y, rotationAngle, scale) {
	let vertices = [
		{ x: 0, y: 28.868 * scale },
		{ x: 0, y: 86.603 * scale },
		{ x: 50 * scale, y: 115.47 * scale },
	];

	let centerX = (vertices[0].x + vertices[1].x + vertices[2].x) / 3;
	let centerY = (vertices[0].y + vertices[1].y + vertices[2].y) / 3;

	push();
	translate(x, y);
	rotate(rotationAngle);

	beginShape();
	for (let i = 0; i < vertices.length; i++) {
		vertex(vertices[i].x - centerX, vertices[i].y - centerY);
	}
	endShape(CLOSE);

	pop();
}

function saveCurrentImage() {
	if (saveImages) {
		let fileName = `entry_${currentIndex}.png`; // Create a unique file name for each entry
		saveCanvas(fileName); // Save the current canvas as an image
	}
}

function currentNumText() {
	if (draftMode) {
		push();
		textSize(22);
		fill("#000000"); // Set text color
		textFont(ppNeueMachina);
		textAlign(CENTER, CENTER);
		text(currentIndex + 2, 1150, 887);
		pop();
	}
}
