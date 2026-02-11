// server/api/admin-documents.ts
import { promises as fs } from 'fs'
import path from 'path'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const dir = path.join(process.cwd(), 'public', 'admin-dokumente')

        // Create directory if it doesn't exist
        await fs.mkdir(dir, { recursive: true }).catch(() => {})

        let files: string[] = []
        try {
            files = await fs.readdir(dir)
        } catch (e) {
            return []
        }

        const documents = await Promise.all(
            files.filter(f => !f.startsWith('.')).map(async (name) => {
                const filePath = path.join(dir, name)

                try {
                    const stat = await fs.stat(filePath)

                    if (!stat.isFile()) return null

                    const ext = path.extname(name).toLowerCase()
                    let type = 'application/octet-stream'

                    if (['.jpg', '.jpeg'].includes(ext)) type = 'image/jpeg'
                    else if (ext === '.png') type = 'image/png'
                    else if (ext === '.pdf') type = 'application/pdf'
                    else if (ext === '.gif') type = 'image/gif'
                    else if (ext === '.webp') type = 'image/webp'
                    else if (ext === '.doc' || ext === '.docx') type = 'application/msword'
                    else if (ext === '.xls' || ext === '.xlsx') type = 'application/vnd.ms-excel'
                    else if (ext === '.ppt' || ext === '.pptx') type = 'application/vnd.ms-powerpoint'
                    else if (ext === '.txt') type = 'text/plain'

                    return {
                        name,
                        url: `/admin-dokumente/${encodeURIComponent(name)}`,
                        type,
                        size: stat.size,
                        lastModified: stat.mtime
                    }
                } catch (error) {
                    console.error(`Error reading file ${name}:`, error)
                    return null
                }
            })
        )

        return documents.filter(Boolean)
    } catch (error) {
        console.error('Error loading documents:', error)
        return []
    }
})