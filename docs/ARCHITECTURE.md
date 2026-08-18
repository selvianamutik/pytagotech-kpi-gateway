# Pytagotech KPI Gateway - Architecture Overview

## System Architecture

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Browser   │ HTTPS   │   Vercel Edge    │  POST   │  Google Apps    │
│   (PWA)     ├────────►│   Network        ├────────►│    Script       │
│             │         │   (Frontend)     │         │   (Backend)     │
└─────────────┘         └──────────────────┘         └────────┬────────┘
                                                               │
                                                               │ Write
                                                               ▼
                                                      ┌─────────────────┐
                                                      │  Google Sheets  │
                                                      │   (Database)    │
                                                      └─────────────────┘
```

## Technology Stack

### Frontend
- **React 18**: UI library
- **Vite 5**: Build tool & dev server
- **Tailwind CSS 3**: Utility-first CSS framework
- **shadcn/ui**: Accessible component library
- **Lucide React**: Icon library
- **Vite PWA Plugin**: Service worker & manifest generation

### Backend
- **Google Apps Script**: Serverless backend (JavaScript runtime)
- **Google Spreadsheet**: Database & data storage

### Hosting & Infrastructure
- **Vercel**: Edge network, CDN, HTTPS, CI/CD
- **Service Worker**: Offline caching & PWA capabilities

## Data Flow

### Submit KPI Flow

1. **User Input** → Form validation (client-side)
2. **Timestamp Generation** → Browser creates ISO timestamp
3. **HTTP POST** → Fetch API sends JSON to Apps Script endpoint
4. **Apps Script Processing**:
   - Validate data
   - Find or create sheet by division name
   - Append rows to sheet
   - Return success response
5. **UI Update** → Show success message, reset form

### Data Structure

**Request Payload:**
```json
[
  {
    "timestamp": "18/08/2026 10:30:00",
    "bulan": "2026-08",
    "nama": "Budi Santoso",
    "divisi": "Engineering",
    "kegiatan": "Deploy fitur login",
    "persentase": 100
  }
]
```

**Spreadsheet Schema:**
```
| Timestamp           | Bulan   | Nama          | Divisi      | Kegiatan              | Persentase (%) |
|---------------------|---------|---------------|-------------|-----------------------|----------------|
| 18/08/2026 10:30:00 | 2026-08 | Budi Santoso  | Engineering | Deploy fitur login    | 100            |
```

## Security Model

### Frontend Security
- **No Authentication**: Access via direct URL (per requirements)
- **Client-side Validation**: Input sanitization & type checking
- **HTTPS Only**: Enforced by Vercel
- **CSP Headers**: Content Security Policy (auto by Vercel)

### Backend Security
- **Apps Script Authorization**: Runs as deploying user
- **CORS Handling**: `no-cors` mode required for Apps Script
- **Rate Limiting**: Built-in Google Apps Script quotas
- **Input Validation**: Server-side validation in Apps Script

### Data Security
- **Google Workspace**: Enterprise-grade security
- **Access Control**: Managed via Google Sheets permissions
- **Audit Trail**: Automatic timestamp for all entries
- **No PII Exposure**: Data stays within Google infrastructure

## Scalability Considerations

### Current Limits
- **Google Apps Script**: 6 min execution time per request
- **Spreadsheet**: 10M cells max (practically ~100k rows)
- **Concurrent Users**: ~30 simultaneous writes (Apps Script quota)

### Scaling Strategy (Future)
If usage grows beyond Spreadsheet limits:
1. Archive old data monthly (move to separate sheets)
2. Implement data partitioning (sheet per division + month)
3. Consider migration to proper database (Supabase, Firebase)

## Performance Optimization

### Frontend Performance
- **Code Splitting**: Vite automatic chunking
- **Tree Shaking**: Remove unused code
- **Asset Optimization**: Image compression, lazy loading
- **Service Worker Caching**: Cache-first for static assets

### Backend Performance
- **Batch Writes**: Multiple activities in single request
- **Sheet Caching**: Apps Script caches sheet references
- **Minimal Processing**: Simple append operations only

## PWA Strategy

### Service Worker Strategy
```javascript
// Cache Strategy
Static Assets (HTML/CSS/JS) → Cache First (offline support)
Google Apps Script API     → Network Only (always fresh data)
```

### Offline Capabilities
- **Offline UI**: App shell cached, can view form
- **Submit Requires Network**: Data submission needs connection
- **Future Enhancement**: IndexedDB queue for offline submissions

## Monitoring & Observability

### Available Metrics
- **Vercel Analytics**: Page views, unique visitors, performance
- **Apps Script Executions**: Success rate, execution time, errors
- **Spreadsheet Data**: Usage patterns, active users, completion rates

### Error Handling
- **Frontend**: Try-catch with user-friendly messages
- **Backend**: Apps Script execution logs
- **Network**: Timeout handling (120s default)

## Deployment Pipeline

```
Developer Push → GitHub
       ↓
   Vercel CI/CD
       ↓
   Build & Test
       ↓
   Deploy to Edge
       ↓
   Production Live
```

### Deployment Checklist
- ✅ Google Apps Script deployed as Web App
- ✅ Environment variables configured in Vercel
- ✅ Custom domain DNS configured (optional)
- ✅ PWA manifest valid
- ✅ Service worker registered
- ✅ Performance budget met

## Maintenance

### Regular Tasks
- **Weekly**: Check Apps Script execution logs for errors
- **Monthly**: Review Spreadsheet data size, archive if needed
- **Quarterly**: Update dependencies, security patches
- **Yearly**: Review architecture, consider optimizations

### Update Strategy
- **Frontend Updates**: Via Git push → auto-deploy
- **Apps Script Updates**: Manual deploy with new version
- **Configuration Updates**: Via environment variables
- **Data Schema Changes**: Backward compatible migrations

## Cost Structure

### Current Costs (Free Tier)
- **Vercel**: $0/month (Hobby plan)
- **Google Workspace**: $0/month (standard Google account)
- **Domain** (Optional): ~$12/year

### Estimated Production Costs
- **Vercel Pro** (if needed): $20/month
- **Google Workspace**: Still free (within quotas)
- **Total**: ~$20/month for unlimited team usage

## Future Enhancements

### Potential Features
1. **Analytics Dashboard**: Visualize KPI trends
2. **Notifications**: Reminder untuk isi KPI
3. **Export**: Download data as CSV/Excel
4. **Integration**: Slack/Discord notifications
5. **Mobile App**: Native iOS/Android wrapper
6. **Admin Panel**: Manage users & divisions via UI
7. **Authentication**: Optional login for audit trail
8. **Offline Queue**: Submit KPI saat offline, sync later

### Migration Path
If outgrowing Google Sheets:
1. **Database**: Migrate to Supabase/Firebase
2. **Backend**: Move to Next.js API routes or Express
3. **Authentication**: Implement JWT or OAuth
4. **Real-time**: Add WebSocket for live updates

---

**Document Version**: 1.0  
**Last Updated**: 18 Agustus 2026  
**Maintainer**: Engineering Team Pytagotech
