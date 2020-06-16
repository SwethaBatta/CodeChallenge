## Features implemented for FE exercise using MERN stack

**Frontend**
Implemented two tabs with active highlight for the selected tab
1) Submission Form 
2) Company Details (with routing /companyDetails)

### Submission Form
Related files - SubmissionForm.js, SubmissionForm.scss

- Accepts user details - First Name, Last Name, Email, Address, Company, Salary
- Added inout required condition for the fields - First Name, Last Name, Email, Company, Salary 
   - Frontend: using 'required' field for 'input' tag on front-end (in SubmissionForm.js file)
   - Backend: using 'required: true' in the schema on backend (in models/File.js)
- Used 'Email' field as the unique identifier for the input
- Implemented form validations for the fields
   - Email: Requiring @ in the email field
   - Salary: Accepting only digits
- Implemented toast notification animation for the below scenarios
   - Successful form submission
   - Error in submission due to incorrect entry in fields
   - Error in submission due to duplicate entry (based on Email ID)
- Successful submission displays form details on the right side of the page. Used the API /form/{email} to fetch details.
- Implemented responsive design for Mobile, tablet and Desktop views
- Displayed Company details (Company name, Company cost, Number of employees) in the form of a table in Company Details tab.
  Used the API /companyData to fetch the details

**Backend**
- Used the route /form to get the submission form details and save them to MongoDB
  - Sample record:
  {"_id":"5ee3a7977a55f6e832ad60fc","firstName":"Swetha","lastName":"Batta","email":"swetha.batta16@gmail.com","address":"xxx","company":"1991","salary":100000,"timestamp":"2020-06-12T16:04:39.288Z","__v":0}
- Implemented duplicate email ID check to throw an error incase of duplicate submissions

- Computed company details at the backend by aggregating salary parameter for cost and email ID for employee count and sorted 
  the results in descending order based on highest company cost
- Used the route /companyData to post these computed details
  - Sample record:
  {"_id":"1991","count":66,"cost":70433697}

