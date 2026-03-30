import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion'; // فقط للحركة البسيطة للشعار

const About = () => {
  return (
    <main className="pt-32 container mx-auto px-4 overflow-hidden">
      {/* القسم الأول: العنوان الرئيسي */}
      <div data-aos="fade-up" data-aos-duration="800"  className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-[--primary-color] drop-shadow-[0_0_15px_var(--primary-color)] mb-4">
          <TypeAnimation
            sequence={['من نحن؟', 1500, 'قصة كفاح وتحدي', 1500]}
            wrapper="span"
            repeat={Infinity}
            cursor={true}
            speed={40}
          />
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          قصة بدأت من حلم صغير لتصبح اليوم واحدة من أسرع المتاجر نمواً في المنطقة.
        </p>
      </div>

      {/* القسم الثاني: بطاقة القصة مع الشعار */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
        <div data-aos="fade-right" data-aos-duration="800" className="glass p-6 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4 text-[--primary-color] drop-shadow-[0_0_10px_var(--primary-color)]">
            🚀 بداية الحلم
          </h2>
          <p className="text-gray-300 leading-relaxed">
            <span className="text-[--primary-color] font-bold">GameStore</span> لم تولد عملاقة. بدأت كحلم صغير في غرفة ضيقة， 
            مع فريق من ثلاثة أشخاص يؤمنون بأن الألعاب ليست مجرد ترفيه، بل هي بوابة لعوالم أخرى. 
            كنا نعمل ليل نهار، نبحث عن أفضل العناوين، نتفاوض مع الموزعين، ونهتم بأدق التفاصيل.
          </p>
        </div>
        <div data-aos="fade-left" data-aos-duration="800" className="flex justify-center">
          <motion.img 
            src="/converted/game.png" 
            alt="GameStore Logo" 
            className="w-32 h-32 md:w-40 md:h-40 drop-shadow-[0_0_30px_var(--primary-color)]"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      {/* القسم الثالث: رحلة الكفاح (مختصر) */}
      <div data-aos="fade-up" data-aos-duration="800" className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-[--primary-color] drop-shadow-[0_0_10px_var(--primary-color)]">
          رحلة الكفاح
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-2xl border-r-4 border-[--primary-color]">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="text-3xl">⚔️</span> التحديات
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• محدودية الموارد</li>
              <li>• منافسة شديدة</li>
              <li>• بناء الثقة</li>
            </ul>
          </div>
          <div className="glass p-6 rounded-2xl border-l-4 border-[--primary-color]">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="text-3xl">🏆</span> الإنجازات
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• آلاف العملاء شهرياً</li>
              <li>• توصيل خلال 24 ساعة</li>
              <li>• شراكات عالمية</li>
            </ul>
          </div>
        </div>
      </div>

      {/* القسم الرابع: لماذا نحن (أقل بطاقات) */}
      <div data-aos="fade-up" data-aos-duration="800" className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-[--primary-color] drop-shadow-[0_0_10px_var(--primary-color)]">
          🔥 لماذا نحن؟
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '⚡', title: 'سرعة التوصيل', desc: 'خلال 24 ساعة' },
            { icon: '🎮', title: 'تشكيلة واسعة', desc: 'أحدث الألعاب' },
            { icon: '💰', title: 'أسعار تنافسية', desc: 'خصومات حصرية' },
            { icon: '💬', title: 'دعم فني', desc: '24/7' },
            { icon: '🔒', title: 'ضمان استعادة الأموال', desc: 'إذا لم تكن راضياً' }
          ].map((item, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
              className="glass p-5 rounded-2xl text-center hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_var(--primary-color)]"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* القسم الخامس: رسالة ختامية */}
      <div data-aos="fade-up" data-aos-duration="800" className="text-center glass p-8 rounded-3xl mb-10">
        <TypeAnimation
          sequence={[
            'نحن لا نبيع الألعاب فقط، بل نصنع تجربة.',
            2000,
            'GameStore – لأنك تستحق الأفضل.',
            3000
          ]}
          wrapper="p"
          cursor={true}
          repeat={Infinity}
          speed={50}
          className="text-2xl md:text-3xl font-bold text-[--primary-color] drop-shadow-[0_0_15px_var(--primary-color)]"
        />
      </div>
    </main>
  );
};

export default About;