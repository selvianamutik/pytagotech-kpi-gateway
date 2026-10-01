import { useRef } from 'react'
import { FileUp, FileText, X } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function UploadFileField({ data = {}, onChange, disabled = false }) {
  const fileInputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    onChange({
      ...data,
      file: file,
      fileName: file.name,
      fileSize: (file.size / 1024).toFixed(1) + ' KB',
    })
  }

  const removeFile = () => {
    onChange({
      ...data,
      file: null,
      fileName: null,
      fileSize: null,
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <Label className="text-xs text-gray-600">
        Upload Dokumen (PDF, Word, Excel, dll) *
      </Label>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFile}
        disabled={disabled}
      />

      {!data.file ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="w-full sm:w-auto"
        >
          <FileUp className="w-4 h-4 mr-2" />
          Pilih File Dokumen
        </Button>
      ) : (
        <div className="flex items-center justify-between p-2.5 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center space-x-2 truncate">
            <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div className="truncate text-xs">
              <p className="font-medium text-gray-800 truncate">{data.fileName}</p>
              <p className="text-gray-500">{data.fileSize}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeFile}
            disabled={disabled}
            className="text-gray-400 hover:text-red-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
