import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PressDocUI = () => {
  const [docType, setDocType] = useState('advisory');
  const [quickInput, setQuickInput] = useState('');
  const [preview, setPreview] = useState('');
  
  // State for Media Advisory fields
  const [advisoryData, setAdvisoryData] = useState({
    headline: '',
    mainText: '',
    eventDate: '',
    eventTime: '',
    location: '',
    speakers: [],
    contactName: '',
    contactTitle: '',
    contactPhone: '',
    contactEmail: '',
    contactAddress: '',
    websiteLinks: ['']
  });

  // State for Run of Show fields
  const [showData, setShowData] = useState({
    eventTitle: '',
    eventDate: '',
    eventLocation: '',
    speakers: []
  });

  const handleQuickInput = () => {
    // Here we'll add AI processing for the quick input
    // For now, just show a preview
    setPreview(quickInput);
  };

  const addWebsiteLink = () => {
    setAdvisoryData(prev => ({
      ...prev,
      websiteLinks: [...prev.websiteLinks, '']
    }));
  };

  const updateWebsiteLink = (index, value) => {
    const newLinks = [...advisoryData.websiteLinks];
    newLinks[index] = value;
    setAdvisoryData(prev => ({
      ...prev,
      websiteLinks: newLinks
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
            <Label>Quick Input / Notes</Label>
            <Textarea 
              placeholder="Paste your notes here..."
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              className="mb-2 h-32"
            />
            <Button onClick={handleQuickInput}>Process Notes</Button>
          </div>

          {preview && (
            <Alert className="mb-4">
              <AlertDescription>
                <pre className="whitespace-pre-wrap">{preview}</pre>
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="advisory" onValueChange={setDocType}>
            <TabsList className="mb-4">
              <TabsTrigger value="advisory">Media Advisory</TabsTrigger>
              <TabsTrigger value="runofshow">Run of Show</TabsTrigger>
            </TabsList>

            <TabsContent value="advisory">
              <form className="space-y-4">
                <div>
                  <Label>Website Links</Label>
                  {advisoryData.websiteLinks.map((link, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={link}
                        onChange={(e) => updateWebsiteLink(index, e.target.value)}
                        placeholder="Enter website URL"
                      />
                      {index === advisoryData.websiteLinks.length - 1 && (
                        <Button type="button" onClick={addWebsiteLink}>+</Button>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <Label>Headline</Label>
                  <Input
                    value={advisoryData.headline}
                    onChange={(e) => setAdvisoryData(prev => ({...prev, headline: e.target.value}))}
                    placeholder="ENTER HEADLINE IN ALL CAPS"
                  />
                </div>

                <div>
                  <Label>Main Text</Label>
                  <Textarea
                    value={advisoryData.mainText}
                    onChange={(e) => setAdvisoryData(prev => ({...prev, mainText: e.target.value}))}
                    placeholder="Enter the main body text..."
                    className="h-32"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Event Date</Label>
                    <Input
                      type="text"
                      value={advisoryData.eventDate}
                      onChange={(e) => setAdvisoryData(prev => ({...prev, eventDate: e.target.value}))}
                      placeholder="Friday, February 7, 2025"
                    />
                  </div>
                  <div>
                    <Label>Event Time</Label>
                    <Input
                      type="text"
                      value={advisoryData.eventTime}
                      onChange={(e) => setAdvisoryData(prev => ({...prev, eventTime: e.target.value}))}
                      placeholder="11:00 a.m."
                    />
                  </div>
                </div>

                <div>
                  <Label>Location</Label>
                  <Input
                    value={advisoryData.location}
                    onChange={(e) => setAdvisoryData(prev => ({...prev, location: e.target.value}))}
                    placeholder="Full address"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Contact Information</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      value={advisoryData.contactName}
                      onChange={(e) => setAdvisoryData(prev => ({...prev, contactName: e.target.value}))}
                      placeholder="Contact Name"
                    />
                    <Input
                      value={advisoryData.contactTitle}
                      onChange={(e) => setAdvisoryData(prev => ({...prev, contactTitle: e.target.value}))}
                      placeholder="Title"
                    />
                  </div>
                  <Input
                    value={advisoryData.contactAddress}
                    onChange={(e) => setAdvisoryData(prev => ({...prev, contactAddress: e.target.value}))}
                    placeholder="Address"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      value={advisoryData.contactPhone}
                      onChange={(e) => setAdvisoryData(prev => ({...prev, contactPhone: e.target.value}))}
                      placeholder="Phone"
                    />
                    <Input
                      value={advisoryData.contactEmail}
                      onChange={(e) => setAdvisoryData(prev => ({...prev, contactEmail: e.target.value}))}
                      placeholder="Email"
                    />
                  </div>
                </div>

                <Button type="submit">Generate Media Advisory</Button>
              </form>