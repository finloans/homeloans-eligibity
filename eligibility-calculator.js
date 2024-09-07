function calculateEligibility() {
    // Get input values from the form
    let age = parseInt(document.getElementById('age').value);
    let income = parseFloat(document.getElementById('income').value);
    let existingEmi = parseFloat(document.getElementById('existingEmi').value);
    let desiredLoan = parseFloat(document.getElementById('desiredLoan').value);
    let tenure = parseInt(document.getElementById('tenure').value);
    let interestRate = parseFloat(document.getElementById('interestRate').value);

    // Validate inputs
    if (isNaN(age) || isNaN(income) || isNaN(existingEmi) || isNaN(desiredLoan) || isNaN(tenure) || isNaN(interestRate)) {
        document.getElementById('result').innerHTML = '<p class="error">Please fill in all fields correctly.</p>';
        return;
    }

    // Check for valid age
    if (age < 21 || age > 65) {
        document.getElementById('result').innerHTML = '<p class="error">Applicant age must be between 21 and 65 years.</p>';
        return;
    }

    // Adjust tenure based on age (maximum tenure until 75 years old)
    let maxTenure = 75 - age;
    if (tenure > maxTenure) {
        tenure = maxTenure; // Cap tenure based on age limit
    }

    // Convert annual interest rate to monthly rate
    let monthlyInterestRate = interestRate / 12 / 100;

    // Calculate maximum EMI allowed (50% of net income minus existing EMIs)
    let maxAllowableEmi = (income * 0.5) - existingEmi;

    if (maxAllowableEmi <= 0) {
        document.getElementById('result').innerHTML = '<p class="error">Your existing EMIs exceed 50% of your income. You are not eligible for additional loans.</p>';
        return;
    }

    // Formula to calculate maximum eligible loan amount
    let totalMonths = tenure * 12;
    let eligibleLoanAmount = (maxAllowableEmi * (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)) / (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths));

    // Determine eligibility for the desired loan
    let eligibilityStatus = '';
    if (desiredLoan <= eligibleLoanAmount) {
        eligibilityStatus = `<p class="success">Congratulations! You are eligible for the desired loan amount of ₹${desiredLoan.toFixed(2)}.</p>`;
    } else {
        eligibilityStatus = `<p class="error">Based on your income and obligations, you are eligible for a maximum loan amount of ₹${eligibleLoanAmount.toFixed(2)}.</p>`;
    }

    // Calculate the EMI for the desired loan amount
    let emiDesiredLoan = (desiredLoan * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    // Display results
    document.getElementById('result').innerHTML = `
        ${eligibilityStatus}
        <h3>Maximum Eligible Loan Amount: ₹${eligibleLoanAmount.toFixed(2)}</h3>
        <h3>Adjusted Loan Tenure: ${tenure} years</h3>
        <h3>Estimated EMI for Desired Loan: ₹${emiDesiredLoan.toFixed(2)}</h3>
    `;
}


