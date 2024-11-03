'use client'

import { useState } from 'react'
import { User, Briefcase, GraduationCap, Phone, Save } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ProfileImage from '@/components/dashboard/profileImage'

export default function RecruiterProfile() {
  const [activeTab, setActiveTab] = useState('basic');
  const [imageSrc, setImageSrc] = useState<string>('/logo.svg');

  const handleImageSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageSrc(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    company: '',
    position: '',
    experience: '',
    degree: '',
    university: '',
    graduationYear: '',
    email: '',
    phone: '',
    location: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const tabs = [
    { id: 'basic', label: 'Basic Details', icon: User },
    { id: 'professional', label: 'Professional Info', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact Info', icon: Phone },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-4">
            <div className='justify-center w-full flex'>
              <div className='w-[150px] h-[150px]'>
                <ProfileImage src={imageSrc} onImageSelect={handleImageSelect} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
              />
            </div>
          </div>
        )
      case 'professional':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="company">Current Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Acme Inc."
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Senior Recruiter"
              />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="5"
              />
            </div>
          </div>
        )
      case 'education':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="degree">Highest Degree</Label>
              <Input
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                placeholder="Bachelor's in Human Resources"
              />
            </div>
            <div>
              <Label htmlFor="university">University</Label>
              <Input
                id="university"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                placeholder="State University"
              />
            </div>
            <div>
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input
                id="graduationYear"
                name="graduationYear"
                type="number"
                value={formData.graduationYear}
                onChange={handleInputChange}
                placeholder="2015"
              />
            </div>
          </div>
        )
      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="New York, NY"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const handleSave = () => {
    // Here you would typically send the formData to your backend
    console.log('Saving profile data:', formData)
    // You can add an API call here to save the data
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight dark:text-primary">
            Profile
          </h2>
        </div>
      </header>
      <div className="flex flex-col sm:flex-row">
        <nav className="border-b p-4 sm:w-64 sm:border-b-0 sm:border-r">
          <div className="flex flex-row justify-between sm:flex-col sm:space-y-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            ))}
          </div>
        </nav>
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-2xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}