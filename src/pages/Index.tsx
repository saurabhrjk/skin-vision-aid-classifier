
import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import ResultsDisplay, { ClassResult } from '@/components/ResultsDisplay';
import InfoSection from '@/components/InfoSection';
import { classifyImage, preloadModel } from '@/services/classificationService';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [results, setResults] = useState<ClassResult[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Preload the model when the component mounts
    const loadModel = async () => {
      try {
        await preloadModel();
        setIsModelReady(true);
        console.log("Model loaded successfully");
      } catch (error) {
        console.error("Failed to load model:", error);
        toast({
          title: "Error loading model",
          description: "Please refresh the page to try again",
          variant: "destructive"
        });
      }
    };

    loadModel();
  }, [toast]);

  useEffect(() => {
    // Process image when selected
    const processImage = async () => {
      if (selectedImage && isModelReady) {
        try {
          setIsAnalyzing(true);
          setResults(null);
          
          const classificationResults = await classifyImage(selectedImage);
          setResults(classificationResults);
          
          toast({
            title: "Analysis complete",
            description: "Review the results below",
          });
        } catch (error) {
          console.error("Error classifying image:", error);
          toast({
            title: "Classification failed",
            description: "An error occurred while analyzing the image",
            variant: "destructive"
          });
        } finally {
          setIsAnalyzing(false);
        }
      }
    };

    processImage();
  }, [selectedImage, isModelReady, toast]);

  const handleImageSelected = (imageFile: File, preview: string) => {
    setSelectedImage(imageFile);
    setImagePreview(preview);
    setResults(null);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-screen-xl mx-auto px-4">
      <Header />
      
      <main className="flex-grow py-6">
        <Card className="p-6 shadow-md bg-white">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Upload Skin Image</h2>
              <ImageUploader onImageSelected={handleImageSelected} />
              <InfoSection />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">
                {isAnalyzing ? "Analyzing..." : results ? "Analysis Results" : "Results will appear here"}
              </h2>
              <ResultsDisplay 
                results={results}
                isAnalyzing={isAnalyzing}
              />
              
              {!selectedImage && !isAnalyzing && (
                <Card className="bg-gray-50 p-6 text-center">
                  <p className="text-muted-foreground">
                    Upload an image of the skin condition to start the analysis
                  </p>
                </Card>
              )}
            </div>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
