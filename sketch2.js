let ppNeueMachina;
let disketMono;
let taskForceBGs = {};  // Object to hold images for different task forces
let profilePics = {};   // Object to hold profile pictures

// Variables to hold images for Years, Regions, and Departments
let yearsImages = {};
let regionsImages = {};
let deptImages = {};

let firstNames = [];
let restOfNames = [];
let titles = [];
let departments = [];
let depts = [];
let pronouns = [];
let cities = [];
let regions = [];
let yearsOfService = [];
let taskForces = [];

// Define the coordinates and size for the profile picture rectangle
const picX = 25;
const picY = 545;
const picWidth = 250;
const picHeight = 330;

function preload() {
  // Load the fonts
  ppNeueMachina = loadFont('PPNeueMachina-InktrapRegular.otf');
  disketMono = loadFont('Disket-Mono-Bold.ttf');
  
  // Load the background images for different task forces
  taskForceBGs['A'] = loadImage('TASK FORCE 1.png');
  taskForceBGs['B'] = loadImage('TASK FORCE 2.png');
  taskForceBGs['C'] = loadImage('TASK FORCE 3.png');
  taskForceBGs['D'] = loadImage('TASK FORCE 4.png');
  
  // Load the images corresponding to Years of Service from the MODULES subfolder
  yearsImages['1+ Year'] = loadImage('/MODULES/YEARS 3.png');
  yearsImages['2+ Years'] = loadImage('/MODULES/YEARS 4.png');
  yearsImages['3+ Years'] = loadImage('/MODULES/YEARS 5.png');
  yearsImages['4+ Years'] = loadImage('/MODULES/YEARS 6.png');
  yearsImages['5-6+ Years'] = loadImage('/MODULES/YEARS 7.png');
  yearsImages['7+ Years'] = loadImage('/MODULES/YEARS 8.png');
  yearsImages['8+ Years'] = loadImage('/MODULES/YEARS 9.png');
  
  // Load the images corresponding to Regions from the MODULES subfolder
  regionsImages['ASIA'] = loadImage('/MODULES/REGIONS_ASIA.png');
  regionsImages['EU'] = loadImage('/MODULES/REGIONS_EU.png');
  regionsImages['NA-E'] = loadImage('/MODULES/REGIONS_NAE.png');
  regionsImages['NA-C'] = loadImage('/MODULES/REGIONS_NAC.png');
  regionsImages['NA-W'] = loadImage('/MODULES/REGIONS_NAW.png');
  
  // Load the images corresponding to Departments from the MODULES subfolder
  deptImages['Deliver'] = loadImage('/MODULES/DEPT DELIVER.png');
  deptImages['Expand'] = loadImage('/MODULES/DEPT EXPAND.png');
  deptImages['Direct'] = loadImage('/MODULES/DEPT DIRECT.png');
  deptImages['Analyze'] = loadImage('/MODULES/DEPT ANALYZE.png');
  deptImages['Operate'] = loadImage('/MODULES/DEPT OPERATE.png');
  deptImages['Service'] = loadImage('/MODULES/DEPT SERVICE.png');

  // Load profile pictures from the PORTRAITS folder
  profilePics['Daniel du Moulin'] = loadImage('/PORTRAITS/Daniel du Moulin.jpg');
  profilePics['Fernanda Garcia'] = loadImage('/PORTRAITS/Fernanda Garcia.jpg');
  profilePics['Jen Kelmer'] = loadImage('/PORTRAITS/Jen Kelmer.jpg');
  profilePics['John Ferry'] = loadImage('/PORTRAITS/John Ferry.jpg');
  profilePics['Matt Roth'] = loadImage('/PORTRAITS/Matt Roth.jpg');
  profilePics['Michelle Nagy'] = loadImage('/PORTRAITS/Michelle Nagy.jpg');
  profilePics['Natalie Levine'] = loadImage('/PORTRAITS/Natalie Levine.jpg');
  profilePics['Peter Feytser'] = loadImage('/PORTRAITS/Peter Feytser.jpg');
  profilePics['Rachel Broder'] = loadImage('/PORTRAITS/Rachel Broder.jpg');

  // Use the new data directly
  let data = [
    ['Jen', 'Kelmer', 'FALSE', 'Director of Learning, Talent & Culture', 'Unit Ops', 'Operate', 'she/her', 'Tampa', 'NA-E', '7+ Years', 'A'],
    ['Rachel', 'Broder', 'FALSE', 'Interim Head Of People', 'People', 'Direct', 'she/her', 'NYC', 'ASIA', '7+ Years', 'B'],
    ['Daniel', 'du Moulin', 'FALSE', 'General Manager', 'Unit Ops', 'Operate', 'he/him', 'Atlanta', 'EU', '2+ Years', 'D'],
    ['Natalie', 'Levine', 'FALSE', 'Senior Real Estate Manager', 'Real Estate', 'Expand', 'she/her', 'NYC', 'NA-C', '3+ Years', 'C'],
    ['John', 'Ferry', 'FALSE', 'Associate Director, Strategic Finance', 'FP&A', 'Analyze', 'he/him', 'NYC', 'NA-E', '2+ Years', 'A'],
    ['Matt', 'Roth', 'FALSE', 'Assistant General Manager', 'Unit Ops', 'Operate', 'he/him', 'NYC', 'NA-E', '2+ Years', 'A'],
    ['Michelle', 'Nagy', 'FALSE', 'Area Sales Lead', 'New Business', 'Expand', 'she/her', 'DMV', 'NA-W', '1+ Year', 'B'],
    ['Peter', 'Feytser', 'FALSE', 'Principal Product Manager', 'Product', 'Deliver', 'he/him', 'Confidential', 'ASIA', '8+ Years', 'C'],
    ['Adrien', 'Devleschoudere', 'FALSE', 'Senior Manager of Construction, Product Developent', 'Unit Ops', 'Operate', 'she/her', 'DMV', 'NA-E', '1+ Year', 'D']
  ];

  // Store each column in separate lists
  for (let i = 0; i < data.length; i++) {
    firstNames.push(data[i][0]);
    restOfNames.push(data[i][1]);
    titles.push(data[i][3]);
    departments.push(data[i][4]);
    depts.push(data[i][5]);
    pronouns.push(data[i][6]);
    cities.push(data[i][7]);
    regions.push(data[i][8]);
    yearsOfService.push(data[i][9]);
    taskForces.push(data[i][10]);
  }
}

function setup() {
  createCanvas(1200, 900);
  textSize(32);
  textFont(ppNeueMachina);
  fill('#1E1E1E');
  
  noLoop();  // Stop draw loop since we are saving images
  
  // Save all images
  saveAllImages();
}

function saveAllImages() {
  for (let index = 0; index < firstNames.length; index++) {
    // Set up the canvas
    background(255);
    
    // Get the task force value for the current index
    let taskForce = taskForces[index];
    let taskForceBG = taskForceBGs[taskForce];
    
    // Display the background image based on the task force value
    if (taskForceBG) {
      image(taskForceBG, 0, 0, width, height);
    }

    // Display the name
    push();
    textSize(74);  // Set text size to 60
    textFont(disketMono);
    text(firstNames[index], 290, 616);
    text(restOfNames[index], 290, 680);
    pop();

    // Display the title and department
    textFont(ppNeueMachina);
    text(titles[index], 290, 774);
    text(departments[index], 290, 857);

    // Display the city and region
    text(cities[index], 742, 857);

    // Display corresponding images for Years, Region, and Dept
    let xPos = 423;
    let yPos = 135;

    // Display Years of Service image
    let yearsImage = yearsImages[yearsOfService[index]];
    if (yearsImage) {
      image(yearsImage, xPos, yPos);
    }

    // Display Region image next to it
    let regionImage = regionsImages[regions[index]];
    if (regionImage) {
      image(regionImage, xPos + 200, yPos);
    }

    // Display Dept image next to it
    let deptImage = deptImages[depts[index]];
    if (deptImage) {
      image(deptImage, xPos + 400, yPos);
    }

    // Create a new p5.Graphics object for masking
    let maskShape = createGraphics(picWidth, picHeight);

    // Load the profile picture and draw it on the p5.Graphics object
    let profilePicName = `${firstNames[index]} ${restOfNames[index]}`;
    let profilePic = profilePics[profilePicName];

    if (profilePic) {
      // Calculate aspect ratio
      let aspectRatio = profilePic.width / profilePic.height;

      // Draw a filled rectangle on the p5.Graphics object
      maskShape.fill(255);
      maskShape.noStroke();
      maskShape.rect(0, 0, picWidth, picHeight);
      
      // Calculate new dimensions
      let newWidth, newHeight;

      if (aspectRatio > picWidth / picHeight) {
        newWidth = picWidth;
        newHeight = picWidth / aspectRatio;
      } else {
        newHeight = picHeight;
        newWidth = picHeight * aspectRatio;
      }

      // Calculate position to center the image within the rectangle
      let xOffset = (picWidth - newWidth) / 2;
      let yOffset = (picHeight - newHeight) / 2;

      console.log(newHeight)

      // Draw the image on the p5.Graphics object
      maskShape.image(profilePic, xOffset, yOffset, newWidth, newHeight);

      // Apply the mask
      profilePic.mask(maskShape);

      // Set blend mode to LUMINOSITY and apply 50% opacity
      blendMode(MULTIPLY);
      tint(255, 127);  // 50% opacity (255 * 0.5 = 127)

      // Draw the masked image in the specified location
      image(profilePic, picX, picY, picWidth, picHeight);

      // Reset blend mode and tint to default
      blendMode(BLEND);
      noTint();
    }

    // Save the canvas as PNG with filename "FirstName_RestOfName.png"
    // saveCanvas(`${firstNames[index]}_${restOfNames[index]}_front`, 'png');
  }
}

