import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface JobDescriptionEditorProps {
  initialData?: {
    title: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
  };
  onSave: (data: {
    title: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
  }) => void;
}

const JobDescriptionEditor: React.FC<JobDescriptionEditorProps> = ({
  initialData = {
    title: '',
    description: '',
    requirements: [''],
    responsibilities: ['']
  },
  onSave
}) => {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [requirements, setRequirements] = useState(initialData.requirements);
  const [responsibilities, setResponsibilities] = useState(initialData.responsibilities);

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      const newRequirements = [...requirements];
      newRequirements.splice(index, 1);
      setRequirements(newRequirements);
    }
  };

  const addResponsibility = () => {
    setResponsibilities([...responsibilities, '']);
  };

  const removeResponsibility = (index: number) => {
    if (responsibilities.length > 1) {
      const newResponsibilities = [...responsibilities];
      newResponsibilities.splice(index, 1);
      setResponsibilities(newResponsibilities);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      requirements: requirements.filter(req => req.trim() !== ''),
      responsibilities: responsibilities.filter(resp => resp.trim() !== '')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Job Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Requirements
          </label>
          <button
            type="button"
            onClick={addRequirement}
            className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Requirement
          </button>
        </div>
        {requirements.map((requirement, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={requirement}
              onChange={(e) => handleRequirementChange(index, e.target.value)}
              placeholder={`Requirement ${index + 1}`}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {requirements.length > 1 && (
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Responsibilities
          </label>
          <button
            type="button"
            onClick={addResponsibility}
            className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Responsibility
          </button>
        </div>
        {responsibilities.map((responsibility, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={responsibility}
              onChange={(e) => handleResponsibilityChange(index, e.target.value)}
              placeholder={`Responsibility ${index + 1}`}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {responsibilities.length > 1 && (
              <button
                type="button"
                onClick={() => removeResponsibility(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Job Description
        </button>
      </div>
    </form>
  );
};

export default JobDescriptionEditor;