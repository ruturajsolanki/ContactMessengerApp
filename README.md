# Contact Form Application

A full-stack contact form application with an admin dashboard, built using React Native (Expo) for the frontend and Node.js/Express.js for the backend.

## Features

### Backend
- RESTful API with TypeScript
- MongoDB integration
- JWT authentication
- Security measures (helmet, rate limiting)
- Input validation
- Pagination and search
- Email notifications
- Swagger API documentation

### Frontend
- Contact form
- Admin login screen
- Message dashboard with:
  - View all messages
  - Mark messages as read/unread
  - Delete messages
  - Search and filter messages
  - Pagination
- JWT token management
- Toast notifications
- Modern UI with navigation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Expo Go app (for mobile testing)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd contact-form-app
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
npm run setup
```
This will guide you through setting up the required environment variables for the backend.

4. Start the development servers:
```bash
npm run dev
```

The backend API will be available at http://localhost:3000
API documentation will be available at http://localhost:3000/docs

For the frontend:
1. Install Expo Go on your mobile device
2. Scan the QR code that appears in the terminal
3. The app will open on your device

## Environment Variables

The following environment variables are required for the backend:

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `ADMIN_PASSWORD`: Admin login password
- `SMTP_USER`: Email address for sending notifications
- `SMTP_PASS`: Email password for sending notifications

## API Documentation

Once the backend server is running, you can access the Swagger API documentation at http://localhost:3000/docs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 