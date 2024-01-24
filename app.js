// Firebase configuration
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
  const app = firebase.initializeApp(firebaseConfig);
  const analytics = firebase.analytics();
  const db = firebase.firestore();
  
  // Function to get the user's display name (replace with your actual user authentication code)
  function getDisplayName() {
    // For simplicity, let's assume there's a function called 'getCurrentUserDisplayName()'
    return getCurrentUserDisplayName();
  }
  
  // Function to send a message to Firestore
  function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    const displayName = getDisplayName();
  
    if (message !== '' && displayName) {
      db.collection('messages').add({
        text: message,
        displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  
      messageInput.value = '';
    }
  }
  
  // Function to subscribe to real-time updates from Firestore
  function subscribeToMessages() {
    db.collection('messages')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => doc.data());
        displayMessages(messages);
      });
  }
  
  // Function to display messages in the UI
  function displayMessages(messages) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
  
    messages.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.textContent = `${message.displayName}: ${message.text}`;
      messagesContainer.appendChild(messageElement);
    });
  }
  
  // User authentication (replace with your actual user authentication code)
  function getCurrentUserDisplayName() {
    // Replace this with your code to get the current user's display name
    // For example, if you are using Firebase Authentication:
    const user = firebase.auth().currentUser;
    return user ? user.displayName : null;
  }
  
  // Ensure that the user is logged in before subscribing to messages
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in
      subscribeToMessages();
    } else {
      // User is not signed in
      // Handle this case or redirect to a login page
      console.log('User is not signed in');
    }
  });
  
  // Add any additional setup or customization as needed for your chat app
  