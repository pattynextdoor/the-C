const creds = require('./creds.js');
const puppeteer = require('puppeteer');
var readlineSync = require('readline-sync');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({width: 1280, height: 1000});
  await page.goto('https://auth.ucr.edu/cas/login?service=https://portal.ucr.edu/uPortal/Login');

  const fieldUsername = '#username';
  const fieldPassword = '#password';
  const loginButton = '.btn-submit';

  const registerLink = '#registerLink';
  const quarterSelect = '.select2-choice';
  const recentQuarter = '.select2-results-dept-0:first-of-type';
  const continueButton = '#term-go';
  const courseSearchBox = '#s2id_autogen7';
  const catalogSearchButton = '#search-go';

  // Click and fill out username field
  await page.click(fieldUsername);
  await page.keyboard.type(creds.username);
  console.log('Username field filled.');

  // Click and fill out password field
  await page.click(fieldPassword);
  await page.keyboard.type(creds.password);
  console.log('Password field filled.');

  // Log in. We in boys
  await page.click(loginButton);
  await page.waitFor(3 * 1000);
  console.log('Logged in.');

  console.log('Navigating to registration services.');
  await page.goto('https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/registration/registration');
  await page.waitForSelector(registerLink);

  // Click 'Register' link in Banner 
  await page.click(registerLink);
  await page.waitForSelector(quarterSelect);
  await page.waitFor(2 * 1000);
  // Opens dropdown menu
  await page.click(quarterSelect);
  await page.waitForSelector(recentQuarter);
  // Selects first quarter in list
  await page.click(recentQuarter);
  await page.waitForSelector(continueButton);
  await page.waitFor(0.5 * 1000);
  // Confirmation of quarter selection
  await page.click(continueButton);
  await page.waitForSelector(courseSearchBox);
  console.log('Selected most recent quarter');


  await page.click(courseSearchBox);

  for (var i = 0; i < courseList.length; i++) {
    await page.keyboard.type(courseList[i]);
    await page.waitFor(1.5 * 1000);
    await page.keyboard.press('Enter');
  }

  await page.click(catalogSearchButton);
  await page.waitFor(4 * 1000);

  await page.screenshot({path: 'ss.png'});
  //await browser.close();
}

console.log('Welcome to The C\n');
var command;
var courseList = [];

while(command != 'run') {
  console.log('Commands:\n');
  console.log('\"add\": Add a course to your registration list.');
  console.log('\"list\": List courses you queued up.');
  console.log('\"run\": Run The C.');
  console.log('\"exit\": Exit The C.');
  console.log('Press the key combination \"control + c\" at any time to abort the process.');

  command = readlineSync.question('\nEnter command: ');
  console.log('\n');
  if (command == 'add') {
    console.log('Type your search query with its subject and course number.');
    console.log('Example: \"CS061\" (Without quotes)\n');
    var classToRegisterFor = readlineSync.question('Course to register for: ');
    console.log('\nType section number in a 3-digit format.');
    console.log('Examples: \"042\", \"001\"');
    var section = readlineSync.question('Section: ');

    // If courseList is empty
    if (courseList.length == 0) {
      courseList.push({
        className: classToRegisterFor,
        sections: [section]
      });
    }
    else {
      for (var i = 0; i < courseList.length; i++) {
        if (courseList.at(i).className == classToRegisterFor) {
          courseList.at(i).sections.push(section);
        }
        else if (i == courseList.length - 1) {
          courseList.push({
            className: classToRegisterFor,
            sections: [section]
          });
        }
      }
    }
  } 

  else if (command == 'list') {
    console.log('Queue contains:\n');
    for (var i = 0; i < courseList.length; i++) {
      console.log(courseList[i]);
    }
    console.log();
  }

  else if (command == 'run') {
    console.log('Running the C'); 
  }

  else if (command == 'exit') {
    console.log('Exiting The C');
    return;
 }
  else {
    console.log('Invalid command. Type \"exit\" to exit the software.');
  }
}

if (command == 'run') {
  run();
}
