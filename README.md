# Sample Project_AdactinHotelApp
Automates key scenarios across all modules of the Adactin Project.

- Login
- Search Hotel
- Select Hotel
- Payment
- Booking History

## Tech Stack
- Playwright
- TypeScript
- Page Object Model (POM)
- Node.js

## Test Coverage
 Login Test: 
1. Login test with valid credentials
2. Login with invalid credentials
3. Verifying Forgot Password Link
4. Verifying the Reset Button
5. verify error messages
6. verify the reset button
7. verify the error message for the format of email textbox
8. Verify the error message for username for min characters


Search Test

1. Validate with valid details - using data driven method , passed 2 different data set to run the test, and validate the select page table with search criteria input.
2. Invalid date error message - past check in date
3. Invalid date error message - past check out date
4. Only mandatory data input - using data driven method , passed 2 different data set only for mandatory fields to run the test, and validate the select page table with search criteria input.

Select Page:
1. Validate the Select table prices column. - 🔄 In Progress


## Status
✅ Completed: Login Page, Forgot Password Page, New User Registration Page.
✅ Completed: Search Page tests - 6 scenarios , 2 data driven
🔄 In Progress:Select Page
📋 Planned: Payment Page, Booking History
