const creds = require('./creds.js');
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto('https://auth.ucr.edu/cas/login?service=https://portal.ucr.edu/uPortal/Login');

  const fieldUsername = '#username';
  const fieldPassword = '#password';
  const loginButton = '.btn-submit';

  const registerLink = '#registerLink';
  const quarterSelect = '.select2-choice';
  const recentQuarter = '.select2-results-dept-0:first-of-type';
  const continueButton = '#term-go';
  const classCells = 'tr.odd:nth-child(1) > td:nth-child(2)';
  

  // Click and fill out username field
  await page.click(fieldUsername);
  await page.keyboard.type(creds.username);
  
  // Click and fill out password field
  await page.click(fieldPassword);
  await page.keyboard.type(creds.password);

  // Log in. We in boys
  await page.click(loginButton);
  await page.waitFor(3 * 1000);
  
  await page.goto('https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/registration/registration');
  await page.waitForSelector(registerLink);

  // Click 'Register' link in Banner 
  await page.click(registerLink);
  await page.waitForNavigation();
  await page.waitFor(1 * 1000);

  // Opens dropdown menu
  await page.click(quarterSelect);
  await page.waitForSelector(recentQuarter);
  
  // Selects first quarter in list
  await page.click(recentQuarter);
  await page.waitForSelector(continueButton);

  // Confirmation of quarter selection
  await page.click(continueButton);
  await page.waitFor(classCells);

  var cells = page.$$(classCells);

  for (var i = 0; i < cells.length; i++) {
    console.log(cells[i].innerText);
  }

}



run();
