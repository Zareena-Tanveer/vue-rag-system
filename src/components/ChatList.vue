<script setup>
import { defineEmits,defineProps, ref, onMounted } from 'vue';

const props = defineProps(['chatSessions']);
const currentChatId = ref(null);

const emit = defineEmits(['selectChat', 'newChat', 'deleteChat']);
// Emit the selected chat ID to the parent
const loadChat = (chatId) => {
    currentChatId.value = chatId;
    emit('selectChat', chatId);
}

// Create a new chat session and emit it to the parent
const createNewChat = () => {
  const newChat = {
    id: Date.now(),
    messages: [],
    title: `Chat ${props.chatSessions.length + 1}`, // Use props to access chatSessions
    lastMessage: '',
    time: new Date().toLocaleTimeString(),
  };
  emit('newChat', newChat); // Emit the new chat to the parent
};

// Delete a chat session and emit the delete event
const deleteChat = (chatId) => {
    emit('deleteChat', chatId); // Emit the delete event with the chat ID
};
// Create a default chat when the component mounts
onMounted(() => {
    if (props.chatSessions.length === 0) {
        createNewChat(); // Create a new chat if none exist
    }
});

</script>
<template>
    <div class="chat-sidebar-header">
        <div class="mb-3"></div>
        <div class="input-group input-group-sm"> 
            <button class="btn btn-primary w-100 py-3" @click="createNewChat()">+ Create New Chat</button>
        </div>
    </div>
<!-- Chat Sidebar: Chat List -->
<div class="chat-sidebar-content">
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-Chats">
        <div class="chat-list">
          <div class="list-group list-group-flush">
            <!-- Loop through chatSessions to display the list of chats -->
            <a 
              v-for="chat in chatSessions" 
              :key="chat.id" 
              href="javascript:;" 
              class="list-group-item"
              :class="{ active: currentChatId === chat.id }" 
              @click="loadChat(chat.id)"
            >
              <div class="d-flex">
                <div class="flex-grow-1 ms-3 my-2">
                  <h6 class="mb-0 chat-title">{{ chat.title }}</h6>
                  <p class="mb-0 chat-msg">{{ chat.lastMessage }}</p>
                </div>
                <div class="chat-time">{{ chat.time }}</div>
                <button 
                    class="btn btn-danger btn-sm ms-2" 
                    @click.stop="deleteChat(chat.id)" 
                    title="Delete Chat"
                >
                    <i class="bx bx-trash"></i>
                </button>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any specific styles for the delete button */
.btn-danger {
    border-radius: 50%;
}
</style>