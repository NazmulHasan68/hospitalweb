import React from 'react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';
import { useGetAppointmentsByUserIdQuery } from '@/redux/ApiController/appointmentApi';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function User_doctor_token() {
  const { data: user } = useLoadUserQuery();
  const { data: appointments } = useGetAppointmentsByUserIdQuery(user?.user?._id);

  const demoMessages = [
    { sender: 'patient', subject: 'Follow-up Question', message: 'Can I take the prescribed medicine after dinner?' },
    { sender: 'doctor', subject: 'Response', message: 'Yes, after dinner is fine. Let me know if you feel drowsy.' },
    { sender: 'patient', subject: 'Symptoms Update', message: 'I’m feeling better but still have mild headaches.' },
    { sender: 'doctor', subject: 'Advice', message: 'Continue hydration and rest. We’ll review it next session.' },
  ];

  return (
    <div className="md:p-2 max-w-5xl mx-auto">
      <Accordion type="multiple" className='h-[600px] overflow-auto'>
        {appointments?.map((token, index) => (
          <AccordionItem
            key={token._id}
            value={token._id}
            className="border border-gray-300 rounded-lg shadow-sm my-2 md:my-4"
          >
            <AccordionTrigger className="bg-slate-200 md:p-4 p-2 hover:no-underline rounded-t-lg">
              <span className="font-semibold md:text-lg text-sm">
                Token {index + 1} — {new Date(token.createdAt).toLocaleString()}—
                <span className="ml-2 text-sm font-normal text-gray-600"><strong>{token.status || 'Pending'}</strong>
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent className="bg-white p-2 space-y-4 flex flex-col md:flex-row gap-2">
              {/* Message Form */}
              <form className="bg-gray-50 md:p-4 rounded-md shadow-inner space-y-2 basis-1/3">
                <h3 className="text-sm p-2 md:text-lg font-semibold text-gray-700">✍️ Send a Message</h3>
                <Input placeholder="Subject" className="w-full" />
                <Textarea placeholder="Type your message..." className="w-full" />
                <Button type="submit" className="mt-2 w-full bg-sky-600 hover:bg-sky-500">Send</Button>
              </form>

              {/* Message History */}
              <div className="md:border-l-4 border-l-2 border-blue-400 pl-2 md:pl-4 basis-2/3 h-[350px] overflow-auto">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">📨 Message History</h4>
                <div className="space-y-4">
                  {demoMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`md:p-3 p-2 rounded-md ${
                        msg.sender === 'patient'
                          ? 'bg-blue-50 border-l-2 md:border-l-4 border-blue-400'
                          : 'bg-green-50 border-l-2 md:border-l-4 border-green-400'
                      }`}
                    >
                      <p className="text-sm font-bold capitalize text-gray-700">
                        {msg.sender === 'patient' ? 'Patient' : 'Doctor'}
                      </p>
                      <h5 className="text-md font-medium text-gray-800">{msg.subject}</h5>
                      <p className="text-gray-600 text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

