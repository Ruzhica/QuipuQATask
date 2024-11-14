# QuipuQATask

This project is written in trypescript, following POM (page object moeling) pattern;

Locators could be define in two ways, but i prefer to be defined in constructor, since if we do very complex project
maintenance could be demanding to change in Json file and in constructor too. (but this is my personal opinion)

There is user.json file where i keep correct credentials for login;
Also if we do want to test multiple users, we can put the test for valid login in fors aech and in JSON file to put diffrent valid credentials.
the same could be done, for invalid once.


In the config file is setup the base URL

The prject contains 2 type of tests:
 - feature tests, that cover search functionality 
 - e2e test, that cover login, search and fast checkout (add to cart) functionality




##### Reported BUGS:

# 1: Login Form Doesn't Show Error for Invalid Credentials
Title: Login Form Doesn't Show Error for Invalid Credentials
Description: When entering invalid credentials (e.g., wrong password or email), no error message is displayed, and the user is not notified of the failed login attempt.

Steps to Reproduce:
1.Go to http://www.automationpractice.pl/index.php?controller=my-account.
2.Enter an incorrect email or password.
3.Click the "Sign in" button.

Expected Result: An error message should be displayed indicating that the login credentials are incorrect.
Actual Result: No error message is shown, and the user is not informed of the login failure.

Severity: High
Priority: Critical

# 2: Incorrect Redirection After Login
Title: User is Redirected to Incorrect Page After Successful Login
Description: After a successful login, the user is not redirected to the account dashboard or the previously visited page, but rather remains on the current page.

Steps to Reproduce:
1.0Go to http://www.automationpractice.pl/index.php?controller=my-account.
2.Log in with valid credentials.
3.Observe the redirection behavior.

Expected Result: After logging in, the user should be redirected to their account dashboard or the page they were previously on.
Actual Result: The user remains on the same login page even after a successful login. 

Severity: Medium
Priority: High
