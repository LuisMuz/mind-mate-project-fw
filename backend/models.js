import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'PSYCHOLOGIST', 'CLIENT'], required: true }
});

const User = mongoose.model('User', userSchema);

const dailyNoteSchema = new mongoose.Schema({
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    viewed: { type: Boolean, default: false },
    notes_psycho: { type: String }
});

const DailyNote = mongoose.model('DailyNote', dailyNoteSchema);

const appointmentSchema = new mongoose.Schema({
    psycho_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    time: { type: Date, required: true }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

const psychologistProfileSchema = new mongoose.Schema({
  psychologist_id: { type: String, required: true },
  description: { type: String },
  specialty: { type: String },
  experience: { type: Number, min: 0 },
  education: { type: String },
  certifications: { type: [String] },
  areas_of_expertise: { type: [String] }
});

const PsychologistProfile = mongoose.model('PsychologistProfile', psychologistProfileSchema);

const sessionSchema = new mongoose.Schema({
    psycho_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    time: { type: Date, required: true },
    active: { type: Boolean, default: true }
});

const Session = mongoose.model('Session', sessionSchema)

export { User, DailyNote, Appointment, PsychologistProfile, Session };
