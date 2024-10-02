<script setup>
import { ref, onMounted,defineProps,watch } from 'vue';
import ChatMessage from './ChatMessage.vue';

const props = defineProps({
  chat: Object, // Expecting the full chat object from parent
});

const messages = ref([]);
const message = ref('');
const isUploading = ref(false);
const uploadedFileIcon = ref(null); // Holds the uploaded file's image URL
// When the chat prop changes, update the messages
watch(() => props.chat, (newChat) => {
  if (newChat) {
    messages.value = newChat.messages; // Load messages for the selected chat
  } else {
    messages.value = []; // Clear messages if no chat is selected
  }
});

// Function to push default message when the chat initializes
const initializeDefaultMessage = () => {
  // Only push the default message if messages are empty
  if (messages.value.length === 0) {
    messages.value.push(defaultMessage);
  }
};

// Call the initialize function when a new chat is selected
watch(() => props.chat, initializeDefaultMessage);

// Default message to be shown when the chat initializes
const defaultMessage = {
  author: 'Chat', // You can change this author to anything like 'Assistant'
  time: new Date().toLocaleTimeString(),
  text: 'Hi, how can I help you?',
  side: 'left', // 'left' because it's from the assistant/chat
};

const onFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Set uploading status to true
    isUploading.value = true;

    // Simulate a file upload (replace this with actual upload logic)
    const reader = new FileReader();
    reader.onload = (e) => {
      // Set the uploaded file icon (assuming the file is an image)
      uploadedFileIcon.value = e.target.result;
      isUploading.value = false; // File upload complete
    };
    reader.readAsDataURL(file); // Read the file as a Data URL
  }
};

const onSubmit = () => {
  console.log(message);
  
  if (message.value.trim() || uploadedFileIcon.value) {
    const newMessage = {
      author: 'You', // Change this as necessary (e.g., based on user data)
      time: new Date().toLocaleTimeString(),
      text: message.value.trim(),
      side: 'right',
      image: uploadedFileIcon.value // Store image URL if exists
    };

    messages.value.push(newMessage); // Add new message to the messages array
    console.log(messages.value);

    // Resetting states after submission
    message.value = '';
    uploadedFileIcon.value = null; // Reset uploaded file icon
  }
};

// Push default message on mount
onMounted(() => {
  messages.value.push(defaultMessage);
});
</script>
<template>
  <div class="chat-content">

  <ChatMessage v-for="(msg, index) in messages" :key="index" :message="msg" />
  </div>

  <form @submit.prevent="onSubmit" class="chat-footer d-flex align-items-center">
    <div class="input-group flex-grow-1 position-relative">
      <!-- Uploaded Image Preview -->
      <div v-if="uploadedFileIcon" class="uploaded-image-preview">
        <img :src="uploadedFileIcon" alt="Uploaded Image" class="uploaded-file-icon" />
        <span class="uploaded-file-name">{{ uploadedFileName }}</span>
      </div>

      <!-- Textarea for Typing a Message -->
      <textarea 
        class="form-control" 
        v-model="message" 
        placeholder="Type a message"
        rows="2"
        :style="{ paddingBottom: uploadedFileIcon ? '60px' : '10px' }"
      ></textarea>

      <!-- File Upload Icon (Clickable) -->
      <label for="file-upload" class="input-group-text file-upload-label position-absolute">
        <i class="bx bx-file"></i>
      </label>

      <!-- Hidden File Input -->
      <input 
        type="file" 
        id="file-upload" 
        class="hidden-file-input" 
        @change="onFileSelect" 
        ref="fileInput" 
        accept="image/*, .pdf, .docx"
      />
    </div>

    <!-- Send Button in the Chat Box -->
    <button 
      type="submit" 
      :disabled="isUploading || (!message.trim() && !uploadedFileIcon)"
      class="send-button ms-2"
    >
      <i class="bx bx-send"></i>
    </button>

    <!-- Loading Indicator -->
    <div class="uploaded-files mt-2 ms-2" v-if="isUploading">
      <div class="loading-line">Uploading file...</div>
    </div>
  </form>
</template>







<style>
.chat-footer {
  display: flex;
  align-items: center;
}

.input-group {
  flex-grow: 1;
  position: relative;
}

.form-control {
  border-radius: 20px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  transition: border 0.3s;
  resize: none; /* Prevents resizing of textarea */
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.uploaded-image-preview {
  position: absolute;
  top: -50px; /* Move image preview above the textarea */
  left: 15px; /* Adjust as necessary */
  display: flex;
  align-items: center;
  padding-bottom: 10px; /* Space below the image */
}

.uploaded-file-icon {
  width: 50px;
  height: 50px;
  margin-right: 5px;
}

.file-upload-label {
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border-radius: 20px;
  padding: 10px;
  transition: background-color 0.3s;
  position: absolute;
  right: 15px; /* Adjust as necessary */
  bottom: 10px; /* Adjust as necessary */
}

.file-upload-label:hover {
  background-color: #0056b3;
}

.hidden-file-input {
  display: none;
}

.loading-line {
  color: #ff9900;
  font-size: 14px;
}

.send-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.send-button:hover:not(:disabled) {
  background-color: #218838;
}
</style>
