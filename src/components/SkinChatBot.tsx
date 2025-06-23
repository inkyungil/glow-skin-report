import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Sparkles, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SkinChatBotProps {
  analysisData: any;
  onBack: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  productCard?: any;
}

const SkinChatBot = ({ analysisData, onBack }: SkinChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const skinScores = analysisData?.scores || {};
  const concerns = analysisData?.concerns || [];

  const suggestedQuestions = [
    "모공 관리는 어떻게 하나요?",
    "건조한 피부에 좋은 성분은?",
    "추천 제품 사용 순서를 알려주세요",
    "민감성 피부도 사용할 수 있나요?",
    "아침과 저녁 루틴의 차이점은?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 초기 AI 인사말
    const welcomeMessage: Message = {
      id: '1',
      type: 'bot',
      content: `안녕하세요! 저는 당신의 피부 전담 상담사 AI입니다 ✨\n\n분석 결과를 보니 ${concerns.length > 0 ? `${getConcernLabel(concerns[0])} 케어가 필요하시네요.` : '전반적으로 건강한 피부 상태입니다.'}\n\n궁금한 점이 있으시면 언제든 말씀해 주세요! 맞춤형 스킨케어 루틴부터 제품 사용법까지 자세히 알려드릴게요 💖`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [concerns]);

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

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('모공')) {
      return `모공 관리에 대해 알려드릴게요! 🕳️\n\n**1단계: 클렌징**\n- BHA(살리실산) 성분이 포함된 클렌저 사용\n- 미지근한 물로 부드럽게 세안\n\n**2단계: 토너**\n- 나이아신아마이드 성분으로 모공 수축\n- 알코올 없는 순한 토너 선택\n\n**3단계: 세럼**\n- 레티놀 또는 AHA/BHA 세럼으로 각질 제거\n- 주 2-3회 사용으로 시작\n\n추천 루틴을 따라하시면 2-4주 후 모공이 눈에 띄게 개선될 거예요! ✨`;
    }
    
    if (lowerMessage.includes('건조') || lowerMessage.includes('수분')) {
      return `건조한 피부를 위한 맞춤 케어법을 알려드릴게요! 💧\n\n**보습 성분 우선순위:**\n1. 히알루론산 - 수분 공급의 핵심\n2. 세라마이드 - 수분 장벽 강화\n3. 글리세린 - 즉각적인 보습감\n4. 스쿠알란 - 유수분 밸런스\n\n**데일리 루틴:**\n- 아침: 보습 토너 → 히알루론산 세럼 → 보습 크림\n- 저녁: 클렌징 → 토너 → 세럼 → 슬리핑 마스크\n\n특히 세안 후 3분 이내에 보습제를 발라주시는 것이 중요해요! 🌟`;
    }
    
    if (lowerMessage.includes('순서') || lowerMessage.includes('루틴')) {
      return `올바른 스킨케어 순서를 알려드릴게요! 📋\n\n**아침 루틴:**\n1. 폼클렌저 (필요시)\n2. 토너\n3. 비타민C 세럼\n4. 보습제\n5. 자외선차단제 (필수!)\n\n**저녁 루틴:**\n1. 클렌징 오일/밤\n2. 폼클렌저 (더블클렌징)\n3. 토너\n4. 트리트먼트 (레티놀/AHA 등)\n5. 세럼\n6. 모이스처라이저\n7. 페이스 오일 (선택)\n\n제품은 묽은 것부터 진한 것 순서로! 각 단계별로 1-2분 기다린 후 다음 제품을 발라주세요 ⏰`;
    }
    
    if (lowerMessage.includes('민감') || lowerMessage.includes('예민')) {
      return `민감성 피부를 위한 안전한 케어법을 알려드릴게요! 🌸\n\n**피해야 할 성분:**\n- 알코올, 인공향료\n- 강한 각질제거제 (고농도 AHA/BHA)\n- SLS 계열 계면활성제\n\n**추천 성분:**\n- 센텔라 아시아티카 (진정)\n- 판테놀 (보습)\n- 알로에 베라 (진정)\n- 나이아신아마이드 (저농도)\n\n**패치테스트는 필수!**\n새 제품은 귀 뒤나 팔 안쪽에 48시간 테스트 후 사용하세요.\n\n분석 결과로 보면 순한 제품들로 구성해드렸으니 안심하고 사용하셔도 될 것 같아요! 💖`;
    }
    
    return `좋은 질문이네요! 😊\n\n피부 고민에 대해 더 구체적으로 말씀해 주시면, 당신의 피부 상태에 맞춘 더 정확한 조언을 드릴 수 있어요.\n\n예를 들어:\n- 어떤 부위가 가장 신경 쓰이시나요?\n- 현재 사용 중인 제품이 있나요?\n- 특별히 피하고 싶은 성분이 있으신가요?\n\n아래 추천 질문들도 참고해 보세요! ✨`;
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(message),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const getSkinTypeBackground = () => {
    if (concerns.includes('dryness')) return 'bg-gradient-to-br from-blue-50 via-white to-cyan-50';
    if (concerns.includes('pores')) return 'bg-gradient-to-br from-green-50 via-white to-emerald-50';
    if (concerns.includes('dark_spots')) return 'bg-gradient-to-br from-yellow-50 via-white to-orange-50';
    return 'bg-gradient-to-br from-pink-50 via-white to-purple-50';
  };

  return (
    <div className={`min-h-screen ${getSkinTypeBackground()}`}>
      {/* Fixed Header with Analysis Summary */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-pink-100 p-3 md:p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="hover:bg-pink-50 text-sm md:text-base p-2 md:p-3"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">분석 결과로 돌아가기</span>
              <span className="sm:hidden">돌아가기</span>
            </Button>
            <div className="flex items-center">
              <div className="w-6 h-6 md:w-8 md:h-8 k-gradient rounded-full flex items-center justify-center mr-2 pulse-soft">
                <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-700 text-sm md:text-base">AI 피부 상담사</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {Object.entries(skinScores).map(([key, score]) => (
              <div key={key} className="text-center">
                <div className="text-xs text-gray-500 mb-1">
                  {key === 'moisture' ? '수분도' : 
                   key === 'elasticity' ? '탄력도' : 
                   key === 'pores' ? '모공' : 
                   key === 'pigmentation' ? '색소침착' : key}
                </div>
                <div className={`text-xs md:text-sm font-semibold ${getScoreColor(score as number)}`}>
                  {score as number}/100
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto p-3 md:p-4 pb-40 md:pb-32">
        <div className="space-y-3 md:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} fade-in-up`}
            >
              <div className={`max-w-[85%] sm:max-w-xs md:max-w-md lg:max-w-lg ${
                message.type === 'user' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white shadow-lg border border-pink-100'
              } rounded-2xl p-3 md:p-4 relative`}>
                {message.type === 'bot' && (
                  <div className="flex items-center mb-2">
                    <div className="w-5 h-5 md:w-6 md:h-6 k-gradient rounded-full flex items-center justify-center mr-2">
                      <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-white" />
                    </div>
                    <span className="text-xs font-medium text-pink-600">AI 피부 상담사</span>
                  </div>
                )}
                <div className={`whitespace-pre-line text-sm md:text-base ${
                  message.type === 'user' ? 'text-white' : 'text-gray-700'
                }`}>
                  {message.content}
                </div>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-pink-100' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString('ko-KR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start fade-in-up">
              <div className="bg-white shadow-lg border border-pink-100 rounded-2xl p-3 md:p-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 md:w-6 md:h-6 k-gradient rounded-full flex items-center justify-center mr-2">
                    <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Bottom Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-pink-100 p-3 md:p-4">
        <div className="max-w-4xl mx-auto">
          {/* Suggested Questions */}
          <div className="mb-3 md:mb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs hover:bg-pink-50 border-pink-200 text-pink-700 px-2 md:px-3 py-1 md:py-2"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                placeholder="피부 고민이나 궁금한 점을 자유롭게 말씀해 주세요..."
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent text-sm md:text-base"
              />
            </div>
            <Button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="k-gradient text-white rounded-full px-4 md:px-6 hover:scale-105 transition-transform disabled:opacity-50"
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinChatBot;
