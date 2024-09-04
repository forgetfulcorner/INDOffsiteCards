let ppNeueMachina;
let disketMono;

let profilePics = {}; // Object to hold profile pictures

let firstNames = [];
let restOfNames = [];
let titles = [];
let departments = [];
let depts = [];
let pronouns = [];
let cities = [];
let yearsOfService = [];
let taskForces = [];
let teamName = [];

let currentIndex = 0; // Index to track the current entry being displayed

// Define colors for each task force
const taskForceColors = {
	"COBRA FORCE": "#191919",
	"TIGER FORCE": "#FF2D2D",
	"WOLF FORCE": "#F0F3F7",
	"EAGLE FORCE": "#367AFE",
	DEFAULT: "#F1F1F1", // Fallback color
};

function preload() {
	// Load the fonts
	ppNeueMachina = loadFont("PPNeueMachina-InktrapRegular.otf");
	ppNeueMachinaUltrabold = loadFont("PPNeueMachina-InktrapUltrabold.otf");
	disketMono = loadFont("Disket-Mono-Bold.ttf");

	// Use the new data directly
	let data = [
		[
			"Jen",
			"Kelmer",
			"Director of Learning, Talent & Culture",
			"Unit Ops",
			"Operate",
			"she/her",
			"Tampa",
			"7+ Years",
			"Cobra Force",
			"Team A",
		],
		[
			"Rachel",
			"Broder",
			"Interim Head Of People",
			"People",
			"Direct",
			"she/her",
			"NYC",
			"7+ Years",
			"Tiger Force",
			"Team B",
		],
		[
			"Daniel",
			"du Moulin",
			"General Manager",
			"Unit Ops",
			"Operate",
			"he/him",
			"Atlanta",
			"2+ Years",
			"Eagle Force",
			"Team C",
		],
		[
			"Natalie",
			"Levine",
			"Senior Real Estate Manager",
			"Real Estate",
			"Expand",
			"she/her",
			"NYC",
			"3+ Years",
			"Wolf Force",
			"Team D",
		],
		[
			"John",
			"Ferry",
			"Associate Director, Strategic Finance",
			"FP&A",
			"Analyze",
			"he/him",
			"NYC",
			"2+ Years",
			"Cobra Force",
			"Team E",
		],
		[
			"Matt",
			"Roth",
			"Assistant General Manager",
			"Unit Ops",
			"Operate",
			"he/him",
			"NYC",
			"2+ Years",
			"Cobra Force",
			"Team A",
		],
		[
			"Michelle",
			"Nagy",
			"Area Sales Lead",
			"New Business",
			"Expand",
			"she/her",
			"DMV",
			"1+ Year",
			"Tiger Force",
			"Team B",
		],
		[
			"Peter",
			"Feytser",
			"Principal Product Manager",
			"Product",
			"Deliver",
			"he/him",
			"Confidential",
			"8+ Years",
			"Wolf Force",
			"Team C",
		],
		[
			"Fernanda",
			"Garcia",
			"Member Experience Manager",
			"Unit Ops",
			"Operate",
			"she/her",
			"DMV",
			"1+ Year",
			"Cobra Force",
			"Team D",
		],
	];

	// Store each column in separate lists
	for (let i = 0; i < data.length; i++) {
		firstNames.push(data[i][0]);
		restOfNames.push(data[i][1]);
		titles.push(data[i][2]);
		departments.push(data[i][3]);
		depts.push(data[i][4]);
		pronouns.push(data[i][5]);
		cities.push(data[i][6]);
		yearsOfService.push(data[i][7]);
		taskForces.push(data[i][8]);
		teamName.push(data[i][9]);
	}
}

function setup() {
	createCanvas(1200, 900);
	drawGrid();
	background("#F1F1F1");
	displayCurrentEntry(); // Display the first entry initially
	drawPlusGrid();
}

function draw() {
	// No longer needed as we handle everything in displayCurrentEntry()
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
	let teamNameText = teamName[currentIndex].toUpperCase(); // Task Force in all caps

	// TEXT FOR FIRST AND LAST NAMES
	textFont(ppNeueMachinaUltrabold);
	textSize(64);
	let firstNameTextWidth = textWidth(firstNameText); // Calculate the width of the first name
	text(firstNameText, 50, 110, 1150, 200); // Display first name
	text(lastNameText, 50, 180, 1150, 200); // Display last name

	// TEXT FOR PRONOUNS
	push();
	textFont(ppNeueMachina);
	textSize(32);
	let pronounStartX = 50 + firstNameTextWidth + 20; // Position pronouns with some padding after the first name
	text(pronounText, pronounStartX, 110, 1150, 200);
	pop();

	// TEXT FOR ROLE AND CITY
	push();
	textSize(32);
	textFont(ppNeueMachina);
	textAlign(CENTER, CENTER);
	let roleCityFormatted = `${roleText}\n-\n${cityText}`; // Format Role and City
	text(roleCityFormatted, 350, 225, 825, 235);
	pop();

	// Generate ID
	let firstThreeFirstName = firstNameText.substring(0, 3);
	let formattedYears = yearsOfService[currentIndex]
		.replace("+ Years", "")
		.replace("+ Year", "");
	let formattedYearsWithLeadingZero = formattedYears.padStart(3, "0"); // Ensure it's 3 digits
	let firstThreeDepartment = departmentText.substring(0, 3);
	let id = `${firstThreeFirstName}${formattedYearsWithLeadingZero}${firstThreeDepartment}`;

	// Add space between each character
	let idWithSpaces = id.split("").join(" ");

	// TEXT FOR ID
	push();
	textSize(22);
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
	text(teamNameText, 350, 460, 412.5, 90);
	pop();

	// TEXT FOR TASK FORCE
	// CHANGE TO DEFAULT COLOR IF TASK FORCE IS COBRA FORCE

	textColor =
		taskForceText === "COBRA FORCE"
			? "#F1F1F1"
			: "#000000" || taskForceColors["DEFAULT"];

	push();
	textSize(32);
	fill(textColor);
	textFont(ppNeueMachinaUltrabold);
	textAlign(CENTER, CENTER);
	text(taskForceText, 762, 460, 413, 90);
	pop();
}

function drawGrid() {
	push();
	strokeWeight(1.5);
	noFill();

	// Draw rectangles with no fill
	rect(25, 25, 1150, 200);
	rect(25, 225, 325, 325);
	rect(350, 225, 825, 235);
	rect(350, 460, 412.5, 90);
	rect(762, 460, 413, 90);
	rect(25, 550, 325, 325);
	rect(350, 550, 825, 325);
	pop();

	// Set fill color based on task force
	const currentTaskForce = taskForces[currentIndex].toUpperCase();
	const fillColor =
		taskForceColors[currentTaskForce] || taskForceColors["DEFAULT"];

	// Draw rectangles with the fill color
	push();
	fill(fillColor);
	rect(762, 460, 413, 90); // Task force rectangle
	rect(350, 550, 825, 325); // Team rectangle
	pop();
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		currentIndex = currentIndex > 0 ? currentIndex - 1 : firstNames.length - 1;
		displayCurrentEntry(); // Update display with the new entry
	} else if (keyCode === RIGHT_ARROW) {
		currentIndex = currentIndex < firstNames.length - 1 ? currentIndex + 1 : 0;
		displayCurrentEntry(); // Update display with the new entry
	}
}

function drawPlusGrid() {
	let plusSize = 6; // Size of the plus sign
	let rectX = 25 + 12.5;
	let rectY = 550 + 12.5;
	let rectWidth = 300;
	let rectHeight = 300;

	let numRows = 10;
	let numCols = 10;

	let cellWidth = rectWidth / numCols;
	let cellHeight = rectHeight / numRows;

	// Variables for the size of the plus sign
	let verticalLineLength = plusSize; // Length of the vertical line of the plus sign
	let horizontalLineLength = plusSize; // Length of the horizontal line of the plus sign

	// Calculate offset to center the grid
	let offsetX = (rectWidth - cellWidth * numCols) / 2;
	let offsetY = (rectHeight - cellHeight * numRows) / 2;

	push();
	strokeWeight(1); // 1 px stroke weight

	// Draw the plus signs in a grid pattern
	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			let x = rectX + offsetX + col * cellWidth + cellWidth / 2;
			let y = rectY + offsetY + row * cellHeight + cellHeight / 2;

			// Set the color for the plus sign
			stroke("#8A8A8A");

			// Draw vertical line of the plus sign
			line(x, y - verticalLineLength / 2, x, y + verticalLineLength / 2);

			// Draw horizontal line of the plus sign
			line(x - horizontalLineLength / 2, y, x + horizontalLineLength / 2, y);
		}
	}
	pop();
}
