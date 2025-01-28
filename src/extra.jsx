import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Calculator } from 'lucide-react';

const CGPACalculator = () => {
  const [semesters, setSemesters] = useState([{ sgpa: '', id: Date.now() }]);
  const [cgpa, setCGPA] = useState(null);

  const addSemester = () => {
    setSemesters([...semesters, { sgpa: '', id: Date.now() }]);
  };

  const removeSemester = (id) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(sem => sem.id !== id));
    }
  };

  const handleSGPAChange = (id, value) => {
    setSemesters(semesters.map(sem => 
      sem.id === id ? { ...sem, sgpa: value } : sem
    ));
  };

  const calculateCGPA = () => {
    const validSGPAs = semesters
      .map(sem => parseFloat(sem.sgpa))
      .filter(sgpa => !isNaN(sgpa) && sgpa >= 0 && sgpa <= 10);

    if (validSGPAs.length === 0) {
      setCGPA('Please enter valid SGPA values');
      return;
    }

    const totalSGPA = validSGPAs.reduce((sum, sgpa) => sum + sgpa, 0);
    const calculatedCGPA = (totalSGPA / validSGPAs.length).toFixed(2);
    setCGPA(calculatedCGPA);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">CGPA Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {semesters.map((semester, index) => (
          <div key={semester.id} className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">
                Semester {index + 1} SGPA
              </label>
              <input
                type="number"
                value={semester.sgpa}
                onChange={(e) => handleSGPAChange(semester.id, e.target.value)}
                placeholder="Enter SGPA (0-10)"
                step="0.01"
                min="0"
                max="10"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeSemester(semester.id)}
              disabled={semesters.length === 1}
              className="mt-6"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <div className="flex justify-between">
          <Button
            onClick={addSemester}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Semester
          </Button>
          <Button
            onClick={calculateCGPA}
            className="flex items-center gap-2"
          >
            <Calculator className="h-4 w-4" /> Calculate CGPA
          </Button>
        </div>

        {cgpa && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold text-center">
              Your CGPA: {cgpa}
            </h3>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CGPACalculator;