import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dbconnection } from './utills/dbConnection.js';
import authanticationRoute from './routes/authentication.route.js'
import medicineRoute from './routes/medicine/medicine_route.js'
import mediOrderRoute from './routes/medicine/medicine_order_route.js'
import saffRoute from './routes/staff_Routes.js'
import HospitalRoute from './routes/travel/hospital_travel_route.js'
import Travelapply from './routes/travel/medical_travel_route.js'
import Counsaltation from './routes/doctor_consultation/doctor_route.js'
import appointmentRoute from './routes/doctor_consultation/appointment_route.js'
import prescriptionRoute from './routes/doctor_consultation/prescription_route.js'
import dashboardRoute from './routes/dashboardRoute.js'
import bannerRoute from './routes/banner_route.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

dotenv.config();
const app = express();
const port = process.env.PORT || 6000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTENDURL, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/public', express.static(path.join(process.cwd(), 'public')));
app.use("/photo", express.static(path.join(process.cwd(), "public", "photo")));

//called api 
app.use('/api/auth', authanticationRoute);
app.use('/api/medicine', medicineRoute);
app.use('/api/mediorders', mediOrderRoute);
app.use('/api/staff', saffRoute)
app.use('/api/hospital', HospitalRoute)
app.use('/api/travel',Travelapply)
app.use('/api/consultation', Counsaltation)
app.use('/api/appointment', appointmentRoute)
app.use('/api/prescription', prescriptionRoute)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/banner', bannerRoute)


// Routes
app.get('/', (req, res) => {
  res.send('GrowCare Backend Running');
});


app.use(express.static(path.join(__dirname, '../public_html')));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public_html/index.html'));
});


// Start server
app.listen(port, () => {
    dbconnection()
  console.log(`Server running on http://localhost:${port}`);
});
