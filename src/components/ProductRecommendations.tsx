
import { RefreshCw, Award, Droplets, Zap, Shield, Star, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ProductRecommendationsProps {
  analysisData: any;
  onRestart: () => void;
}

const ProductRecommendations = ({ analysisData, onRestart }: ProductRecommendationsProps) => {
  const skinScores = analysisData?.scores || {};
  const concerns = analysisData?.concerns || [];

  const recommendedProducts = [
    {
      id: 1,
      name: "하다라보 극순수 히알루론산 로션",
      brand: "HADA LABO",
      category: "모이스처라이저",
      price: "18,000원",
      rating: 4.8,
      reviews: 2847,
      image: "/placeholder.svg",
      keyIngredients: ["히알루론산", "세라마이드", "나이아신아마이드"],
      skinConcerns: ["수분 공급", "진정"],
      match: 95,
      description: "5종의 히알루론산으로 깊은 수분 공급"
    },
    {
      id: 2,
      name: "미샤 타임 레볼루션 나이트 리페어",
      brand: "MISSHA",
      category: "세럼",
      price: "24,000원",
      rating: 4.6,
      reviews: 1923,
      image: "/placeholder.svg",
      keyIngredients: ["레티놀", "펩타이드", "아데노신"],
      skinConcerns: ["주름 개선", "탄력"],
      match: 88,
      description: "밤사이 집중 안티에이징 케어"
    },
    {
      id: 3,
      name: "이니스프리 블랙티 유스 인핸싱 앰플",
      brand: "innisfree",
      category: "앰플",
      price: "32,000원",
      rating: 4.7,
      reviews: 1456,
      image: "/placeholder.svg",
      keyIngredients: ["블랙티", "비타민C", "글리콜릭산"],
      skinConcerns: ["색소침착", "브라이트닝"],
      match: 82,
      description: "제주 블랙티로 맑고 투명한 피부"
    }
  ];

  const getConcernIcon = (concern: string) => {
    switch (concern) {
      case 'pores': return '🕳️';
      case 'dark_spots': return '🌟';
      case 'dryness': return '💧';
      default: return '✨';
    }
  };

  const getConcernLabel = (concern: string) => {
    switch (concern) {
      case 'pores': return '모공';
      case 'dark_spots': return '색소침착';
      case 'dryness': return '건조함';
      default: return concern;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '좋음';
    if (score >= 60) return '보통';
    return '개선 필요';
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto k-gradient rounded-full flex items-center justify-center mb-4 glow">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">피부 분석 완료!</h1>
          <p className="text-gray-600">당신의 피부 상태와 맞춤 추천 제품을 확인해보세요</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Skin Analysis Results */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-effect border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Droplets className="w-5 h-5 mr-2 text-blue-500" />
                  피부 분석 결과
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(skinScores).map(([key, score]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">
                        {key === 'moisture' ? '수분도' : 
                         key === 'elasticity' ? '탄력도' : 
                         key === 'pores' ? '모공 상태' : 
                         key === 'pigmentation' ? '색소침착' : key}
                      </span>
                      <span className={`text-sm font-medium ${getScoreColor(score as number)}`}>
                        {score}/100 ({getScoreLabel(score as number)})
                      </span>
                    </div>
                    <Progress 
                      value={score as number} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-orange-500" />
                  주요 개선 포인트
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {concerns.map((concern: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-xl mr-3">{getConcernIcon(concern)}</span>
                      <span className="font-medium text-orange-700">
                        {getConcernLabel(concern)} 집중 케어 필요
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Recommendations */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">맞춤 추천 제품</h2>
              <Button 
                variant="outline" 
                onClick={onRestart}
                className="hover:bg-pink-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                다시 분석하기
              </Button>
            </div>

            <div className="space-y-4">
              {recommendedProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300 scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100 mb-2">
                              {product.match}% 매치
                            </Badge>
                            <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                            <p className="text-gray-600 text-sm">{product.brand} • {product.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-pink-600 mb-1">{product.price}</div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              {product.rating} ({product.reviews.toLocaleString()})
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{product.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {product.keyIngredients.map((ingredient, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {product.skinConcerns.map((concern, idx) => (
                              <Badge key={idx} className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                {concern}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="hover:bg-pink-50">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="k-gradient text-white hover:scale-105 transition-transform">
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              장바구니
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Card className="glass-effect border-0 shadow-lg k-gradient-subtle">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">더 정확한 분석을 원하시나요?</h3>
              <p className="text-gray-600 mb-4">
                프리미엄 분석으로 더욱 상세한 피부 진단과 개인 맞춤 루틴을 받아보세요
              </p>
              <Button className="k-gradient text-white hover:scale-105 transition-transform">
                프리미엄 분석 받기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendations;
