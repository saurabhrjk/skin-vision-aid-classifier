
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileWarning, Info, Stethoscope } from 'lucide-react';

const InfoSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info size={20} /> 
          About Skin Condition Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="guidance">Usage Guide</TabsTrigger>
            <TabsTrigger value="disclaimer">Disclaimer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-4">
            <p>
              SkinVisionAid is an AI-powered tool that helps identify potential skin conditions through
              image analysis. Our deep learning model has been trained on thousands of dermatological
              images to recognize common skin conditions.
            </p>
            <p>
              This tool is designed to assist in the preliminary assessment of skin lesions
              and provide information about possible conditions, but should not replace 
              professional medical advice.
            </p>
            <p>To contact : <br/>
            Email : khandelwalsaurabh138@gamil.com and prashanttkumarsah@gmail.com <br/>
            Phone : 7877026395 and 9311770788</p>
          </TabsContent>
          
          <TabsContent value="guidance" className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium">1</span>
                </div>
                <p>
                  <span className="font-medium">Upload a clear image</span> of the skin condition. 
                  Ensure good lighting and that the image is in focus.
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium">2</span>
                </div>
                <p>
                  <span className="font-medium">Wait for analysis</span> - our AI will process the image 
                  and provide classification results based on visual characteristics.
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium">3</span>
                </div>
                <p>
                  <span className="font-medium">Review the results</span> and consider consulting a healthcare 
                  professional for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="disclaimer" className="space-y-4">
            <div className="flex items-start gap-2">
              <FileWarning className="text-orange-500 mt-1 flex-shrink-0" />
              <p className="text-sm">
                SkinVisionAid is not a diagnostic tool. The results provided should be used for 
                informational purposes only and should not be considered a substitute for 
                professional medical advice, diagnosis, or treatment.
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <Stethoscope className="text-primary mt-1 flex-shrink-0" />
              <p className="text-sm">
                If you have concerns about a skin condition, please consult with a qualified healthcare 
                provider. Early detection and proper medical care are crucial for skin conditions, 
                particularly potential skin cancers.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InfoSection;
