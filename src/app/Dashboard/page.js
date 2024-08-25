"use client";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Replace with your contract address and ABI
const CONTRACT_ADDRESS = '0xE2edCA625727Ba75bF1d60c52E0FB2ae02165421';
const CONTRACT_ABI = [[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			}
		],
		"name": "CertificateIssued",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "CourseCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "createCourse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_courseId",
				"type": "uint256"
			}
		],
		"name": "enrollInCourse",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_student",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_courseId",
				"type": "uint256"
			}
		],
		"name": "issueCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PaymentReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			}
		],
		"name": "StudentEnrolled",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "courseCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "courses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isAvailable",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_courseId",
				"type": "uint256"
			}
		],
		"name": "getCourse",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isAvailable",
						"type": "bool"
					}
				],
				"internalType": "struct CourseEnrollment.Course",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_student",
				"type": "address"
			}
		],
		"name": "getStudentCourses",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_student",
				"type": "address"
			}
		],
		"name": "hasCertificate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_student",
				"type": "address"
			}
		],
		"name": "isStudentEnrolled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "students",
		"outputs": [
			{
				"internalType": "bool",
				"name": "enrolled",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "certificateIssued",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
];

async function getContract() {
  if (!window.ethereum) {
    throw new Error('No Ethereum provider detected');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

export default function Dashboard() {
  const [account, setAccount] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', price: '' });

  useEffect(() => {
    const fetchData = async () => {
      const contract = await getContract();
      const storedAccount = localStorage.getItem('account');
      setAccount(storedAccount);

      if (storedAccount) {
        // Fetch enrolled courses
        const courses = await contract.getStudentCourses(storedAccount);
        setEnrolledCourses(courses);

        // Fetch available courses
        const totalCourses = await contract.courseCount();
        const coursesArray = [];
        for (let i = 1; i <= totalCourses; i++) {
          const course = await contract.getCourse(i);
          coursesArray.push(course);
        }
        setAvailableCourses(coursesArray);
      }
    };

    fetchData();
  }, []);

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const addCourse = async () => {
    if (!newCourse.name || !newCourse.price) {
      alert('Please provide both course name and price.');
      return;
    }

    const contract = await getContract();
    try {
      const priceInWei = ethers.parseUnits(newCourse.price, 'ether');
      await contract.createCourse(newCourse.name, priceInWei);
      alert('Course created successfully!');
      // Refresh available courses list
      const totalCourses = await contract.courseCount();
      const coursesArray = [];
      for (let i = 1; i <= totalCourses; i++) {
        const course = await contract.getCourse(i);
        coursesArray.push(course);
      }
      setAvailableCourses(coursesArray);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const enrollInCourse = async (courseId) => {
    const contract = await getContract();
    try {
      const course = availableCourses.find(course => course.id === courseId);
      const priceInWei = course ? course.price : 0;
      await contract.enrollInCourse(courseId, { value: priceInWei });
      alert('Enrolled in course successfully!');
      // Refresh enrolled courses list
      const courses = await contract.getStudentCourses(account);
      setEnrolledCourses(courses);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <p className="text-lg font-medium text-gray-700">Welcome to your dashboard!</p>
      <p className="text-lg font-medium text-gray-700">{account}</p>
      
      <div className="my-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Course</h2>
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={handleCourseChange}
          className="px-4 py-2 text-black border rounded-md mr-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price in ETH"
          value={newCourse.price}
          onChange={handleCourseChange}
          className="px-4 py-2 text-black border rounded-md mr-2"
        />
        <button
          onClick={addCourse}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Add Course
        </button>
      </div>

      <div className="allblock">
        <div className="courseblock">
          <h2 className="text-lg font-medium text-gray-800">Courses Available</h2>
          {availableCourses.length > 0 ? (
            availableCourses.map((course) => (
              <div key={course.id} className="course mb-4">
                <p className="text-lg font-medium text-gray-800">Course Name: {course.name}</p>
                <p className="text-lg font-medium text-gray-800">Price: {ethers.formatUnits(course.price, 'ether')} ETH</p>
                <button
                  onClick={() => enrollInCourse(course.id)}
                  className="px-6 py-2 bg-green-500 text-grey font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                >
                  Enroll
                </button>
              </div>
            ))
          ) : (
            <p className="text-lg font-medium text-gray-700">No courses available</p>
          )}
        </div>

        <div className="courseblock">
          <h2 className="text-lg font-medium text-gray-800">Courses Enrolled</h2>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((courseId) => (
              <div key={courseId} className="course mb-4">
                <p className="text-lg font-medium text-gray-800">Course ID: {courseId.toString()}</p>
              </div>
            ))
          ) : (
            <p className="text-lg font-medium text-gray-700">No courses enrolled</p>
          )}
        </div>
      </div>
    </div>
  );
}