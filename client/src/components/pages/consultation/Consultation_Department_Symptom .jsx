import React from 'react';
import {
  HeartPulse,
  Baby,
  Venus,
  Thermometer,
  Leaf,
  SmilePlus,
  CircleDashed,
  Bug,
  Weight,
  User,
  Droplets,
  Flame,
  Zap,
  Stethoscope,
  Brain,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const symptoms = [
  { id: 1, name: 'Sexual problems', icon: HeartPulse },
  { id: 2, name: 'Period problems / Gyne problems', icon: Venus },
  { id: 3, name: 'Fever, Cold / Flu, Allergy', icon: Thermometer },
  { id: 4, name: 'Child diseases', icon: Baby },
  { id: 5, name: 'Pregnancy issues', icon: Stethoscope },
  { id: 6, name: 'Weight loss / gain, Diet chart', icon: Weight },
  { id: 7, name: 'Itching, Acne & Skin problems', icon: SmilePlus },
  { id: 8, name: 'Hair fall and Dandruff', icon: CircleDashed },
  { id: 9, name: 'Urine infection or problems', icon: Droplets },
  { id: 10, name: 'Acidity, Indigestion, Diarrhea, Constipation', icon: Flame },
  { id: 11, name: 'Mental Health / Stress', icon: Brain },
  { id: 12, name: 'Allergy / Immunity Issues', icon: Leaf },
  { id: 13, name: 'General check-up', icon: Stethoscope },
  { id: 14, name: 'Eye issues', icon: Eye },
  { id: 15, name: 'Parasite / Infection', icon: Bug },
  { id: 16, name: 'Energy / Weakness', icon: Zap },
];

export default function Consultation_Department_Symptom() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="md:text-2xl text-lg font-bold text-blue-800 mb-6 text-center">
        Choose a Department or Symptom
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-5">
        {symptoms.map(({ id, name, icon: Icon }) => (
          <Link
            to={'search'}
            key={id}
            className="bg-white rounded-xl border border-gray-200 hover:border-indigo-500 shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <Icon className="h-8 w-8 text-indigo-600" />
            <span className="mt-2 text-xs md:text-sm font-medium text-gray-700 text-center">
              {name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
