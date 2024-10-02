<template>
    <div :class="{
      'chat-content-leftside': message.side === 'left',
      'chat-content-rightside': message.side === 'right',
    }">
      <div class="d-flex">
        <div :class="message.side === 'left' ? 'flex-grow-1 ms-2' : 'flex-grow-1 me-2'">
          <p class="mb-0 chat-time" :class="message.side === 'right' ? 'text-end' : ''">
            {{ message.author }}, {{ message.time }}
          </p>
          <p v-if="message.text" :class="message.side === 'left' ? 'chat-left-msg' : 'chat-right-msg'">
            {{ message.text }}
          </p>
          <img v-if="message.image" :src="message.image" alt="Uploaded Image" class="chat-image"  width="150" height="150" :class="message.side === 'left' ? 'chat-left-msg' : 'chat-right-msg'"/>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    message: {
      type: Object,
      required: true,
      default: () => ({
        author: 'Chat',
        time: new Date().toLocaleTimeString(),
        text: 'Hi, how can I help you?',
        side: 'left', // Default to 'right' (sent message)
      }),
    },
  },
};
</script>

<style>
.chat-image {
  max-width: 100px; /* Adjust based on your design */
  border-radius: 10px;
}
</style>
