// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRBPeoaGdjaTaXQGCh_WBb8FgXHDaLPvo",
  authDomain: "chat-79fdb.firebaseapp.com",
  projectId: "chat-79fdb",
  storageBucket: "chat-79fdb.appspot.com",
  messagingSenderId: "982174138587",
  appId: "1:982174138587:web:8dbecacc7b8a41e9b24cfe",
  measurementId: "G-E3HJQ6LYZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = firebase.firestore();

// Check if user is logged in
firebase.auth().onAuthStateChanged(user => {
    const chatContainer = document.getElementById('chatContainer');
    const loginContainer = document.getElementById('loginContainer');

    if (user) {
        // User is signed in
        chatContainer.style.display = 'block';
        loginContainer.style.display = 'none';

        // Continue with the chat setup (subscribeToMessages, etc.)
        subscribeToMessages();
    } else {
        // User is not signed in
        chatContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    }
});
// Function to log in
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Successfully logged in
            console.log('Logged in:', userCredential.user);
        })
        .catch(error => {
            // Handle login errors
            console.error('Login error:', error.message);
        });
}
// Function to log out (optional)
function logout() {
    firebase.auth().signOut()
        .then(() => {
            // Successfully logged out
            console.log('Logged out');
        })
        .catch(error => {
            // Handle logout errors
            console.error('Logout error:', error.message);
        });
}
// Function to sign up a new user
function signup() {
    const signupEmail = document.getElementById('signupEmail').value;
    const signupPassword = document.getElementById('signupPassword').value;

    firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
        .then(userCredential => {
            // Successfully signed up
            console.log('Signed up:', userCredential.user);
            // You may choose to automatically log in the user after sign-up
            login();
        })
        .catch(error => {
            // Handle sign-up errors
            console.error('Sign-up error:', error.message);
        });
}

// Function to toggle between login and sign-up forms
function toggleForm(formType) {
    const loginContainer = document.getElementById('loginContainer');
    const signupContainer = document.getElementById('signupContainer');

    if (formType === 'signup') {
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
    } else {
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
    }
}

// ... (existing code)


// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message !== '') {
        // Add code to send the message to Firestore
        // For simplicity, let's assume we have a 'messages' collection
        db.collection('messages').add({
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            // Add other relevant information (e.g., senderId)
        });

        messageInput.value = '';
    }
}

// Function to display messages in the UI
function displayMessages(messages) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';

    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message.text;
        messagesContainer.appendChild(messageElement);
    });
}

// Function to subscribe to real-time messages
function subscribeToMessages() {
    // Add code to subscribe to real-time updates from Firestore
    // For simplicity, let's assume we have a 'messages' collection
    db.collection('messages')
        .orderBy('timestamp')
        .onSnapshot(snapshot => {
            const messages = snapshot.docs.map(doc => doc.data());
            displayMessages(messages);
        });
}

// Initial setup
subscribeToMessages();

