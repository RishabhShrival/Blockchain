# Blockchain-Based Course Enrollment System

This project is a decentralized course enrollment platform built on the Ethereum blockchain. It allows users to create and enroll in courses using cryptocurrency (ETH). The project leverages **Solidity** smart contracts for course management and **React** for the frontend UI.

## Features

- **Course Creation**: Admins can add new courses by specifying a name and price in ETH.
- **Course Enrollment**: Users can enroll in available courses by paying the required ETH amount.
- **Blockchain Integration**: All data related to courses and enrollment is stored on the Ethereum blockchain, ensuring transparency and security.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Smart Contracts**: Solidity
- **Blockchain**: Ethereum, ethers.js
- **Deployment**: Hardhat (or Truffle)

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MetaMask](https://metamask.io/) browser extension
- [Hardhat](https://hardhat.org/) or [Truffle](https://trufflesuite.com/) for smart contract deployment
- [Ethereum Wallet](https://metamask.io/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/blockchain-course-enrollment.git
cd blockchain-course-enrollment
```

### 2. Install Dependencies
```bash
Copy code
npm install
```

### 3. Compile Smart Contracts
Compile the smart contracts using Hardhat (or Truffle):

```bash
Copy code
npx hardhat compile
```
### 4. Deploy Smart Contracts
Deploy your contracts to the local blockchain or a testnet:

```bash
Copy code
npx hardhat run scripts/deploy.js --network localhost
``` 
Make sure to update the contract address in the frontend after deployment.

### 5. Start the React App
```bash
Copy code
npm run dev
Your React app will be running at http://localhost:3000.
```

Smart Contracts Overview
The main smart contract, CourseContract.sol, contains the following key functions:

createCourse(string name, uint256 price): Creates a new course.
enrollInCourse(uint256 courseId): Enrolls a student in a course after payment.
getStudentCourses(address student): Returns the list of courses a student is enrolled in.
getCourse(uint256 courseId): Returns course details.
Usage
Login with MetaMask: Make sure you're logged in with your MetaMask wallet.
Create a Course: Enter a course name and price to create a new course. This will trigger a transaction on the Ethereum blockchain.
Enroll in a Course: View available courses and enroll by paying in ETH.
Project Structure
php
Copy code
.
├── contract/
│   └── CourseContract.sol   # Solidity contract for course management
├── pages/
│   └── index.js             # Main dashboard page
│   └── dashboard.js         # Course management page
├── public/
│   └── ...                  # Static assets
├── styles/
│   └── globals.css          # Global CSS styles
└── README.md                # Project documentation
## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Future Enhancements
Adding user authentication for different roles (admin/student)
Enabling course certification upon completion
Expanding to multiple blockchains (e.g., Binance Smart Chain)
