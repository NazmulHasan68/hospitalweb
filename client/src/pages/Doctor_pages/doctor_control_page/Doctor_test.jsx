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
import {
  useCreatePrescriptionMutation,
  useGetPrescriptionsByAppointmentQuery,
  useUpdatePrescriptionMutation
} from '@/redux/ApiController/prescriptionApi';
import { toast } from 'sonner';

export default function Doctor_test({ appointment }) {
  const [open, setOpen] = useState(false);
  const [tests, setTests] = useState([{ testName: '', note: '' }]);

  const { data: existingPrescription} = useGetPrescriptionsByAppointmentQuery(appointment._id);

  const [createPrescription] = useCreatePrescriptionMutation();
  const [updatePrescription] = useUpdatePrescriptionMutation();

  // ⬇️ Load existing test data when dialog opens
  useEffect(() => {
    if (open && existingPrescription && existingPrescription.length > 0) {
      const testData = existingPrescription[0]?.test;
      if (testData && Array.isArray(testData)) {
        setTests(testData);
      }
    } else if (open) {
      setTests([{ testName: '', note: '' }]); // Reset if creating
    }
  }, [open, existingPrescription]);

  const handleTestChange = (index, field, value) => {
    const updated = [...tests];
    updated[index][field] = value;
    setTests(updated);
  };

  const handleSubmit = async () => {
    if (!appointment) return alert("No appointment data!");

    const payload = {
      appointmentId: appointment._id,
      doctorId: appointment.doctorId._id,
      patientId: appointment.patientId._id,
      test: tests,
      status: 'final',
    };

    try {
      if (existingPrescription && existingPrescription.length > 0) {
        // Update existing
        const formData = new FormData();
        formData.append('test', JSON.stringify(tests));
        await updatePrescription({ appointmentId: appointment._id, formData }).unwrap();
        toast.success('📝 Tests updated!');
      } else {
        // Create new
        await createPrescription(payload).unwrap();
        toast.success('✅ Test prescription created!');
      }

      setOpen(false);
    } catch (err) {
      console.error('❌ Error:', err);
      toast.error('Failed to submit/update tests');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {existingPrescription?.length > 0 ? '📝 Edit Tests' : '+ Add Tests'}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{existingPrescription?.length > 0 ? '🧪 Edit Tests' : '🧪 Add Tests'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {tests.map((test, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Test Name"
                value={test.testName}
                onChange={(e) => handleTestChange(i, 'testName', e.target.value)}
              />
              <Input
                placeholder="Note"
                value={test.note}
                onChange={(e) => handleTestChange(i, 'note', e.target.value)}
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTests([...tests, { testName: '', note: '' }])}
          >
            + Add Another
          </Button>
        </div>

        <DialogFooter className="pt-4">
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-500">
            {existingPrescription?.length > 0 ? 'Update Tests' : 'Submit Tests'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
