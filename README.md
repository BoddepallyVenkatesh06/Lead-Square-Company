# LeadSquare Company

LeadSquare Company is a CRM platform designed to help businesses manage and automate their sales, marketing, and customer engagement processes. This repository contains the codebase for LeadSquare's web application, including both frontend and backend components.

## Table of Contents 📚

- [Introduction](#introduction)
- [Features](#features)
- [Screenshot](#screenshot)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction🚀

LeadSquare Company provides a comprehensive CRM solution to streamline sales, marketing, and customer service processes. The platform offers a user-friendly interface, powerful automation features, and insightful analytics to help businesses grow and succeed.

## Features🛠️

- **Sales Management**: Track and manage sales leads, opportunities, and pipelines.
- **Marketing Automation**: Automate email campaigns, lead scoring, and customer segmentation.
- **Customer Engagement**: Manage customer interactions and support tickets efficiently.
- **Analytics and Reporting**: Gain insights with real-time analytics and customizable reports.
- **Integrations**: Connect with various third-party tools and services.
- **User Roles and Permissions**: Manage user access and permissions for enhanced security.

## Screenshot📷

![LeadSquare Dashboard-1](https://github.com/BoddepallyVenkatesh06/Lead-Square-Company/blob/main/images/Screenshot_1.png)
![LeadSquare Dashboar-2](https://github.com/BoddepallyVenkatesh06/Lead-Square-Company/blob/main/images/Screenshot_2.png)
![LeadSquare Dashboard-3](https://github.com/BoddepallyVenkatesh06/Lead-Square-Company/blob/main/images/Screenshot_3.png)

## Technologies Used🖥️

- **Frontend**: React.js, Redux, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Docker, Kubernetes

## Getting Started🎯

### Prerequisites📋

Before you begin, ensure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)
- MongoDB
- Docker (optional, for containerization)
- Kubernetes (optional, for orchestration)

### Installation⚙️

1. Clone the repository:

```bash
git clone https://github.com/BoddepallyVenkatesh06/Lead-Square-Company.git
cd leadsquare-company
```

2. Install frontend dependencies:

```bash
cd client
npm install
```

3. Install backend dependencies:

```bash
cd ../server
npm install
```

## Usage📈

### Running the Application

1. Start the MongoDB server (if not using Docker):

```bash
mongod
```

2. Start the backend server:

```bash
cd server
npm start
```

3. Start the frontend development server:

```bash
cd ../client
npm start
```

### Building for Production

1. Build the frontend for production:

```bash
cd client
npm run build
```

2. Start the backend server in production mode:

```bash
cd ../server
NODE_ENV=production npm start
```

## Contributing❤️

Contributions are welcome! If you'd like to contribute to LeadSquare Company, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License📝

```
MIT License

© 2024 Venky Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
