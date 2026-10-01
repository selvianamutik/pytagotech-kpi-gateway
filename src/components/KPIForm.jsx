import { useState } from 'react'
import { Loader2, Plus, Trash2, AlertCircle, CheckCircle2, Info, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TaskFieldRenderer from '@/components/fields/TaskFieldRenderer'
import {
  MEMBERS,
  DIVISIONS,
  KPI_TASKS,
  DEVELOPER_PROJECTS,
  FIELD_TYPES,
  APPS_SCRIPT_URL,
} from '@/config/members'

export default function KPIForm() {
  const [nama, setNama] = useState('')
  const [divisi, setDivisi] = useState('')
  const [tipeLaporan, setTipeLaporan] = useState('harian') // 'harian' atau 'mingguan'
  const [tasks, setTasks] = useState([
    { project: '', kpiTask: '', fieldData: {}, kendala: '' },
  ])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const isDeveloper = divisi === 'Developer' || divisi === 'Produksi (Developer)'

  // Mengembalikan list task yang tersedia untuk divisi (dan project jika developer) berdasarkan tipe laporan
  const getAllTasksForDivisi = (divName, projName = '', currentTipe = tipeLaporan) => {
    if (!divName) return []
    const divConfig = KPI_TASKS[divName]
    if (!divConfig) return []

    const isDev = divName === 'Developer' || divName === 'Produksi (Developer)'
    if (isDev) {
      if (!projName) return []
      const devTasksByPeriod = divConfig[currentTipe] || divConfig.harian
      return devTasksByPeriod?.[projName] || []
    }

    return divConfig[currentTipe] || (Array.isArray(divConfig) ? divConfig : [])
  }

  // Generate task list otomatis untuk laporan Mingguan
  const populateWeeklyTasks = (selectedDivisi, selectedProject = '') => {
    const available = getAllTasksForDivisi(selectedDivisi, selectedProject, 'mingguan')
    if (available.length === 0) {
      setTasks([{ project: selectedProject, kpiTask: '', fieldData: {}, kendala: '' }])
      return
    }

    const initialTasks = available.map((taskConfig) => ({
      project: selectedProject,
      kpiTask: taskConfig.label,
      fieldData: {},
      kendala: '',
    }))
    setTasks(initialTasks)
  }

  // Reset or adjust tasks when division changes
  const handleDivisiChange = (newDivisi) => {
    setDivisi(newDivisi)
    if (tipeLaporan === 'mingguan') {
      const isDev = newDivisi === 'Developer' || newDivisi === 'Produksi (Developer)'
      const defaultProj = isDev ? DEVELOPER_PROJECTS[0] : ''
      populateWeeklyTasks(newDivisi, defaultProj)
    } else {
      setTasks([{ project: '', kpiTask: '', fieldData: {}, kendala: '' }])
    }
  }

  // Handle pergantian tipe laporan (harian vs mingguan)
  const handleTipeLaporanChange = (newTipe) => {
    setTipeLaporan(newTipe)
    if (newTipe === 'mingguan') {
      setNama('Kepala Divisi') // Default / placeholder untuk laporan mingguan
      if (divisi) {
        const defaultProj = isDeveloper ? (tasks[0]?.project || DEVELOPER_PROJECTS[0]) : ''
        populateWeeklyTasks(divisi, defaultProj)
      }
    } else {
      setNama('')
      setTasks([{ project: '', kpiTask: '', fieldData: {}, kendala: '' }])
    }
  }

  // Handle pergantian project pada mode mingguan developer
  const handleWeeklyProjectChange = (newProject) => {
    populateWeeklyTasks(divisi, newProject)
  }

  const addTask = () => {
    setTasks([
      ...tasks,
      { project: '', kpiTask: '', fieldData: {}, kendala: '' },
    ])
  }

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(
      newTasks.length > 0
        ? newTasks
        : [{ project: '', kpiTask: '', fieldData: {}, kendala: '' }]
    )
  }

  const updateTask = (index, updates) => {
    setTasks((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], ...updates }
      return next
    })
  }

  // Get available KPI task list based on division and selected project
  const getAvailableTasks = (taskItem) => {
    if (!divisi) return []
    return getAllTasksForDivisi(divisi, taskItem.project)
  }

  const validateForm = () => {
    if (tipeLaporan === 'harian' && !nama) {
      setMessage({ type: 'error', text: 'Nama Anggota wajib dipilih!' })
      return false
    }

    if (!divisi) {
      setMessage({ type: 'error', text: 'Divisi wajib dipilih!' })
      return false
    }

    for (let i = 0; i < tasks.length; i++) {
      const t = tasks[i]
      if (isDeveloper && !t.project) {
        setMessage({
          type: 'error',
          text: `Task #${i + 1}: Silakan pilih Project terlebih dahulu!`,
        })
        return false
      }

      if (!t.kpiTask) {
        setMessage({
          type: 'error',
          text: `Task #${i + 1}: Silakan pilih KPI Task yang ingin dilaporkan!`,
        })
        return false
      }

      // Check task config validation
      const available = getAvailableTasks(t)
      const taskConfig = available.find((item) => item.label === t.kpiTask)

      if (taskConfig?.fieldType === FIELD_TYPES.ANGKA) {
        const persen = parseInt(t.fieldData?.persentase)
        if (isNaN(persen) || persen < 0 || persen > 100) {
          setMessage({
            type: 'error',
            text: `Task #${i + 1} (${t.kpiTask}): Capaian persentase harus antara 0-100%!`,
          })
          return false
        }
      }
    }

    return true
  }

  // Convert File to Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64String = reader.result.split(',')[1]
        resolve({
          base64: base64String,
          fileName: file.name,
          mimeType: file.type || 'application/octet-stream',
        })
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!validateForm()) return

    if (!APPS_SCRIPT_URL) {
      setMessage({
        type: 'error',
        text: 'URL Google Apps Script belum dikonfigurasi. Silakan periksa file .env',
      })
      return
    }

    setLoading(true)

    try {
      const now = new Date()
      const timestamp = now.toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })

      const bulan = now
        .toLocaleString('id-ID', {
          year: 'numeric',
          month: '2-digit',
        })
        .replace('/', '-')

      // Nama pengirim (untuk laporan mingguan diset sebagai 'Kepala Divisi')
      const senderNama = tipeLaporan === 'mingguan' ? 'Kepala Divisi' : nama

      // Process each task and collect base64 files
      const rows = []
      for (const t of tasks) {
        const available = getAvailableTasks(t)
        const taskConfig = available.find((item) => item.label === t.kpiTask)
        const fieldType = taskConfig?.fieldType || FIELD_TYPES.ANGKA

        let uploadFiles = []

        // If sosmed image multiple files
        if (fieldType === FIELD_TYPES.SOSMED_IMAGE && t.fieldData?.files?.length > 0) {
          for (const file of t.fieldData.files) {
            const encoded = await fileToBase64(file)
            uploadFiles.push(encoded)
          }
        }

        // If document single file
        if (fieldType === FIELD_TYPES.UPLOAD_FILE && t.fieldData?.file) {
          const encoded = await fileToBase64(t.fieldData.file)
          uploadFiles.push(encoded)
        }

        rows.push({
          timestamp,
          bulan,
          tipe_laporan: tipeLaporan, // 'harian' atau 'mingguan'
          nama: senderNama,
          divisi,
          project: isDeveloper ? t.project : '',
          kpi_task: t.kpiTask,
          nilai_wa: t.fieldData?.nilai_wa || '',
          nilai_ig: t.fieldData?.nilai_ig || '',
          nilai_tele: t.fieldData?.nilai_tele || '',
          nilai_angka: t.fieldData?.nilai_angka || '',
          persentase: t.fieldData?.persentase !== undefined && t.fieldData?.persentase !== ''
            ? parseInt(t.fieldData.persentase)
            : '',
          kendala: t.kendala || '',
          files: uploadFiles,
        })
      }

      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rows),
      })

      setMessage({ type: 'success', text: `Laporan KPI (${tipeLaporan === 'mingguan' ? 'Mingguan' : 'Harian'}) berhasil dikirim!` })

      // Reset tasks list
      if (tipeLaporan === 'mingguan' && divisi) {
        const defaultProj = isDeveloper ? (tasks[0]?.project || DEVELOPER_PROJECTS[0]) : ''
        populateWeeklyTasks(divisi, defaultProj)
      } else {
        setNama('')
        setTasks([{ project: '', kpiTask: '', fieldData: {}, kendala: '' }])
      }
    } catch (error) {
      console.error('Error submitting KPI:', error)
      setMessage({
        type: 'error',
        text: 'Gagal mengirim data. Pastikan koneksi internet stabil.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-3 sm:p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-lg border-blue-100">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-3">
            <img
              src="/logo-192.png"
              alt="Pytagotech Logo"
              className="w-10 h-10 object-contain rounded-md shadow-sm"
            />
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-blue-700">
                Pytagotech KPI Gateway
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Laporkan capaian KPI harian/mingguan dan kendala kerja tim Anda
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Notifikasi feedback */}
            {message.text && (
              <div
                className={`p-3.5 rounded-lg flex items-start gap-2.5 text-sm ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* Row 0: Pilih Periode Reporting (Harian vs Mingguan) */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Periode Reporting *</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleTipeLaporanChange('harian')}
                  disabled={loading}
                  className={`py-2 px-4 rounded-md text-sm font-medium border transition-all ${
                    tipeLaporan === 'harian'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Laporan Harian
                </button>
                <button
                  type="button"
                  onClick={() => handleTipeLaporanChange('mingguan')}
                  disabled={loading}
                  className={`py-2 px-4 rounded-md text-sm font-medium border transition-all ${
                    tipeLaporan === 'mingguan'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Laporan Mingguan (Lengkap)
                </button>
              </div>
            </div>

            {/* Row 1: Nama & Divisi */}
            <div className={`grid grid-cols-1 ${tipeLaporan === 'harian' ? 'sm:grid-cols-2' : ''} gap-4`}>
              {/* Field Nama Anggota HANYA tampil untuk Laporan Harian */}
              {tipeLaporan === 'harian' && (
                <div className="space-y-1.5">
                  <Label htmlFor="nama" className="text-sm font-medium">
                    Nama Anggota *
                  </Label>
                  <Select
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                    disabled={loading}
                  >
                    <option value="">-- Pilih Nama --</option>
                    {MEMBERS.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="divisi" className="text-sm font-medium">
                  Divisi *
                </Label>
                <Select
                  id="divisi"
                  value={divisi}
                  onChange={(e) => handleDivisiChange(e.target.value)}
                  required
                  disabled={loading}
                >
                  <option value="">-- Pilih Divisi --</option>
                  {DIVISIONS.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Untuk Mingguan Developer: Pilih Project Utama */}
            {divisi && tipeLaporan === 'mingguan' && isDeveloper && (
              <div className="space-y-1.5 p-3 bg-blue-50/60 rounded-md border border-blue-100">
                <Label className="text-sm font-medium text-blue-900">
                  Pilih Project Laporan Mingguan *
                </Label>
                <Select
                  value={tasks[0]?.project || DEVELOPER_PROJECTS[0]}
                  onChange={(e) => handleWeeklyProjectChange(e.target.value)}
                  disabled={loading}
                >
                  {DEVELOPER_PROJECTS.map((proj) => (
                    <option key={proj} value={proj}>
                      {proj}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {/* Row 2: List Tasks */}
            {divisi && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      Daftar Task KPI ({tipeLaporan === 'mingguan' ? 'Laporan Mingguan' : 'Laporan Harian'})
                    </h3>
                    <p className="text-xs text-gray-500">
                      {tipeLaporan === 'mingguan'
                        ? 'Seluruh indikator KPI divisi otomatis ditampilkan untuk diisi sekaligus.'
                        : 'Pilih indikator task KPI yang ingin Anda laporkan.'}
                    </p>
                  </div>

                  {tipeLaporan === 'harian' && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addTask}
                      disabled={loading}
                      className="h-8 text-xs font-medium border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      Tambah Task
                    </Button>
                  )}
                </div>

                {/* Card Alert Khusus Laporan Mingguan */}
                {tipeLaporan === 'mingguan' && (
                  <div className="p-4 bg-amber-50/90 border-2 border-amber-300 rounded-xl flex items-start gap-3.5 text-sm text-amber-950 shadow-sm my-2">
                    <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-base text-amber-900 leading-tight">
                        PERHATIAN: KHUSUS KEPALA DIVISI
                      </p>
                      <p className="text-amber-800 text-xs sm:text-sm mt-1 font-medium">
                        Laporan Mingguan disetorkan secara terpusat dan menyeluruh oleh Kepala Divisi (Lead). Anggota tim biasa tidak perlu mengisi formulir laporan mingguan.
                      </p>
                    </div>
                  </div>
                )}

                {tasks.map((taskItem, index) => {
                  const availableTasks = getAvailableTasks(taskItem)
                  const selectedConfig = availableTasks.find(
                    (item) => item.label === taskItem.kpiTask
                  )

                  return (
                    <div
                      key={index}
                      className="p-4 bg-gray-50/80 rounded-lg border border-gray-200 space-y-3.5 relative"
                    >
                      {/* Header baris task */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded">
                          Task #{index + 1}
                        </span>
                        {tipeLaporan === 'harian' && tasks.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTask(index)}
                            disabled={loading}
                            className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      {/* Dropdown Project (Khusus Divisi Developer pada Laporan Harian) */}
                      {isDeveloper && tipeLaporan === 'harian' && (
                        <div className="space-y-1">
                          <Label className="text-xs text-gray-600">
                            Pilih Project *
                          </Label>
                          <Select
                            value={taskItem.project}
                            onChange={(e) =>
                              updateTask(index, {
                                project: e.target.value,
                                kpiTask: '',
                                fieldData: {},
                              })
                            }
                            required
                            disabled={loading}
                          >
                            <option value="">-- Pilih Project --</option>
                            {DEVELOPER_PROJECTS.map((proj) => (
                              <option key={proj} value={proj}>
                                {proj}
                              </option>
                            ))}
                          </Select>
                        </div>
                      )}

                      {/* Selection / Title Indikator KPI */}
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-600">
                          Indikator KPI *
                        </Label>
                        {tipeLaporan === 'mingguan' ? (
                          <div className="p-2.5 bg-white font-medium text-sm text-gray-800 border border-gray-200 rounded-md">
                            {taskItem.kpiTask || 'Loading...'}
                          </div>
                        ) : (
                          <Select
                            value={taskItem.kpiTask}
                            onChange={(e) =>
                              updateTask(index, {
                                kpiTask: e.target.value,
                                fieldData: {},
                              })
                            }
                            required
                            disabled={
                              loading || (isDeveloper && !taskItem.project)
                            }
                          >
                            <option value="">
                              {isDeveloper && !taskItem.project
                                ? '-- Pilih project terlebih dahulu --'
                                : '-- Pilih Task KPI --'}
                            </option>
                            {availableTasks.map((t) => (
                              <option key={t.label} value={t.label}>
                                {t.label}
                              </option>
                            ))}
                          </Select>
                        )}
                      </div>

                      {/* Dynamic Field Renderer & Deskripsi Task */}
                      {selectedConfig && (
                        <div className="p-3.5 bg-white rounded-md border border-gray-100 shadow-xs space-y-3">
                          {/* Helper Info: Deskripsi, Target & Formula */}
                          <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-md text-xs space-y-1 text-gray-700">
                            {selectedConfig.description && (
                              <p className="text-xs font-medium text-gray-800 mb-1 border-b border-blue-100 pb-1">
                                {selectedConfig.description}
                              </p>
                            )}
                            {selectedConfig.target && (
                              <div className="flex items-center gap-1.5 font-medium text-blue-900">
                                <span className="bg-blue-200/80 px-1.5 py-0.5 rounded text-[11px] font-semibold text-blue-800">
                                  Target: {selectedConfig.target}
                                </span>
                                {selectedConfig.unit && (
                                  <span className="text-gray-500 font-normal">
                                    ({selectedConfig.unit})
                                  </span>
                                )}
                              </div>
                            )}
                            {selectedConfig.formula && (
                              <div className="flex items-start gap-1 text-gray-600 pt-0.5">
                                <Info className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <span className="text-[11px] leading-tight">
                                  <strong className="text-gray-700">Formula:</strong> {selectedConfig.formula}
                                </span>
                              </div>
                            )}
                          </div>

                          <TaskFieldRenderer
                            taskConfig={selectedConfig}
                            data={taskItem.fieldData}
                            onChange={(fieldData) =>
                              updateTask(index, { fieldData })
                            }
                            disabled={loading}
                          />
                        </div>
                      )}

                      {/* Field Deskripsi: Kendala / Masalah (untuk semua divisi) */}
                      <div className="space-y-1 pt-1 border-t border-gray-100">
                        <Label className="text-xs text-gray-600">
                          Kendala / Masalah ({tipeLaporan === 'mingguan' ? 'Minggu Ini' : 'Hari Ini'}) (Opsional)
                        </Label>
                        <Input
                          placeholder="Tuliskan kendala, blocker, atau catatan teknis..."
                          value={taskItem.kendala}
                          onChange={(e) =>
                            updateTask(index, { kendala: e.target.value })
                          }
                          disabled={loading}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-md"
              disabled={loading || !divisi}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Mengirim Laporan...
                </>
              ) : (
                `Kirim Laporan KPI (${tipeLaporan === 'mingguan' ? 'Mingguan' : 'Harian'})`
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
