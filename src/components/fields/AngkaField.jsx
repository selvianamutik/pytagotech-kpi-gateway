import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AngkaField({ data = {}, onChange, unit = '', disabled = false }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="space-y-1">
        <Label className="text-xs text-gray-600">
          Nilai Realisasi {unit ? `(${unit})` : ''} *
        </Label>
        <Input
          type="number"
          placeholder={unit ? `Contoh: 10 ${unit}` : 'Masukkan angka'}
          value={data.nilai_angka ?? ''}
          onChange={(e) => handleChange('nilai_angka', e.target.value)}
          disabled={disabled}
          required
        />
      </div>

      <div className="space-y-1">
        <Label className="text-xs text-gray-600">Capaian Persentase (%) *</Label>
        <Input
          type="number"
          placeholder="0-100"
          min="0"
          max="100"
          value={data.persentase ?? ''}
          onChange={(e) => handleChange('persentase', e.target.value)}
          disabled={disabled}
          required
        />
      </div>
    </div>
  )
}
