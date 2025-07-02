import React, { useState } from 'react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';
import {
  useGetAppointmentsByUserIdQuery,
  useSendMessageMutation,
} from '@/redux/ApiController/appointmentApi';
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
import User_test_slip from './User_test_slip';
import User_prescription from './User_prescription';

export default function User_doctor_token() {
  const { data: user } = useLoadUserQuery();
  const { data: appointments } = useGetAppointmentsByUserIdQuery(user?.user?._id, {
    skip: !user?.user?._id,
  });

  const [sendMessage] = useSendMessageMutation();
  const [formStates, setFormStates] = useState({});

  const handleInputChange = (id, field, value) => {
    setFormStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e, appointmentId) => {
    e.preventDefault();
    const formData = new FormData();
    const subject = formStates[appointmentId]?.subject || '';
    const message = formStates[appointmentId]?.message || '';
    const file = formStates[appointmentId]?.photo || null;

    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('sender', 'patient');
    if (file) {
      formData.append('photo', file);
    }

    try {
      await sendMessage({ appointmentId, body: formData }).unwrap();
      toast.success('Message sent!');
      setFormStates((prev) => ({
        ...prev,
        [appointmentId]: { subject: '', message: '', photo: null },
      }));
    } catch (err) {
      console.error(err);
      toast.error('Message failed to send');
    }
  };

  return (
    <div className="md:p-2 max-w-7xl mx-auto">
      <Accordion type="multiple" className="h-[600px] overflow-auto">
        {appointments
          ?.filter((token) => token.status !== 'completed')
          .map((token, index) => (
            <AccordionItem
              key={token._id}
              value={token._id}
              className="border border-gray-300 rounded-lg shadow-sm my-2 md:my-4"
            >
              <AccordionTrigger className="bg-slate-200 md:p-4 p-2 hover:no-underline rounded-t-lg">
                <span className="font-semibold md:text-sm text-xs">
                  Token {index + 1} — {new Date(token.createdAt).toLocaleString()} —{' '}
                  <span className="ml-2 text-xs font-normal text-gray-600">
                    <strong>{token.status || 'Pending'}</strong>
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent className="bg-white p-2 space-y-4 flex flex-col md:flex-row gap-2">
                <div className="flex flex-col gap-4">
                  {/* Message form */}
                  <form
                    onSubmit={(e) => handleSubmit(e, token._id)}
                    className="bg-gray-50 md:p-4 rounded-md shadow-inner space-y-2 basis-1/3"
                  >
                    <h3 className="text-sm p-2 md:text-lg font-semibold text-gray-700">
                      ✍️ Send a Message
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
                      accept="image/*"
                      onChange={(e) =>
                        handleInputChange(token._id, 'photo', e.target.files[0])
                      }
                    />
                    <Button
                      type="submit"
                      className="mt-2 w-full bg-sky-600 hover:bg-sky-500"
                    >
                      Send
                    </Button>
                  </form>

                  {/* Test Slip */}
                  <div className="w-full flex gap-2">
                    <User_test_slip appointmentId={token._id} />
                    <User_prescription appointmentId={token._id}/>
                  </div>
                </div>

                {/* Message history */}
                <div className="md:border-l-4 border-l-2 border-blue-400 pl-2 md:pl-4 basis-2/3 h-[350px] overflow-auto">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    📨 Message History
                  </h4>
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
                                  className="hover:underline cursor-pointer text-blue-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
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
    </div>
  );
}
