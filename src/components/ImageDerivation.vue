<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-indigo-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">AI Image Derivation</h1>
        <router-link to="/" class="text-white hover:text-indigo-200"
          >Home</router-link
        >
      </div>
    </header>
    <main class="flex-grow container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-md p-4 mb-4">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Upload Image</label
          >
          <input
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="w-full"
          />
        </div>
        <div v-if="image" class="mb-4">
          <img
            :src="image"
            alt="Uploaded image"
            class="mx-auto max-w-full h-auto"
          />
          <div class="mt-4 text-center">
            <button
              @click="downloadImage"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Download Image
            </button>
          </div>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label
              for="prompt"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Prompt</label
            >
            <input
              v-model="prompt"
              type="text"
              id="prompt"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your prompt..."
            />
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Generate Derived Image
          </button>
        </form>
      </div>
      <div v-if="derivedImage" class="bg-white rounded-lg shadow-md p-4">
        <h2 class="text-xl font-semibold mb-4">Derived Image</h2>
        <img
          :src="derivedImage"
          alt="Derived image"
          class="mx-auto max-w-full h-auto"
        />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "ImageDerivation",
  data() {
    return {
      image: null,
      prompt: "",
      derivedImage: null,
      fileName: "",
    };
  },
  methods: {
    handleImageUpload(e) {
      const file = e.target.files[0];
      if (file) {
        this.fileName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => (this.image = e.target.result);
        reader.readAsDataURL(file);
      }
    },
    handleSubmit() {
      if (this.image && this.prompt) {
        // Here you would typically call an AI API to get a derived image
        // For this example, we'll just use a placeholder
        this.derivedImage = "https://via.placeholder.com/300";
      }
    },
    downloadImage() {
      if (this.image) {
        const link = document.createElement("a");
        link.href = this.image;
        link.download = this.fileName || "downloaded-image";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
  },
};
</script>
