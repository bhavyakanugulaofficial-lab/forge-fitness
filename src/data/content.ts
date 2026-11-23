import type { Lang } from '../i18n/translations'
import type { IconName } from '../components/Icons'

/* ------------------------------------------------------------------ */
/* Translation helpers                                                 */
/* ------------------------------------------------------------------ */

export interface LText {
  en: string
  te: string
  hi: string
  ta: string
}

export const tr = (en: string, te: string, hi: string, ta: string): LText => ({ en, te, hi, ta })
export const pick = (v: LText, lang: Lang): string => v[lang]

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export type CategoryId = 'strength' | 'cardio' | 'flexibility' | 'dance' | 'hiit' | 'wellness' | 'personal' | 'functional'

export const CATEGORIES: Record<CategoryId, LText> = {
  strength: tr('Strength', 'బలం', 'ताकत', 'வலிமை'),
  cardio: tr('Cardio', 'కార్డియో', 'कार्डियो', 'கார்டியோ'),
  flexibility: tr('Flexibility', 'ఫ్లెక్సిబిలిటీ', 'लचीलापन', 'நெகிழ்வு'),
  dance: tr('Dance', 'డ్యాన్స్', 'डांस', 'நடனம்'),
  hiit: tr('HIIT', 'HIIT', 'HIIT', 'HIIT'),
  wellness: tr('Wellness', 'వెల్‌నెస్', 'वेलनेस', 'நலம்'),
  personal: tr('Personal', 'వ్యక్తిగత', 'व्यक्तिगत', 'தனிப்பட்ட'),
  functional: tr('Functional', 'ఫంక్షనల్', 'फ़ंक्शनल', 'செயல்பாட்டு'),
}

/* ------------------------------------------------------------------ */
/* Programs                                                            */
/* ------------------------------------------------------------------ */

export type Level = 'beginner' | 'intermediate' | 'advanced' | 'all'

export interface Program {
  id: string
  icon: IconName
  image: string
  level: Level
  duration: number
  perWeek: number
  category: CategoryId
  name: LText
  description: LText
  benefits: LText[]
  suitable: LText
}

export const PROGRAMS: Program[] = [
  {
    id: 'weight-training',
    icon: 'dumbbell',
    image: '/images/p-weight.jpg',
    level: 'all',
    duration: 60,
    perWeek: 4,
    category: 'strength',
    name: tr('Weight Training', 'బరువు శిక్షణ', 'वेट ट्रेनिंग', 'எடை பயிற்சி'),
    description: tr(
      'Structured barbell and dumbbell work built around the fundamentals — squat, hinge, push and pull — scaled to your level.',
      'స్క్వాట్, హింజ్, పుష్, పుల్ అనే పునాది కదలికలపై రూపొందించిన బార్‌బెల్ మరియు డంబెల్ శిక్షణ — మీ లెవెల్‌కు అనుగుణంగా.',
      'स्क्वैट, हिंज, पुश और पुल — इन बुनियादी मूवमेंट पर बनी बारबेल और डंबल ट्रेनिंग, आपके स्तर के अनुसार।',
      'ஸ்குவாட், ஹிஞ்ச், புஷ், புல் ஆகிய அடிப்படை அசைவுகளில் அமைந்த பார்பெல் மற்றும் டம்பெல் பயிற்சி.',
    ),
    benefits: [
      tr('Full-body strength that carries into daily life', 'దైనందిన జీవితంలో ఉపయోగపడే మొత్తం శరీర బలం', 'रोज़मर्रा की ज़िंदगी में काम आने वाली पूरी ताकत', 'அன்றாட வாழ்வில் பயன்படும் முழு உடல் வலிமை'),
      tr('Better posture and joint stability', 'మెరుగైన భంగిమ మరియు కీలు స్థిరత్వం', 'बेहतर मुद्रा और जोड़ों की स्थिरता', 'மேம்படுத்தப்பட்ட உடல் நிலை மற்றும் மூட்டு ஸ்திரத்தன்மை'),
      tr('A clear progression plan every four weeks', 'ప్రతి నాలుగు వారాలకు స్పష్టమైన పురోగతి ప్రణాళిక', 'हर चार हफ़्ते में स्पष्ट प्रोग्रेशन प्लान', 'ஒவ்வொரு நான்கு வாரங்களுக்கும் தெளிவான முன்னேற்றத் திட்டம்'),
    ],
    suitable: tr('Beginners to advanced lifters', 'ప్రారంభ నుంచి ఉన్నత స్థాయి లిఫ్టర్లు', 'शुरुआती से लेकर उन्नत लिफ्टर तक', 'ஆரம்பநிலை முதல் மேல்நிலை பயிற்சியாளர்கள் வரை'),
  },
  {
    id: 'cardio',
    icon: 'heart',
    image: '/images/p-cardio.jpg',
    level: 'beginner',
    duration: 45,
    perWeek: 3,
    category: 'cardio',
    name: tr('Cardio Training', 'కార్డియో శిక్షణ', 'कार्डियो ट्रेनिंग', 'கார்டியோ பயிற்சி'),
    description: tr(
      'Treadmill, rower, bike and ski-erg intervals designed to build a strong heart and lungs without burning you out.',
      'గుండె మరియు ఊపిరితిత్తులను బలోపేతం చేసే ట్రెడ్‌మిల్, రోవర్, బైక్ మరియు స్కీ-ఎర్గ్ ఇంటర్వెల్ శిక్షణ.',
      'दिल और फेफड़ों को मज़बूत बनाने वाली ट्रेडमिल, रोवर, बाइक और स्की-एर्ग इंटरवल ट्रेनिंग।',
      'இதயம் மற்றும் நுரையீரலை வலுப்படுத்தும் டிரெட்மில், ரோவர், பைக் மற்றும் ஸ்கை-எர்க் இடைவெளி பயிற்சி.',
    ),
    benefits: [
      tr('Stronger heart and lungs', 'బలమైన గుండె మరియు ఊపిరితిత్తులు', 'मज़बूत दिल और फेफड़े', 'வலுவான இதயம் மற்றும் நுரையீரல்'),
      tr('Faster recovery between sets', 'సెట్ల మధ్య వేగవంతమైన రికవరీ', 'सेट के बीच तेज़ रिकवरी', 'செட்களுக்கு இடையே விரைவான மீட்பு'),
      tr('More energy through the day', 'రోజంతా ఎక్కువ శక్తి', 'पूरे दिन ज़्यादा ऊर्जा', 'நாள் முழுவதும் அதிக ஆற்றல்'),
    ],
    suitable: tr('All levels, especially new members', 'అన్ని స్థాయిలు, ముఖ్యంగా కొత్త సభ్యులు', 'सभी स्तर, ख़ासकर नए सदस्य', 'அனைத்து நிலைகள், குறிப்பாக புதிய உறுப்பினர்கள்'),
  },
  {
    id: 'strength',
    icon: 'shield',
    image: '/images/p-strength.jpg',
    level: 'intermediate',
    duration: 60,
    perWeek: 3,
    category: 'strength',
    name: tr('Strength Training', 'బల శిక్షణ', 'स्ट्रेंथ ट्रेनिंग', 'வலிமை பயிற்சி'),
    description: tr(
      'Lower-rep, higher-load training built around the big three lifts, with careful technique coaching on every set.',
      'పెద్ద మూడు లిఫ్ట్లపై రూపొందించిన తక్కువ రెప్స్, ఎక్కువ బరువు శిక్షణ — ప్రతి సెట్‌పై టెక్నిక్ కోచింగ్‌తో.',
      'बिग थ्री लिफ्ट पर आधारित कम रेप, ज़्यादा वज़न की ट्रेनिंग — हर सेट में तकनीकी कोचिंग के साथ।',
      'பெரிய மூன்று லிப்ட்களை மையமாகக் கொண்ட குறைந்த ரெப், அதிக எடை பயிற்சி — ஒவ்வொரு செட்டிலும் தொழில்நுட்ப பயிற்சி.',
    ),
    benefits: [
      tr('Measurable strength gains', 'కొలవగలిగే బల పెరుగుదల', 'मापने योग्य ताकत में वृद्धि', 'அளக்கக்கூடிய வலிமை அதிகரிப்பு'),
      tr('Increased bone density', 'పెరిగిన ఎముక సాంద్రత', 'बढ़ी हुई हड्डी घनत्व', 'அதிகரித்த எலும்பு அடர்த்தி'),
      tr('Power that transfers to sport', 'క్రీడలకు ఉపయోగపడే శక్తి', 'खेल में काम आने वाली ताकत', 'விளையாட்டில் பயன்படும் சக்தி'),
    ],
    suitable: tr('Lifters with 6+ months of experience', '6 నెలల కంటే ఎక్కువ అనుభవం ఉన్నవారు', '6 महीने से ज़्यादा अनुभव वाले', '6 மாதத்திற்கும் மேல் அனுபவமுள்ளவர்கள்'),
  },
  {
    id: 'yoga',
    icon: 'lotus',
    image: '/images/p-yoga.jpg',
    level: 'all',
    duration: 60,
    perWeek: 3,
    category: 'flexibility',
    name: tr('Yoga & Meditation', 'యోగా & ధ్యానం', 'योग और ध्यान', 'யோகா & தியானம்'),
    description: tr(
      'Breath-led vinyasa and slower yin sessions that build mobility, balance and a calmer nervous system.',
      'శ్వాసతో నడిచే విన్యాస మరియు నెమ్మదిగా సాగే యిన్ సెషన్లు — మొబిలిటీ, సమతూకం మరియు ప్రశాంత నాడీ వ్యవస్థ కోసం.',
      'साँस से चलने वाली विन्यास और धीमी यिन सेशन — जो लचीलापन, संतुलन और शांत नसों को बढ़ाएँ।',
      'மூச்சு தலைமையிலான வின்யாச மற்றும் மெதுவான யின் அமர்வுகள் — நெகிழ்வு, சமநிலை மற்றும் அமைதியான நரம்பு மண்டலத்திற்கு.',
    ),
    benefits: [
      tr('Flexibility and joint mobility', 'ఫ్లెక్సిబిలిటీ మరియు కీలు చలనశీలత', 'लचीलापन और जोड़ों की गतिशीलता', 'நெகிழ்வு மற்றும் மூட்டு இயக்கம்'),
      tr('Lower stress and better sleep', 'తక్కువ ఒత్తిడి మరియు మెరుగైన నిద్ర', 'कम तनाव और बेहतर नींद', 'குறைந்த மன அழுத்தம் மற்றும் சிறந்த தூக்கம்'),
      tr('Sharper body awareness', 'పెంచిన శరీర అవగాహన', 'बेहतर शरीर जागरूकता', 'கூர்மையான உடல் விழிப்புணர்வு'),
    ],
    suitable: tr('Every body — no flexibility required', 'ప్రతి శరీరం — ఫ్లెక్సిబిలిటీ అవసరం లేదు', 'हर शरीर के लिए — लचीलापन ज़रूरी नहीं', 'ஒவ்வொரு உடலுக்கும் — நெகிழ்வு தேவையில்லை'),
  },
  {
    id: 'zumba',
    icon: 'music',
    image: '/images/p-zumba.jpg',
    level: 'beginner',
    duration: 50,
    perWeek: 3,
    category: 'dance',
    name: tr('Zumba & Dance Fitness', 'జుంబా & డ్యాన్స్ ఫిట్‌నెస్', 'ज़ुम्बा और डांस फिटनेस', 'ஜும்பா & நடன உடற்பயிற்சி'),
    description: tr(
      'High-energy choreography set to music — the workout that never feels like a workout.',
      'సంగీతానికి అనుగుణంగా రూపొందించిన అధిక శక్తి కొరియోగ్రఫీ — వర్క్‌అవుట్ అనిపించని వర్క్‌అవుట్.',
      'संगीत पर आधारित जोशीली कोरियोग्राफ़ी — वर्कआउट जो कभी वर्कआउट जैसा न लगे।',
      'இசைக்கு ஏற்ப அமைந்த உயர் ஆற்றல் நடனம் — உடற்பயிற்சி போல தெரியாத உடற்பயிற்சி.',
    ),
    benefits: [
      tr('Cardio without the boredom', 'విసిగించని కార్డియో', 'बोरियत के बिना कार्डियो', 'சலிப்பில்லாத கார்டியோ'),
      tr('Better coordination and rhythm', 'మెరుగైన సమన్వయం మరియు లయ', 'बेहतर तालमेल और लय', 'மேம்படுத்தப்பட்ட ஒருங்கிணைப்பு மற்றும் தாளம்'),
      tr('A serious mood boost', 'తగినంత మూడ్ బూస్ట్', 'जोशीला मूड बूस्ट', 'குறிப்பிடத்தக்க மனநிலை மேம்பாடு'),
    ],
    suitable: tr('All levels — no dance experience needed', 'అన్ని స్థాయిలు — డ్యాన్స్ అనుభవం అవసరం లేదు', 'सभी स्तर — डांस का अनुभव ज़रूरी नहीं', 'அனைத்து நிலைகள் — நடன அனுபவம் தேவையில்லை'),
  },
  {
    id: 'hiit',
    icon: 'bolt',
    image: '/images/p-hiit.jpg',
    level: 'advanced',
    duration: 45,
    perWeek: 3,
    category: 'hiit',
    name: tr('HIIT Workouts', 'HIIT వర్క్‌అవుట్స్', 'HIIT वर्कआउट', 'HIIT பயிற்சிகள்'),
    description: tr(
      'Short, sharp intervals of work and rest that torch calories and keep your metabolism elevated for hours.',
      'కేలరీలను కరిగించి గంటల తరబడి జీవక్రియను పెంచే చిన్న, తీవ్రమైన వర్క్-రెస్ట్ ఇంటర్వెల్స్.',
      'कैलोरी जलाने और घंटों तक मेटाबॉलिज़्म ऊँचा रखने वाले छोटे, तेज़ वर्क-रेस्ट इंटरवल।',
      'கலோரிகளை எரித்து, மணிநேரங்களுக்கு வளர்சியை உயர்த்தி வைக்கும் குறுகிய, கூர்மையான வேலை-ஓய்வு இடைவெளிகள்.',
    ),
    benefits: [
      tr('Maximum results in minimum time', 'తక్కువ సమయంలో గరిష్ఠ ఫలితాలు', 'कम समय में बेहतरीन नतीजे', 'குறைந்த நேரத்தில் அதிகபட்ச முடிவுகள்'),
      tr('Improved anaerobic capacity', 'మెరుగైన అనారోబిక్ సామర్థ్యం', 'बेहतर एनारोबिक क्षमता', 'மேம்படுத்தப்பட்ட அனரோபிக் திறன்'),
      tr('Serious calorie burn', 'తగినంత కేలరీ బర్న్', 'भारी कैलोरी बर्न', 'கணிசமான கலோரி எரிப்பு'),
    ],
    suitable: tr('Members comfortable with hard intervals', 'తీవ్ర ఇంటర్వెల్స్‌కు అలవాటు ఉన్న సభ్యులు', 'कड़ी इंटरवल की आदत वाले सदस्य', 'கடினமான இடைவெளிகளுக்குப் பழகிய உறுப்பினர்கள்'),
  },
  {
    id: 'weight-management',
    icon: 'scale',
    image: '/images/p-management.jpg',
    level: 'beginner',
    duration: 40,
    perWeek: 4,
    category: 'wellness',
    name: tr('Weight Management', 'బరువు నిర్వహణ', 'वज़न प्रबंधन', 'எடை மேலாண்மை'),
    description: tr(
      'A sustainable mix of strength, cardio and habit coaching — no crash diets and no punishment workouts.',
      'బలం, కార్డియో మరియు అలవాట్ల కోచింగ్‌తో కూడిన స్థిరమైన మిశ్రమం — క్రాష్ డైట్లు లేవు, శిక్షణ వర్క్‌అవుట్లు లేవు.',
      'स्ट्रेंथ, कार्डियो और आदत कोचिंग का टिकाऊ मेल — न क्रैश डाइट, न सज़ा वाली ट्रेनिंग।',
      'வலிமை, கார்டியோ மற்றும் பழக்க பயிற்சியின் நிலையான கலவை — கிராஷ் டயட் இல்லை, தண்டனை பயிற்சி இல்லை.',
    ),
    benefits: [
      tr('Sustainable fat loss', 'స్థిరమైన కొవ్వు నష్టం', 'टिकाऊ वसा कमी', 'நிலையான கொழுப்பு குறைப்பு'),
      tr('A healthier relationship with food', 'ఆహారంతో ఆరోగ్యకరమైన సంబంధం', 'खाने से स्वस्थ रिश्ता', 'உணவுடன் ஆரோக்கியமான உறவு'),
      tr('Habits that actually stick', 'నిజంగా నిలిచే అలవాట్లు', 'आदतें जो सच में टिकें', 'உண்மையிலேயே நிலைக்கும் பழக்கங்கள்'),
    ],
    suitable: tr('Anyone starting a long-term routine', 'దీర్ఘకాలిక దినచర్య ప్రారంభించే అందరికీ', 'लंबी अवधि की रूटीन शुरू करने वाले सभी', 'நீண்ட கால வழக்கத்தைத் தொடங்கும் அனைவருக்கும்'),
  },
  {
    id: 'personal-training',
    icon: 'user',
    image: '/images/p-personal.jpg',
    level: 'all',
    duration: 60,
    perWeek: 2,
    category: 'personal',
    name: tr('Personal Training', 'వ్యక్తిగత శిక్షణ', 'पर्सनल ट्रेनिंग', 'தனிப்பட்ட பயிற்சி'),
    description: tr(
      'One-to-one coaching with a programme built entirely around your body, your goal and your calendar.',
      'మీ శరీరం, మీ లక్ష్యం మరియు మీ షెడ్యూల్‌కు పూర్తిగా అనుగుణంగా రూపొందించిన వన్-టు-వన్ కోచింగ్.',
      'आपके शरीर, लक्ष्य और कैलेंडर के हिसाब से बना पूरी तरह निजी कोचिंग प्रोग्राम।',
      'உங்கள் உடல், இலக்கு மற்றும் அட்டவணைக்கு ஏற்ப உருவாக்கப்பட்ட தனிப்பட்ட பயிற்சி.',
    ),
    benefits: [
      tr('A plan built only for you', 'మీ కోసం మాత్రమే రూపొందించిన ప్రణాళిక', 'सिर्फ़ आपके लिए बना प्लान', 'உங்களுக்காக மட்டும் உருவாக்கப்பட்ட திட்டம்'),
      tr('Faster, safer progress', 'వేగవంతమైన, సురక్షితమైన పురోగతి', 'तेज़ और सुरक्षित तरक्की', 'விரைவான, பாதுகாப்பான முன்னேற்றம்'),
      tr('Full accountability', 'పూర్తి జవాబుదారీతనం', 'पूरी जवाबदेही', 'முழு பொறுப்பு'),
    ],
    suitable: tr('Anyone with a specific goal or deadline', 'ప్రత్యేక లక్ష్యం లేదా గడువు ఉన్న అందరికీ', 'कोई ख़ास लक्ष्य या डेडलाइन वाले सभी', 'குறிப்பிட்ட இலக்கு அல்லது காலக்கெடு உள்ள அனைவருக்கும்'),
  },
  {
    id: 'muscle-building',
    icon: 'biceps',
    image: '/images/p-muscle.jpg',
    level: 'intermediate',
    duration: 75,
    perWeek: 4,
    category: 'strength',
    name: tr('Muscle Building', 'కండరాల నిర్మాణం', 'मसल बिल्डिंग', 'தசை வளர்ப்பு'),
    description: tr(
      'Hypertrophy-focused splits with progressive overload, tempo work and honest tracking.',
      'ప్రోగ్రెసివ్ ఓవర్‌లోడ్, టెంపో వర్క్ మరియు నిజాయితీగల ట్రాకింగ్‌తో కూడిన హైపర్‌ట్రఫీ స్ప్లిట్స్.',
      'प्रोग्रेसिव ओवरलोड, टेम्पो वर्क और ईमानदार ट्रैकिंग के साथ हाइपरट्रॉफ़ी पर आधारित स्प्लिट।',
      'படிப்படியான அதிகரிப்பு, டெம்போ பயிற்சி மற்றும் நேர்மையான கண்காணிப்புடன் கூடிய ஹைப்பர்ட்ராபி பிளிட்கள்.',
    ),
    benefits: [
      tr('Visible muscle growth', 'కనిపించే కండరాల పెరుగుదల', 'दिखने वाली मसल ग्रोथ', 'தெரியும் தசை வளர்ச்சி'),
      tr('Better body composition', 'మెరుగైన శరీర కూర్పు', 'बेहतर बॉडी कंपोज़िशन', 'மேம்படுத்தப்பட்ட உடல் அமைப்பு'),
      tr('Structured progressive overload', 'క్రమబద్ధమైన ప్రోగ్రెసివ్ ఓవర్‌లోడ్', 'व्यवस्थित प्रोग्रेसिव ओवरलोड', 'ஒழுங்கமைக்கப்பட்ட படிப்படியான அதிகரிப்பு'),
    ],
    suitable: tr('Members with 1+ year of lifting', 'ఒక సంవత్సరం కంటే ఎక్కువ లిఫ్టింగ్ చేసిన సభ్యులు', '1 साल से ज़्यादा लिफ्टिंग करने वाले', 'ஒரு வருடத்திற்கும் மேல் பயிற்சி செய்த உறுப்பினர்கள்'),
  },
  {
    id: 'functional-fitness',
    icon: 'target',
    image: '/images/p-functional.jpg',
    level: 'intermediate',
    duration: 55,
    perWeek: 3,
    category: 'functional',
    name: tr('Functional Fitness', 'ఫంక్షనల్ ఫిట్‌నెస్', 'फ़ंक्शनल फिटनेस', 'செயல்பாட்டு உடற்தகுதி'),
    description: tr(
      'Carries, sleds, kettlebells and bodyweight patterns that make real-world movement feel easier.',
      'రోజువారీ కదలికలను సులభతరం చేసే క్యారీలు, స్లెడ్‌లు, కెటిల్‌బెల్స్ మరియు బాడీవెయిట్ నమూనాలు.',
      'कैरी, स्लेज, केटलबेल और बॉडीवेट पैटर्न — जो रोज़मर्रा की हरकत को आसान बनाएँ।',
      'எடுத்துச் செல்லல், ஸ்லெட், கெட்டில்பெல் மற்றும் உடல் எடை அசைவுகள் — அன்றாட இயக்கத்தை எளிதாக்கும்.',
    ),
    benefits: [
      tr('Everyday strength and mobility', 'దైనందిన బలం మరియు చలనశీలత', 'रोज़मर्रा की ताकत और लचीलापन', 'அன்றாட வலிமை மற்றும் இயக்கம்'),
      tr('Better balance and coordination', 'మెరుగైన సమతూకం మరియు సమన్వయం', 'बेहतर संतुलन और तालमेल', 'மேம்படுத்தப்பட்ட சமநிலை மற்றும் ஒருங்கிணைப்பு'),
      tr('Injury-resistant movement', 'గాయాలకు నియంత్రణ ఉండే కదలికలు', 'चोट से बचाने वाली हरकतें', 'காயத்தைத் தடுக்கும் இயக்கங்கள்'),
    ],
    suitable: tr('Members returning after a break', 'విరామం తర్వాత తిరిగి వచ్చే సభ్యులు', 'ब्रेक के बाद लौटने वाले सदस्य', 'இடைவெளிக்குப் பிறகு திரும்பும் உறுப்பினர்கள்'),
  },
]

export const programById = (id: string): Program | undefined => PROGRAMS.find((p) => p.id === id)

/* ------------------------------------------------------------------ */
/* Trainers                                                            */
/* ------------------------------------------------------------------ */

export interface Trainer {
  id: string
  name: string
  photo: string
  specialization: LText
  experience: number
  certifications: LText[]
  bio: LText
  hours: LText
  accent: string
}

export const TRAINERS: Trainer[] = [
  {
    id: 'arjun',
    name: 'Arjun Reddy',
    photo: '/images/t-arjun.jpg',
    specialization: tr('Strength & Conditioning', 'బలం & కండిషనింగ్', 'स्ट्रेंथ और कंडीशनिंग', 'வலிமை & உடற்தகுதி'),
    experience: 11,
    certifications: [
      tr('CF-L2 Strength & Conditioning', 'CF-L2 బలం & కండిషనింగ్', 'CF-L2 स्ट्रेंथ कंडीशनिंग', 'CF-L2 வலிமை & உடற்தகுதி'),
      tr('Certified Personal Trainer', 'ధృవీకృత వ్యక్తిగత శిక్షకుడు', 'प्रमाणित पर्सनल ट्रेनर', 'சான்றிதழ் பெற்ற தனிப்பட்ட பயிற்சியாளர்'),
    ],
    bio: tr(
      'Former athlete turned coach. Arjun builds strength programmes that meet you where you are — then quietly raise the bar.',
      'మాజీ అథ్లెట్, ఇప్పుడు కోచ్. మీ స్థాయి నుంచి ప్రారంభించి, నిశ్శబ్దంగా ప్రమాణాలను పెంచే బల శిక్షణా కార్యక్రమాలు రూపొందిస్తారు.',
      'पूर्व एथलीट, अब कोच। अर्जुन ऐसे स्ट्रेंथ प्रोग्राम बनाते हैं जो आपसे वहीं मिलते हैं जहाँ आप हैं — और फिर धीरे-धीरे पटरी ऊँची करते हैं।',
      'முன்னாள் விளையாட்டு வீரர், இப்போது பயிற்சியாளர். உங்கள் நிலையிலிருந்து தொடங்கி, மெதுவாகத் தரத்தை உயர்த்தும் வலிமைத் திட்டங்களை உருவாக்குகிறார்.',
    ),
    hours: tr('Mon – Sat · 6:00 – 11:00 & 17:00 – 21:00', 'సోమ – శని · 6:00 – 11:00 & 17:00 – 21:00', 'सोम – शनि · 6:00 – 11:00 & 17:00 – 21:00', 'திங்கள் – சனி · 6:00 – 11:00 & 17:00 – 21:00'),
    accent: '#FF5C1A',
  },
  {
    id: 'meera',
    name: 'Meera Iyer',
    photo: '/images/t-meera.jpg',
    specialization: tr('Yoga & Mobility', 'యోగా & మొబిలిటీ', 'योग और मोबिलिटी', 'யோகா & மொபிலிட்டி'),
    experience: 8,
    certifications: [
      tr('RYT-500 Yoga Teacher', 'RYT-500 యోగా ఉపాధ్యాయుడు', 'RYT-500 योग टीचर', 'RYT-500 யோகா ஆசிரியர்'),
      tr('Certified Mobility Specialist', 'ధృవీకృత మొబిలిటీ నిపుణుడు', 'प्रमाणित मोबिलिटी विशेषज्ञ', 'சான்றிதழ் பெற்ற மொபிலிட்டி நிபுணர்'),
    ],
    bio: tr(
      'Meera blends breathwork with deep mobility work so you leave every session taller, calmer and noticeably looser.',
      'శ్వాస వ్యాయామాన్ని లోతైన మొబిలిటీ వర్క్‌తో కలిపి, ప్రతి సెషన్ తర్వాత మీరు పొడవుగా, ప్రశాంతంగా మరియు సరసంగా అనిపించేలా చేస్తారు.',
      'मीरा साँस की क्रिया को गहरी मोबिलिटी के साथ जोड़ती हैं, ताकि हर सेशन के बाद आप लंबे, शांत और ज़्यादा लचीले महसूस करें।',
      'மீரா மூச்சுப்பயிற்சியை ஆழமான மொபிலிட்டி பயிற்சியுடன் இணைக்கிறார்; ஒவ்வொரு அமர்விற்குப் பின்னும் நீங்கள் உயரமாக, அமைதியாக, நெகிழ்வாக உணர்வீர்கள்.',
    ),
    hours: tr('Mon – Sat · 7:00 – 12:00 & 17:30 – 20:30', 'సోమ – శని · 7:00 – 12:00 & 17:30 – 20:30', 'सोम – शनि · 7:00 – 12:00 & 17:30 – 20:30', 'திங்கள் – சனி · 7:00 – 12:00 & 17:30 – 20:30'),
    accent: '#FF8A3D',
  },
  {
    id: 'rohan',
    name: 'Rohan Verma',
    photo: '/images/t-rohan.jpg',
    specialization: tr('HIIT & Functional Training', 'HIIT & ఫంక్షనల్ శిక్షణ', 'HIIT और फ़ंक्शनल ट्रेनिंग', 'HIIT & செயல்பாட்டு பயிற்சி'),
    experience: 7,
    certifications: [
      tr('ACE-Certified Personal Trainer', 'ACE ధృవీకృత వ్యక్తిగత శిక్షకుడు', 'ACE-प्रमाणित पर्सनल ट्रेनर', 'ACE-சான்றிதழ் தனிப்பட்ட பயிற்சியாளர்'),
      tr('Kettlebell Level 1', 'కెటిల్‌బెల్ లెవెల్ 1', 'केटलबेल लेवल 1', 'கெட்டில்பெல் நிலை 1'),
    ],
    bio: tr(
      'Rohan runs the floor’s toughest intervals — and somehow makes you want to come back for more.',
      'ఫ్లోర్‌పై అత్యంత కఠినమైన ఇంటర్వెల్స్ రోహన్ నడుపుతారు — మరియు మళ్లీ రావాలనిపించేలా చేస్తారు.',
      'रोहन फ़्लोर के सबसे कठिन इंटरवल चलाते हैं — और किसी तरह आपको फिर लौटने का मन करा देते हैं।',
      'ரோகன் தளத்தின் கடினமான இடைவெளிகளை நடத்துகிறார் — மேலும் உங்களை மீண்டும் வரவைக்கிறார்.',
    ),
    hours: tr('Tue – Sun · 6:30 – 10:30 & 18:00 – 22:00', 'మంగళ – ఆది · 6:30 – 10:30 & 18:00 – 22:00', 'मंगल – रवि · 6:30 – 10:30 & 18:00 – 22:00', 'செவ்வாய் – ஞாயிறு · 6:30 – 10:30 & 18:00 – 22:00'),
    accent: '#FFC46B',
  },
  {
    id: 'kavya',
    name: 'Kavya Nair',
    photo: '/images/t-kavya.jpg',
    specialization: tr('Zumba & Dance Fitness', 'జుంబా & డ్యాన్స్ ఫిట్‌నెస్', 'ज़ुम्बा और डांस फिटनेस', 'ஜும்பா & நடன உடற்பயிற்சி'),
    experience: 6,
    certifications: [
      tr('Licensed Zumba Instructor', 'లైసెన్స్ పొందిన జుంబా బోధకుడు', 'लाइसेंस प्राप्त ज़ुम्बा इंस्ट्रक्टर', 'உரிமம் பெற்ற ஜும்பா பயிற்சியாளர்'),
      tr('Group Fitness Certified', 'గ్రూప్ ఫిట్‌నెస్ ధృవీకరణ', 'ग्रुप फिटनेस प्रमाणित', 'குழு உடற்பயிற்சி சான்றிதழ்'),
    ],
    bio: tr(
      'Kavya turns choreography into cardio. Her classes are loud, joyful and impossible to watch without smiling.',
      'కొరియోగ్రఫీని కార్డియోగా మారుస్తారు కావ్య. ఆమె తరగతులు ఉత్సాహభరితంగా, సంతోషంగా ఉంటాయి.',
      'काव्या कोरियोग्राफ़ी को कार्डियो में बदल देती हैं। उनकी क्लासेज़ जोशीली, ख़ुशनुमा और बिना मुस्कुराए देखना नामुमकिन हैं।',
      'காவ்யா நடனத்தை கார்டியோவாக மாற்றுகிறார். அவரது வகுப்புகள் சத்தமானவை, மகிழ்ச்சியானவை, புன்னகையாமல் பார்க்க முடியாதவை.',
    ),
    hours: tr('Mon – Sat · 8:00 – 12:00 & 17:00 – 20:00', 'సోమ – శని · 8:00 – 12:00 & 17:00 – 20:00', 'सोम – शनि · 8:00 – 12:00 & 17:00 – 20:00', 'திங்கள் – சனி · 8:00 – 12:00 & 17:00 – 20:00'),
    accent: '#FF6B8A',
  },
]

export const trainerById = (id: string): Trainer | undefined => TRAINERS.find((t) => t.id === id)

/* ------------------------------------------------------------------ */
/* Membership plans                                                    */
/* ------------------------------------------------------------------ */

export type Billing = 'monthly' | 'quarterly' | 'yearly'

export interface Plan {
  id: string
  name: LText
  tagline: LText
  monthly: number
  popular?: boolean
  benefits: LText[]
  facilityIds: string[]
}

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: tr('Basic', 'బేసిక్', 'बेसिक', 'அடிப்படை'),
    tagline: tr('The essentials to get moving.', 'కదలడానికి అవసరమైన ప్రాథమికాలు.', 'चलना शुरू करने की बुनियादी चीज़ें।', 'நகரத் தொடங்க அடிப்படை வசதிகள்.'),
    monthly: 999,
    benefits: [
      tr('Gym floor access · 6 AM – 10 PM', 'జిమ్ ఫ్లోర్ యాక్సెస్ · 6 AM – 10 PM', 'जिम फ़्लोर एक्सेस · 6 AM – 10 PM', 'ஜிம் தள அணுகல் · 6 AM – 10 PM'),
      tr('2 group classes per week', 'వారానికి 2 గ్రూప్ తరగతులు', 'हफ़्ते में 2 ग्रुप क्लासेज़', 'வாரத்திற்கு 2 குழு வகுப்புகள்'),
      tr('Locker room access', 'లాకర్ రూమ్ యాక్సెస్', 'लॉकर रूम की सुविधा', 'பூட்டு அறை அணுகல்'),
      tr('Free fitness assessment', 'ఉచిత ఫిట్‌నెస్ అసెస్‌మెంట్', 'मुफ़्त फिटनेस मूल्यांकन', 'இலவச உடற்தகுதி மதிப்பீடு'),
    ],
    facilityIds: ['equipment', 'cardio', 'locker', 'water'],
  },
  {
    id: 'standard',
    name: tr('Standard', 'స్టాండర్డ్', 'स्टैंडर्ड', 'நிலையான'),
    tagline: tr('Our best value for regular training.', 'రెగ్యులర్ శిక్షణకు మంచి విలువ.', 'नियमित ट्रेनिंग के लिए सबसे बढ़िया।', 'வழக்கமான பயிற்சிக்கு சிறந்த மதிப்பு.'),
    monthly: 1599,
    popular: true,
    benefits: [
      tr('Unlimited gym floor access', 'పరిమితి లేని జిమ్ యాక్సెస్', 'अनलिमिटेड जिम एक्सेस', 'வரம்பற்ற ஜிம் அணுகல்'),
      tr('Unlimited group classes', 'పరిమితి లేని గ్రూప్ తరగతులు', 'अनलिमिटेड ग्रुप क्लासेज़', 'வரம்பற்ற குழு வகுப்புகள்'),
      tr('2 personal training sessions / month', 'నెలకు 2 వ్యక్తిగత సెషన్లు', 'महीने में 2 पर्सनल ट्रेनिंग सेशन', 'மாதத்திற்கு 2 தனிப்பட்ட அமர்வுகள்'),
      tr('Locker + fresh towel service', 'లాకర్ + తాజా టవల్ సేవ', 'लॉकर + ताज़ा तौलिया सेवा', 'பூட்டு + புதிய துண்டு சேவை'),
      tr('Monthly body composition scan', 'నెలవారీ బాడీ కంపోజిషన్ స్కాన్', 'मासिक बॉडी कंपोज़िशन स्कैन', 'மாதாந்திர உடல் அமைப்பு ஸ்கேன்'),
    ],
    facilityIds: ['equipment', 'cardio', 'weights', 'yoga', 'locker', 'shower', 'water', 'parking'],
  },
  {
    id: 'premium',
    name: tr('Premium', 'ప్రీమియం', 'प्रीमियम', 'பிரீமியம்'),
    tagline: tr('Everything, plus recovery.', 'అన్నీ, అలాగే రికవరీ.', 'सब कुछ, और रिकवरी भी।', 'அனைத்தும், மீட்பும்.'),
    monthly: 2399,
    benefits: [
      tr('Everything in Standard', 'స్టాండర్డ్‌లో ఉన్నవన్నీ', 'स्टैंडर्ड की हर चीज़', 'நிலையானதில் உள்ள அனைத்தும்'),
      tr('4 personal training sessions / month', 'నెలకు 4 వ్యక్తిగత సెషన్లు', 'महीने में 4 पर्सनल ट्रेनिंग सेशन', 'மாதத்திற்கு 4 தனிப்பட்ட அமர்வுகள்'),
      tr('Yoga & recovery studio access', 'యోగా & రికవరీ స్టూడియో యాక్సెస్', 'योग और रिकवरी स्टूडियो', 'யோகா & மீட்பு ஸ்டுடியோ அணுகல்'),
      tr('Nutrition consult every month', 'ప్రతి నెల న్యూట్రిషన్ సంప్రదింపు', 'हर महीने न्यूट्रिशन कंसल्ट', 'ஒவ்வொரு மாதமும் ஊட்டச்சத்து ஆலோசனை'),
      tr('2 guest passes per month', 'నెలకు 2 గెస్ట్ పాస్‌లు', 'महीने में 2 गेस्ट पास', 'மாதத்திற்கு 2 விருந்தினர் பாஸ்கள்'),
    ],
    facilityIds: ['equipment', 'cardio', 'weights', 'yoga', 'locker', 'shower', 'pt', 'water', 'parking'],
  },
  {
    id: 'personal',
    name: tr('Personal Training', 'వ్యక్తిగత శిక్షణ', 'पर्सनल ट्रेनिंग', 'தனிப்பட்ட பயிற்சி'),
    tagline: tr('One coach. One plan. All in.', 'ఒక కోచ్. ఒక ప్లాన్. పూర్తి అంకితభావం.', 'एक कोच। एक प्लान। पूरी तरह।', 'ஒரு பயிற்சியாளர். ஒரு திட்டம். முழுமையாக.'),
    monthly: 5499,
    benefits: [
      tr('8 personal training sessions / month', 'నెలకు 8 వ్యక్తిగత సెషన్లు', 'महीने में 8 पर्सनल ट्रेनिंग सेशन', 'மாதத்திற்கு 8 தனிப்பட்ட அமர்வுகள்'),
      tr('Fully personalised programme', 'పూర్తిగా వ్యక్తిగతీకరించిన కార్యక్రమం', 'पूरी तरह निजीकृत प्रोग्राम', 'முழுமையாக தனிப்பயனாக்கப்பட்ட திட்டம்'),
      tr('Weekly check-ins & plan updates', 'వారానికి చెక్-ఇన్లు & ప్లాన్ అప్‌డేట్లు', 'साप्ताहिक चेक-इन और प्लान अपडेट', 'வாராந்திர சரிபார்ப்பு & திட்ட புதுப்பிப்பு'),
      tr('Priority scheduling', 'ప్రాధాన్య షెడ్యూలింగ్', 'प्राथमिकता शेड्यूलिंग', 'முன்னுரிமை அட்டவணை'),
      tr('Nutrition guidance', 'పోషకాహార మార్గదర్శకత్వం', 'पोषण मार्गदर्शन', 'ஊட்டச்சத்து வழிகாட்டுதல்'),
    ],
    facilityIds: ['equipment', 'cardio', 'weights', 'yoga', 'locker', 'shower', 'pt', 'water', 'parking'],
  },
]

export const planById = (id: string): Plan | undefined => PLANS.find((p) => p.id === id)

export const planPrice = (plan: Plan, billing: Billing): number => {
  if (billing === 'quarterly') return Math.round((plan.monthly * 3 * 0.9) / 3)
  if (billing === 'yearly') return Math.round((plan.monthly * 12 * 0.8) / 12)
  return plan.monthly
}

export const formatInr = (n: number): string => `₹${n.toLocaleString('en-IN')}`

/* ------------------------------------------------------------------ */
/* Facilities                                                          */
/* ------------------------------------------------------------------ */

export interface Facility {
  id: string
  icon: IconName
  image: string
  featured?: boolean
  name: LText
  description: LText
}

export const FACILITIES: Facility[] = [
  {
    id: 'equipment',
    icon: 'dumbbell',
    image: '/images/f-equipment.jpg',
    featured: true,
    name: tr('Modern Gym Equipment', 'ఆధునిక జిమ్ పరికరాలు', 'आधुनिक जिम उपकरण', 'நவீன ஜிம் உபகரணங்கள்'),
    description: tr(
      'Industry-grade racks, plates and machines from trusted manufacturers, serviced every month.',
      'నమ్మకమైన తయారీదారుల రాక్‌లు, ప్లేట్లు మరియు యంత్రాలు — ప్రతి నెల సర్వీస్.',
      'भरोसेमंद निर्माताओं के रैक, प्लेट और मशीनें — हर महीने सर्विस।',
      'நம்பகமான உற்பத்தியாளர்களின் ராக்குகள், தட்டுகள் மற்றும் இயந்திரங்கள் — மாதாந்திர சேவை.',
    ),
  },
  {
    id: 'cardio',
    icon: 'heart',
    image: '/images/f-cardio.jpg',
    featured: true,
    name: tr('Cardio Zone', 'కార్డియో జోన్', 'कार्डियो ज़ोन', 'கார்டியோ மண்டலம்'),
    description: tr(
      'Treadmills, rowers, bikes and ski-ergs, each with its own screen and cooling fan.',
      'ట్రెడ్‌మిల్స్, రోవర్స్, బైక్స్ మరియు స్కీ-ఎర్గ్స్ — ప్రతి దానికీ ప్రత్యేక స్క్రీన్ మరియు ఫ్యాన్.',
      'ट्रेडमिल, रोवर, बाइक और स्की-एर्ग — हर एक में अपनी स्क्रीन और फ़ैन।',
      'டிரெட்மில், ரோவர், பைக் மற்றும் ஸ்கை-எர்க் — ஒவ்வொன்றிலும் தனி திரை மற்றும் ஃபேன்.',
    ),
  },
  {
    id: 'weights',
    icon: 'barbell',
    image: '/images/f-weights.jpg',
    featured: true,
    name: tr('Weight Training Area', 'బరువు శిక్షణ ప్రాంతం', 'वेट ट्रेनिंग एरिया', 'எடை பயிற்சி பகுதி'),
    description: tr(
      'Six lifting platforms, dumbbells up to 60 kg and calibrated competition plates.',
      'ఆరు లిఫ్టింగ్ ప్లాట్‌ఫారమ్‌లు, 60 కి.గ్రా వరకు డంబెల్స్ మరియు క్రమబద్ధ ప్లేట్లు.',
      'छह लिफ्टिंग प्लेटफ़ॉर्म, 60 किग्रा तक डंबल और कैलिब्रेटेड प्लेट।',
      'ஆறு லிப்டிங் ப்ளாட்ஃபார்ம்கள், 60 கிலோ வரை டம்பெல்கள் மற்றும் அளவுத்திட்ட தட்டுகள்.',
    ),
  },
  {
    id: 'yoga',
    icon: 'lotus',
    image: '/images/f-yoga.jpg',
    name: tr('Yoga Studio', 'యోగా స్టూడియో', 'योग स्टूडियो', 'யோகா ஸ்டுடியோ'),
    description: tr(
      'A quiet, warm studio with mats, blocks, straps and a proper sound system.',
      'మ్యాట్లు, బ్లాకులు, స్ట్రాప్‌లు మరియు మంచి సౌండ్ సిస్టమ్‌తో కూడిన ప్రశాంత స్టూడియో.',
      'मैट, ब्लॉक, स्ट्रैप और अच्छी साउंड सिस्टम वाला शांत, गर्म स्टूडियो।',
      'மேட்கள், பிளாக்குகள், ஸ்ட்ராப்கள் மற்றும் நல்ல ஒலி அமைப்புடன் கூடிய அமைதியான ஸ்டுடியோ.',
    ),
  },
  {
    id: 'locker',
    icon: 'lock',
    image: '/images/f-locker.jpg',
    name: tr('Locker Rooms', 'లాకర్ రూమ్‌లు', 'लॉकर रूम', 'பூட்டு அறைகள்'),
    description: tr(
      'Secure day-use lockers with phone charging points and full-length mirrors.',
      'ఫోన్ చార్జింగ్ పాయింట్లు మరియు పూర్తి పొడవు అద్దాలతో సురక్షిత డే-యూజ్ లాకర్లు.',
      'फ़ोन चार्जिंग पॉइंट और फ़ुल-लेंथ मिरर वाले सुरक्षित डे-यूज़ लॉकर।',
      'ஃபோன் சார்ஜிங் புள்ளிகள் மற்றும் முழு நீள கண்ணாடிகளுடன் கூடிய பாதுகாப்பான பூட்டுகள்.',
    ),
  },
  {
    id: 'shower',
    icon: 'shower',
    image: '/images/f-shower.jpg',
    name: tr('Shower Facilities', 'షవర్ సౌకర్యాలు', 'शॉवर की सुविधा', 'குளியல் வசதிகள்'),
    description: tr(
      'Private shower suites cleaned hourly, with hot water and basic toiletries.',
      'గంటకు ఒకసారి శుభ్రం చేయబడే ప్రైవేట్ షవర్ సూట్‌లు — వేడి నీరు మరియు ప్రాథమిక సామగ్రితో.',
      'हर घंटे साफ़ होने वाले निजी शॉवर सुइट, गर्म पानी और बुनियादी सामान के साथ।',
      'ஒவ்வொரு மணி நேரமும் சுத்தம் செய்யப்படும் தனியான குளியல் அறைகள், சூடான நீர் மற்றும் அடிப்படை பொருட்களுடன்.',
    ),
  },
  {
    id: 'pt',
    icon: 'user',
    image: '/images/f-pt.jpg',
    name: tr('Personal Training Area', 'వ్యక్తిగత శిక్షణ ప్రాంతం', 'पर्सनल ट्रेनिंग एरिया', 'தனிப்பட்ட பயிற்சி பகுதி'),
    description: tr(
      'A dedicated one-to-one zone away from the main floor, so your coach has your full attention.',
      'మెయిన్ ఫ్లోర్ నుంచి దూరంగా ప్రత్యేక వన్-టు-వన్ జోన్ — కోచ్ పూర్తి శ్రద్ధ మీపై.',
      'मुख्य फ़्लोर से दूर एक ख़ास वन-टू-वन ज़ोन, ताकि कोच का पूरा ध्यान आप पर हो।',
      'முக்கிய தளத்திலிருந்து விலகிய தனிப்பட்ட ஒன்-டு-வன் மண்டலம் — பயிற்சியாளரின் முழு கவனம் உங்கள் மீது.',
    ),
  },
  {
    id: 'water',
    icon: 'droplet',
    image: '/images/f-water.jpg',
    name: tr('Drinking Water', 'త్రాగునీరు', 'पीने का पानी', 'குடிநீர்'),
    description: tr(
      'Filtered, chilled water stations on every floor — bring your bottle, refill free.',
      'ప్రతి అంతస్తులో ఫిల్టర్ చేసిన, చల్లని నీటి స్టేషన్లు — మీ బాటిల్ తీసుకురండి, ఉచితంగా నింపుకోండి.',
      'हर मंज़िल पर फ़िल्टर्ड, ठंडा पानी — अपनी बोतल लाएँ और मुफ़्त भरें।',
      'ஒவ்வொரு தளத்திலும் வடிகட்டிய, குளிர்ந்த நீர் நிலையங்கள் — உங்கள் பாட்டிலை கொண்டு வாருங்கள்.',
    ),
  },
  {
    id: 'parking',
    icon: 'car',
    image: '/images/f-parking.jpg',
    name: tr('Parking Facilities', 'పార్కింగ్ సౌకర్యాలు', 'पार्किंग की सुविधा', 'நிறுத்துமிட வசதிகள்'),
    description: tr(
      'Free on-site parking for members, with separate space for two-wheelers and cars.',
      'సభ్యులకు ఉచిత పార్కింగ్ — ద్విచక్ర వాహనాలు మరియు కార్లకు ప్రత్యేక స్థలం.',
      'सदस्यों के लिए मुफ़्त पार्किंग — दोपहिया और कार के लिए अलग जगह।',
      'உறுப்பினர்களுக்கு இலவச நிறுத்துமிடம் — இரு சக்கர வாகனங்கள் மற்றும் கார்களுக்கு தனி இடம்.',
    ),
  },
]

export const facilityById = (id: string): Facility | undefined => FACILITIES.find((f) => f.id === id)

/* ------------------------------------------------------------------ */
/* Weekly schedule                                                     */
/* ------------------------------------------------------------------ */

export type DayId = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export const DAYS: { id: DayId; short: string; name: LText }[] = [
  { id: 'mon', short: 'Mon', name: tr('Monday', 'సోమవారం', 'सोमवार', 'திங்கள்') },
  { id: 'tue', short: 'Tue', name: tr('Tuesday', 'మంగళవారం', 'मंगलवार', 'செவ்வாய்') },
  { id: 'wed', short: 'Wed', name: tr('Wednesday', 'బుధవారం', 'बुधवार', 'புதன்') },
  { id: 'thu', short: 'Thu', name: tr('Thursday', 'గురువారం', 'गुरुवार', 'வியாழன்') },
  { id: 'fri', short: 'Fri', name: tr('Friday', 'శుక్రవారం', 'शुक्रवार', 'வெள்ளி') },
  { id: 'sat', short: 'Sat', name: tr('Saturday', 'శనివారం', 'शनिवार', 'சனி') },
  { id: 'sun', short: 'Sun', name: tr('Sunday', 'ఆదివారం', 'रविवार', 'ஞாயிறு') },
]

export interface Session {
  time: string
  programId: string
  trainerId: string
  total: number
  booked: number
}

export interface DaySchedule {
  day: DayId
  morning: Session[]
  evening: Session[]
}

export const SCHEDULE: DaySchedule[] = [
  {
    day: 'mon',
    morning: [
      { time: '06:30 – 07:30', programId: 'yoga', trainerId: 'meera', total: 20, booked: 12 },
      { time: '08:00 – 09:00', programId: 'hiit', trainerId: 'rohan', total: 18, booked: 17 },
    ],
    evening: [
      { time: '17:30 – 18:30', programId: 'weight-training', trainerId: 'arjun', total: 22, booked: 9 },
      { time: '19:00 – 20:00', programId: 'zumba', trainerId: 'kavya', total: 24, booked: 14 },
    ],
  },
  {
    day: 'tue',
    morning: [
      { time: '06:30 – 07:30', programId: 'strength', trainerId: 'arjun', total: 16, booked: 6 },
      { time: '08:00 – 09:00', programId: 'cardio', trainerId: 'rohan', total: 20, booked: 8 },
    ],
    evening: [
      { time: '17:30 – 18:30', programId: 'functional-fitness', trainerId: 'rohan', total: 18, booked: 16 },
      { time: '19:00 – 20:00', programId: 'yoga', trainerId: 'meera', total: 20, booked: 11 },
    ],
  },
  {
    day: 'wed',
    morning: [
      { time: '06:30 – 07:30', programId: 'hiit', trainerId: 'rohan', total: 18, booked: 18 },
      { time: '08:00 – 09:00', programId: 'yoga', trainerId: 'meera', total: 20, booked: 7 },
    ],
    evening: [
      { time: '17:30 – 18:30', programId: 'muscle-building', trainerId: 'arjun', total: 16, booked: 12 },
      { time: '19:00 – 20:00', programId: 'zumba', trainerId: 'kavya', total: 24, booked: 19 },
    ],
  },
  {
    day: 'thu',
    morning: [
      { time: '06:30 – 07:30', programId: 'cardio', trainerId: 'rohan', total: 20, booked: 5 },
      { time: '08:00 – 09:00', programId: 'personal-training', trainerId: 'arjun', total: 6, booked: 6 },
    ],
    evening: [
      { time: '17:30 – 18:30', programId: 'weight-training', trainerId: 'arjun', total: 22, booked: 14 },
      { time: '19:00 – 20:00', programId: 'yoga', trainerId: 'meera', total: 20, booked: 13 },
    ],
  },
  {
    day: 'fri',
    morning: [
      { time: '06:30 – 07:30', programId: 'strength', trainerId: 'arjun', total: 16, booked: 8 },
      { time: '08:00 – 09:00', programId: 'hiit', trainerId: 'rohan', total: 18, booked: 11 },
    ],
    evening: [
      { time: '17:30 – 18:30', programId: 'zumba', trainerId: 'kavya', total: 24, booked: 20 },
      { time: '19:00 – 20:00', programId: 'functional-fitness', trainerId: 'rohan', total: 18, booked: 10 },
    ],
  },
  {
    day: 'sat',
    morning: [
      { time: '07:00 – 08:00', programId: 'yoga', trainerId: 'meera', total: 20, booked: 15 },
      { time: '09:00 – 10:00', programId: 'weight-training', trainerId: 'arjun', total: 22, booked: 12 },
    ],
    evening: [
      { time: '17:30 – 18:30', programId: 'hiit', trainerId: 'rohan', total: 18, booked: 13 },
      { time: '19:00 – 20:00', programId: 'zumba', trainerId: 'kavya', total: 24, booked: 18 },
    ],
  },
  {
    day: 'sun',
    morning: [
      { time: '07:00 – 08:00', programId: 'yoga', trainerId: 'meera', total: 20, booked: 9 },
      { time: '09:00 – 10:00', programId: 'functional-fitness', trainerId: 'rohan', total: 18, booked: 4 },
    ],
    evening: [
      { time: '10:30 – 11:30', programId: 'personal-training', trainerId: 'arjun', total: 6, booked: 2 },
    ],
  },
]

export const todayIndex = (): number => {
  const d = new Date().getDay() // 0 = Sunday
  return d === 0 ? 6 : d - 1
}

/* ------------------------------------------------------------------ */
/* Business details (sample content — replace with real details)       */
/* ------------------------------------------------------------------ */

export const BUSINESS = {
  name: 'FORGE Fitness Centre',
  tagline: 'Forge Your Strongest Self',
  address: 'Plot 42, MG Road, Labbipet, Vijayawada, Andhra Pradesh 520010',
  phone: '+91 90000 12345',
  phoneHref: '+919000012345',
  email: 'hello@forgefitness.in',
  mapQuery: 'MG Road, Labbipet, Vijayawada, Andhra Pradesh',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    x: 'https://x.com',
    whatsapp: 'https://wa.me/919000012345',
  },
}
