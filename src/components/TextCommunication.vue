<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-purple-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">AI Text Communication</h1>
        <router-link to="/" class="text-white hover:text-purple-200"
          >Home</router-link
        >
      </div>
    </header>
    <main class="flex-grow container mx-auto p-4 flex flex-col">
      <div
        class="flex-grow bg-white rounded-lg shadow-md p-4 mb-4 relative flex flex-col"
        style="height: 60vh"
      >
        <div class="absolute top-2 left-2 z-10">
          <select
            v-model="selectedType"
            class="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          >
            <option value="general">General</option>
            <option value="technical">Technical</option>
            <option value="creative">Creative</option>
          </select>
        </div>
        <div
          ref="chatContent"
          class="flex-grow overflow-y-auto custom-scrollbar"
        >
          <div class="flex flex-col">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="[
                'mb-4',
                message.type === 'user' ? 'text-right' : 'text-left',
              ]"
            >
              <span
                :class="[
                  'inline-block p-2 rounded-lg',
                  message.type === 'user'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-800',
                ]"
              >
                {{ message.content }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="handleSubmit" class="flex">
        <input
          v-model="input"
          type="text"
          class="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          class="bg-purple-600 text-white rounded-r-lg px-4 py-2 font-semibold hover:bg-purple-700 transition duration-300"
        >
          Send
        </button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: "TextCommunication",
  data() {
    return {
      messages: [],
      input: "",
      selectedType: "general",
    };
  },
  methods: {
    handleSubmit() {
      if (this.input.trim()) {
        this.messages.push({ type: "user", content: this.input });
        // Here you would typically call an AI API to get a response
        // Include the selected type in the API call
        let aiResponse = `AI response placeholder for ${this.selectedType} communication`;
        this.messages.push({ type: "ai", content: aiResponse });
        this.input = "";
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    scrollToBottom() {
      const chatContent = this.$refs.chatContent;
      chatContent.scrollTop = chatContent.scrollHeight;
    },
  },
  updated() {
    this.scrollToBottom();
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(139, 92, 246, 0.5);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background-color: rgba(229, 231, 235, 0.5);
}
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.5) rgba(229, 231, 235, 0.5);
}
</style>
