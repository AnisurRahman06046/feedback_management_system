# Customer Feedback Sentiment Analysis RestAPI
## Overview
The **Customer Feedback Analysis System** is a backend service designed to collect, store, and analyze customer feedback. This system leverages sentiment analysis to categorize feedback as positive, negative, or neutral and provides APIs for retrieving and managing this data based on various criteria. The project focuses on backend development skills, including API development, database management, third-party API integration, and data analysis. The API is built using [NestJS](https://nestjs.com/) and is deployed on [Render](https://render.com/).

## Features
- **Admin Authentication**: Secure registration and login functionalities for admin users..
- **Feedback Submission**: Allows users to submit feedback that can be analyzed.
- **Sentiment Analysis**: Analyzes the sentiment of the feedback as positive, negative, or neutral.
- **API Documentation**: Interactive API documentation using Swagger.

## Technologies Used

- **Backend**: NestJS, TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Sentiment Analysis**: [Sentiment](https://www.npmjs.com/package/sentiment)
- **Deployment**: Render
- **API Documentation**: Swagger

## Installation

1. **Clone the repository**:

   ```bash
    git clone https://github.com/AnisurRahman06046/feedback_management_system.git
2. **Install dependencies:**:

   ```bash
    npm install
3. **Environment Configuration:**
Create a `.env` file in the root directory and configure the environment variables:

   ```bash
    DATABASE_URL=your-database-url
    JWT_SECRET=your-jwt-secret
    PORT=3000
4. **Start the Application:**

   ```bash
    npm run start:dev

## API Documentation:
   API documentation is available at `/api-docs`:
   - **Local :** `http://localhost:3000/api-docs`
   - **Production :** `https://feedback-management-system.onrender.com/api-docs`






## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the [MIT ](https://choosealicense.com/licenses/mit/) License.
## Contact

For any inquiries or issues, please  contact me at [anisurrahman14046@gmail.com](mailto:your.email@example.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/md-anisur-rahman046/).
