# eWorks PWA — Feature: Supervisor Digital Signature (Gesture-based Mobile)
**Feature Type**: Mobile Enhancement | **Phase**: 1 (Core) atau 2 (Advanced)  
**Date**: 2026-05-15 | **Priority**: P1 (High)

---

## 🎯 OBJECTIVE

Enable supervisors to **digitally sign work orders (Arahan Kerja)** using gesture/touch on mobile devices. Signature saved as image file dan displayed pada Arahan Kerja printout.

---

## 📋 REQUIREMENTS

### Functional Requirements

| # | Requirement | Detail |
|---|-------------|--------|
| FR1 | Signature Capture | Supervisor sign on mobile screen using finger/stylus (canvas-based gesture) |
| FR2 | Multiple Signatures | One work order boleh ada multiple supervisors sign (jika lebih dari 1 assigned) |
| FR3 | Signature Validation | Signature wajib sebelum approve/finalize work order |
| FR4 | Timestamp Recording | Capture tarikh & waktu signature |
| FR5 | Signature Storage | Simpan sebagai image file (PNG/JPG) di server + database reference |
| FR6 | Signature Display | Show signature pada printed Arahan Kerja report |
| FR7 | Signature Verification | Admin boleh verify keaslian signature (review history, supervisor name) |
| FR8 | Resend/Amend | Supervisor boleh re-sign jika signature gagal/tidak jelas |

### Non-Functional Requirements

| # | Requirement | Detail |
|---|-------------|--------|
| NFR1 | Mobile-First | Optimized for touch gesture (Android/iOS, 4" - 6" screens) |
| NFR2 | Offline Capable | Signature capture work offline (save locally, sync when online) |
| NFR3 | Performance | Canvas rendering < 100ms, file upload < 2s |
| NFR4 | Storage | Signature image < 500KB per file |
| NFR5 | Security | Signature data encrypted, audit trail logged |
| NFR6 | Accessibility | Touch-friendly UI, large buttons, clear instructions |

---

## 📐 WORKFLOW INTEGRATION

### Where Signature Appears in Main Workflow:

```
TAHAP 3: PLANNING (I3 → I)
├─ Lantik penyelia (existing)
├─ Cetak Arahan Kerja (existing)
│
└─ [NEW] SIGNATURE STEP
   ├─ Display work order summary
   ├─ Signature pad (canvas)
   ├─ Supervisor gesture sign
   ├─ Save signature + timestamp
   └─ Status: I3 → I (confirmed dengan signature)
```

### Integration Points:

1. **`lantikan_penyelia.php`** — Selepas penyelia dilantik, show signature prompt
2. **`api/appoint_supervisor.php`** — API backend untuk save signature
3. **`cetak_laporan.php`** — Signature image included dalam PDF print

---

## 🎨 UI/UX DESIGN

### Mobile Layout (320px - 768px)

```
┌─────────────────────────────────┐
│  ARAHAN KERJA                   │
│  No. WR2026-00123               │
├─────────────────────────────────┤
│  Lokasi: Kampus A, Bangunan B01 │
│  Masalah: Pintu rosak           │
│  Penyelia: Ahmad Bin Ali        │
│  Tarikh Lantik: 15-May-2026     │
├─────────────────────────────────┤
│                                 │
│  TANDATANGAN PENYELIA           │
│  ┌─────────────────────────────┐│
│  │                             ││  ← Canvas area (signature pad)
│  │        [Touch here]          ││     min height: 200px
│  │       to sign                ││     min width: 280px
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
│  [✕ Clear]  [✓ Confirm Sign]    │  ← Buttons
│                                 │
├─────────────────────────────────┤
│  Status: Awaiting signature     │
│                                 │
│  [Cancel]  [Save & Next]        │
└─────────────────────────────────┘
```

### Desktop Layout (768px+)

```
┌───────────────────────────────────────┐
│  ARAHAN KERJA NO. WR2026-00123        │
├───────────────────────────────────────┤
│  Details summary (2-column)           │
├───────────────────────────────────────┤
│  TANDATANGAN PENYELIA                 │
│  ┌─────────────────────────────────┐  │
│  │                                 │  │
│  │                                 │  │
│  │         [Touch/Click here]      │  │  ← Canvas 400x250px
│  │         to sign                 │  │
│  │                                 │  │
│  │                                 │  │
│  └─────────────────────────────────┘  │
│  [Clear] [Confirm Sign]               │
└───────────────────────────────────────┘
```

### Buttons & Interaction:

- **[Clear]** → Reset canvas, allow re-sign
- **[Confirm Sign]** → Validate signature (must have strokes), save
- **[Cancel]** → Back without signing
- **[Save & Next]** → After confirmation, proceed to next step

---

## 🛠️ TECHNICAL IMPLEMENTATION

### Frontend: HTML + JavaScript (Signature Pad Library)

Use library: **[Signature Pad](https://github.com/szimek/signature_pad)** (popular, lightweight)

OR build custom with HTML5 Canvas + Touch events.

#### HTML Template:

```html
<div id="signature-container">
  <h2>Tandatangan Penyelia</h2>
  <canvas id="signature-pad" width="400" height="250" 
          style="border: 2px solid #ccc; border-radius: 4px; cursor: crosshair;">
  </canvas>
  <p><small>Tap/click above to sign with your finger or stylus</small></p>
  
  <div class="button-group">
    <button type="button" id="clear-signature" class="btn btn-secondary">
      ✕ Clear
    </button>
    <button type="button" id="confirm-signature" class="btn btn-primary">
      ✓ Confirm Sign
    </button>
  </div>
  
  <div id="signature-status" style="margin-top: 10px; display: none;">
    <p id="signature-message" class="alert alert-success">
      ✓ Signature recorded
    </p>
  </div>
  
  <input type="hidden" id="signature-data" name="signature_data">
  <input type="hidden" id="signature-timestamp" name="signature_timestamp">
</div>
```

#### JavaScript:

```javascript
// Include library
<script src="https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js"></script>

<script>
const canvas = document.getElementById('signature-pad');
const signaturePad = new SignaturePad(canvas, {
  penColor: 'rgb(0, 0, 0)',
  minWidth: 2,
  maxWidth: 2.5,
  throttle: 16, // ~60fps
});

// Handle window resize
function resizeCanvas() {
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext('2d').scale(ratio, ratio);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Clear button
document.getElementById('clear-signature').addEventListener('click', () => {
  signaturePad.clear();
  document.getElementById('signature-status').style.display = 'none';
});

// Confirm button
document.getElementById('confirm-signature').addEventListener('click', () => {
  if (signaturePad.isEmpty()) {
    alert('Please sign first');
    return;
  }
  
  // Convert canvas to image (PNG)
  const signatureImage = canvas.toDataURL('image/png');
  const timestamp = new Date().toISOString();
  
  document.getElementById('signature-data').value = signatureImage;
  document.getElementById('signature-timestamp').value = timestamp;
  
  document.getElementById('signature-status').style.display = 'block';
  
  // Disable further signing (optional)
  signaturePad.off();
  
  // Show next button or auto-submit
  // (handled by form submission)
});
</script>
```

### Backend: PHP API Endpoint

**Endpoint**: `api/save_supervisor_signature.php`

```php
<?php
// POST endpoint to save signature

header('Content-Type: application/json');
session_start();

// Validate auth
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    jsonResponse(['error' => 'Unauthorized'], 401);
}

$input = json_decode(file_get_contents('php://input'), true);
$wr_id = $input['wr_id'] ?? null;
$supervisor_id = $input['supervisor_id'] ?? null; // or use session
$signature_data = $input['signature_data'] ?? null; // Base64 PNG
$timestamp = $input['timestamp'] ?? date('Y-m-d H:i:s');

// Validate
if (!$wr_id || !$signature_data) {
    jsonResponse(['error' => 'Missing required fields'], 400);
}

try {
    // Decode Base64 → PNG file
    $imageData = base64_decode(str_replace('data:image/png;base64,', '', $signature_data));
    
    // Generate filename
    $signatureDir = __DIR__ . '/../assets/signatures/';
    if (!is_dir($signatureDir)) mkdir($signatureDir, 0755, true);
    
    $filename = 'signature_' . $wr_id . '_' . uniqid() . '.png';
    $filepath = $signatureDir . $filename;
    
    file_put_contents($filepath, $imageData);
    
    // Save to database
    $db = getDB();
    $sql = "INSERT INTO wr_supervisor_signatures 
            (wr_id, supervisor_id, signature_file, signature_date, created_at) 
            VALUES (?, ?, ?, ?, NOW())";
    
    $stmt = $db->query($sql, [$wr_id, $supervisor_id, $filename, $timestamp]);
    
    // Update work request status if needed
    $db->query("UPDATE wr SET status = 'I' WHERE wr_id = ? AND status = 'I3'", [$wr_id]);
    
    jsonResponse([
        'success' => true,
        'message' => 'Signature saved successfully',
        'signature_id' => $db->lastInsertId(),
        'file' => $filename
    ]);
    
} catch (Exception $e) {
    error_log('Signature save error: ' . $e->getMessage());
    jsonResponse(['error' => 'Failed to save signature'], 500);
}

function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}
?>
```

### Database Schema

#### New Table: `wr_supervisor_signatures`

```sql
CREATE TABLE wr_supervisor_signatures (
    sig_id INT PRIMARY KEY AUTO_INCREMENT,
    wr_id VARCHAR(20) NOT NULL,
    supervisor_id VARCHAR(20) NOT NULL,
    signature_file VARCHAR(255) NOT NULL,  -- filename (signatures/signature_WR123_xyz.png)
    signature_date DATETIME,                -- timestamp from signature
    created_at DATETIME DEFAULT NOW(),
    signed_by_user VARCHAR(20),             -- who actually signed (session user)
    ip_address VARCHAR(45),
    device_info VARCHAR(255),               -- user agent info
    
    FOREIGN KEY (wr_id) REFERENCES wr(wr_id),
    INDEX idx_wr_id (wr_id),
    INDEX idx_supervisor_id (supervisor_id)
);
```

#### Modify Existing Table: `wr`

```sql
ALTER TABLE wr ADD COLUMN (
    signature_status VARCHAR(20) DEFAULT 'PENDING',  -- PENDING, SIGNED, REJECTED
    signature_count INT DEFAULT 0,
    last_signature_date DATETIME
);
```

---

## 📄 DISPLAY ON ARAHAN KERJA (cetak_laporan.php)

### PDF Output Integration:

```php
// In cetak_laporan.php — after work order details

// Fetch supervisor signatures
$sql = "SELECT wrs.*, su.desc_user 
        FROM wr_supervisor_signatures wrs
        JOIN afm_users su ON wrs.supervisor_id = su.user_name
        WHERE wrs.wr_id = ? 
        ORDER BY wrs.created_at ASC";

$signatures = $db->fetchAll($sql, [$wr_id]);

// Add to PDF
foreach ($signatures as $sig) {
    $pdf->SetY($y);
    $pdf->SetFont('Arial', 'B', 10);
    $pdf->Cell(0, 5, 'Tandatangan Penyelia: ' . $sig['desc_user'], 0, 1);
    
    // Embed signature image
    $signaturePath = __DIR__ . '/assets/signatures/' . $sig['signature_file'];
    if (file_exists($signaturePath)) {
        $pdf->Image($signaturePath, 30, $y+5, 40, 20); // width=40mm, height=20mm
        $y += 25;
    }
    
    $pdf->SetFont('Arial', '', 8);
    $pdf->Cell(0, 3, 'Tarikh: ' . date('d-m-Y H:i', strtotime($sig['created_at'])), 0, 1);
    $y += 3;
}
```

---

## 🔒 SECURITY CONSIDERATIONS

| Concern | Mitigation |
|---------|-----------|
| **Signature Forgery** | Audit trail logged (IP, timestamp, user who signed) |
| **File Tampering** | Store signatures in read-only directory, use hash verification |
| **Unauthorized Access** | Permission check — only assigned supervisor can sign their aduan |
| **Data Loss** | Backup signature files daily, database replication |
| **Privacy** | Signature stored securely, access control via role-based permissions |

### Audit Trail Example:
```
Signature recorded:
- wr_id: WR2026-00123
- Supervisor: Ahmad Bin Ali (001234)
- Signed by: user session ID (001234)
- IP Address: 192.168.1.100
- Device: Mozilla/5.0 (Android...)
- Timestamp: 2026-05-15 14:32:17
- File: signature_WR2026-00123_5ecaf3a7.png
- Hash (SHA256): abc123...
```

---

## 📱 MOBILE RESPONSIVENESS

### Breakpoints:

| Device | Canvas Size | Button Layout |
|--------|------------|--------------|
| Mobile (320-480px) | 280x200px | Stacked (full-width) |
| Tablet (480-768px) | 380x250px | Side-by-side |
| Desktop (768px+) | 400x250px | Side-by-side |

### Touch Optimization:

```css
#signature-pad {
  touch-action: none;  /* Prevent browser pan/zoom during signing */
  cursor: crosshair;
  -webkit-user-select: none;
  user-select: none;
}

.button-group button {
  min-height: 44px;  /* Mobile touch target minimum */
  font-size: 16px;   /* Prevent zoom on iOS */
  padding: 12px 20px;
}
```

---

## 🔄 WORKFLOW STEPS

### Step-by-Step Flow:

```
1. DFMS / Section Leader open lantikan_penyelia.php
2. Select supervisors to appoint
3. System show "Confirm & Collect Signatures" button
4. Each supervisor gets notification (push or email)
5. Supervisor open link → signature pad page
6. Supervisor touches/signs on canvas
7. Supervisor tap "Confirm Sign"
8. Signature uploaded to server (api/save_supervisor_signature.php)
9. System confirms: "Signature recorded"
10. Status: I3 → I (complete)
11. Arahan Kerja printable with signatures included
```

---

## 📊 IMPLEMENTATION PLAN

### Phase 1 (Core — Weeks 1-6):
- ✅ HTML canvas signature capture
- ✅ Save signature as image file
- ✅ Database table creation
- ✅ API endpoint for signature save
- ✅ Mobile responsive design
- ✅ Show signature on PDF report

### Phase 2 (Advanced — Weeks 7-14):
- ✅ Offline signature capture (save locally, sync when online)
- ✅ Signature timestamp + audit trail
- ✅ Email notification to supervisors
- ✅ Signature verification UI (admin review)
- ✅ Multiple supervisors per work order (each signs separately)

### Phase 3 (Optional):
- 🤖 Biometric signature verification (advanced)
- 🤖 Signature comparison ML model (detect forgery)

---

## 🧪 TESTING CHECKLIST

- [ ] Signature capture works on Android (Chrome, Samsung Internet)
- [ ] Signature capture works on iOS (Safari, Chrome)
- [ ] Signature save & database record create correctly
- [ ] Signature displays on PDF printout
- [ ] Offline mode works (service worker caches signature)
- [ ] Sync works when back online
- [ ] Audit trail logged correctly (IP, timestamp, user)
- [ ] Only assigned supervisor can sign their work order
- [ ] Clear button resets canvas
- [ ] Touch events smooth (no lag on canvas)
- [ ] File size < 500KB per signature
- [ ] Signature image quality acceptable (≥ 96dpi)

---

## 📝 IMPLEMENTATION NOTES

1. **Library Choice**: Signature Pad (JavaScript library) is recommended
   - Lightweight (~9KB minified)
   - Works offline
   - Touch-optimized
   - Cross-browser compatible

2. **File Storage**:
   - Save as PNG (native canvas format)
   - Directory: `/assets/signatures/`
   - Naming: `signature_{wr_id}_{supervisor_id}_{timestamp}.png`

3. **Database Integration**:
   - New table: `wr_supervisor_signatures`
   - Audit fields: `ip_address`, `device_info`, `created_at`
   - Status field: `signature_status` (PENDING/SIGNED/REJECTED)

4. **Offline Capability**:
   - Service Worker caches signature data
   - IndexedDB stores signature locally
   - Background sync uploads when online

5. **Security Best Practices**:
   - Validate Base64 image data before decode
   - Check file extension & MIME type
   - Store files outside web root if possible
   - Implement rate limiting on signature API

---

## 🎯 SUCCESS CRITERIA

✅ Supervisor dapat sign Arahan Kerja di mobile dalam < 30 detik  
✅ Signature appear di printed Arahan Kerja dengan jelas  
✅ Audit trail logged untuk compliance  
✅ Offline mode work tanpa internet  
✅ Mobile screen tidak lag during signing  
✅ Signature file size optimized (< 500KB)  

---

**Status**: Ready for development | **Owner**: NEXUS (architecture) + PIXEL (UX)  
**Next Step**: Integrate into Phase 1 sprint backlog + start frontend development
