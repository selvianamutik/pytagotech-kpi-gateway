import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function OutreachField({ data = {}, onChange, disabled = false }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="space-y-1">
        <Label className="text-xs text-gray-600">WhatsApp (WA) *</Label>
        <Input
          type="number"
          min="0"
          placeholder="Jml kontak"
          value={data.nilai_wa ?? ''}
          onChange={(e) => handleChange('nilai_wa', e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="space-y-1">
        <Label className="text-xs text-gray-600">Instagram (IG) *</Label>
        <Input
          type="number"
          min="0"
          placeholder="Jml kontak"
          value={data.nilai_ig ?? ''}
          onChange={(e) => handleChange('nilai_ig', e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="space-y-1">
        <Label className="text-xs text-gray-600">Email *</Label>
        <Input
          type="number"
          min="0"
          placeholder="Jml kontak"
          value={data.nilai_email ?? ''}
          onChange={(e) => handleChange('nilai_email', e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
