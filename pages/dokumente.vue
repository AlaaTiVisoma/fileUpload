<!-- dokumente.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
    <!-- Passwort-Modal -->
    <div v-if="!isAuthenticated" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-96 transform transition-all duration-300">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl text-white">🔒</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Admin Login</h2>
          <p class="text-gray-600 text-sm">Bitte geben Sie das Admin-Passwort ein</p>
        </div>
        <div class="space-y-6">
          <div>
            <input
                v-model="passwordInput"
                type="password"
                placeholder="••••••••"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                @keyup.enter="checkPassword"
            />
          </div>
          <button
              @click="checkPassword"
              class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
          >
            Login
          </button>
          <p v-if="loginError" class="text-red-500 mt-2 text-sm text-center animate-pulse">❌ Falsches Passwort!</p>
        </div>
      </div>
    </div>

    <!-- Dokumentenübersicht -->
    <div v-else>
      <!-- Hero Header -->
      <section class="relative py-20 sm:py-28 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white overflow-hidden">
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_70%)]" />
        </div>

        <div class="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20">
            <span class="text-3xl">📁</span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span class="block">Admin</span>
            <span class="text-blue-200">Dokumente</span>
          </h1>

          <p class="text-xl opacity-95 max-w-3xl mx-auto leading-relaxed">
            Verwalten Sie alle Vereinsdokumente. PDFs, Bilder und Dateien in einer sicheren Umgebung.
          </p>

          <div class="flex flex-wrap justify-center gap-6 mt-10">
            <div class="text-center">
              <div class="text-3xl font-bold text-white">{{ documents.length }}</div>
              <div class="text-blue-200 text-sm">Dokumente</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white">🔐</div>
              <div class="text-blue-200 text-sm">Sicher</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white">📥</div>
              <div class="text-blue-200 text-sm">Download</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white">📤</div>
              <div class="text-blue-200 text-sm">Upload</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="py-16 sm:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Upload Component -->
          <div class="mb-12">
            <div class="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-xl font-bold text-gray-800">Datei hochladen</h3>
                  <p class="text-gray-600">PDFs, Bilder und Dokumente (max. 10MB)</p>
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
                  PDF, JPG, PNG, DOC, XLS, PPT, TXT
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
                <h4 class="font-semibold text-gray-800 mb-3">Ausgewählte Dateien ({{ selectedFiles.length }})</h4>
                <div class="space-y-3">
                  <div
                      v-for="(file, index) in selectedFiles"
                      :key="index"
                      class="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-white rounded-lg border border-gray-300 flex items-center justify-center">
                        <span class="text-xl">{{ getFileIconFromFile(file) }}</span>
                      </div>
                      <div>
                        <div class="font-medium text-gray-800 truncate max-w-xs">{{ file.name }}</div>
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
                      'px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2',
                      uploading
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg'
                    ]"
                  >
                    <span v-if="uploading" class="animate-spin">⟳</span>
                    <span v-else>📤</span>
                    {{ uploading ? 'Hochladen...' : `Dateien hochladen` }}
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
                  <button
                      v-if="uploadStatus === 'success'"
                      @click="refreshDocuments"
                      class="mt-2 text-sm text-green-600 hover:text-green-800 underline"
                  >
                    Dokumente aktualisieren
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p class="text-gray-600">Lade Dokumente...</p>
          </div>

          <!-- Documents Grid -->
          <div v-else>
            <!-- Search and Filter -->
            <div class="mb-8">
              <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div class="flex-1 w-full">
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Dokumente suchen..."
                        class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                  </div>
                </div>
                <div class="flex gap-3">
                  <button
                      @click="viewMode = 'grid'"
                      class="p-3 rounded-xl border-2 transition-all duration-300"
                      :class="viewMode === 'grid' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'"
                  >
                    <span class="text-lg">◼◼</span>
                  </button>
                  <button
                      @click="viewMode = 'list'"
                      class="p-3 rounded-xl border-2 transition-all duration-300"
                      :class="viewMode === 'list' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'"
                  >
                    <span class="text-lg">☰</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Grid View -->
            <div v-if="viewMode === 'grid' && filteredDocuments.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div
                  v-for="doc in filteredDocuments"
                  :key="doc.name"
                  class="group bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <!-- Preview Section -->
                <div
                    class="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer overflow-hidden relative"
                    @click="openPreview(doc)"
                >
                  <!-- PDF Preview -->
                  <div v-if="doc.type === 'application/pdf'" class="w-full h-full relative">
                    <iframe
                        :src="doc.url + '#toolbar=0&navpanes=0&scrollbar=0'"
                        class="w-full h-full border-none"
                        title="PDF Vorschau"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>

                  <!-- Image Preview -->
                  <img
                      v-else-if="doc.type.startsWith('image/')"
                      :src="doc.url"
                      :alt="doc.name"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <!-- File Icon -->
                  <div v-else class="text-center p-6">
                    <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span class="text-3xl">📄</span>
                    </div>
                    <span class="text-sm text-gray-500 font-medium">{{ getFileExtension(doc.name).toUpperCase() }}</span>
                  </div>

                  <!-- Hover Overlay -->
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span class="text-white text-2xl">👁️</span>
                  </div>
                </div>

                <!-- Document Info -->
                <div class="p-4">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex-1 min-w-0">
                      <h3 class="font-bold text-gray-800 truncate" :title="doc.name">
                        {{ doc.name }}
                      </h3>
                      <div class="flex items-center gap-2 mt-1">
                        <span class="text-xs text-gray-500">{{ formatFileSize(doc.size) }}</span>
                        <span class="text-xs text-gray-400">•</span>
                        <span class="text-xs text-gray-500">{{ formatDate(doc.lastModified) }}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <button
                          @click="openPreview(doc)"
                          class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Vorschau"
                      >
                        <span class="text-lg">👁️</span>
                      </button>
                      <button
                          @click="downloadFile(doc)"
                          class="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Download"
                      >
                        <span class="text-lg">📥</span>
                      </button>
                      <button
                          @click="confirmDelete(doc)"
                          class="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                          title="Löschen"
                          :disabled="deletingFile"
                      >
                        <span class="text-lg">🗑️</span>
                      </button>
                    </div>
                  </div>

                  <!-- File Type Badge -->
                  <div class="flex items-center justify-between">
                    <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      {{ getFileTypeLabel(doc.type) }}
                    </span>
                    <span class="text-xs text-gray-500">{{ getFileExtension(doc.name) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- List View -->
            <div v-else-if="viewMode === 'list' && filteredDocuments.length > 0" class="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="py-4 px-6 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th class="py-4 px-6 text-left text-sm font-semibold text-gray-700">Typ</th>
                    <th class="py-4 px-6 text-left text-sm font-semibold text-gray-700">Größe</th>
                    <th class="py-4 px-6 text-left text-sm font-semibold text-gray-700">Änderungsdatum</th>
                    <th class="py-4 px-6 text-left text-sm font-semibold text-gray-700">Aktionen</th>
                  </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                  <tr
                      v-for="doc in filteredDocuments"
                      :key="doc.name"
                      class="hover:bg-blue-50 transition-colors"
                  >
                    <td class="py-4 px-6">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span class="text-lg">{{ getFileIcon(doc.type) }}</span>
                        </div>
                        <div>
                          <div class="font-medium text-gray-800">{{ doc.name }}</div>
                          <div class="text-sm text-gray-500">{{ getFileExtension(doc.name) }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                        <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {{ getFileTypeLabel(doc.type) }}
                        </span>
                    </td>
                    <td class="py-4 px-6 text-gray-600">{{ formatFileSize(doc.size) }}</td>
                    <td class="py-4 px-6 text-gray-600">{{ formatDate(doc.lastModified) }}</td>
                    <td class="py-4 px-6">
                      <div class="flex items-center gap-2">
                        <button
                            @click="openPreview(doc)"
                            class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Vorschau"
                        >
                          <span class="text-lg">👁️</span>
                        </button>
                        <button
                            @click="downloadFile(doc)"
                            class="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Download"
                        >
                          <span class="text-lg">📥</span>
                        </button>
                        <button
                            @click="confirmDelete(doc)"
                            class="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                            title="Löschen"
                            :disabled="deletingFile"
                        >
                          <span class="text-lg">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="filteredDocuments.length === 0" class="text-center py-16">
              <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span class="text-4xl">📁</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Keine Dokumente gefunden</h3>
              <p class="text-gray-600 max-w-md mx-auto">
                {{
                  searchQuery
                      ? `Keine Dokumente passen zu "${searchQuery}"`
                      : 'Es sind noch keine Dokumente vorhanden.'
                }}
              </p>
              <div class="mt-6">
                <button
                    @click="triggerFileInput"
                    class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <span>📤</span>
                  Erste Datei hochladen
                </button>
              </div>
            </div>

            <!-- Document Stats -->
            <div v-if="filteredDocuments.length > 0" class="mt-12">
              <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div class="flex flex-wrap items-center justify-between gap-4">
                  <div class="flex items-center gap-6">
                    <div class="text-center">
                      <div class="text-2xl font-bold text-gray-800">{{ documents.length }}</div>
                      <div class="text-sm text-gray-600">Gesamt</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-gray-800">{{ getFileTypeCount('image') }}</div>
                      <div class="text-sm text-gray-600">Bilder</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-gray-800">{{ getFileTypeCount('pdf') }}</div>
                      <div class="text-sm text-gray-600">PDFs</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-gray-800">{{ getOtherFileCount() }}</div>
                      <div class="text-sm text-gray-600">Andere</div>
                    </div>
                  </div>
                  <div class="text-sm text-gray-600 flex items-center gap-2">
                    <span>🔒</span>
                    <span>Geschützter Bereich • Nur für Administratoren</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Preview Modal -->
      <div v-if="previewDocument" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <span class="text-xl">{{ getFileIcon(previewDocument.type) }}</span>
              </div>
              <div>
                <h3 class="font-bold text-gray-800 text-lg">{{ previewDocument.name }}</h3>
                <div class="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span>{{ getFileTypeLabel(previewDocument.type) }}</span>
                  <span>•</span>
                  <span>{{ formatFileSize(previewDocument.size) }}</span>
                  <span>•</span>
                  <span>{{ formatDate(previewDocument.lastModified) }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button
                  @click="downloadFile(previewDocument)"
                  class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                📥 Download
              </button>
              <button
                  @click="previewDocument = null"
                  class="p-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <span class="text-xl">✕</span>
              </button>
            </div>
          </div>

          <!-- Modal Content -->
          <div class="p-6 overflow-auto max-h-[calc(90vh-120px)]">
            <!-- PDF Preview -->
            <div v-if="previewDocument.type === 'application/pdf'" class="w-full h-full">
              <iframe
                  :src="previewDocument.url"
                  class="w-full h-[70vh] border-none rounded-xl shadow-lg"
                  title="PDF Vorschau"
              />
            </div>

            <!-- Image Preview -->
            <div v-else-if="previewDocument.type.startsWith('image/')" class="flex items-center justify-center">
              <img
                  :src="previewDocument.url"
                  :alt="previewDocument.name"
                  class="max-w-full max-h-[70vh] rounded-xl shadow-lg object-contain"
              />
            </div>

            <!-- Other File Preview -->
            <div v-else class="text-center py-16">
              <div class="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span class="text-5xl">{{ getFileIcon(previewDocument.type) }}</span>
              </div>
              <h4 class="text-xl font-bold text-gray-800 mb-2">Keine Vorschau verfügbar</h4>
              <p class="text-gray-600 max-w-md mx-auto mb-8">
                Diese Datei kann nicht direkt angezeigt werden. Bitte laden Sie sie herunter.
              </p>
              <button
                  @click="downloadFile(previewDocument)"
                  class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                📥 Datei herunterladen
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteConfirmModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl p-8 w-96 transform transition-all duration-300">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl text-white">⚠️</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Datei löschen</h2>
            <p class="text-gray-600 text-sm">
              Möchten Sie die Datei<br>
              <span class="font-semibold text-gray-800">{{ documentToDelete?.name }}</span><br>
              wirklich löschen?
            </p>
          </div>
          <div class="space-y-4">
            <button
                @click="deleteDocument(documentToDelete!.name)"
                :disabled="deletingFile"
                class="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {{ deletingFile ? 'Lösche...' : '🗑️ Ja, löschen' }}
            </button>
            <button
                @click="cancelDelete"
                :disabled="deletingFile"
                class="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
      <!-- Delete Success/Error Messages -->
      <div v-if="deleteSuccessMessage" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 flex items-center gap-2">
        <span class="text-xl">✅</span>
        <span>{{ deleteSuccessMessage }}</span>
      </div>

      <div v-if="deleteErrorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-center gap-2">
        <span class="text-xl">❌</span>
        <span>{{ deleteErrorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const HARDCODED_PASSWORD = 'admin123'
const isAuthenticated = ref(false)
const passwordInput = ref('')
const loginError = ref(false)
const documents = ref<{
  name: string
  url: string
  type: string
  size?: number
  lastModified?: Date
}[]>([])
const loading = ref(false)
const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const previewDocument = ref<{
  name: string
  url: string
  type: string
  size?: number
  lastModified?: Date
} | null>(null)

// Upload variables
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFiles = ref<File[]>([])
const dragOver = ref(false)
const uploading = ref(false)
const uploadMessage = ref('')
const uploadStatus = ref<'success' | 'error'>()

// Filtered documents based on search
const filteredDocuments = computed(() => {
  if (!searchQuery.value) return documents.value

  const query = searchQuery.value.toLowerCase()
  return documents.value.filter(doc =>
      doc.name.toLowerCase().includes(query) ||
      doc.type.toLowerCase().includes(query)
  )
})

function checkPassword() {
  if (passwordInput.value === HARDCODED_PASSWORD) {
    isAuthenticated.value = true
    loginError.value = false
    passwordInput.value = ''
    loadDocuments()
  } else {
    loginError.value = true
    passwordInput.value = ''
  }
}

async function loadDocuments() {
  loading.value = true
  try {
    const res = await fetch('/api/admin-documents')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()

    documents.value = data.map((doc: any) => ({
      ...doc,
      lastModified: new Date(doc.lastModified)
    }))
  } catch (e) {
    console.error('Fehler beim Laden der Dokumente:', e)
    // Fallback: Create demo documents if API fails
    documents.value = [
      {
        name: 'Beispiel-Dokument.pdf',
        url: '/dummy.pdf',
        type: 'application/pdf',
        size: 1024000,
        lastModified: new Date('2024-01-15')
      },
      {
        name: 'Beispiel-Bild.jpg',
        url: '/dummy.jpg',
        type: 'image/jpeg',
        size: 2048000,
        lastModified: new Date('2024-01-10')
      }
    ]
  }
  loading.value = false
}

function getFileExtension(filename: string): string {
  return filename.split('.').pop() || ''
}

function getFileTypeLabel(type: string): string {
  if (type.startsWith('image/')) return 'Bild'
  if (type === 'application/pdf') return 'PDF'
  if (type.includes('word')) return 'Word'
  if (type.includes('excel')) return 'Excel'
  if (type.includes('powerpoint')) return 'PowerPoint'
  if (type === 'text/plain') return 'Text'
  return 'Datei'
}

function getFileIcon(type: string): string {
  if (type.startsWith('image/')) return '🖼️'
  if (type === 'application/pdf') return '📄'
  if (type.includes('word')) return '📝'
  if (type.includes('excel')) return '📊'
  if (type.includes('powerpoint')) return '📊'
  if (type === 'text/plain') return '📝'
  return '📁'
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return '0 KB'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function formatDate(date?: Date): string {
  if (!date) return ''
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getFileTypeCount(type: string): number {
  if (type === 'image') {
    return documents.value.filter(doc => doc.type.startsWith('image/')).length
  }
  if (type === 'pdf') {
    return documents.value.filter(doc => doc.type === 'application/pdf').length
  }
  return 0
}

function getOtherFileCount(): number {
  return documents.value.filter(doc =>
      !doc.type.startsWith('image/') &&
      doc.type !== 'application/pdf'
  ).length
}

function openPreview(doc: any) {
  previewDocument.value = doc
}

function downloadFile(doc: any) {
  const link = document.createElement('a')
  link.href = doc.url
  link.download = doc.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Upload functions
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const files = Array.from(target.files)
    // Filter by size (10MB limit)
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`Datei "${file.name}" ist zu groß (max. 10MB)`)
        return false
      }
      return true
    })
    selectedFiles.value.push(...validFiles)
  }
  target.value = '' // Reset input
}

const handleDrop = (event: DragEvent) => {
  dragOver.value = false
  if (event.dataTransfer?.files) {
    const files = Array.from(event.dataTransfer.files)
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`Datei "${file.name}" ist zu groß (max. 10MB)`)
        return false
      }
      return true
    })
    selectedFiles.value.push(...validFiles)
  }
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const clearFiles = () => {
  selectedFiles.value = []
  uploadMessage.value = ''
}

const getFileIconFromFile = (file: File) => {
  const type = file.type
  if (type.startsWith('image/')) return '🖼️'
  if (type === 'application/pdf') return '📄'
  if (type.includes('word')) return '📝'
  if (type.includes('excel')) return '📊'
  if (type.includes('powerpoint')) return '📊'
  if (type === 'text/plain') return '📝'
  return '📁'
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
      uploadMessage.value = `✅ ${result.message}`

      // Refresh documents after a short delay
      setTimeout(() => {
        loadDocuments()
      }, 1000)

      // Clear selected files
      selectedFiles.value = []
    } else {
      uploadStatus.value = 'error'
      uploadMessage.value = `❌ ${result.error || 'Upload fehlgeschlagen'}`
    }
  } catch (error) {
    console.error('Upload error:', error)
    uploadStatus.value = 'error'
    uploadMessage.value = '❌ Upload fehlgeschlagen. Bitte versuchen Sie es erneut.'
  } finally {
    uploading.value = false
  }
}

const refreshDocuments = () => {
  loadDocuments()
  uploadMessage.value = ''
}

// Auto-focus password input when modal opens
onMounted(() => {
  setTimeout(() => {
    const input = document.querySelector('input[type="password"]') as HTMLInputElement
    if (input) input.focus()
  }, 100)
})

// Neue States für Lösch-Funktionalität
const deletingFile = ref(false)
const deleteSuccessMessage = ref('')
const deleteErrorMessage = ref('')
const documentToDelete = ref<{
  name: string
  url: string
  type: string
  size?: number
  lastModified?: Date
} | null>(null)
const showDeleteConfirmModal = ref(false)

// Lösch-Funktion
async function deleteDocument(fileName: string) {
  deletingFile.value = true
  deleteErrorMessage.value = ''

  try {
    const response = await fetch(`/api/delete-file?file=${encodeURIComponent(fileName)}`, {
      method: 'DELETE'
    })

    const result = await response.json()

    if (result.success) {
      deleteSuccessMessage.value = result.message

      // Dokument aus der Liste entfernen
      documents.value = documents.value.filter(doc => doc.name !== fileName)

      // Vorschau schließen wenn das gelöschte Dokument angezeigt wird
      if (previewDocument.value?.name === fileName) {
        previewDocument.value = null
      }

      // Erfolgsmeldung nach 3 Sekunden ausblenden
      setTimeout(() => {
        deleteSuccessMessage.value = ''
      }, 3000)
    } else {
      deleteErrorMessage.value = result.error || 'Löschen fehlgeschlagen'

      // Fehlermeldung nach 5 Sekunden ausblenden
      setTimeout(() => {
        deleteErrorMessage.value = ''
      }, 5000)
    }
  } catch (error) {
    console.error('Delete error:', error)
    deleteErrorMessage.value = 'Löschen fehlgeschlagen. Bitte versuchen Sie es erneut.'

    setTimeout(() => {
      deleteErrorMessage.value = ''
    }, 5000)
  } finally {
    deletingFile.value = false
    showDeleteConfirmModal.value = false
    documentToDelete.value = null
  }
}

// Löschen bestätigen
function confirmDelete(doc: any) {
  documentToDelete.value = doc
  showDeleteConfirmModal.value = true
}

// Löschen abbrechen
function cancelDelete() {
  showDeleteConfirmModal.value = false
  documentToDelete.value = null
}
</script>

<style scoped>
/* Custom scrollbar for preview modal */
.preview-modal-content::-webkit-scrollbar {
  width: 8px;
}

.preview-modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.preview-modal-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.preview-modal-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth animations */
.file-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Loading animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Drop zone animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>