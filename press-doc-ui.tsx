import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PressDocUI = () => {
  const [docType, setDocType] = useState('advisory');
  const [quickInput, setQuickInput] = useState('');
  
  // State for Media Advisory fields
  const [advisoryData, setAdvisoryData] = useState({
    headline: '',
    summary: '',
    eventDate: '',
    eventTime: '',
    location: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  // State for Run of Show fields
  const [showData, setShowData] = useState({
    eventTitle: '',
    eventDate: '',
    eventLocation: '',
    speakers: [{ name: '', title: '', organization: '', time: '', notes: '' }]
  });

  const handleQuickInput = () => {
    // Here you would add logic to parse the quick input text
    // and populate the appropriate form fields
    alert('Processing quick input: ' + quickInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would add logic to generate the document
    // using the Python backend
    alert('Generating document...');
  };

  const addSpeaker = () => {
    setShowData(prev => ({
      ...prev,
      speakers: [...prev.speakers, { name: '', title: '', organization: '', time: '', notes: '' }]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Press Document Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label>Quick Input</Label>
            <Textarea 
              placeholder="Paste your notes here for automatic parsing..."
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleQuickInput}>Process Quick Input</Button>
          </div>

          <Tabs defaultValue="advisory" onValueChange={setDocType}>
            <TabsList className="mb-4">
              <TabsTrigger value="advisory">Media Advisory</TabsTrigger>
              <TabsTrigger value="runofshow">Run of Show</TabsTrigger>
            </TabsList>

            <TabsContent value="advisory">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Headline</Label>
                  <Input
                    value={advisoryData.headline}
                    onChange={(e) => setAdvisoryData(prev => ({...prev, headline: e.target.value}))}
                    placeholder="Enter headline"
                  />
                </div>
                <div>
                  <Label>Summary</Label>
                  <Textarea
                    value={advisoryData.summary}
                    onChange={(e) => setAdvisoryData(prev => ({...prev, summary: e.target.value}))}
                    placeholder="Enter event summary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Event Date</Label>
                    <Input
                      type="date"
                      value={advisoryData.eventDate}
                      onChange={(e) => setAdvisoryData(prev => ({...prev, eventDate: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label>Event Time</Label>
                    <Input
                      type="time"
                      value={advisoryData.eventTime}
                      onChange={(e) => setAdvisoryData(prev => ({...prev, eventTime: e.target.value}))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={advisoryData.location}
                    onChange={(e) => setAdvisoryData(prev => ({...prev, location: e.target.value}))}
                    placeholder="Enter event location"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Contact Name</Label>
                    <Input
                      value={advisoryData.contactName}
                      onChange={(e) => setAdvisoryData(prev => ({...prev, contactName: e.target.value}))}
                      placeholder="Contact name"
                    />
                  </div>
                  <div>
                    <Label>Contact Phone</Label>
                    <Input
                      value={advisoryData.contactPhone}
                      onChange={(e) => setAdvisoryData(prev => ({...prev, contactPhone: e.target.value}))}
                      placeholder="Contact phone"
                    />
                  </div>
                  <div>
                    <Label>Contact Email</Label>
                    <Input
                      value={advisoryData.contactEmail}
                      onChange={(e) => setAdvisoryData(prev => ({...prev, contactEmail: e.target.value}))}
                      placeholder="Contact email"
                    />
                  </div>
                </div>
                <Button type="submit">Generate Media Advisory</Button>
              </form>
            </TabsContent>

            <TabsContent value="runofshow">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Event Title</Label>
                  <Input
                    value={showData.eventTitle}
                    onChange={(e) => setShowData(prev => ({...prev, eventTitle: e.target.value}))}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Event Date</Label>
                    <Input
                      type="date"
                      value={showData.eventDate}
                      onChange={(e) => setShowData(prev => ({...prev, eventDate: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label>Event Location</Label>
                    <Input
                      value={showData.eventLocation}
                      onChange={(e) => setShowData(prev => ({...prev, eventLocation: e.target.value}))}
                      placeholder="Enter event location"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Speakers</Label>
                  {showData.speakers.map((speaker, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={speaker.name}
                            onChange={(e) => {
                              const newSpeakers = [...showData.speakers];
                              newSpeakers[index].name = e.target.value;
                              setShowData(prev => ({...prev, speakers: newSpeakers}));
                            }}
                            placeholder="Speaker name"
                          />
                        </div>
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={speaker.title}
                            onChange={(e) => {
                              const newSpeakers = [...showData.speakers];
                              newSpeakers[index].title = e.target.value;
                              setShowData(prev => ({...prev, speakers: newSpeakers}));
                            }}
                            placeholder="Speaker title"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Organization</Label>
                          <Input
                            value={speaker.organization}
                            onChange={(e) => {
                              const newSpeakers = [...showData.speakers];
                              newSpeakers[index].organization = e.target.value;
                              setShowData(prev => ({...prev, speakers: newSpeakers}));
                            }}
                            placeholder="Organization"
                          />
                        </div>
                        <div>
                          <Label>Speaking Time</Label>
                          <Input
                            type="time"
                            value={speaker.time}
                            onChange={(e) => {
                              const newSpeakers = [...showData.speakers];
                              newSpeakers[index].time = e.target.value;
                              setShowData(prev => ({...prev, speakers: newSpeakers}));
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Notes</Label>
                        <Textarea
                          value={speaker.notes}
                          onChange={(e) => {
                            const newSpeakers = [...showData.speakers];
                            newSpeakers[index].notes = e.target.value;
                            setShowData(prev => ({...prev, speakers: newSpeakers}));
                          }}
                          placeholder="Additional notes"
                        />
                      </div>
                    </div>
                  ))}
                  <Button type="button" onClick={addSpeaker} className="w-full">
                    Add Speaker
                  </Button>
                </div>
                <Button type="submit">Generate Run of Show</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PressDocUI;
