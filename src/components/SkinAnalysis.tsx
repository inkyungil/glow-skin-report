
import { useEffect, useState } from 'react';
import { Sparkles, Eye, Droplets, Sun, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const SkinAnalysis = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    { icon: Eye, label: '얼굴 부위 인식', description: 'YOLO v5 기반 얼굴 영역 탐지' },
    { icon: Target, label: '피부 문제 탐지', description: '모공, 잡티, 주름 등 문제점 분석' },
    { icon: Droplets, label: '수분 & 유분 분석', description: '피부 타입 및 수분 밸런스 측정' },
    { icon: Sun, label: '색소침착 분석', description: '기미, 색소침착 정도 평가' },
    { icon: Sparkles, label: '종합 평가', description: '맞춤형 추천을 위한 결과 종합' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 600);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full fade-in-up">
        <Card className="glass-effect border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto k-gradient rounded-full flex items-center justify-center mb-4 pulse-soft glow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">AI 피부 분석 중</h2>
              <p className="text-gray-600">전문가 수준의 피부 분석을 진행하고 있습니다</p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">분석 진행률</span>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3 bg-gray-100">
                  <div 
                    className="h-full k-gradient rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </Progress>
              </div>

              <div className="space-y-4">
                {analysisSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  
                  return (
                    <div 
                      key={index}
                      className={`flex items-center p-4 rounded-lg transition-all duration-500 ${
                        isActive 
                          ? 'bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 scale-105' 
                          : isCompleted
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-300 ${
                        isActive 
                          ? 'k-gradient glow' 
                          : isCompleted
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}>
                        <StepIcon className={`w-6 h-6 ${
                          isActive || isCompleted ? 'text-white' : 'text-gray-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold transition-colors ${
                          isActive ? 'text-pink-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </h3>
                        <p className={`text-sm transition-colors ${
                          isActive ? 'text-pink-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      {isActive && (
                        <div className="ml-4">
                          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🔬 AI 분석 기술</h4>
                <p className="text-sm text-blue-700">
                  YOLO v5 객체 탐지와 CNN 딥러닝 모델을 활용하여 
                  피부과 전문의 수준의 정밀한 분석을 제공합니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkinAnalysis;
