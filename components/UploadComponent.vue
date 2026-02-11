<!-- components/UploadComponent.vue -->
<template>
  <div class="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-8">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-xl font-bold text-gray-800">Datei hochladen</h3>
        <p class="text-gray-600">PDFs, Bilder und Dokumente</p>
      </div>
      <div class="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
        <span class="text-2xl">📤</span>
      </div>
    </div>

    <!-- Drop Zone -->
    <div
        @dragover.prevent="dragOver = true"
        @dragleave="dragOver = false"
        @drop.prevent="handleDrop"
        :class="[
        'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300',
        dragOver
          ? 'border-green-500 bg-green-50'
          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
      ]"
        @click="triggerFileInput"
    >
      <input
          ref="fileInput"
          type="file"
          multiple
          @change="handleFileSelect"
          class="hidden"
      />

      <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span class="text-4xl">📁</span>
      </div>

      <h4 class="text-lg font-semibold text-gray-800 mb-2">
        Dateien hierher ziehen oder klicken
      </h4>
      <p class="text-gray-600 text-sm mb-4">
        PDF, JPG, PNG, DOC, XLS bis 10MB
      </p>

      <button
          class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 inline-flex items-center gap-2"
      >
        <span>📂</span>
        Dateien auswählen
      </button>
    </div>

    <!-- Selected Files Preview -->
    <div v-if="selectedFiles.length > 0" class="mt-6">
      <h4 class="font-semibold text-gray-800 mb-3">Ausgewählte Dateien</h4>
      <div class="space-y-3">
        <div
            v-for="(file, index) in selectedFiles"
            :key="index"
            class="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white rounded-lg border border-gray-300 flex items-center justify-center">
              <span class="text-xl">{{ getFileIcon(file) }}</span>
            </div>
            <div>
              <div class="font-medium text-gray-800">{{ file.name }}</div>
              <div class="text-sm text-gray-500">{{ formatFileSize(file.size) }}</div>
            </div>
          </div>
          <button
              @click="removeFile(index)"
              class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <span class="text-xl">✕</span>
          </button>
        </div>
      </div>

      <!-- Upload Button -->
      <div class="mt-6 flex items-center gap-4">
        <button
            @click="uploadFiles"
            :disabled="uploading"
            :class="[
            'px-6 py-3 rounded-xl font-medium transition-all duration-300',
            uploading
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
          ]"
        >
          {{ uploading ? 'Hochladen...' : `📤 ${selectedFiles.length} Datei(en) hochladen` }}
        </button>
        <button
            @click="clearFiles"
            class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
        >
          Abbrechen
        </button>
      </div>
    </div>

    <!-- Upload Status -->
    <div v-if="uploadMessage" class="mt-4">
      <div
          :class="[
          'p-4 rounded-xl border',
          uploadStatus === 'success'
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        ]"
      >
        <div class="flex items-center gap-2">
          <span class="text-xl">{{ uploadStatus === 'success' ? '✅' : '❌' }}</span>
          <span>{{ uploadMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFiles = ref<File[]>([])
const dragOver = ref(false)
const uploading = ref(false)
const uploadMessage = ref('')
const uploadStatus = ref<'success' | 'error'>()

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const files = Array.from(target.files)
    selectedFiles.value.push(...files.filter(file => file.size <= 10 * 1024 * 1024)) // 10MB limit
  }
  target.value = '' // Reset input
}

const handleDrop = (event: DragEvent) => {
  dragOver.value = false
  if (event.dataTransfer?.files) {
    const files = Array.from(event.dataTransfer.files)
    selectedFiles.value.push(...files.filter(file => file.size <= 10 * 1024 * 1024)) // 10MB limit
  }
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const clearFiles = () => {
  selectedFiles.value = []
  uploadMessage.value = ''
}

const getFileIcon = (file: File) => {
  const type = file.type
  if (type.startsWith('image/')) return '🖼️'
  if (type === 'application/pdf') return '📄'
  if (type.includes('word')) return '📝'
  if (type.includes('excel')) return '📊'
  if (type.includes('powerpoint')) return '📊'
  return '📁'
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const uploadFiles = async () => {
  if (selectedFiles.value.length === 0) return

  uploading.value = true
  uploadMessage.value = ''

  const formData = new FormData()
  selectedFiles.value.forEach(file => {
    formData.append('files', file)
  })

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (result.success) {
      uploadStatus.value = 'success'
      uploadMessage.value = result.message
      selectedFiles.value = []

      // Refresh the documents list
      window.location.reload()
    } else {
      uploadStatus.value = 'error'
      uploadMessage.value = result.error || 'Upload fehlgeschlagen'
    }
  } catch (error) {
    console.error('Upload error:', error)
    uploadStatus.value = 'error'
    uploadMessage.value = 'Upload fehlgeschlagen'
  } finally {
    uploading.value = false
  }
}
</script>