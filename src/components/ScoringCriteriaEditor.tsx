import React, { useState } from 'react';
import { ScoringCriteria } from '../types';
import { Save } from 'lucide-react';

interface ScoringCriteriaEditorProps {
  initialCriteria: ScoringCriteria;
  onSave: (criteria: ScoringCriteria) => void;
}

const ScoringCriteriaEditor: React.FC<ScoringCriteriaEditorProps> = ({
  initialCriteria,
  onSave
}) => {
  const [criteria, setCriteria] = useState<ScoringCriteria>(initialCriteria);

  const handleChange = (key: keyof ScoringCriteria, value: number) => {
    setCriteria(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(criteria);
  };

  const totalWeight = Object.values(criteria).reduce((sum, value) => sum + value, 0);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Scoring Criteria Weights</h2>
      <p className="text-sm text-gray-600 mb-6">
        Adjust the importance of each criterion by setting its weight. The total should add up to 100%.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="salesExperience" className="block text-sm font-medium text-gray-700 mb-1">
            Sales Experience
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="salesExperience"
              min="0"
              max="50"
              value={criteria.salesExperience}
              onChange={(e) => handleChange('salesExperience', parseInt(e.target.value))}
              className="flex-grow mr-4"
            />
            <span className="w-12 text-center font-medium">{criteria.salesExperience}%</span>
          </div>
        </div>

        <div>
          <label htmlFor="internationalExperience" className="block text-sm font-medium text-gray-700 mb-1">
            International Experience
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="internationalExperience"
              min="0"
              max="50"
              value={criteria.internationalExperience}
              onChange={(e) => handleChange('internationalExperience', parseInt(e.target.value))}
              className="flex-grow mr-4"
            />
            <span className="w-12 text-center font-medium">{criteria.internationalExperience}%</span>
          </div>
        </div>

        <div>
          <label htmlFor="tenure" className="block text-sm font-medium text-gray-700 mb-1">
            Tenure at Previous Jobs
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="tenure"
              min="0"
              max="50"
              value={criteria.tenure}
              onChange={(e) => handleChange('tenure', parseInt(e.target.value))}
              className="flex-grow mr-4"
            />
            <span className="w-12 text-center font-medium">{criteria.tenure}%</span>
          </div>
        </div>

        <div>
          <label htmlFor="technicalSkills" className="block text-sm font-medium text-gray-700 mb-1">
            Technical Skills
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="technicalSkills"
              min="0"
              max="50"
              value={criteria.technicalSkills}
              onChange={(e) => handleChange('technicalSkills', parseInt(e.target.value))}
              className="flex-grow mr-4"
            />
            <span className="w-12 text-center font-medium">{criteria.technicalSkills}%</span>
          </div>
        </div>

        <div>
          <label htmlFor="softSkills" className="block text-sm font-medium text-gray-700 mb-1">
            Soft Skills
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="softSkills"
              min="0"
              max="50"
              value={criteria.softSkills}
              onChange={(e) => handleChange('softSkills', parseInt(e.target.value))}
              className="flex-grow mr-4"
            />
            <span className="w-12 text-center font-medium">{criteria.softSkills}%</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Weight:</span>
          <span className={`font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
            {totalWeight}%
          </span>
        </div>
        {totalWeight !== 100 && (
          <p className="text-sm text-red-600 mt-2">
            {totalWeight < 100 ? 'Please increase' : 'Please decrease'} weights to total exactly 100%.
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={totalWeight !== 100}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Criteria
        </button>
      </div>
    </form>
  );
};

export default ScoringCriteriaEditor;