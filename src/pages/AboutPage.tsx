import { Language } from '../types';
import { motion } from 'motion/react';
import { Award, Heart, ShieldCheck, Soup, Flame, Sparkles } from 'lucide-react';

interface AboutPageProps {
  language: Language;
}

export default function AboutPage({ language }: AboutPageProps) {
  const isVi = language === 'vi';
  const isDe = language === 'de';

  const storyTitle = isVi 
    ? 'Hành Trình Gìn Giữ Hương Vị' 
    : isDe 
    ? 'Unsere Geschichte' 
    : 'Our Culinary Journey';

  const storySubtitle = isVi 
    ? 'Câu chuyện đằng sau cái tên A Béo và ngọn lửa đam mê ẩm thực Việt - Đức tại Hannover.' 
    : isDe 
    ? 'Die Geschichte hinter dem Namen A Béo und die Leidenschaft für asiatische Esskultur.' 
    : 'The story behind A Béo and our passion for authentic Vietnamese-Japanese fusion.';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 bg-[#0a0a0a] px-6 md:px-12 border-b border-white/5 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 pt-6">
          <div className="w-12 h-[1px] bg-[#d4af37]"></div>
          <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-semibold">
            {isVi ? 'TIỂU SỬ QUÁN' : isDe ? 'ÜBER UNS' : 'OUR HERITAGE'}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white leading-tight">
            {isVi ? 'Câu Chuyện Về ' : 'The Story of '}
            <span className="not-italic font-extrabold text-[#d4af37] uppercase tracking-wider font-sans">A BÉO</span>
          </h1>
          <p className="text-white/40 max-w-xl text-xs md:text-sm leading-relaxed">
            {storySubtitle}
          </p>
        </div>

        {/* Story Grid with elegant Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.25em] flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>SINCE 2018 IN HANNOVER</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-light text-white leading-snug">
              {isVi 
                ? 'Hương Vị Ấm Áp Như Gian Bếp Gia Đình Việt' 
                : isDe 
                ? 'Familie, Herzlichkeit und echte asiatische Tradition' 
                : 'Warmth and Authenticity Straight from the Family Kitchen'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm text-white/60 leading-relaxed font-light">
              <p>
                {isVi 
                  ? 'Tên gọi "A Béo" bắt nguồn từ biệt danh thân thương của người sáng lập - một đầu bếp có thân hình mập mạp, nụ cười hiền hậu và đôi bàn tay tài hoa luôn tràn đầy tình yêu ẩm thực. Trải qua nhiều năm sinh sống và làm việc tại Đức, anh luôn khao khát mang hương vị nguyên bản của món ăn đường phố Việt Nam phục vụ kiều bào và thực khách bản địa.'
                  : isDe
                  ? 'Der Name „A Béo“ (liebevoll übersetzt: „Der sympathische, pummelige Onkel“) stammt vom Spitznamen unseres Gründers ab – einem leidenschaftlichen Koch mit einem herzlichen Lächeln und magischen Händen im Wok. Nach vielen Jahren in Hannover wollte er die echten, tiefen Aromen seiner vietnamesischen Heimat mit der anspruchsvollen Kunst des Sushi verbinden.'
                  : 'The name "A Béo" comes from the affectionate nickname of our founder - a robust, jovial chef with a heartwarming smile and masterly hands at the wok. After years of living in Germany, he dreamed of sharing the true soul of Vietnamese streets and cozy family gatherings with the local community.'
                }
              </p>
              <p>
                {isVi
                  ? 'Tại A Béo, chúng tôi không xem ẩm thực là ngành dịch vụ công nghiệp. Mỗi thố Phở bò bốc khói đều được ninh từ xương ống bò chuẩn 18 tiếng kèm hồi, quế, thảo quả nướng vàng thơm nức. Từng cuộn sushi đều được làm từ nguồn cá hồi Na Uy tươi nhập khẩu mỗi sáng.'
                  : isDe
                  ? 'Bei A Béo betrachten wir Gastronomie nicht als Industrie. Jede dampfende Schale traditionelle Phở-Suppe wird 18 Stunden lang geduldig aus Rinderknochen, Zimt, Sternanis und Kardamom gekocht. Jede Sushi-Rolle wird aus frischem, norwegischem Premium-Lachs handgerollt.'
                  : 'At A Béo, we do not view gastronomy as a cold, industrial service. Every stone bowl of steaming Pho is simmered patiently for 18 hours using beef bones and roasted Vietnamese spices. Every single sushi roll is hand-crafted with premium, fresh Norwegian salmon imported daily.'
                }
              </p>
              <p className="text-[#d4af37]/80 italic">
                {isVi
                  ? '"Béo không chỉ là ngoại hình, đó là biểu tượng của sự no đủ, sung túc và tấm lòng hiếu khách xởi lởi luôn muốn thực khách ăn thật no, thật ngon miệng."'
                  : isDe
                  ? '"Béo steht bei uns nicht nur für die Statur, sondern ist ein Symbol für Fülle, Herzlichkeit und den echten Wunsch, dass jeder Gast absolut glücklich und satt nach Hause geht."'
                  : '"Béo is not just an appearance - it is our symbol of abundance, warm-heartedness, and the true joy of feeding our guests with hearty, generous meals."'
                }
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#d4af37] to-emerald-950 rounded-none blur-md opacity-25"></div>
            <div className="relative bg-black border border-white/10 p-4">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" 
                alt="A Beo Kitchen atmosphere" 
                className="w-full h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-8 left-8 bg-black border border-[#d4af37]/40 px-4 py-2.5 shadow-2xl">
                <span className="text-[9px] text-[#d4af37] uppercase tracking-[0.2em] font-bold block">Master Chef Quang</span>
                <span className="text-[8px] text-white/50 block font-mono mt-0.5">Founding Wok Artist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Bento Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-none flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 bg-emerald-950/20 border border-emerald-800/30 flex items-center justify-center text-[#d4af37]">
              <Soup className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {isVi ? 'Ninh Xương 18 Tiếng' : isDe ? '18 Std. Brühe' : '18-Hour Simmer'}
              </h3>
              <p className="text-[11px] text-white/40 leading-relaxed font-light">
                {isVi 
                  ? 'Nói không với bột ngọt công nghiệp. Nước dùng Phở và bún bò của chúng tôi được hầm liên tục từ xương ống tủy bò và thảo mộc tự nhiên.' 
                  : isDe 
                  ? 'Kein MSG oder künstliche Pulver. Unsere Pho-Brühe wird 18 Stunden lang traditionell aus Rinderknochen gekocht.' 
                  : 'No MSG or artificial powders. Our legendary Pho broth is slow-simmered for 18 hours with premium roasted spices.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-none flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 bg-amber-950/20 border border-amber-800/30 flex items-center justify-center text-[#d4af37]">
              <Flame className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {isVi ? 'Đảo Chảo Lửa Lớn' : isDe ? 'Wok Hei Power' : 'The Fiery Wok'}
              </h3>
              <p className="text-[11px] text-white/40 leading-relaxed font-light">
                {isVi 
                  ? 'Kỹ thuật xóc chảo Wok Hei điêu luyện giúp món ăn lưu giữ độ tươi giòn của rau củ và hương khói đặc trưng đường phố.' 
                  : isDe 
                  ? 'Unsere Wok-Gerichte werden bei extrem hoher Hitze zubereitet, um die frischen Aromen und den typischen Wok-Hei-Hauch zu bewahren.' 
                  : 'Our high-heat wok searing captures the legendary "Wok Hei" essence, keeping vegetables crispy and beef wonderfully tender.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-none flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
              <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {isVi ? 'Sushi Chuẩn Na Uy' : isDe ? 'Frischer Lachs' : 'Norwegian Freshness'}
              </h3>
              <p className="text-[11px] text-white/40 leading-relaxed font-light">
                {isVi 
                  ? 'Cá hồi được cung ứng từ trang trại Na Uy lạnh giá đại dương, phi lê thủ công nguyên con bởi thợ sushi tay nghề cao.' 
                  : isDe 
                  ? 'Unser Lachs kommt direkt aus den kalten norwegischen Fjorden und wird täglich von Hand für Ihr Sushi zubereitet.' 
                  : 'Our salmon is sourced directly from deep cold Norwegian waters and hand-filleted in-house daily by sushi veterans.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
