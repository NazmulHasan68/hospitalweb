import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import logo from '@/assets/glogo.png';
import signature from '@/assets/signature.png';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useGetPrescriptionsByAppointmentQuery } from '@/redux/ApiController/prescriptionApi';

export default function User_test_slip({ appointmentId }) {
  const { data: prescription, isLoading, isError } = useGetPrescriptionsByAppointmentQuery(appointmentId);
  const slipRefs = useRef({});

  if (isLoading) return <p>Loading prescriptions...</p>;
  if (isError) return <p>No test suggest</p>;
  if (!Array.isArray(prescription) || prescription.length === 0) return <p>No prescriptions found.</p>;

  const downloadPDF = async (id) => {
    const element = slipRefs.current[id];
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgProps = pdf.getImageProperties(imgData);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`TestSlip_${id}.pdf`);
  };

  return (
    <div className="space-y-6">
      {prescription.map((pres, index) => (
        <Dialog key={pres._id || index}>
          <DialogTrigger asChild>
            <Button variant="outline">Test Slip {index + 1}</Button>
          </DialogTrigger>

          <DialogContent className="max-w-xl p-4 bg-white">
            <DialogHeader>
              <DialogTitle>Test Slip</DialogTitle>
            </DialogHeader>

            <div
              ref={(el) => (slipRefs.current[pres._id] = el)}
              className="p-4 border border-gray-300 rounded shadow-sm"
            >
              <div className="flex justify-between items-start bg-blue-100 p-4 gap-4 rounded">
                <img
                  src={logo}
                  alt={`${pres.doctorId?.name || 'Unknown'} logo`}
                  className="w-32 h-24 rounded-lg -mt-5 object-contain"
                />

                <div className="text-center flex-1">
                  <h1 className="text-sm font-bold">Grow Care Health</h1>
                  <p className="text-xs">Online Consultation</p>
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline text-xs"
                  >
                    https://www.google.com
                  </a>
                </div>

                <div className="text-right text-sm space-y-1">
                  <p className="font-semibold text-sm">Dr. {pres.doctorId?.name}</p>
                  <p className="italic text-xs ">
                    ( {pres.doctorId?.degree?.join(', ') || 'N/A'} )
                  </p>
                  <p className='text-xs'>
                    <strong>Specialist:</strong>{' '}
                    {pres.doctorId?.specialization || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-sm items-center px-4 bg-sky-100  mt-1 rounded">
                <p>
                  <strong>Patient:</strong> {pres.appointmentId?.patientName || 'N/A'}
                </p>
                <p>
                  <strong>Age:</strong> {pres.appointmentId?.age || 'N/A'}
                </p>
                <p>
                  <strong>Weight:</strong> {pres.appointmentId?.weight || 'N/A'} kg
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(pres.updatedAt).toLocaleDateString() || 'N/A'}
                </p>
              </div>

              <hr className="my-2" />

              <div className="px-4 ">
                <h2 className="text-lg font-semibold mb-3">🧪 Tests</h2>
                {!pres.test?.length ? (
                  <p className="text-sm text-gray-600">No tests prescribed.</p>
                ) : (
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {pres.test.map(({ _id, testName, note }) => (
                      <li key={_id}>
                        <strong>{testName}</strong>: {note}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-between items-center mt-8 px-4">
                <div className="text-xs text-gray-700 space-y-1">
                  <p>Facebook: Grow Care Health</p>
                  <p>Instagram: Grow Care Health</p>
                  <p>YouTube: Grow Care Health</p>
                  <p>Website: growcarehealth.com</p>
                </div>
                <img
                  src={signature}
                  alt="Doctor Signature"
                  className="w-40 h-24 object-contain"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => downloadPDF(pres._id)}
                className="hover:bg-blue-600 hover:text-white transition"
              >
                Download PDF
              </Button>

              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
