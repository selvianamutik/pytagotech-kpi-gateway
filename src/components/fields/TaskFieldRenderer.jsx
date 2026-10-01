import { FIELD_TYPES } from '@/config/members'
import AngkaField from './AngkaField'
import OutreachField from './OutreachField'
import SosmedImageField from './SosmedImageField'
import UploadFileField from './UploadFileField'

export default function TaskFieldRenderer({ taskConfig, data, onChange, disabled }) {
  if (!taskConfig) return null

  switch (taskConfig.fieldType) {
    case FIELD_TYPES.OUTREACH:
      return <OutreachField data={data} onChange={onChange} disabled={disabled} />

    case FIELD_TYPES.SOSMED_IMAGE:
      return <SosmedImageField data={data} onChange={onChange} disabled={disabled} />

    case FIELD_TYPES.UPLOAD_FILE:
      return <UploadFileField data={data} onChange={onChange} disabled={disabled} />

    case FIELD_TYPES.ANGKA:
    default:
      return (
        <AngkaField
          data={data}
          onChange={onChange}
          unit={taskConfig.unit}
          disabled={disabled}
        />
      )
  }
}
