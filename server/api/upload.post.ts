// server/api/upload.post.ts
import { defineEventHandler, readMultipartFormData } from 'h3'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
    try {
        // Read multipart form data
        const formData = await readMultipartFormData(event)

        if (!formData || formData.length === 0) {
            return {
                success: false,
                error: 'Keine Datei hochgeladen'
            }
        }

        const uploadedFiles = []

        for (const field of formData) {
            // Nur File-Felder verarbeiten, die einen Namen haben
            if (field.name === 'files' && field.filename) {
                // Create directory if it doesn't exist
                const uploadDir = path.join(process.cwd(), 'public', 'admin-dokumente')
                await mkdir(uploadDir, { recursive: true })

                // Original filename mit Erweiterung verwenden
                const fileName = field.filename
                const filePath = path.join(uploadDir, fileName)

                // Write file to disk
                await writeFile(filePath, field.data)

                uploadedFiles.push({
                    name: fileName,
                    type: field.type || 'application/octet-stream',
                    size: field.data.length
                })
            }
        }

        if (uploadedFiles.length === 0) {
            return {
                success: false,
                error: 'Keine gültigen Dateien gefunden'
            }
        }

        return {
            success: true,
            message: `${uploadedFiles.length} Datei(en) erfolgreich hochgeladen`,
            files: uploadedFiles
        }

    } catch (error) {
        console.error('Upload error:', error)
        return {
            success: false,
            error: 'Upload fehlgeschlagen: ' + (error instanceof Error ? error.message : String(error))
        }
    }
})