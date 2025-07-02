import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  useUpdatePrescriptionMutation,
  useCreatePrescriptionMutation,
  useGetPrescriptionsByAppointmentQuery,
} from '@/redux/ApiController/prescriptionApi';
import { toast } from 'sonner';

export default function Doctor_prescription({ appointment }) {
  const [open, setOpen] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [advice, setAdvice] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [medicine, setMedicine] = useState([{ name: '', dosage: '', duration: '', note: '' }]);
  const [attachments, setAttachments] = useState([]);

  const { data: existingPrescription } = useGetPrescriptionsByAppointmentQuery(appointment._id);
  const [createPrescription] = useCreatePrescriptionMutation();
  const [updatePrescription] = useUpdatePrescriptionMutation();

  // 🧠 Pre-fill when editing
  useEffect(() => {
    if (open && existingPrescription && existingPrescription.length > 0) {
      const presc = existingPrescription[0];
      if (presc.diagnosis) setDiagnosis(presc.diagnosis);
      if (presc.advice) setAdvice(presc.advice);
      if (presc.followUpDate) setFollowUpDate(presc.followUpDate?.split('T')[0]); // remove time
      if (presc.medications && presc.medications.length > 0) setMedicine(presc.medications);
    } else if (open) {
      // reset form when creating new
      setDiagnosis('');
      setAdvice('');
      setFollowUpDate('');
      setMedicine([{ name: '', dosage: '', duration: '', note: '' }]);
      setAttachments([]);
    }
  }, [open, existingPrescription]);

  const handleMedicationChange = (index, field, value) => {
    const updated = [...medicine];
    updated[index][field] = value;
    setMedicine(updated);
  };

  const handleFileChange = (e) => {
    setAttachments([...e.target.files]);
  };

  const handleSubmit = async () => {
    try {
      if (existingPrescription && existingPrescription.length > 0) {
        // 🔁 Update
        const formData = new FormData();
        formData.append('diagnosis', diagnosis);
        formData.append('advice', advice);
        formData.append('followUpDate', followUpDate);
        formData.append('medications', JSON.stringify(medicine));
        attachments.forEach((file) => {
          formData.append('attachments', file);
        });

        await updatePrescription({ appointmentId: appointment._id, formData }).unwrap();
        toast.success('✅ Prescription updated!');
      } else {
        // 🆕 Create
        const payload = {
          appointmentId: appointment._id,
          doctorId: appointment.doctorId._id,
          patientId: appointment.patientId._id,
          diagnosis,
          advice,
          followUpDate,
          medications: medicine,
          status: 'final',
        };

        await createPrescription(payload).unwrap();
        toast.success('✅ Prescription created!');
      }

      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to submit prescription');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{existingPrescription?.length > 0 ? '📝 Edit Prescription' : '+ Prescription'}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{existingPrescription?.length > 0 ? 'Edit Prescription' : 'New Prescription'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Follow-Up Date</Label>
            <Input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </div>

          <div>
            <Label>Diagnosis</Label>
            <Textarea value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
          </div>

          <div>
            <Label>Advice</Label>
            <Textarea value={advice} onChange={(e) => setAdvice(e.target.value)} />
          </div>

          <div>
            <Label>Medications</Label>
            {medicine.map((med, i) => (
              <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                <Input
                  placeholder="Name"
                  value={med.name}
                  onChange={(e) => handleMedicationChange(i, 'name', e.target.value)}
                />
                <Input
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) => handleMedicationChange(i, 'dosage', e.target.value)}
                />
                <Input
                  placeholder="Duration"
                  value={med.duration}
                  onChange={(e) => handleMedicationChange(i, 'duration', e.target.value)}
                />
                <Input
                  placeholder="Note"
                  value={med.note}
                  onChange={(e) => handleMedicationChange(i, 'note', e.target.value)}
                />
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setMedicine([...medicine, { name: '', dosage: '', duration: '', note: '' }])
              }
            >
              + Add Medication
            </Button>
          </div>

          <div>
            <Label>Attachments (Optional)</Label>
            <Input type="file" multiple onChange={handleFileChange} />
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-500">
            Submit Prescription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
