import { LanguageOption, CommonPhrase } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', speechVoiceCode: 'en-US' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speechVoiceCode: 'es-ES' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', speechVoiceCode: 'fr-FR' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', speechVoiceCode: 'ja-JP' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', speechVoiceCode: 'de-DE' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechVoiceCode: 'hi-IN' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', speechVoiceCode: 'it-IT' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文', flag: '🇨🇳', speechVoiceCode: 'zh-CN' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', speechVoiceCode: 'ar-SA' }
];

export const COMMON_TRAVEL_PHRASES: CommonPhrase[] = [
  {
    id: 'ph-1',
    category: 'Accommodation',
    english: 'Where is the hotel?',
    translations: {
      es: { text: '¿Dónde está el hotel?', phonetic: 'DOHN-deh ehs-TAH ehl oh-TEHL?' },
      fr: { text: "Où se trouve l'hôtel ?", phonetic: 'OO suh TROOV loh-TEL?' },
      ja: { text: 'ホテルはどこですか？', phonetic: 'Hoteru wa doko desu ka?' },
      de: { text: 'Wo ist das Hotel?', phonetic: 'VOH ist dahs hoh-TEHL?' },
      hi: { text: 'होटल कहाँ है?', phonetic: 'Hotel kahaan hai?' },
      it: { text: "Dov'è l'albergo?", phonetic: 'DOH-veh lahl-BEHR-goh?' },
      zh: { text: '酒店在哪里？', phonetic: 'Jiǔdiàn zài nǎlǐ?' },
      ar: { text: 'أين الفندق؟', phonetic: 'Ayna al-funduq?' }
    }
  },
  {
    id: 'ph-2',
    category: 'Transit & Directions',
    english: 'How can I reach the railway station?',
    translations: {
      es: { text: '¿Cómo puedo llegar a la estación de tren?', phonetic: 'KOH-moh PWEH-doh yeh-GAHR ah lah ehs-tah-SYOHN deh trehn?' },
      fr: { text: 'Comment puis-je arriver à la gare ?', phonetic: 'koh-mahn pwee-zhuh ah-ree-vay ah lah gahr?' },
      ja: { text: '駅へはどう行けばいいですか？', phonetic: 'Eki e wa dou ikeba ii desu ka?' },
      de: { text: 'Wie komme ich zum Bahnhof?', phonetic: 'Vee KOM-muh ikh tsoom BAHN-hohf?' },
      hi: { text: 'मैं रेलवे स्टेशन कैसे पहुँच सकता हूँ?', phonetic: 'Main railway station kaise pahunch sakta hoon?' },
      it: { text: 'Come posso raggiungere la stazione ferroviaria?', phonetic: 'KOH-meh POS-soh rahg-JOON-jeh-reh lah stah-TSYOH-neh?' },
      zh: { text: '我怎么去火车站？', phonetic: 'Wǒ zěnme qù huǒchēzhàn?' },
      ar: { text: 'كيف يمكنني الوصول إلى محطة القطار؟', phonetic: 'Kayfa yumkinunī al-wusūl ilā mahattat al-qitār?' }
    }
  },
  {
    id: 'ph-3',
    category: 'Emergency & Medical',
    english: 'Please help me.',
    translations: {
      es: { text: 'Por favor, ayúdeme.', phonetic: 'por fah-VOR, ah-YOO-deh-meh.' },
      fr: { text: "S'il vous plaît, aidez-moi.", phonetic: 'seel voo pleh, eh-DAY mwah.' },
      ja: { text: '助けてください。', phonetic: 'Tasukete kudasai.' },
      de: { text: 'Bitte helfen Sie mir.', phonetic: 'BIT-tuh HEL-fuhn zee meer.' },
      hi: { text: 'कृपया मेरी मदद करें।', phonetic: 'Kripya meri madad karein.' },
      it: { text: 'Per favore, mi aiuti.', phonetic: 'pehr fah-VOH-reh, mee ah-YOO-tee.' },
      zh: { text: '请帮帮我。', phonetic: 'Qǐng bāng bang wǒ.' },
      ar: { text: 'من فضلك ساعدني.', phonetic: 'Min fadlik saaidni.' }
    }
  },
  {
    id: 'ph-4',
    category: 'Shopping',
    english: 'How much does it cost?',
    translations: {
      es: { text: '¿Cuánto cuesta?', phonetic: 'KWAHN-toh KWEHS-tah?' },
      fr: { text: 'Combien ça coûte ?', phonetic: 'kohm-BYEN sah KOOT?' },
      ja: { text: 'いくらですか？', phonetic: 'Ikura desu ka?' },
      de: { text: 'Wie viel kostet das?', phonetic: 'vee FEEL KOS-tet dahs?' },
      hi: { text: 'इसकी कीमत कितनी है?', phonetic: 'Iski keemat kitni hai?' },
      it: { text: 'Quanto costa?', phonetic: 'KWAHN-toh KOS-tah?' },
      zh: { text: '这个多少钱？', phonetic: 'Zhège duōshǎo qián?' },
      ar: { text: 'كم تكلفة هذا؟', phonetic: 'Kam taklufat hatha?' }
    }
  },
  {
    id: 'ph-5',
    category: 'Emergency & Medical',
    english: 'Where is the nearest hospital?',
    translations: {
      es: { text: '¿Dónde está el hospital más cercano?', phonetic: 'DOHN-deh ehs-TAH ehl ohs-pee-TAHL mahs sehr-KAH-noh?' },
      fr: { text: "Où est l'hôpital le plus proche ?", phonetic: 'OO eh loh-pee-TAHL luh ploo PROSH?' },
      ja: { text: '一番近い病院はどこですか？', phonetic: 'Ichiban chikai byouin wa doko desu ka?' },
      de: { text: 'Wo ist das nächste Krankenhaus?', phonetic: 'VOH ist dahs NAYKH-stuh KRAHN-ken-hows?' },
      hi: { text: 'निकटतम अस्पताल कहाँ है?', phonetic: 'Nikat-tam aspatal kahaan hai?' },
      it: { text: "Dov'è l'ospedale più vicino?", phonetic: 'DOH-veh lohs-peh-DAH-leh pyoo vee-CHEE-noh?' },
      zh: { text: '最近的医院在哪里？', phonetic: 'Zuìjìn de yīyuàn zài nǎlǐ?' },
      ar: { text: 'أين أقرب مستشفى؟', phonetic: 'Ayna aqrab mustashfā?' }
    }
  },
  {
    id: 'ph-6',
    category: 'Essentials',
    english: 'Hello, do you speak English?',
    translations: {
      es: { text: 'Hola, ¿habla usted inglés?', phonetic: 'OH-lah, AH-blah oos-TEHD een-GLEHS?' },
      fr: { text: 'Bonjour, parlez-vous anglais ?', phonetic: 'bohn-ZHOOR, pahr-lay VOO ahn-GLAY?' },
      ja: { text: 'こんにちは、英語を話せますか？', phonetic: 'Konnichiwa, Eigo o hanasemasu ka?' },
      de: { text: 'Hallo, sprechen Sie Englisch?', phonetic: 'HAH-loh, SHPREKH-en zee ENG-lish?' },
      hi: { text: 'नमस्ते, क्या आप अंग्रेजी बोलते हैं?', phonetic: 'Namaste, kya aap angrezi bolte hain?' },
      it: { text: 'Buongiorno, parla inglese?', phonetic: 'bwohn-JOHR-noh, PAHR-lah een-GLEH-zeh?' },
      zh: { text: '你好，你会说英语吗？', phonetic: 'Nǐ hǎo, nǐ huì shuō yīngyǔ ma?' },
      ar: { text: 'مرحبا، هل تتحدث الإنجليزية؟', phonetic: 'Marhaban, hal tatakallam al-inglīziyya?' }
    }
  },
  {
    id: 'ph-7',
    category: 'Food & Dining',
    english: 'Can I have the menu and water please?',
    translations: {
      es: { text: '¿Me puede traer el menú y agua por favor?', phonetic: 'meh PWEH-deh trah-EHR ehl meh-NOO ee AH-gwah por fah-VOR?' },
      fr: { text: "Puis-je avoir le menu et de l'eau s'il vous plaît ?", phonetic: 'pwee-zhuh ah-vwahr luh meh-noo ay duh loh seel voo pleh?' },
      ja: { text: 'メニューとお水をいただけますか？', phonetic: 'Menyuu to omizu o itadakemasu ka?' },
      de: { text: 'Kann ich bitte die Speisekarte und Wasser haben?', phonetic: 'kahn ikh BIT-tuh dee SHPY-zuh-kar-tuh oont VAHS-suhr HAH-ben?' },
      hi: { text: 'कृपया मेनू और पानी मिल सकता है?', phonetic: 'Kripya menu aur paani mil sakta hai?' },
      it: { text: "Posso avere il menù e dell'acqua per favore?", phonetic: 'POS-soh ah-VEH-reh eel meh-NOO eh dehl-AH-kwah pehr fah-VOH-reh?' },
      zh: { text: '请给我一份菜单和一杯水，谢谢。', phonetic: 'Qǐng gěi wǒ yī fèn càidān hé yī bēi shuǐ, xièxiè.' },
      ar: { text: 'هل يمكنني الحصول على قائمة الطعام والماء من فضلك؟', phonetic: 'Hal yumkinunī al-husūl alā qā’imat at-ta‘ām wa-l-mā’?' }
    }
  },
  {
    id: 'ph-8',
    category: 'Transit & Directions',
    english: 'I need a taxi to the airport.',
    translations: {
      es: { text: 'Necesito un taxi al aeropuerto.', phonetic: 'neh-seh-SEE-toh oon TAHK-see ahl ah-eh-roh-PWEHR-toh.' },
      fr: { text: "J'ai besoin d'un taxi pour l'aéroport.", phonetic: 'zhay buh-ZWAHN durn tahk-see poor lay-roh-por.' },
      ja: { text: '空港までタクシーが必要です。', phonetic: 'Kuukou made takushii ga hitsuyou desu.' },
      de: { text: 'Ich brauche ein Taxi zum Flughafen.', phonetic: 'ikh BROW-khuh eye-n TAHK-see tsoom FLOOK-hah-fen.' },
      hi: { text: 'मुझे हवाई अड्डे के लिए टैक्सी चाहिए।', phonetic: 'Mujhe hawai adde ke liye taxi chahiye.' },
      it: { text: "Ho bisogno di un taxi per l'aeroporto.", phonetic: 'oh bee-ZOHN-yoh dee oon TAHK-see pehr lah-eh-roh-POR-toh.' },
      zh: { text: '我需要去机场的出租车。', phonetic: 'Wǒ xūyào qù jīchǎng de chūzūchē.' },
      ar: { text: 'أحتاج إلى سيارة أجرة إلى المطار.', phonetic: 'Ahtāju ilā sayyārat ujra ilā al-matār.' }
    }
  }
];

// Offline dictionary for fast word & phrase lookups when offline
export const OFFLINE_DICTIONARY: Record<string, Record<string, string>> = {
  'hotel': {
    es: 'hotel',
    fr: 'hôtel',
    ja: 'ホテル',
    de: 'Hotel',
    hi: 'होटल',
    it: 'albergo',
    zh: '酒店',
    ar: 'فندق'
  },
  'station': {
    es: 'estación',
    fr: 'gare',
    ja: '駅',
    de: 'Bahnhof',
    hi: 'स्टेशन',
    it: 'stazione',
    zh: '车站',
    ar: 'محطة'
  },
  'airport': {
    es: 'aeropuerto',
    fr: 'aéroport',
    ja: '空港',
    de: 'Flughafen',
    hi: 'हवाई अड्डा',
    it: 'aeroporto',
    zh: '机场',
    ar: 'مطار'
  },
  'hospital': {
    es: 'hospital',
    fr: 'hôpital',
    ja: '病院',
    de: 'Krankenhaus',
    hi: 'अस्पताल',
    it: 'ospedale',
    zh: '医院',
    ar: 'مستشفى'
  },
  'help': {
    es: 'ayuda',
    fr: 'aide',
    ja: '助け',
    de: 'Hilfe',
    hi: 'मदद',
    it: 'aiuto',
    zh: '帮助',
    ar: 'مساعدة'
  },
  'water': {
    es: 'agua',
    fr: 'eau',
    ja: '水',
    de: 'Wasser',
    hi: 'पानी',
    it: 'acqua',
    zh: '水',
    ar: 'ماء'
  },
  'food': {
    es: 'comida',
    fr: 'nourriture',
    ja: '食べ物',
    de: 'Essen',
    hi: 'खाना',
    it: 'cibo',
    zh: '食物',
    ar: 'طعام'
  },
  'restroom': {
    es: 'baño',
    fr: 'toilettes',
    ja: 'トイレ',
    de: 'Toilette',
    hi: 'शौचालय',
    it: 'bagno',
    zh: '洗手间',
    ar: 'دورة مياه'
  },
  'taxi': {
    es: 'taxi',
    fr: 'taxi',
    ja: 'タクシー',
    de: 'Taxi',
    hi: 'टैक्सी',
    it: 'taxi',
    zh: '出租车',
    ar: 'تاكسي'
  },
  'police': {
    es: 'policía',
    fr: 'police',
    ja: '警察',
    de: 'Polizei',
    hi: 'पुलिस',
    it: 'polizia',
    zh: '警察',
    ar: 'شرطة'
  }
};
