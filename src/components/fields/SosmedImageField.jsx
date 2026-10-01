import { useState, useRef } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function SosmedImageField({ data = {}, onChange, disabled = false }) {
  const fileInputRef = useRef(null)
  const [previews, setPreviews] = useState(data.previews || [])

  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length === 0) return

    const currentFiles = data.files || []
    const updatedFiles = [...currentFiles, ...selectedFiles]

    // Create object URLs for previews
    const newPreviewUrls = selectedFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }))

    const updatedPreviews = [...previews, ...newPreviewUrls]
    setPreviews(updatedPreviews)

    onChange({
      ...data,
      files: updatedFiles,
      previews: updatedPreviews,
    })

    // Reset input value so same files could be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = (index) => {
    const updatedFiles = (data.files || []).filter((_, i) => i !== index)
    const updatedPreviews = previews.filter((_, i) => i !== index)
    setPreviews(updatedPreviews)

    onChange({
      ...data,
      files: updatedFiles,
      previews: updatedPreviews,
    })
  }

  const handleEngagementChange = (val) => {
    onChange({
      ...data,
      nilai_angka: val,
    })
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs text-gray-600">
          Upload Gambar Konten (Multiple) *
        </Label>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            id="sosmed-image-upload"
            onChange={handleFiles}
            disabled={disabled}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="w-full sm:w-auto"
          >
            <ImagePlus className="w-4 h-4 mr-2" />
            Pilih Gambar Konten
          </Button>
          <span className="text-xs text-gray-500">
            {(data.files?.length || 0)} gambar dipilih
          </span>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {previews.map((item, index) => (
            <div
              key={index}
              className="relative group rounded-md overflow-hidden border border-gray-200 bg-gray-100 aspect-video flex items-center justify-center"
            >
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                disabled={disabled}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-90 hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-1 pt-1">
        <Label className="text-xs text-gray-600">
          Target / Capaian Engagement (Like / Reach / Interaksi)
        </Label>
        <Input
          type="number"
          min="0"
          placeholder="Contoh: 250"
          value={data.nilai_angka ?? ''}
          onChange={(e) => handleEngagementChange(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
