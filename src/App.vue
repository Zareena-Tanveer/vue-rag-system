<script setup>
import ChatBox from './components/ChatBox.vue';
import ChatList from './components/ChatList.vue';
import { ref } from 'vue';

const currentChat = ref(null);
const chatSessions = ref([]); // Initialize chatSessions
const messages = ref([]);
// When a chat is selected, update the current chat
const handleChatSelect = (chatId) => {
	const selectedChat = chatSessions.value.find((chat) => chat.id === chatId);
  currentChat.value = selectedChat;
  messages.value = selectedChat.messages; // Load messages for the selected chat
};

// When a new chat is created, set it as the current chat
const handleNewChat = (newChat) => {
	chatSessions.value.push(newChat);
  currentChat.value = newChat;
  messages.value = newChat.messages; // Load messages for the new chat
};

// Handle chat deletion
const handleDeleteChat = (chatId) => {
    chatSessions.value = chatSessions.value.filter(chat => chat.id !== chatId);
};
</script>
<template>
    <div class="wrapper">
		<header>
			<div class="topbar d-flex align-items-center">
				<nav class="navbar navbar-expand">
					<div class="mobile-toggle-menu"><i class='bx bx-menu'></i>
					</div>
					<div class="user-box dropdown">
						<a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<img src="./assets/images/avatars/avatar-2.png" class="user-img" alt="user avatar">
							<div class="user-info ps-3">
								<p class="user-name mb-0">Pauline Seitz</p>
								<p class="designattion mb-0">Web Designer</p>
							</div>
						</a>
						
					</div>
				</nav>
			</div>
		</header>
		<!--end header -->
		<!--start page wrapper -->
		<div class="page-wrapper">
			<div class="page-content">
				<div class="chat-wrapper">
					<div class="chat-sidebar">
						<ChatList @selectChat="handleChatSelect" @newChat="handleNewChat" :chatSessions="chatSessions"  @deleteChat="handleDeleteChat" />
					</div>
					<div class="chat-header d-flex align-items-center">
						<div class="chat-toggle-btn"><i class='bx bx-menu-alt-left'></i>
						</div>
						<h4>Crop Predictive RAG System</h4>
					</div>
					<ChatBox :chat="currentChat" :messages="messages"/>
					
					<!--start chat overlay-->
					<div class="overlay chat-toggle-btn-mobile"></div>
					<!--end chat overlay-->
				</div>
			</div>
		</div>
		<!--end page wrapper -->
		<!--start overlay-->
		<div class="overlay toggle-icon"></div>
		<!--end overlay-->
		<!--Start Back To Top Button--> <a href="javaScript:;" class="back-to-top"><i class='bx bxs-up-arrow-alt'></i></a>
		<!--End Back To Top Button-->
		<footer class="page-footer">
			<p class="mb-0">Copyright © 2024. All right reserved.</p>
		</footer>
	</div>
</template>


