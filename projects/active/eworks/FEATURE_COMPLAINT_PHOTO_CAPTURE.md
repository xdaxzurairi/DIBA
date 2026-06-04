# eWorks PWA — Feature: 3-Photo Capture untuk Aduan Inisiatif
**Feature Type**: Mobile Enhancement | **Phase**: 1 (Core)  
**Database**: Existing columns `foto1`, `foto2`, `foto3` dalam table `wr`  
**Date**: 2026-05-15

---

## 🎯 OBJECTIVE

Enable users to capture **3 photos** of problem/damage area directly from mobile camera during complaint submission. Photos stored as file references in `wr.foto1`, `wr.foto2`, `wr.foto3` columns.

---

## 📋 REQUIREMENTS

### Functional Requirements

| # | Requirement | Detail |
|---|-------------|--------|
| FR1 | Photo Capture | User dapat ambil foto dari mobile camera (front/back) |
| FR2 | Multiple Photos | Ambil sehingga 3 photos (foto1, foto2, foto3) |
| FR3 | Photo Preview | Sebelum submit, user dapat preview semua 3 foto |
| FR4 | Photo Optional | Foto bukan mandatory (boleh skip) |
| FR5 | Photo Storage | Simpan foto sebagai file di server + reference di DB |
| FR6 | Photo Display | Show fotos dalam form preview, Arahan Kerja, dan paparan lengkap |
| FR7 | Re-capture | User boleh ubah/delete foto sebelum submit |
| FR8 | File Optimization | Compress foto untuk mobile (max 2MB per foto) |

### Non-Functional Requirements

| # | Requirement | Detail |
|---|-------------|--------|
| NFR1 | Mobile-First | Optimized untuk camera capture pada Android/iOS |
| NFR2 | Performance | Camera access < 1s, preview < 500ms, upload < 5s |
| NFR3 | Storage | Each photo < 500KB after compression |
| NFR4 | File Format | JPEG (lossy, smaller) or PNG (lossless, larger) |
| NFR5 | Accessibility | Clear instructions, large touch buttons |
| NFR6 | Offline | Store photos locally, upload when online |

---

## 📐 WORKFLOW INTEGRATION

### Where Photos Fit in Form Aduan Inisiatif:

```
FORM ADUAN INISIATIF
├─ LANGKAH 1: PILIH LOKASI (existing)
├─ LANGKAH 2: PILIH KATEGORI (existing)
├─ LANGKAH 3: ISI KETERANGAN (existing)
│
└─ [NEW] LANGKAH 3B: AMBIL FOTO
   ├─ "Ambil foto lokasi kerosakan (optional)"
   ├─ Button: [📷 Ambil Foto 1] [📷 Ambil Foto 2] [📷 Ambil Foto 3]
   ├─ Preview setiap foto selepas capture
   └─ Boleh delete/re-capture

└─ LANGKAH 4: SEMAK & HANTAR (existing)
   └─ Show semua 3 foto dalam preview
```

### Integration Points:

1. **`form_aduan_inisiatif.php`** — Add photo capture UI
2. **`api/upload_complaint_photo.php`** — New API to save photo file
3. **`cetak_laporan.php`** — Display photos in Arahan Kerja report
4. **`paparan_lengkap_aduan.php`** — Show photos in full complaint view

---

## 🎨 UI/UX DESIGN

### Mobile Layout (Langkah 3B: Ambil Foto)

```
┌──────────────────────────────┐
│  LANGKAH 3B: AMBIL FOTO      │
│  (Opsional)                   │
├──────────────────────────────┤
│  Ambil gambar lokasi kerosakan│
│  untuk dokumentasi            │
│                              │
│  [📷 FOTO 1]  [Status: -]    │
│  [📷 FOTO 2]  [Status: -]    │
│  [📷 FOTO 3]  [Status: -]    │
│                              │
├──────────────────────────────┤
│  PREVIEW FOTO YANG DIAMBIL    │
│                              │
│  Photo 1:                    │
│  ┌──────────────────────┐   │
│  │   [Foto preview]     │   │ ← If captured
│  │  [Delete] [Recapture]│   │
│  └──────────────────────┘   │
│                              │
│  Photo 2: (Belum diambil)    │
│  Photo 3: (Belum diambil)    │
│                              │
├──────────────────────────────┤
│  [Kembali] [Seterusnya]      │
└──────────────────────────────┘
```

### Photo Capture Modal:

```
┌──────────────────────────────┐
│  AMBIL FOTO 1                │
├──────────────────────────────┤
│                              │
│   [📷 Camera Feed Here]      │
│                              │
│   (User sees live camera)    │
│                              │
├──────────────────────────────┤
│  [❌ Batalkan]  [📸 Ambil]  │
└──────────────────────────────┘

OR (If no camera access):

┌──────────────────────────────┐
│  MUAT NAIK FOTO 1            │
├──────────────────────────────┤
│                              │
│  ┌────────────────────────┐ │
│  │  Drag file here atau   │ │
│  │  [Browse...] (tap)     │ │
│  └────────────────────────┘ │
│                              │
│  Format: JPG/PNG            │
│  Saiz max: 5MB              │
│                              │
│  [Batalkan] [Upload]        │
└──────────────────────────────┘
```

### Desktop Layout:

```
LANGKAH 3B: AMBIL FOTO

┌─ Foto 1 ─────────────────┐
│ [📷 Choose/Capture]      │
│ Status: Waiting          │
└──────────────────────────┘

┌─ Foto 2 ─────────────────┐
│ [📷 Choose/Capture]      │
│ Status: Waiting          │
└──────────────────────────┘

┌─ Foto 3 ─────────────────┐
│ [📷 Choose/Capture]      │
│ Status: Waiting          │
└──────────────────────────┘
```

---

## 🛠️ TECHNICAL IMPLEMENTATION

### Frontend: HTML + JavaScript

#### HTML in form_aduan_inisiatif.php:

```html
<!-- LANGKAH 3B: PHOTO CAPTURE -->
<section id="step-photo" style="display:none;">
  <h2>Langkah 3B: Ambil Foto (Opsional)</h2>
  <p>Ambil gambar lokasi kerosakan untuk dokumentasi</p>
  
  <div id="photo-capture-container">
    <!-- Photo 1 -->
    <div class="photo-item">
      <h4>Foto 1</h4>
      <input type="hidden" id="foto1-data" name="foto1_data">
      <input type="hidden" id="foto1-filename" name="foto1_filename">
      
      <button type="button" class="btn btn-primary btn-lg photo-capture-btn" 
              data-photo-num="1">
        📷 Ambil Foto 1
      </button>
      
      <div id="foto1-preview" class="photo-preview" style="display:none;">
        <img id="foto1-img" src="" alt="Foto 1">
        <div class="photo-actions">
          <button type="button" class="btn btn-sm btn-danger photo-delete-btn" 
                  data-photo-num="1">🗑️ Delete</button>
          <button type="button" class="btn btn-sm btn-secondary photo-retake-btn" 
                  data-photo-num="1">🔄 Retake</button>
        </div>
      </div>
      <div id="foto1-status" class="photo-status">Status: -</div>
    </div>
    
    <!-- Photo 2 & 3 (similar structure) -->
    <div class="photo-item">
      <h4>Foto 2</h4>
      <!-- Same as photo 1, replace "1" with "2" -->
    </div>
    
    <div class="photo-item">
      <h4>Foto 3</h4>
      <!-- Same as photo 1, replace "1" with "3" -->
    </div>
  </div>
  
  <!-- Modal untuk camera/file input -->
  <div id="camera-modal" class="modal" style="display:none;">
    <div class="modal-content">
      <h3 id="camera-modal-title">Ambil Foto 1</h3>
      
      <!-- Camera input -->
      <div id="camera-section">
        <video id="camera-video" width="100%" height="auto" 
               style="border:2px solid #ccc; border-radius:4px;"></video>
        <canvas id="camera-canvas" style="display:none;"></canvas>
      </div>
      
      <!-- File input (fallback) -->
      <div id="file-input-section" style="display:none;">
        <input type="file" id="photo-file-input" accept="image/jpeg,image/png" />
      </div>
      
      <div class="modal-buttons">
        <button type="button" id="camera-cancel-btn" class="btn btn-secondary">
          Batalkan
        </button>
        <button type="button" id="camera-capture-btn" class="btn btn-primary">
          📸 Ambil Foto
        </button>
      </div>
    </div>
  </div>
  
  <div class="form-navigation">
    <button type="button" id="prev-step-btn" class="btn btn-secondary">Kembali</button>
    <button type="button" id="next-step-btn" class="btn btn-primary">Seterusnya</button>
  </div>
</section>
```

#### JavaScript:

```javascript
<script src="https://cdn.jsdelivr.net/npm/compressorjs@1.10.1/dist/compressor.min.js"></script>

<script>
const photoNums = [1, 2, 3];
let currentPhotoNum = null;
let cameraStream = null;

// Photo capture button
document.querySelectorAll('.photo-capture-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    currentPhotoNum = e.target.dataset.photoNum;
    openCameraModal(currentPhotoNum);
  });
});

// Open camera modal
async function openCameraModal(photoNum) {
  const modal = document.getElementById('camera-modal');
  const title = document.getElementById('camera-modal-title');
  title.textContent = `Ambil Foto ${photoNum}`;
  modal.style.display = 'block';
  
  try {
    // Request camera access
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }, // Back camera
      audio: false
    });
    
    const video = document.getElementById('camera-video');
    video.srcObject = cameraStream;
    video.play();
    
    document.getElementById('camera-section').style.display = 'block';
    document.getElementById('file-input-section').style.display = 'none';
    
  } catch (err) {
    console.log('Camera access denied, show file input fallback');
    document.getElementById('camera-section').style.display = 'none';
    document.getElementById('file-input-section').style.display = 'block';
    
    // File input fallback
    document.getElementById('photo-file-input').addEventListener('change', (e) => {
      handlePhotoFile(e.files[0], photoNum);
    });
  }
}

// Capture photo from camera
document.getElementById('camera-capture-btn').addEventListener('click', () => {
  const video = document.getElementById('camera-video');
  const canvas = document.getElementById('camera-canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  ctx.drawImage(video, 0, 0);
  
  // Convert canvas to blob & compress
  canvas.toBlob((blob) => {
    compressPhoto(blob, currentPhotoNum);
  }, 'image/jpeg', 0.8);
});

// Compress photo
function compressPhoto(blob, photoNum) {
  new Compressor(blob, {
    quality: 0.6,
    maxWidth: 1280,
    maxHeight: 720,
    success(result) {
      savePhoto(result, photoNum);
    },
    error(err) {
      console.error('Compression failed:', err);
      alert('Foto tidak dapat diproses. Sila cuba lagi.');
    }
  });
}

// Save photo to form
function savePhoto(blob, photoNum) {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const base64 = e.target.result; // Base64 encoded photo
    
    // Store in hidden input
    document.getElementById(`foto${photoNum}-data`).value = base64;
    document.getElementById(`foto${photoNum}-filename`).value = 
      `foto_${photoNum}_${Date.now()}.jpg`;
    
    // Show preview
    document.getElementById(`foto${photoNum}-img`).src = base64;
    document.getElementById(`foto${photoNum}-preview`).style.display = 'block';
    document.getElementById(`foto${photoNum}-status`).textContent = 'Status: ✓ Diambil';
    
    // Close modal
    closeCameraModal();
  };
  
  reader.readAsDataURL(blob);
}

// Close camera modal
function closeCameraModal() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
  }
  
  document.getElementById('camera-modal').style.display = 'none';
  currentPhotoNum = null;
}

// Delete photo
document.querySelectorAll('.photo-delete-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const photoNum = e.target.dataset.photoNum;
    
    document.getElementById(`foto${photoNum}-data`).value = '';
    document.getElementById(`foto${photoNum}-filename`).value = '';
    document.getElementById(`foto${photoNum}-preview`).style.display = 'none';
    document.getElementById(`foto${photoNum}-status`).textContent = 'Status: -';
  });
});

// Retake photo
document.querySelectorAll('.photo-retake-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const photoNum = e.target.dataset.photoNum;
    
    document.getElementById(`foto${photoNum}-data`).value = '';
    document.getElementById(`foto${photoNum}-preview`).style.display = 'none';
    
    openCameraModal(photoNum);
  });
});

// Cancel camera modal
document.getElementById('camera-cancel-btn').addEventListener('click', closeCameraModal);

// Form navigation
document.getElementById('next-step-btn').addEventListener('click', () => {
  // Next step or preview
  showPreview();
});

document.getElementById('prev-step-btn').addEventListener('click', () => {
  // Previous step
  showStep('description');
});

function showPreview() {
  // Hide current step, show preview
  document.getElementById('step-photo').style.display = 'none';
  document.getElementById('step-preview').style.display = 'block';
  
  // Show fotos in preview
  photoNums.forEach(num => {
    const foto = document.getElementById(`foto${num}-data`).value;
    if (foto) {
      document.getElementById(`preview-foto${num}`).src = foto;
      document.getElementById(`preview-foto${num}`).style.display = 'block';
    }
  });
}
</script>
```

---

## 🌐 Backend: Photo Upload & Storage

### API Endpoint: `api/upload_complaint_photo.php`

```php
<?php
header('Content-Type: application/json');
session_start();

// Validate auth
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    jsonResponse(['error' => 'Unauthorized'], 401);
}

$input = json_decode(file_get_contents('php://input'), true);
$photo_num = $input['photo_num'] ?? null;  // 1, 2, or 3
$photo_data = $input['photo_data'] ?? null; // Base64 data
$wr_id = $input['wr_id'] ?? null;

// Validate
if (!$photo_num || !$photo_data || !in_array($photo_num, [1, 2, 3])) {
    jsonResponse(['error' => 'Invalid photo number'], 400);
}

try {
    // Decode Base64 → file
    $imageData = base64_decode(str_replace('data:image/jpeg;base64,', '', $photo_data));
    
    // Create directory
    $photoDir = __DIR__ . '/../assets/photos/complaints/';
    if (!is_dir($photoDir)) {
        mkdir($photoDir, 0755, true);
    }
    
    // Generate filename
    $filename = 'complaint_' . ($wr_id ?? 'draft') . '_foto' . $photo_num . '_' . time() . '.jpg';
    $filepath = $photoDir . $filename;
    
    // Save file
    file_put_contents($filepath, $imageData);
    
    // Return filename (to be stored in DB)
    jsonResponse([
        'success' => true,
        'filename' => $filename,
        'path' => 'assets/photos/complaints/' . $filename
    ]);
    
} catch (Exception $e) {
    error_log('Photo upload error: ' . $e->getMessage());
    jsonResponse(['error' => 'Failed to save photo'], 500);
}

function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}
?>
```

### Save to Database (in insert_aduan API):

```php
// When inserting complaint, save foto1, foto2, foto3 filenames

$foto1 = $_POST['foto1_filename'] ?? null;
$foto2 = $_POST['foto2_filename'] ?? null;
$foto3 = $_POST['foto3_filename'] ?? null;

$sql = "INSERT INTO wr (
  site_id, zone_id, bldg_id, section, prob_group, prob_type,
  description, requestor, status, date_requested,
  foto1, foto2, foto3
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'R', NOW(), ?, ?, ?)";

$params = [$site_id, $zone_id, $bldg_id, $section, $prob_group, $prob_type,
           $description, $requestor, $foto1, $foto2, $foto3];

$db->query($sql, $params);
```

---

## 📊 DATABASE

### Existing Columns in `wr` table:

```sql
foto1 VARCHAR(255),  -- Filename or path of photo 1
foto2 VARCHAR(255),  -- Filename or path of photo 2
foto3 VARCHAR(255),  -- Filename or path of photo 3
```

**No schema changes needed** — columns already exist!

---

## 📄 DISPLAY PHOTOS

### In Arahan Kerja (cetak_laporan.php):

```php
// Fetch complaint with photos
$sql = "SELECT * FROM wr WHERE wr_id = ?";
$complaint = $db->fetch($sql, [$wr_id]);

$pdf->SetY($y);
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(0, 5, 'Dokumentasi Foto', 0, 1);
$y += 8;

// Display fotos if exist
for ($i = 1; $i <= 3; $i++) {
    $fotoField = "foto{$i}";
    $fotoPath = $complaint[$fotoField] ?? null;
    
    if ($fotoPath && file_exists('assets/photos/complaints/' . $fotoPath)) {
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(0, 3, "Foto {$i}:", 0, 1);
        
        $fullPath = __DIR__ . '/' . 'assets/photos/complaints/' . $fotoPath;
        $pdf->Image($fullPath, 20, $y, 60, 40); // width=60mm, height=40mm
        $y += 45;
    }
}
```

### In paparan_lengkap_aduan.php:

```php
<div class="photo-gallery">
  <h3>Dokumentasi Foto</h3>
  
  <?php for ($i = 1; $i <= 3; $i++): 
    $fotoField = "foto{$i}";
    $fotoPath = $complaint[$fotoField] ?? null;
    
    if ($fotoPath && file_exists('assets/photos/complaints/' . $fotoPath)):
  ?>
    <div class="photo-item">
      <h4>Foto <?= $i; ?></h4>
      <img src="assets/photos/complaints/<?= htmlspecialchars($fotoPath); ?>" 
           alt="Foto <?= $i; ?>" style="max-width:300px; border-radius:4px;">
    </div>
  <?php endif; endfor; ?>
</div>
```

---

## 📱 MOBILE OPTIMIZATION

### CSS:

```css
.photo-item {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}

.photo-capture-btn {
  width: 100%;
  padding: 15px;
  font-size: 18px;
  border-radius: 8px;
  touch-action: manipulation;
}

.photo-preview {
  margin-top: 10px;
  position: relative;
}

.photo-preview img {
  width: 100%;
  max-height: 300px;
  border-radius: 4px;
  object-fit: cover;
}

.photo-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.photo-actions button {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  min-height: 44px;
}

#camera-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

#camera-video {
  width: 100%;
  max-width: 100%;
  border-radius: 8px;
}
```

---

## 🧪 TESTING CHECKLIST

- [ ] Photo capture works on Android (Chrome, Samsung Internet)
- [ ] Photo capture works on iOS (Safari)
- [ ] Camera permission request appears & works
- [ ] Photo preview displays correctly
- [ ] Delete photo removes from preview & form
- [ ] Retake photo allows re-capture
- [ ] Photo compression reduces file size (< 500KB)
- [ ] Multiple photos can be captured in one form
- [ ] Photos saved correctly in database
- [ ] Photos display in PDF report
- [ ] Photos display in full complaint view
- [ ] File input fallback works (if no camera)
- [ ] Offline mode stores photos locally
- [ ] Mobile touch targets are >= 44px
- [ ] Performance: camera access < 1s, upload < 5s

---

## 📊 IMPLEMENTATION PLAN

### Phase 1 (Weeks 1-6):
- ✅ Photo capture UI (camera + file input fallback)
- ✅ Image compression library integration
- ✅ Save to `assets/photos/complaints/` directory
- ✅ Store filename in `wr.foto1/foto2/foto3`
- ✅ Preview in form
- ✅ Delete/retake functionality

### Phase 2 (Weeks 7-14):
- ✅ Display photos in Arahan Kerja PDF
- ✅ Display photos in full complaint view
- ✅ Offline photo capture (Service Worker + IndexedDB)
- ✅ Background sync (upload when online)

---

## 🔒 SECURITY

| Concern | Mitigation |
|---------|-----------|
| **File Upload Abuse** | Validate MIME type, limit file size (5MB), scan for malware |
| **Path Traversal** | Use unique filename, store in restricted directory |
| **Privacy** | Restrict access to photos (role-based) |
| **Storage** | Regular backups, encryption at rest |

---

## 🎯 SUCCESS CRITERIA

✅ User dapat capture 3 photos dalam < 30 detik  
✅ Photos automatically compressed (< 500KB each)  
✅ Photos display clearly dalam laporan & paparan  
✅ Delete/retake works smoothly  
✅ Works offline (capture locally, sync when online)  
✅ Mobile experience smooth tanpa lag  

---

**Status**: Ready for implementation | **Owner**: PIXEL (UX) + NEXUS (backend)  
**Next Step**: Add to Phase 1 sprint backlog, coordinate with mobile camera API
