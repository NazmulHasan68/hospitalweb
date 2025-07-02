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
import { useGetPrescriptionsByAppointmentQuery } from '@/redux/ApiController/prescriptionApi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function User_prescription({ appointmentId }) {
  const { data: prescription, isLoading, isError } =
    useGetPrescriptionsByAppointmentQuery(appointmentId);
  const slipRefs = useRef({});

  if (isLoading) return <p>Loading prescriptions...</p>;
  if (isError || !Array.isArray(prescription) || prescription.length === 0)
    return <p>No prescriptions found.</p>;

  const handleDownloadPDF = async (id) => {
    const element = slipRefs.current[id];
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY, // prevent scroll issues
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`prescription-${id}.pdf`);
  };

  return (
    <div className="space-y-4">
      {prescription.map((pres, index) => (
        <Dialog key={pres._id || index}>
          <DialogTrigger asChild>
            <Button variant="outline">Prescription {index + 1}</Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-white p-4">
            <DialogHeader>
              <DialogTitle>Prescription Slip</DialogTitle>
            </DialogHeader>

            <div
              ref={(el) => (slipRefs.current[pres._id] = el)}
              className="p-4 border border-gray-300 rounded shadow-sm space-y-4 bg-white overflow-auto"
              style={{
                width: '100%',
                maxWidth: '794px',
                margin: '0 auto',
                background: 'white',
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-start bg-blue-100 p-4 rounded">
                <img src={logo} alt="Clinic Logo" className="w-24 h-20 object-contain" />
                <div className="text-center flex-1">
                  <h1 className="text-sm font-bold">Grow Care Health</h1>
                  <p className="text-xs">Online Consultation</p>
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs underline"
                  >
                    https://www.google.com
                  </a>
                </div>
                <div className="text-right text-sm space-y-1">
                  <p className="font-semibold text-sm">Dr. {pres.doctorId?.name}</p>
                  <p className="italic text-xs">
                    ({pres.doctorId?.degree?.join(', ') || 'N/A'})
                  </p>
                  <p className="text-xs">
                    <strong>Specialist:</strong> {pres.doctorId?.specialization || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Patient Info */}
              <div className="flex flex-wrap justify-between items-center text-sm bg-sky-100 p-2 rounded">
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

              {/* Tests and Medicines */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:basis-1/3">
                  <h2 className="text-lg font-semibold mb-2">Tests</h2>
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

                <div className="md:basis-2/3">
                  <h2 className="text-lg font-semibold mb-2">Medicines</h2>
                  {!pres.medications?.length ? (
                    <p className="text-sm text-gray-600">No medicines prescribed.</p>
                  ) : (
                    <div className="space-y-2 text-sm">
                      {pres.medications.map((med, i) => (
                        <div key={i}>
                          <p>
                            {i + 1}. <strong>{med.name}</strong> — {med.dosage}mg
                          </p>
                          <p>
                            Time: {med.duration} — {med.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Advice */}
              {pres.advice && (
                <div className="px-2">
                  <h2 className="text-sm font-semibold mb-1">📝 Advice</h2>
                  <p className="text-sm text-gray-700">{pres.advice}</p>
                </div>
              )}

              {/* Attachments */}
              {pres.attachments?.length > 0 && (
                <div className="px-2">
                  <a
                    href={`${import.meta.env.VITE_BASE_URL}${pres.attachments}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    See the Prescription Attachment
                  </a>
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-between items-center px-2 mt-6">
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

            <div className="flex justify-end mt-4 gap-2">
              <Button
                onClick={() => handleDownloadPDF(pres._id)}
                className="bg-green-600 text-white hover:bg-green-500"
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
