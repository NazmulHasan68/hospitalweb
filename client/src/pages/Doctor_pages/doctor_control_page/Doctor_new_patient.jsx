import React, { useState, useMemo } from 'react';
import { 
  useGetAppointmentsByDoctorPhoneQuery, 
  useSendMessageMutation, 
  useUpdateAppointmentStatusMutation 
} from '@/redux/ApiController/appointmentApi';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';
import { Loader2 } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Doctor_prescription from './Doctor_prescription';
import Doctor_test from './Doctor_test';

export default function Doctor_new_patient() {
  const { data: user, isLoading: userLoading } = useLoadUserQuery();
  const [updateStatus] = useUpdateAppointmentStatusMutation();

  const {
    data: appointments,
    isLoading,
    isError,
    error,
  } = useGetAppointmentsByDoctorPhoneQuery(user?.user?.phone, {
    skip: !user?.user?.phone,
  });

  const [sendMessage] = useSendMessageMutation();

  // Form state for messages keyed by appointmentId
  const [formStates, setFormStates] = useState({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search term state
  const [searchTerm, setSearchTerm] = useState('');

  // Input handlers for reply form
  const handleInputChange = (appointmentId, field, value) => {
    setFormStates((prev) => ({
      ...prev,
      [appointmentId]: {
        ...prev[appointmentId],
        [field]: value,
      },
    }));
  };

  const handleFileChange = (appointmentId, file) => {
    setFormStates((prev) => ({
      ...prev,
      [appointmentId]: {
        ...prev[appointmentId],
        photo: file,
      },
    }));
  };

  // Filter non-completed appointments & search by patient name or phone
  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];

    const newAppointments = appointments.filter(
      (appt) => appt.status == 'wating' || appt.status == 'meeting' 
    );

    if (!searchTerm.trim()) return newAppointments;

    const term = searchTerm.toLowerCase();

    return newAppointments.filter((appt) => {
      const patientName = appt?.patientId?.name?.toLowerCase() || '';
      const patientPhone = appt?.patientId?.phone?.toLowerCase() || '';
      return patientName.includes(term) || patientPhone.includes(term);
    });
  }, [appointments, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Submit message reply
  const handleSubmit = async (e, appointmentId) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('subject', formStates[appointmentId]?.subject || '');
    formData.append('message', formStates[appointmentId]?.message || '');
    formData.append('sender', 'doctor');
    if (formStates[appointmentId]?.photo) {
      formData.append('photo', formStates[appointmentId]?.photo);
    }

    try {
      await sendMessage({ appointmentId, body: formData }).unwrap();
      toast.success('Message sent successfully!');
      setFormStates((prev) => ({
        ...prev,
        [appointmentId]: { subject: '', message: '', photo: null },
      }));
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message');
    }
  };

  // Status update handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      toast.success('Status updated');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  // Loading and error handling
  if (userLoading || isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader2 className="animate-spin text-blue-600" />
        <span className="ml-2 text-blue-600">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 p-6">
        Failed to fetch appointments: {error?.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="md:p-2 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">
        🧑 New Patients for Dr. {user?.user?.name}
      </h1>

      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search by patient name or phone..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset page on new search
          }}
          className="max-w-md"
        />
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <>
          <Accordion type="multiple" className="h-[600px] overflow-auto">
            {paginatedAppointments.map((token, index) => (
              <AccordionItem
                key={token._id}
                value={token._id}
                className="border border-gray-300 rounded-lg shadow-sm my-2 md:my-4"
              >
                <AccordionTrigger className="bg-slate-200 md:p-4 p-2 hover:no-underline rounded-t-lg">
                  <span className="font-semibold md:text-sm text-xs">
                    {index + 1 + (currentPage - 1) * itemsPerPage}. {token?.patientId.name} -{' '}
                    {new Date(token.createdAt).toLocaleString()}
                  </span>
                </AccordionTrigger>

                <AccordionContent className="bg-white p-2 space-y-4 flex flex-col md:flex-row gap-2">
                  <div>
                    <form
                      className="bg-gray-50 md:p-4 rounded-md shadow-inner space-y-2 basis-1/3"
                      onSubmit={(e) => handleSubmit(e, token._id)}
                    >
                      <h3 className="text-sm p-2 md:text-lg font-semibold text-gray-700">
                        ✍️ Reply to Patient
                      </h3>
                      <Input
                        placeholder="Subject"
                        value={formStates[token._id]?.subject || ''}
                        onChange={(e) =>
                          handleInputChange(token._id, 'subject', e.target.value)
                        }
                      />
                      <Textarea
                        placeholder="Type your message..."
                        value={formStates[token._id]?.message || ''}
                        onChange={(e) =>
                          handleInputChange(token._id, 'message', e.target.value)
                        }
                      />
                      <Input
                        type="file"
                        onChange={(e) =>
                          handleFileChange(token._id, e.target.files[0])
                        }
                      />
                      <Button
                        type="submit"
                        className="mt-2 w-full bg-sky-600 hover:bg-sky-500"
                      >
                        Send
                      </Button>
                    </form>
                    <div className="flex justify-between items-center m-2">
                      <Doctor_prescription appointment={token} />
                      <Doctor_test appointment={token} />
                    </div>
                  </div>

                  {/* Message History */}
                  <div className="md:border-l-4 border-l-2 border-blue-400 pl-2 md:pl-4 basis-2/3 h-[350px] overflow-auto">
                    <div className="flex justify-between items-center py-2 px-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        📨 Message History
                      </h4>
                      <select
                        defaultValue={token.status}
                        onChange={(e) =>
                          handleStatusChange(token._id, e.target.value)
                        }
                        className="ml-2 p-1 border border-gray-300 rounded-md text-gray-700"
                      >
                       <option value="waiting">Waiting</option>
                        <option value="meeting">Meeting</option>
                        <option value="shedule">Shedule</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      {token?.messages?.length === 0 ? (
                        <p className="text-sm text-gray-500">No messages yet.</p>
                      ) : (
                        [...token.messages].reverse().map((msg, i) => (
                          <div
                            key={i}
                            className={`md:p-3 p-2 rounded-md ${
                              msg.sender === 'patient'
                                ? 'bg-blue-50 border-l-2 md:border-l-4 border-blue-400'
                                : 'bg-green-50 border-l-2 md:border-l-4 border-green-400'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-bold capitalize text-gray-700">
                                {msg.sender === 'patient' ? 'Patient' : 'Doctor'}
                              </p>
                              <p className="text-slate-500 text-xs">
                                {new Date(msg.timestamp).toLocaleString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true,
                                })}
                              </p>
                            </div>

                            <h5 className="text-md font-medium text-gray-800">{msg.subject}</h5>
                            <p
                              className="text-gray-600 text-sm"
                              dangerouslySetInnerHTML={{
                                __html: msg.message.replace(
                                  /(https?:\/\/[^\s]+)/g,
                                  (url) =>
                                    `<a href="${url}" target="_blank" class="text-blue-600 underline">${url}</a>`
                                ),
                              }}
                            ></p>

                            {msg.photo?.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {msg.photo.map((url, j) => (
                                  <a
                                    key={j}
                                    href={`${import.meta.env.VITE_BASE_URL}${url}`}
                                    className="hover:underline cursor-pointer"
                                  >
                                    Document {j + 1}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 space-x-3">
            <Button 
              disabled={currentPage === 1} 
              onClick={() => goToPage(currentPage - 1)}
              className="px-4"
            >
              Prev
            </Button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <Button 
              disabled={currentPage === totalPages} 
              onClick={() => goToPage(currentPage + 1)}
              className="px-4"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
