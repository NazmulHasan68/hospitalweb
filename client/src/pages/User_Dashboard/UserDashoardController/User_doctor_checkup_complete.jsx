
import React, { useState } from 'react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';
import { useGetAppointmentsByUserIdQuery } from '@/redux/ApiController/appointmentApi';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import User_test_slip from './User_test_slip';
import User_prescription from './User_prescription';

export default function User_doctor_checkup_complete() {
  const { data: user } = useLoadUserQuery();
  const { data: appointments, isLoading } = useGetAppointmentsByUserIdQuery(
    user?.user?._id,
    { skip: !user?.user?._id }
  );

  const completedAppointments = appointments?.filter(
    (appointment) => appointment.status === 'completed'
  );

  return (
    <div className="md:p-4 p-2 max-w-7xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        ✅ Completed Doctor Checkups
      </h2>

      <Accordion type="multiple" className="h-[600px] overflow-auto">
        {completedAppointments?.length === 0 ? (
          <p className="text-gray-500 text-sm">No completed appointments found.</p>
        ) : (
          completedAppointments?.map((appointment, index) => (
            <AccordionItem
              key={appointment._id}
              value={appointment._id}
              className="border border-gray-300 rounded-lg shadow-sm my-2"
            >
              <AccordionTrigger className="bg-slate-200 md:p-4 p-2 hover:no-underline rounded-t-lg">
                <span className="font-semibold md:text-sm text-xs">
                  Token {index + 1} —{' '}
                  {new Date(appointment.createdAt).toLocaleString()} —{' '}
                  <span className="ml-2 text-xs font-normal text-gray-600">
                    <strong>{appointment.status}</strong>
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent className="bg-white p-2 space-y-4 flex flex-col md:flex-row gap-4">
                {/* Left Column: Test Slip & Prescription */}
                <div className="w-full md:w-1/3 flex md:my-12 my-8 gap-4">
                  <User_test_slip appointmentId={appointment._id} />
                  <User_prescription appointmentId={appointment._id} />
                </div>

                {/* Right Column: Message History */}
                <div className="md:border-l-4 border-l-2 border-blue-400 pl-2 md:pl-4 w-full md:w-2/3 max-h-[350px] overflow-auto">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    📨 Message History
                  </h4>
                  <div className="space-y-4">
                    {appointment?.messages?.length === 0 ? (
                      <p className="text-sm text-gray-500">No messages yet.</p>
                    ) : (
                      [...appointment.messages].reverse().map((msg, i) => (
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
                              {msg.sender === 'patient' ? 'You' : 'Doctor'}
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
                          <h5 className="text-md font-medium text-gray-800">
                            {msg.subject}
                          </h5>
                          <p
                            className="text-gray-600 text-sm"
                            dangerouslySetInnerHTML={{
                              __html: msg.message.replace(
                                /(https?:\/\/[^\s]+)/g,
                                (url) =>
                                  `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">${url}</a>`
                              ),
                            }}
                          ></p>

                          {msg.photo?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {msg.photo.map((url, j) => (
                                <a
                                  key={j}
                                  href={`${import.meta.env.VITE_BASE_URL}${url}`}
                                  className="text-blue-600 hover:underline text-sm"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  📄 Document {j + 1}
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
          ))
        )}
      </Accordion>
    </div>
  );
}
