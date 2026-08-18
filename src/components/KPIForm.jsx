import { useState } from 'react'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MEMBERS, DIVISIONS, APPS_SCRIPT_URL } from '@/config/members'

export default function KPIForm() {
  const [nama, setNama] = useState('')
  const [divisi, setDivisi] = useState('')
  const [kegiatan, setKegiatan] = useState([{ kegiatan: '', persentase: '' }])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const addKegiatan = () => {
    setKegiatan([...kegiatan, { kegiatan: '', persentase: '' }])
  }

  const removeKegiatan = (index) => {
    const newKegiatan = kegiatan.filter((_, i) => i !== index)
    setKegiatan(newKegiatan.length > 0 ? newKegiatan : [{ kegiatan: '', persentase: '' }])
  }

  const updateKegiatan = (index, field, value) => {
    const newKegiatan = [...kegiatan]
    newKegiatan[index][field] = value
    setKegiatan(newKegiatan)
  }

  const validateForm = () => {
    if (!nama || !divisi) {
      setMessage({ type: 'error', text: 'Nama dan Divisi wajib diisi!' })
      return false
    }

    const hasValidKegiatan = kegiatan.some(k => k.kegiatan.trim() !== '')
    if (!hasValidKegiatan) {
      setMessage({ type: 'error', text: 'Minimal harus ada 1 kegiatan yang diisi!' })
      return false
    }

    for (const k of kegiatan) {
      if (k.kegiatan.trim() !== '') {
        const persen = parseInt(k.persentase)
        if (isNaN(persen) || persen < 0 || persen > 100) {
          setMessage({ type: 'error', text: 'Persentase harus berupa angka 0-100!' })
          return false
        }
      }
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!validateForm()) return

    if (!APPS_SCRIPT_URL) {
      setMessage({ 
        type: 'error', 
        text: 'URL Google Apps Script belum dikonfigurasi. Silakan atur di file .env' 
      })
      return
    }

    setLoading(true)

    try {
      const timestamp = new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })

      const data = kegiatan
        .filter(k => k.kegiatan.trim() !== '')
        .map(k => ({
          timestamp,
          nama,
          divisi,
          kegiatan: k.kegiatan,
          persentase: parseInt(k.persentase)
        }))

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      // no-cors mode doesn't allow reading response, so we assume success
      setMessage({ type: 'success', text: 'Data KPI berhasil dikirim!' })
      
      // Reset form
      setKegiatan([{ kegiatan: '', persentase: '' }])
      // Keep nama & divisi for convenience
      
    } catch (error) {
      console.error('Error:', error)
      setMessage({ 
        type: 'error', 
        text: 'Gagal mengirim data. Pastikan koneksi internet Anda stabil.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-700">
            Pytagotech KPI Gateway
          </CardTitle>
          <CardDescription>
            Laporkan kegiatan dan progress KPI tim Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pesan notifikasi */}
            {message.text && (
              <div
                className={`p-4 rounded-md ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Dropdown Nama */}
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Anggota *</Label>
              <Select
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              >
                <option value="">-- Pilih Nama --</option>
                {MEMBERS.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </Select>
            </div>

            {/* Dropdown Divisi */}
            <div className="space-y-2">
              <Label htmlFor="divisi">Divisi *</Label>
              <Select
                id="divisi"
                value={divisi}
                onChange={(e) => setDivisi(e.target.value)}
                required
              >
                <option value="">-- Pilih Divisi --</option>
                {DIVISIONS.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </Select>
            </div>

            {/* Daftar Kegiatan */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Daftar Kegiatan *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addKegiatan}
                  disabled={loading}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Kegiatan
                </Button>
              </div>

              {kegiatan.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Deskripsi kegiatan"
                      value={item.kegiatan}
                      onChange={(e) =>
                        updateKegiatan(index, 'kegiatan', e.target.value)
                      }
                      disabled={loading}
                    />
                  </div>
                  <div className="w-24 space-y-2">
                    <Input
                      type="number"
                      placeholder="0-100"
                      min="0"
                      max="100"
                      value={item.persentase}
                      onChange={(e) =>
                        updateKegiatan(index, 'persentase', e.target.value)
                      }
                      disabled={loading}
                    />
                  </div>
                  {kegiatan.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeKegiatan(index)}
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mengirim...
                </>
              ) : (
                'Submit KPI'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
