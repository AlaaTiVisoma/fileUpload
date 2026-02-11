// server/api/delete-file.delete.ts
import { defineEventHandler, getQuery } from 'h3'
import { unlink } from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const fileName = query.file as string

        if (!fileName) {
            return {
                success: false,
                error: 'Kein Dateiname angegeben'
            }
        }

        // Sicherheitscheck: Verhindert Directory Traversal Attacks
        const safeFileName = path.basename(fileName)
        const filePath = path.join(process.cwd(), 'public', 'admin-dokumente', safeFileName)

        // Datei löschen
        await unlink(filePath)

        return {
            success: true,
            message: `Datei "${safeFileName}" erfolgreich gelöscht`
        }

    } catch (error) {
        console.error('Delete error:', error)

        // Wenn Datei nicht existiert
        if (error.code === 'ENOENT') {
            return {
                success: false,
                error: 'Datei nicht gefunden'
            }
        }

        return {
            success: false,
            error: 'Löschen fehlgeschlagen: ' + (error instanceof Error ? error.message : String(error))
        }
    }
})