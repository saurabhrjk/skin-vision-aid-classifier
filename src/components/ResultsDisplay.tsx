
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { cn } from '@/lib/utils';

export interface ClassResult {
  className: string;
  confidence: number;
}

interface ResultsDisplayProps {
  results: ClassResult[] | null;
  isAnalyzing: boolean;
}

const diseaseInfo: Record<string, { description: string; severity: 'low' | 'medium' | 'high' }> = {
  "melanocytic_nevi": {
    description: "A common type of skin growth that is usually benign (not cancerous).",
    severity: "low"
  },
  "melanoma": {
    description: "The most serious type of skin cancer, which develops in the cells that produce melanin.",
    severity: "high"
  },
  "benign_keratosis": {
    description: "A harmless skin growth that can appear on the face or other parts of the body.",
    severity: "low"
  },
  "basal_cell_carcinoma": {
    description: "The most common type of skin cancer, usually developing on sun-exposed areas.",
    severity: "medium"
  },
  "actinic_keratosis": {
    description: "A rough, scaly patch on the skin that develops from years of sun exposure.",
    severity: "medium"
  },
  "vascular_lesions": {
    description: "Abnormalities of blood vessels that appear on the skin surface.",
    severity: "low"
  },
  "dermatofibroma": {
    description: "A common benign skin growth that often appears as a small, firm bump.",
    severity: "low"
  }
};

const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
  switch (severity) {
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getSeverityIcon = (severity: 'low' | 'medium' | 'high') => {
  switch (severity) {
    case 'low':
      return <CheckCircle size={16} className="text-green-600" />;
    case 'medium':
      return <AlertTriangle size={16} className="text-yellow-600" />;
    case 'high':
      return <AlertTriangle size={16} className="text-red-600" />;
    default:
      return <HelpCircle size={16} className="text-gray-600" />;
  }
};

const ResultsDisplay = ({ results, isAnalyzing }: ResultsDisplayProps) => {
  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Analyzing image...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <Progress value={100} className="animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Our AI is analyzing the image for skin conditions
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return null;
  }

  const topResult = results[0];
  const otherResults = results.slice(1, 4);
  
  const info = diseaseInfo[topResult.className] || {
    description: "Information not available for this condition.",
    severity: "medium" as const
  };

  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle className="text-center">Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">Detected condition:</h3>
              <Badge className={cn("ml-2", getSeverityColor(info.severity))}>
                <span className="flex items-center gap-1">
                  {getSeverityIcon(info.severity)}
                  {info.severity.charAt(0).toUpperCase() + info.severity.slice(1)} severity
                </span>
              </Badge>
            </div>
            <div className="bg-secondary p-3 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold capitalize">
                  {topResult.className.replace(/_/g, ' ')}
                </span>
                <span className="font-bold">
                  {Math.round(topResult.confidence * 100)}%
                </span>
              </div>
              <Progress value={topResult.confidence * 100} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {info.description}
            </p>
          </div>

          {otherResults.length > 0 && (
            <>
              <h4 className="font-medium">Other possibilities:</h4>
              <div className="space-y-2">
                {otherResults.map((result, index) => (
                  <div key={index} className="bg-secondary/50 p-2 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-sm capitalize">
                        {result.className.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm font-medium">
                        {Math.round(result.confidence * 100)}%
                      </span>
                    </div>
                    <Progress value={result.confidence * 100} className="h-1 mt-1" />
                  </div>
                ))}
              </div>
            </>
          )}
          
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100 text-sm">
            <p className="text-blue-700">
              <strong>Disclaimer:</strong> This analysis is for informational purposes only and should not replace 
              professional medical advice. Please consult a dermatologist for proper diagnosis.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
