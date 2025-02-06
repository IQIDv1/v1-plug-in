"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { History, Edit2, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function WriteEmail() {
  const [showHistory, setShowHistory] = useState(false)
  const [emailHistory] = useState([
    { id: 1, subject: "RE: Financial Aid Question", date: "2023-11-20" },
    { id: 2, subject: "RE: Scholarship Application", date: "2023-11-19" },
    { id: 3, subject: "RE: FAFSA Submission", date: "2023-11-18" },
  ])

  const detectedEmail = `
Dear Financial Aid Office,

I'm worried about my financial aid package for next semester. I submitted my FAFSA late and I'm not sure if I'll receive enough aid to cover my tuition. Can you please help me understand my options?

Thank you,
Sarah Johnson
Student ID: 123456
  `.trim()

  const draftResponse = `
Dear Sarah Johnson,

Thank you for reaching out regarding your financial aid concerns. I understand your worry about submitting your FAFSA late and its potential impact on your aid package. Let me provide you with some specific information based on your current status:

1. FAFSA Submission: Our records show that your FAFSA was received on 11/15/2023, which is indeed past our priority deadline of 03/01/2023.

2. Current Aid Status: Despite the late submission, you have been awarded the following:
   - Federal Pell Grant: $3,172 for the academic year
   - Federal Direct Subsidized Loan: $3,500
   - Federal Direct Unsubsidized Loan: $2,000

3. Outstanding Requirements: We need the following to complete your file:
   - Signed copy of your parents' 2022 tax return
   - Verification of Untaxed Income form

4. Options to Consider:
   a) Submit the outstanding documents ASAP to potentially qualify for additional institutional aid.
   b) Look into our <a style="color: blue;" href="https://example.com/payment-plan">monthly payment plan</a> to spread out your remaining balance.
   c) Consider applying for private scholarships. Our database lists 15 scholarships you may be eligible for.

5. Next Steps:
   - <a style="color: blue;" href="https://example.com/schedule-appointment">Schedule an appointment</a> with our financial aid counselor, Ms. Thompson, to discuss your specific situation in detail.
   - Attend our upcoming workshop on "Maximizing Your Financial Aid" on 12/05/2023. <a style="color: blue;" href="https://example.com/workshop-registration">Register here</a>.

Please don't hesitate to reach out if you have any questions. We're here to help you navigate this process and ensure you have the support you need to continue your education.

Best regards,
John Doe
Financial Aid Advisor
State University
  `.trim()

  const contextData = [
    {
      source: "Banner (SIS)",
      info: "Student enrollment status, financial aid package details, and outstanding requirements",
      link: "https://example.com/banner-sis",
    },
    {
      source: "EDConnect",
      info: "FAFSA submission date, EFC, and verification status",
      link: "https://example.com/edconnect-data",
    },
    {
      source: "PeopleSoft API",
      info: "Student account balance and financial aid status",
      link: "https://example.com/peoplesoft-api",
    },
    {
      source: "Outlook API",
      info: "Recent email communications with the student",
      link: "https://example.com/outlook-api",
    },
    {
      source: "RAG Database",
      info: "Relevant financial aid policies and procedures",
      link: "https://example.com/rag-database",
    },
    {
      source: "SmarterSelect",
      info: "Scholarship management tool with information on qualifications, deadlines, and recipients",
      link: "https://example.com/smarterselect",
    },
  ]

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-purple-800">Write Email</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowHistory(!showHistory)}
          className="text-purple-600 hover:text-purple-800"
        >
          <History className="h-4 w-4 mr-2" />
          {showHistory ? "Hide History" : "Show History"}
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="w-3/4">
          <Tabs defaultValue="from-inbox" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="from-inbox">From Your Inbox</TabsTrigger>
              <TabsTrigger value="paste">Paste an Email</TabsTrigger>
            </TabsList>
            <TabsContent value="from-inbox" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-medium text-gray-700 mb-2">Email from Inbox:</h4>
                  <Textarea value={detectedEmail} readOnly className="min-h-[200px]" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-medium text-gray-700 mb-2">Draft Response:</h4>
                  <div
                    className="border rounded-md p-4 min-h-[400px] whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: draftResponse }}
                  />
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-medium text-gray-700 mb-4">Context:</h4>
                  <div className="space-y-4">
                    {contextData.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <h5 className="font-medium text-purple-800 mb-2">{item.source}</h5>
                        <p className="text-sm mb-1">{item.info}</p>
                        <Link href={item.link} className="text-blue-500 hover:underline text-sm">
                          View Data
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="paste" className="space-y-4">
              <Textarea placeholder="Paste existing email here..." className="min-h-[300px]" />
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Generate Response</Button>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-1/4">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium text-gray-700 mb-2">
                {showHistory ? "Draft Email History" : "Student Information"}
              </h4>
              <ScrollArea className="h-[600px]">
                {showHistory ? (
                  emailHistory.map((email) => (
                    <div key={email.id} className="mb-2 p-2 bg-gray-100 rounded-md">
                      <p className="font-medium">{email.subject}</p>
                      <p className="text-sm text-gray-600">{email.date}</p>
                    </div>
                  ))
                ) : (
                  <div className="space-y-2">
                    <p>
                      <strong>Name:</strong> Sarah Johnson
                    </p>
                    <p>
                      <strong>Student ID:</strong> 123456
                    </p>
                    <p>
                      <strong>FAFSA Submission Date:</strong> 11/15/2023
                    </p>
                    <p>
                      <strong>Cost of Attendance (COA):</strong> $25,000
                    </p>
                    <p>
                      <strong>Award Status:</strong> Not Accepted
                    </p>
                    <p>
                      <strong>Enrollment Status:</strong> Full-time
                    </p>
                    <p>
                      <strong>Current Aid Status:</strong>
                    </p>
                    <ul className="list-disc pl-5">
                      <li>Federal Pell Grant: $3,172</li>
                      <li>Federal Direct Subsidized Loan: $3,500</li>
                      <li>Federal Direct Unsubsidized Loan: $2,000</li>
                    </ul>
                    <p>
                      <strong>Outstanding Requirements:</strong>
                    </p>
                    <ul className="list-disc pl-5">
                      <li>Signed copy of parents' 2022 tax return</li>
                      <li>Verification of Untaxed Income form</li>
                    </ul>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

