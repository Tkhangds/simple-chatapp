# Simple Chat App

A simple, real-time chat application built with Socket.io and Express.js, featuring Docker containerization for easy deployment.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.io
- **Simple & Lightweight**: Minimal setup with Express.js backend
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Docker Support**: Fully containerized for consistent deployment
- **Easy to Deploy**: Single command to get started with Docker

## 🛠️ Technologies Used

- **Backend**: Express.js (Node.js)
- **Real-time Communication**: Socket.io
- **Frontend**: HTML5, CSS3, JavaScript
- **Containerization**: Docker

## 📋 Prerequisites

Choose one of the following: 

### Option 1: Docker (Recommended)
- Docker
- Docker Compose (optional)

### Option 2: Local Setup
- Node.js (v14+ recommended)
- npm or yarn

## 🐳 Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tkhangds/simple-chatapp.git
   cd simple-chatapp
   ```

2. **Build the Docker image**
   ```bash
   docker build -t simple-chatapp .
   ```

3. **Run the container**
   ```bash
   docker run -p 3000:3000 simple-chatapp
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💻 Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tkhangds/simple-chatapp.git
   cd simple-chatapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

1. Open the application in your browser
2. Enter your username to join the chat
3. Start sending and receiving messages in real-time
4. Open multiple browser tabs to simulate multiple users

## 🏗️ Project Structure

```plaintext
simple-chatapp/
├── public/              # Static files (HTML, CSS, client-side JS)
├── server. js            # Express.js server & Socket.io configuration
├── package.json         # Node.js dependencies
├── Dockerfile           # Docker configuration
└── README.md
```

## 🔧 Configuration

The application runs on port `3000` by default. To change the port, modify the configuration in your server file or use environment variables: 

```bash
PORT=8080 npm start
```

For Docker: 
```bash
docker run -p 8080:3000 -e PORT=8080 simple-chatapp
```

## 🐳 Docker Commands

**Build the image:**
```bash
docker build -t simple-chatapp . 
```

**Run the container:**
```bash
docker run -d -p 3000:3000 --name chatapp simple-chatapp
```

**Stop the container:**
```bash
docker stop chatapp
```

**Remove the container:**
```bash
docker rm chatapp
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Tkhangds**
- GitHub: [@Tkhangds](https://github.com/Tkhangds)

## 🙏 Acknowledgments

- Built with [Socket.io](https://socket.io/)
- Powered by [Express.js](https://expressjs.com/)
- Containerized with [Docker](https://www.docker.com/)

---

⭐ Star this repository if you find it helpful! 
