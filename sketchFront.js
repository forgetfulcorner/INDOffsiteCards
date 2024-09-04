let ppNeueMachina;
let disketMono;

let profilePics = {}; // Object to hold profile pictures
let profilePicsPath;

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

let fillColor;
// Define colors for each task force
const taskForceColors = {
	"COBRA FORCE": "#191919",
	"TIGER FORCE": "#FF2D2D",
	"WOLF FORCE": "#F0F3F7",
	"EAGLE FORCE": "#367AFE",
	DEFAULT: "#F1F1F1", // Fallback color
};

let table; // p5.Table to hold the CSV data

function preload() {
	// Load the fonts
	ppNeueMachina = loadFont("PPNeueMachina-InktrapRegular.otf");
	ppNeueMachinaUltrabold = loadFont("PPNeueMachina-InktrapUltrabold.otf");
	disketMono = loadFont("Disket-Mono-Bold.ttf");

	// Load the CSV data
	table = loadTable("data.csv", "csv", "header");
}

function setup() {
	createCanvas(1200, 900);
	background("#F1F1F1");
	drawGrid();
	loadData(); // Load data from the CSV
	displayCurrentEntry(); // Display the first entry initially
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
	pronouns = [];
	cities = [];
	yearsOfService = [];
	taskForces = [];
	teamName = [];

	// Read the CSV data
	for (let r = 0; r < table.getRowCount(); r++) {
		let row = table.getRow(r);
		firstNames.push(row.getString(0));
		restOfNames.push(row.getString(1));
		titles.push(row.getString(2));
		departments.push(row.getString(3));
		depts.push(row.getString(4));
		pronouns.push(row.getString(5));
		cities.push(row.getString(6));
		yearsOfService.push(row.getString(7));
		taskForces.push(row.getString(8));
		teamName.push(row.getString(9));
	}
}

function generateImgPath() {
	// Convert everything to uppercase
	let firstNameText = firstNames[currentIndex].toUpperCase(); // First name in all caps
	let lastNameText = restOfNames[currentIndex].toUpperCase(); // Last name in all caps
	let pronounText = pronouns[currentIndex].toUpperCase(); // Pronouns in all caps
	let roleText = titles[currentIndex].toUpperCase(); // Role in all caps
	let cityText = cities[currentIndex].toUpperCase(); // City in all caps
	let departmentText = departments[currentIndex].toUpperCase(); // Department in all caps
	let taskForceText = taskForces[currentIndex].toUpperCase(); // Task Force in all caps
	let teamNameText = teamName[currentIndex].toUpperCase(); // Task Force in all caps

	console.log;
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

	// TEXT FOR TASK FORCE
	// CHANGE TO DEFAULT COLOR IF TASK FORCE IS COBRA FORCE

	let textColor =
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
