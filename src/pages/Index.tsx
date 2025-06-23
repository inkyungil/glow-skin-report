
import { useState } from 'react';
import { Camera, Sparkles, Heart, ArrowRight, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PhotoUpload from '@/components/PhotoUpload';
import SkinAnalysis from '@/components/SkinAnalysis';
import ProductRecommendations from '@/components/ProductRecommendations';

type AppStep = 'welcome' | 'upload' | 'analysis' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handlePhotoUpload = (photoData: any) => {
    setCurrentStep('analysis');
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisData({
        skinType: 'combination',
        concerns: ['pores', 'dark_spots', 'dryness'],
        scores: {
          moisture: 65,
          elasticity: 78,
          pores: 42,
          pigmentation: 71
        }
      });
      setCurrentStep('results');
    }, 3000);
  };

  const renderWelcomeScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl fade-in-up">
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto k-gradient rounded-full flex items-center justify-center mb-4 float-animation glow">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400 bg-clip-text text-transparent mb-4">
            K-Beauty AI 피부 진단
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            AI가 분석하는 맞춤형 피부 진단과<br />
            당신만을 위한 K-뷰티 제품 추천
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300 scale-in">
            <CardContent className="p-6 text-center">
              <Camera className="w-8 h-8 mx-auto mb-3 text-pink-500" />
              <h3 className="font-semibold mb-2">사진 업로드</h3>
              <p className="text-sm text-gray-600">얼굴 사진을 업로드하면 AI가 자동으로 분석해드려요</p>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300 scale-in" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-6 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-purple-500" />
              <h3 className="font-semibold mb-2">AI 피부 분석</h3>
              <p className="text-sm text-gray-600">모공, 색소침착, 탄력도 등 피부 상태를 정밀 분석</p>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300 scale-in" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-3 text-rose-500" />
              <h3 className="font-semibold mb-2">맞춤 추천</h3>
              <p className="text-sm text-gray-600">분석 결과를 바탕으로 K-뷰티 제품을 추천해드려요</p>
            </CardContent>
          </Card>
        </div>

        <Button 
          onClick={() => setCurrentStep('upload')}
          className="k-gradient text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
        >
          지금 시작하기 <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 'welcome':
        return renderWelcomeScreen();
      case 'upload':
        return <PhotoUpload onUpload={handlePhotoUpload} onBack={() => setCurrentStep('welcome')} />;
      case 'analysis':
        return <SkinAnalysis />;
      case 'results':
        return <ProductRecommendations analysisData={analysisData} onRestart={() => setCurrentStep('welcome')} />;
      default:
        return renderWelcomeScreen();
    }
  };

  return (
    <div className="min-h-screen">
      {renderContent()}
    </div>
  );
};

export default Index;
