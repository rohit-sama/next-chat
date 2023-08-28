
# Next-Chat: Real-Time Chat Application for Dark Theme Enthusiasts


**Next-Chat** is an immersive real-time chat application designed for dark theme enthusiasts. It's built using Next.js and Tailwind CSS for the frontend, RedisDb for real-time messaging, Pusher.js for websocket communication, and NextAuth for authentication.
## Index

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributors](#contributors)
- [License](#license)

## Features

- Real-time messaging with websocket technology.
- Dark-themed interface for an immersive experience.
- Secure authentication with NextAuth.
- User presence indication (online/offline status).
- Intuitive user interface for seamless communication.

## Technologies Used

- Next.js: Frontend framework for building user interfaces.
- Tailwind CSS: Utility-first CSS framework for styling.
- RedisDb: In-memory data structure store used for real-time messaging.
- Pusher.js: Library for enabling real-time communication via websockets.
- NextAuth: Authentication library for Next.js applications.

## Screenshots
![image](https://github.com/rohit-sama/next-chat/assets/112627630/fca37853-10f8-456e-9477-d99ea077f348)
![image](https://github.com/rohit-sama/next-chat/assets/112627630/da4aa17f-1b60-4e3a-af96-e9e320d89626)
![image](https://github.com/rohit-sama/next-chat/assets/112627630/3ec99b45-9c7a-4488-bac4-87b44f338443)
![image](https://github.com/rohit-sama/next-chat/assets/112627630/d2e1a459-2286-41c7-81bb-b54e2c5b06bf)

## Getting Started

### Prerequisites

- Node.js (at least version XX)
- RedisDb server (for real-time messaging)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/rohit-sama/next-chat.git
   cd next-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the project root and add the following variables:
   ```env
   UPSTASH_REDIS_REST_URL = ""
   UPSTASH_REDIS_REST_TOKEN = ""
   GOOGLE_CLIENT_ID = ""
   GOOGLE_CLIENT_SECRET = ""
   NEXTAUTH_SECRET = ""
   PUSHER_APP_ID = ""
   NEXT_PUBLIC_PUSHER_APP_KEY = "" 
   PUSHER_APP_SECRET = ""
   ```

4. Run the application:
   ```bash
   npm run dev
   ```

5. Access the app at `http://localhost:3000`.

## Usage

- Register and login to start chatting.
- Dark theme enthusiasts will love the immersive experience.
- Enjoy real-time messaging with your friends.

## Contributors

- [ME](https://github.com/rohit-sama)

## License

This project is licensed under the [MIT License](LICENSE).

---
