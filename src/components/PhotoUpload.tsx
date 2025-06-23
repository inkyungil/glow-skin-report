
import { useState, useRef } from 'react';
import { Camera, Upload, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PhotoUploadProps {
  onUpload: (photo: any) => void;
  onBack: () => void;
}

const PhotoUpload = ({ onUpload, onBack }: PhotoUploadProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedPhoto(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedPhoto) {
      onUpload({ photo: selectedPhoto });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full fade-in-up">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-pink-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>

        <Card className="glass-effect border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto k-gradient rounded-full flex items-center justify-center mb-4 glow">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">얼굴 사진 업로드</h2>
              <p className="text-gray-600">정확한 분석을 위해 자연광에서 촬영한 정면 사진을 올려주세요</p>
            </div>

            {!selectedPhoto ? (
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                  isDragging 
                    ? 'border-pink-400 bg-pink-50 scale-105' 
                    : 'border-gray-300 hover:border-pink-300 hover:bg-pink-25'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors ${
                  isDragging ? 'text-pink-500' : 'text-gray-400'
                }`} />
                <h3 className="text-lg font-semibold mb-2">사진을 드래그하거나 클릭해서 업로드</h3>
                <p className="text-gray-500 mb-4">JPG, PNG 파일 지원 (최대 10MB)</p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="k-gradient text-white hover:scale-105 transition-transform"
                >
                  파일 선택하기
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <img 
                    src={selectedPhoto} 
                    alt="업로드된 사진" 
                    className="max-w-xs max-h-64 rounded-xl shadow-lg mx-auto scale-in"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-green-600 font-medium flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    사진이 성공적으로 업로드되었습니다
                  </p>
                  
                  <div className="flex gap-3 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedPhoto(null)}
                      className="hover:bg-gray-50"
                    >
                      다시 선택
                    </Button>
                    <Button 
                      onClick={handleAnalyze}
                      className="k-gradient text-white hover:scale-105 transition-transform px-8"
                    >
                      AI 분석 시작하기
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 p-4 bg-pink-50 rounded-lg">
              <h4 className="font-semibold mb-2 text-pink-800">📸 최적의 분석을 위한 촬영 팁</h4>
              <ul className="text-sm text-pink-700 space-y-1">
                <li>• 자연광이 있는 곳에서 촬영해주세요</li>
                <li>• 정면을 바라보고 표정을 자연스럽게 하세요</li>
                <li>• 화장을 지운 맨얼굴 상태가 가장 정확해요</li>
                <li>• 머리카락이 얼굴을 가리지 않도록 해주세요</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PhotoUpload;
