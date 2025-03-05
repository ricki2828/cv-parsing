import React, { useState } from 'react';
import ScoringCriteriaEditor from '../components/ScoringCriteriaEditor';
import { ScoringCriteria } from '../types';
import { Save, Mail, Phone, RefreshCw } from 'lucide-react';

const Settings: React.FC = () => {
  const [scoringCriteria, setScoringCriteria] = useState<ScoringCriteria>({
    salesExperience: 30,
    internationalExperience: 20,
    tenure: 15,
    technicalSkills: 20,
    softSkills: 15
  });
  
  const [emailSettings, setEmailSettings] = useState({
    senderName: 'BPO Recruitment Team',
    senderEmail: 'recruitment@example.com',
    emailSignature: 'Best regards,\nBPO Recruitment Team\nPhone: +27 11 123 4567'
  });
  
  const [whatsappSettings, setWhatsappSettings] = useState({
    senderNumber: '+27711234567',
    defaultMessage: 'Hello {{name}}, we received your application and would like to discuss opportunities with you. Is this a good time to chat?'
  });
  
  const [dataRetention, setDataRetention] = useState({
    retentionPeriod: '90',
    autoArchive: true,
    autoDelete: false
  });

  const handleScoringCriteriaUpdate = (criteria: ScoringCriteria) => {
    setScoringCriteria(criteria);
    // In a real app, this would save to a backend
    alert('Scoring criteria updated successfully!');
  };
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleEmailSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(emailSettings.senderEmail)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // In a real app, this would save to a backend
    alert('Email settings updated successfully!');
  };
  
  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^\+\d{1,3}\s?\d{9,15}$/;
    return phoneRegex.test(phone);
  };
  
  const handleWhatsappSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidPhoneNumber(whatsappSettings.senderNumber)) {
      alert('Please enter a valid phone number in international format (e.g., +27711234567)');
      return;
    }
    
    // In a real app, this would save to a backend
    alert('WhatsApp settings updated successfully!');
  };
  
  const handleDataRetentionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a backend
    alert('Data retention settings updated successfully!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ScoringCriteriaEditor 
            initialCriteria={scoringCriteria} 
            onSave={handleScoringCriteriaUpdate} 
          />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Email Settings</h2>
            </div>
            
            <form onSubmit={handleEmailSettingsSubmit} className="space-y-4">
              <div>
                <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-1">
                  Sender Name
                </label>
                <input
                  type="text"
                  id="senderName"
                  value={emailSettings.senderName}
                  onChange={(e) => setEmailSettings({...emailSettings, senderName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Sender Email
                </label>
                <input
                  type="email"
                  id="senderEmail"
                  value={emailSettings.senderEmail}
                  onChange={(e) => setEmailSettings({...emailSettings, senderEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="emailSignature" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Signature
                </label>
                <textarea
                  id="emailSignature"
                  rows={3}
                  value={emailSettings.emailSignature}
                  onChange={(e) => setEmailSettings({...emailSettings, emailSignature: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Email Settings
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Phone className="h-5 w-5 text-green-500 mr-2" />
              <h2 className="text-xl font-semibold">WhatsApp Settings</h2>
            </div>
            
            <form onSubmit={handleWhatsappSettingsSubmit} className="space-y-4">
              <div>
                <label htmlFor="senderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Sender Number
                </label>
                <input
                  type="text"
                  id="senderNumber"
                  value={whatsappSettings.senderNumber}
                  onChange={(e) => setWhatsappSettings({...whatsappSettings, senderNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="defaultMessage" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Message Template
                </label>
                <textarea
                  id="defaultMessage"
                  rows={3}
                  value={whatsappSettings.defaultMessage}
                  onChange={(e) => setWhatsappSettings({...whatsappSettings, defaultMessage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use {{name}} to insert the candidate's name.
                </p>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save WhatsApp Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <RefreshCw className="h-5 w-5 text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold">Data Retention Settings</h2>
          </div>
          
          <form onSubmit={handleDataRetentionSubmit} className="space-y-4">
            <div>
              <label htmlFor="retentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                Data Retention Period (days)
              </label>
              <input
                type="number"
                id="retentionPeriod"
                min="1"
                value={dataRetention.retentionPeriod}
                onChange={(e) => setDataRetention({...dataRetention, retentionPeriod: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Specify how long candidate data should be kept in the system.
              </p>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoArchive"
                checked={dataRetention.autoArchive}
                onChange={(e) => setDataRetention({...dataRetention, autoArchive: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="autoArchive" className="ml-2 block text-sm text-gray-700">
                Automatically archive candidates after retention period
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoDelete"
                checked={dataRetention.autoDelete}
                onChange={(e) => setDataRetention({...dataRetention, autoDelete: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="autoDelete" className="ml-2 block text-sm text-gray-700">
                Automatically delete candidates after retention period (not recommended)
              </label>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Retention Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;