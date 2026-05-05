# Panduan Testing CRUD Sistem Kos - KostHunter

## 📋 Informasi Proyek
- **Nama Proyek**: Sistem Kos (KostHunter)
- **Framework**: NestJS + Prisma + MySQL
- **Tanggal**: May 5, 2026
- **Developer**: Moch Yusuf Adriansyah

## 🚀 Persiapan Testing

### 1. Jalankan Server
```bash
cd c:\Users\LENOVO\Documents\Sistemkos1
npm run start:dev
```
Server akan berjalan di: `http://localhost:3000`

### 2. Setup Postman
- Import collection atau buat request manual
- Base URL: `http://localhost:3000`
- Untuk endpoint yang butuh auth, gunakan header:
  ```
  Authorization: Bearer <access_token>
  ```

---

## 👥 Role dalam Sistem

### OWNER (Pemilik Kos)
- Bisa membuat dan mengelola kos
- Mengelola room dan fasilitas
- Melihat booking dan komentar
- Membalas komentar penyewa

### SOCIETY (Penyewa)
- Bisa melihat kos yang tersedia
- Booking room
- Memberikan komentar dan ulasan

---

## 📚 Panduan Testing Lengkap

### **PHASE 1: Setup Data Awal**

#### 1.1 Buat User OWNER
```
Method: POST
URL: http://localhost:3000/users
Body:
{
  "name": "Pak Budi Owner",
  "email": "owner@example.com",
  "password": "owner123",
  "role": "OWNER"
}
```

#### 1.2 Buat User SOCIETY
```
Method: POST
URL: http://localhost:3000/users
Body:
{
  "name": "Andi Mahasiswa",
  "email": "andi@example.com",
  "password": "andi123",
  "role": "SOCIETY"
}
```

#### 1.3 Login sebagai OWNER
```
Method: POST
URL: http://localhost:3000/auth/login
Body:
{
  "email": "owner@example.com",
  "password": "owner123"
}
```
**Simpan access_token untuk digunakan selanjutnya**

#### 1.4 Login sebagai SOCIETY
```
Method: POST
URL: http://localhost:3000/auth/login
Body:
{
  "email": "andi@example.com",
  "password": "andi123"
}
```
**Simpan access_token untuk SOCIETY**

---

### **PHASE 2: Testing CRUD OWNER**

#### 2.1 OWNER Membuat Kos
```
Method: POST
URL: http://localhost:3000/kos
Header: Authorization: Bearer <OWNER_TOKEN>
Body:
{
  "name": "Kos Pak Budi Premium",
  "address": "Jl. Sudirman No. 123, Jakarta",
  "gender": "Campur",
  "price": 750000,
  "ownerId": 1
}
```

#### 2.2 OWNER Melihat Semua Kos
```
Method: GET
URL: http://localhost:3000/kos
```

#### 2.3 OWNER Melihat Detail Kos
```
Method: GET
URL: http://localhost:3000/kos/1
```

#### 2.4 OWNER Update Kos
```
Method: PATCH
URL: http://localhost:3000/kos/1
Header: Authorization: Bearer <OWNER_TOKEN>
Body:
{
  "price": 800000,
  "name": "Kos Pak Budi Premium Updated"
}
```

#### 2.5 OWNER Membuat Room
```
Method: POST
URL: http://localhost:3000/room
Body:
{
  "number": "A-101",
  "status": "AVAILABLE",
  "kosId": 1
}
```

#### 2.6 OWNER Melihat Room di Kosnya
```
Method: GET
URL: http://localhost:3000/room/kos/1
```

#### 2.7 OWNER Update Room
```
Method: PATCH
URL: http://localhost:3000/room/1
Body:
{
  "status": "AVAILABLE",
  "number": "A-102"
}
```

---

### **PHASE 3: Testing CRUD SOCIETY**

#### 3.1 SOCIETY Melihat Kos Tersedia
```
Method: GET
URL: http://localhost:3000/kos
```

#### 3.2 SOCIETY Melihat Detail Kos
```
Method: GET
URL: http://localhost:3000/kos/1
```

#### 3.3 SOCIETY Booking Room
```
Method: POST
URL: http://localhost:3000/booking
Header: Authorization: Bearer <SOCIETY_TOKEN>
Body:
{
  "roomId": 1
}
```

#### 3.4 SOCIETY Melihat Booking Sendiri
```
Method: GET
URL: http://localhost:3000/booking/me
Header: Authorization: Bearer <SOCIETY_TOKEN>
```

#### 3.5 SOCIETY Memberikan Komentar
```
Method: POST
URL: http://localhost:3000/comment
Header: Authorization: Bearer <SOCIETY_TOKEN>
Body:
{
  "content": "Kosnya bersih dan nyaman, recommended!",
  "kosId": 1
}
```

#### 3.6 SOCIETY Melihat Komentar di Kos
```
Method: GET
URL: http://localhost:3000/comment/kos/1
```

#### 3.7 SOCIETY Update Komentar
```
Method: PATCH
URL: http://localhost:3000/comment/1
Header: Authorization: Bearer <SOCIETY_TOKEN>
Body:
{
  "content": "Kosnya sangat recommended untuk mahasiswa!"
}
```

---

### **PHASE 4: Testing OWNER Response**

#### 4.1 OWNER Melihat Komentar
```
Method: GET
URL: http://localhost:3000/comment/kos/1
```

#### 4.2 OWNER Membalas Komentar
```
Method: PATCH
URL: http://localhost:3000/comment/1/reply
Header: Authorization: Bearer <OWNER_TOKEN>
Body:
{
  "reply": "Terima kasih atas ulasannya. Kami senang Anda nyaman di kos kami."
}
```

---

### **PHASE 5: Testing Delete Operations**

#### 5.1 SOCIETY Hapus Komentar
```
Method: DELETE
URL: http://localhost:3000/comment/1
Header: Authorization: Bearer <SOCIETY_TOKEN>
```

#### 5.2 SOCIETY Cancel Booking
```
Method: DELETE
URL: http://localhost:3000/booking/1
Header: Authorization: Bearer <SOCIETY_TOKEN>
```

#### 5.3 OWNER Hapus Room
```
Method: DELETE
URL: http://localhost:3000/room/1
```

#### 5.4 OWNER Hapus Kos
```
Method: DELETE
URL: http://localhost:3000/kos/1
```

---

## 📊 Endpoint Summary

### Users
- `POST /users` - Create user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Auth
- `POST /auth/login` - Login user

### Kos
- `POST /kos` - Create kos
- `GET /kos` - Get all kos
- `GET /kos/:id` - Get kos by ID
- `PATCH /kos/:id` - Update kos
- `DELETE /kos/:id` - Delete kos

### Room
- `POST /room` - Create room
- `GET /room` - Get all rooms
- `GET /room/:id` - Get room by ID
- `GET /room/kos/:id` - Get rooms by kos
- `PATCH /room/:id` - Update room
- `DELETE /room/:id` - Delete room

### Comment
- `POST /comment` - Create comment (auth required)
- `GET /comment/:id` - Get comment by ID
- `PATCH /comment/:id` - Update comment (auth required)
- `PATCH /comment/:id/reply` - Reply comment
- `DELETE /comment/:id` - Delete comment (auth required)
- `GET /comment/kos/:id` - Get comments by kos

### Booking
- `POST /booking` - Create booking (auth required)
- `GET /booking/me` - Get my bookings (auth required)
- `DELETE /booking/:id` - Cancel booking (auth required)

---

## ✅ Checklist Testing

### Setup
- [ ] Server running di localhost:3000
- [ ] Database connected
- [ ] Postman ready

### User Management
- [ ] Create OWNER user
- [ ] Create SOCIETY user
- [ ] Login OWNER
- [ ] Login SOCIETY

### Kos CRUD (OWNER)
- [ ] Create kos
- [ ] Read all kos
- [ ] Read kos by ID
- [ ] Update kos
- [ ] Delete kos

### Room CRUD (OWNER)
- [ ] Create room
- [ ] Read all rooms
- [ ] Read room by ID
- [ ] Read rooms by kos
- [ ] Update room
- [ ] Delete room

### Comment CRUD
- [ ] SOCIETY create comment
- [ ] Read comment by ID
- [ ] SOCIETY update comment
- [ ] OWNER reply comment
- [ ] SOCIETY delete comment
- [ ] Read comments by kos

### Booking CRUD
- [ ] SOCIETY create booking
- [ ] SOCIETY read my bookings
- [ ] SOCIETY cancel booking

---

## 🔧 Troubleshooting

### Error 401 Unauthorized
- Pastikan menggunakan token yang benar
- Token mungkin expired, login ulang

### Error 404 Not Found
- Periksa ID yang digunakan
- Pastikan data sudah dibuat sebelumnya

### Error 400 Bad Request
- Periksa format JSON body
- Pastikan required fields terisi

### Database Error
- Pastikan MySQL server running
- Periksa DATABASE_URL di .env

---

## 📞 Support
Jika ada pertanyaan atau error, hubungi developer:
- Email: moch.yusuf@example.com
- Repository: https://github.com/MochYusufAdriansyah/kosthunter-git-baru-yg-lama-error

**Dokumen ini dibuat untuk keperluan testing dan dokumentasi proyek Sistem Kos - KostHunter**