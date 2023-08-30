# EPAM learning course "QA Automation Framework"

## Develop an automation framework for the Hardcore task in WebDriver.

## The final framework should include the following:

- A WebDriver manager for managing browser connectors
- Page Object/Page Factory for page abstractions
- Models for business objects of the required elements
- Property files with test data for at least two different environments
- XML suites for smoke tests and other tests
- If the test fails, a screenshot with the date and time is taken.
- The framework should include an option for running with Jenkins and browser parameterization, test suite, environment.
- Test results should be displayed on the job chart, and the screenshots should be archived as artifacts.

## To install use

- npm install

## To run tests use

- npm run test --suites {suite_name} {browser}

Watch {suite_name} in const suites at wdio.conf.js

{browser} could be 'chrome' or 'firefox'

Note that you need node.js https://nodejs.org/en/download/current
