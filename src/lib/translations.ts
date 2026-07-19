import type { LanguageCode } from "@/config/batches";

// Strings shared with CoC-Registration (email/name/center/WhatsApp/comments/
// disclaimer) were carried over verbatim since those are already live,
// vetted translations for a sibling Heartfulness registration form. Strings
// new to this form (age, gender, initials, Heartfulness ID, zone, the three
// program consents, WhatsApp-group confirmation) are best-effort — get a
// native speaker to review the Hindi/Telugu/Kannada versions before this
// goes live with real registrants.
export interface Dict {
  pageTitle: string;
  languageLabel: string;
  languageHelper: string;
  notOpenTitle: string;
  notOpenMessage: string;
  loadingPrograms: string;
  chooseBatch: string;
  scheduleLabel: string;
  deadlineLabel: string;
  email: string;
  emailHelper: string;
  firstName: string;
  initials: string;
  initialsHelper: string;
  age: string;
  gender: string;
  genderSelect: string;
  genderFemale: string;
  genderMale: string;
  genderOther: string;
  genderPreferNot: string;
  whatsapp: string;
  whatsappHelper: string;
  heartfulnessId: string;
  heartfulnessIdHelper: string;
  center: string;
  zone: string;
  english: string;
  whatsappGroup: string;
  whatsappGroupHelper: string;
  sessionConsent: string;
  videoConsent: string;
  contactConsent: string;
  commentsLabel: string;
  commentsHelper: string;
  disclaimerConsent: string;
  disclaimerShort: string;
  submitButton: string;
  submittingText: string;
  successTitle: string;
  successMessage: string;
  errorRequired: string;
  networkError: string;
  select: string;
  yes: string;
  no: string;
  optional: string;
}

export const translations: Record<LanguageCode, Dict> = {
  en: {
    pageTitle: "HC Essentials — Program Registration",
    languageLabel: "Program Language *",
    languageHelper: "IMPORTANT: Your sessions will be conducted in this language.",
    notOpenTitle: "Registration not currently open",
    notOpenMessage:
      "There is no HC Essentials batch currently open for registration in this language. Please check back later.",
    loadingPrograms: "Checking available programs...",
    chooseBatch: "Choose a batch *",
    scheduleLabel: "Schedule",
    deadlineLabel: "Registration deadline",
    email: "Email *",
    emailHelper:
      "IMPORTANT: All future communication regarding this program will be sent only to this email address, not WhatsApp. Please check it regularly.",
    firstName: "First Name *",
    initials: "Initials",
    initialsHelper: "E.g. your father's/husband's initial, if you use one on official documents.",
    age: "Age",
    gender: "Gender",
    genderSelect: "Select",
    genderFemale: "Female",
    genderMale: "Male",
    genderOther: "Other",
    genderPreferNot: "Prefer not to say",
    whatsapp: "WhatsApp / Mobile Number *",
    whatsappHelper: "Include your country code, e.g. +91XXXXXXXXXX.",
    heartfulnessId: "Heartfulness / Abhyasi ID",
    heartfulnessIdHelper: "Leave blank if you don't have one yet.",
    center: "Your Heartfulness Center *",
    zone: "Zone",
    english: "Do you know English? *",
    whatsappGroup: "Are you willing to join the program's WhatsApp group? *",
    whatsappGroupHelper: "Used for reminders and coordination during the program.",
    sessionConsent: "I commit to attending all sessions of this program to the best of my ability. *",
    videoConsent: "I consent to keeping my video on during live sessions. *",
    contactConsent: "I consent to being contacted by the program team regarding this program. *",
    commentsLabel: "Additional Comments (Optional)",
    commentsHelper: "Anything else you'd like the program team to know.",
    disclaimerConsent:
      "I have read and agree to the [LINK]Event Disclaimer and Social Media Policy[/LINK], including the terms at [TERMS]heartfulness.org/us/terms[/TERMS]. I confirm that I am at least 18 years of age and consent to recordings being made of this program. *",
    disclaimerShort: "Disclaimer consent",
    submitButton: "Submit Registration",
    submittingText: "Submitting... Please wait",
    successTitle: "Registration received!",
    successMessage:
      "Thank you for registering. A confirmation will be sent to your email closer to the program start date.",
    errorRequired: "Missing required fields:",
    networkError: "Network error. Please try again.",
    select: "Select",
    yes: "Yes",
    no: "No",
    optional: "optional",
  },
  ta: {
    pageTitle: "HC Essentials — திட்டப் பதிவு",
    languageLabel: "திட்ட மொழி *",
    languageHelper: "முக்கியம்: உங்கள் அமர்வுகள் இந்த மொழியில் நடத்தப்படும்.",
    notOpenTitle: "பதிவு தற்போது திறக்கப்படவில்லை",
    notOpenMessage:
      "இந்த மொழியில் தற்போது பதிவுக்கு திறந்திருக்கும் HC Essentials தொகுதி எதுவும் இல்லை. பிறகு மீண்டும் பார்க்கவும்.",
    loadingPrograms: "கிடைக்கும் திட்டங்களை சரிபார்க்கிறோம்...",
    chooseBatch: "ஒரு தொகுதியைத் தேர்ந்தெடுக்கவும் *",
    scheduleLabel: "அட்டவணை",
    deadlineLabel: "பதிவு கடைசி தேதி",
    email: "மின்னஞ்சல் *",
    emailHelper:
      "முக்கியம்: இந்த திட்டம் தொடர்பான அனைத்து எதிர்காலத் தொடர்பாடல் இந்த ஈமெயில் முகவரிக்கு மட்டுமே அனுப்பப்படும், வாட்ஸ்அப்பிற்கு அல்ல. தயவுசெய்து இந்த மின்னஞ்சலை தொடர்ந்து பார்க்கவும்.",
    firstName: "முதல் பெயர் *",
    initials: "இனிஷியல்ஸ்",
    initialsHelper: "உத்தியோகபூர்வ ஆவணங்களில் நீங்கள் பயன்படுத்தினால், உங்கள் தந்தை/கணவரின் இனிஷியல்.",
    age: "வயது",
    gender: "பாலினம்",
    genderSelect: "தேர்ந்தெடுக்கவும்",
    genderFemale: "பெண்",
    genderMale: "ஆண்",
    genderOther: "மற்றவை",
    genderPreferNot: "கூற விரும்பவில்லை",
    whatsapp: "வாட்ஸ்அப் / மொபைல் எண் *",
    whatsappHelper: "நாட்டுக் குறியீட்டுடன், எ.கா. +91XXXXXXXXXX.",
    heartfulnessId: "ஹார்ட்ஃபுல்னெஸ் / அப்யாசி ஐடி",
    heartfulnessIdHelper: "இதுவரை இல்லையெனில் காலியாக விடவும்.",
    center: "உங்கள் ஹார்ட்ஃபுல்னெஸ் சென்டர் *",
    zone: "மண்டலம்",
    english: "உங்களுக்கு ஆங்கிலம் தெரியுமா? *",
    whatsappGroup: "இந்த திட்டத்தின் வாட்ஸ்அப் குழுவில் சேர விருப்பமா? *",
    whatsappGroupHelper: "திட்டத்தின் போது நினைவூட்டல்கள் மற்றும் ஒருங்கிணைப்புக்குப் பயன்படுத்தப்படும்.",
    sessionConsent: "என்னால் இயன்றவரை இந்த திட்டத்தின் அனைத்து அமர்வுகளிலும் கலந்துகொள்ள உறுதியளிக்கிறேன். *",
    videoConsent: "நேரடி அமர்வுகளின் போது எனது வீடியோவை ஆன் செய்து வைத்திருக்க சம்மதிக்கிறேன். *",
    contactConsent: "இந்த திட்டம் தொடர்பாக திட்டக் குழுவால் தொடர்பு கொள்ளப்பட சம்மதிக்கிறேன். *",
    commentsLabel: "கூடுதல் கருத்துகள் (விருப்பத்தேர்வு)",
    commentsHelper: "திட்டக் குழு அறிந்துகொள்ள வேண்டிய வேறு ஏதேனும்.",
    disclaimerConsent:
      "நான் [LINK]Event Disclaimer and Social Media Policy[/LINK] மற்றும் [TERMS]heartfulness.org/us/terms[/TERMS] இல் உள்ள விதிமுறைகளை படித்து ஒப்புக்கொள்கிறேன். நான் குறைந்தது 18 வயது நிரம்பியவர் என்பதை உறுதிப்படுத்துகிறேன் மற்றும் இந்த நிகழ்ச்சியின் பதிவுகள் செய்யப்படுவதற்கு சம்மதிக்கிறேன். *",
    disclaimerShort: "மறுப்பு ஒப்புதல்",
    submitButton: "பதிவை சமர்ப்பிக்கவும்",
    submittingText: "சமர்ப்பிக்கப்படுகிறது... தயவுசெய்து காத்திருக்கவும்",
    successTitle: "பதிவு பெறப்பட்டது!",
    successMessage: "பதிவு செய்ததற்கு நன்றி. திட்டம் தொடங்கும் தேதிக்கு அருகில் உறுதிப்படுத்தல் உங்கள் மின்னஞ்சலுக்கு அனுப்பப்படும்.",
    errorRequired: "தேவையான புலங்கள் இல்லை:",
    networkError: "நெட்வொர்க் பிழை. மீண்டும் முயற்சிக்கவும்.",
    select: "தேர்ந்தெடுக்கவும்",
    yes: "ஆம்",
    no: "இல்லை",
    optional: "விருப்பத்தேர்வு",
  },
  hi: {
    pageTitle: "HC Essentials — कार्यक्रम पंजीकरण",
    languageLabel: "कार्यक्रम भाषा *",
    languageHelper: "महत्वपूर्ण: आपके सत्र इसी भाषा में आयोजित किए जाएंगे।",
    notOpenTitle: "पंजीकरण अभी खुला नहीं है",
    notOpenMessage:
      "इस भाषा में फिलहाल कोई HC Essentials बैच पंजीकरण के लिए खुला नहीं है। कृपया बाद में देखें।",
    loadingPrograms: "उपलब्ध कार्यक्रम जांचे जा रहे हैं...",
    chooseBatch: "एक बैच चुनें *",
    scheduleLabel: "समय सारिणी",
    deadlineLabel: "पंजीकरण की अंतिम तिथि",
    email: "ईमेल *",
    emailHelper:
      "महत्वपूर्ण: इस कार्यक्रम से संबंधित सभी भविष्य के संचार केवल इस ईमेल पते पर भेजे जाएंगे, व्हाट्सएप पर नहीं। कृपया इस ईमेल को नियमित रूप से जांचें।",
    firstName: "पहला नाम *",
    initials: "इनिशियल्स",
    initialsHelper: "यदि आप आधिकारिक दस्तावेज़ों में उपयोग करते हैं तो अपने पिता/पति का इनिशियल।",
    age: "आयु",
    gender: "लिंग",
    genderSelect: "चुनें",
    genderFemale: "महिला",
    genderMale: "पुरुष",
    genderOther: "अन्य",
    genderPreferNot: "बताना नहीं चाहते",
    whatsapp: "व्हाट्सएप / मोबाइल नंबर *",
    whatsappHelper: "देश कोड सहित लिखें, जैसे +91XXXXXXXXXX।",
    heartfulnessId: "Heartfulness / अभ्यासी आईडी",
    heartfulnessIdHelper: "यदि अभी तक नहीं है तो खाली छोड़ दें।",
    center: "आपका Heartfulness केंद्र *",
    zone: "ज़ोन",
    english: "क्या आपको अंग्रेज़ी आती है? *",
    whatsappGroup: "क्या आप इस कार्यक्रम के व्हाट्सएप समूह में शामिल होना चाहेंगे? *",
    whatsappGroupHelper: "कार्यक्रम के दौरान अनुस्मारक और समन्वय के लिए उपयोग किया जाता है।",
    sessionConsent: "मैं अपनी पूरी क्षमता से इस कार्यक्रम के सभी सत्रों में भाग लेने का संकल्प लेता/लेती हूं। *",
    videoConsent: "मैं लाइव सत्रों के दौरान अपना वीडियो चालू रखने के लिए सहमत हूं। *",
    contactConsent: "मैं इस कार्यक्रम के संबंध में कार्यक्रम टीम द्वारा संपर्क किए जाने के लिए सहमत हूं। *",
    commentsLabel: "अतिरिक्त टिप्पणियाँ (वैकल्पिक)",
    commentsHelper: "कुछ और जो आप कार्यक्रम टीम को बताना चाहें।",
    disclaimerConsent:
      "मैंने [LINK]Event Disclaimer and Social Media Policy[/LINK] और [TERMS]heartfulness.org/us/terms[/TERMS] पर दी गई शर्तों को पढ़ लिया है और सहमत हूं। मैं पुष्टि करता/करती हूं कि मैं कम से कम 18 वर्ष का/की हूं और इस कार्यक्रम की रिकॉर्डिंग के लिए सहमति देता/देती हूं। *",
    disclaimerShort: "अस्वीकरण सहमति",
    submitButton: "पंजीकरण जमा करें",
    submittingText: "जमा हो रहा है... कृपया प्रतीक्षा करें",
    successTitle: "पंजीकरण प्राप्त हुआ!",
    successMessage: "पंजीकरण के लिए धन्यवाद। कार्यक्रम शुरू होने की तिथि के करीब आपके ईमेल पर पुष्टि भेजी जाएगी।",
    errorRequired: "आवश्यक फ़ील्ड गायब हैं:",
    networkError: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।",
    select: "चुनें",
    yes: "हाँ",
    no: "नहीं",
    optional: "वैकल्पिक",
  },
  te: {
    pageTitle: "HC Essentials — కార్యక్రమ నమోదు",
    languageLabel: "కార్యక్రమ భాష *",
    languageHelper: "ముఖ్యం: మీ సెషన్‌లు ఈ భాషలో నిర్వహించబడతాయి.",
    notOpenTitle: "నమోదు ప్రస్తుతం తెరవలేదు",
    notOpenMessage:
      "ఈ భాషలో ప్రస్తుతం నమోదుకు తెరిచి ఉన్న HC Essentials బ్యాచ్ ఏదీ లేదు. దయచేసి తర్వాత మళ్లీ చూడండి.",
    loadingPrograms: "అందుబాటులో ఉన్న కార్యక్రమాలను తనిఖీ చేస్తున్నాము...",
    chooseBatch: "ఒక బ్యాచ్‌ను ఎంచుకోండి *",
    scheduleLabel: "షెడ్యూల్",
    deadlineLabel: "నమోదు గడువు తేదీ",
    email: "ఈమెయిల్ *",
    emailHelper:
      "ముఖ్యం: ఈ కార్యక్రమానికి సంబంధించిన అన్ని భవిష్యత్ సంపర్కింపులు ఈ ఈమెయిల్ చిరునామాకు మాత్రమే పంపబడతాయి, వాట్సాప్‌కు కాదు. దయచేసి ఈ ఈమెయిల్‌ను నియమితంగా చెక్ చేయండి.",
    firstName: "మొదటి పేరు *",
    initials: "ఇనిషియల్స్",
    initialsHelper: "అధికారిక పత్రాలలో ఉపయోగిస్తే మీ తండ్రి/భర్త ఇనిషియల్.",
    age: "వయస్సు",
    gender: "లింగం",
    genderSelect: "ఎంచుకోండి",
    genderFemale: "స్త్రీ",
    genderMale: "పురుషుడు",
    genderOther: "ఇతర",
    genderPreferNot: "చెప్పదలచుకోలేదు",
    whatsapp: "WhatsApp / మొబైల్ నంబర్ *",
    whatsappHelper: "దేశ కోడ్‌తో సహా, ఉదా. +91XXXXXXXXXX.",
    heartfulnessId: "Heartfulness / అభ్యాసి ఐడీ",
    heartfulnessIdHelper: "ఇంకా లేకపోతే ఖాళీగా ఉంచండి.",
    center: "మీ Heartfulness కేంద్రం *",
    zone: "జోన్",
    english: "మీకు ఆంగ్లం తెలుసా? *",
    whatsappGroup: "ఈ కార్యక్రమ WhatsApp గ్రూప్‌లో చేరడానికి మీరు సిద్ధంగా ఉన్నారా? *",
    whatsappGroupHelper: "కార్యక్రమ సమయంలో రిమైండర్లు మరియు సమన్వయం కోసం ఉపయోగించబడుతుంది.",
    sessionConsent: "నా శక్తి మేరకు ఈ కార్యక్రమంలోని అన్ని సెషన్‌లకు హాజరవుతానని కట్టుబడి ఉన్నాను. *",
    videoConsent: "ప్రత్యక్ష సెషన్‌ల సమయంలో నా వీడియోను ఆన్‌లో ఉంచడానికి అంగీకరిస్తున్నాను. *",
    contactConsent: "ఈ కార్యక్రమానికి సంబంధించి కార్యక్రమ బృందం నన్ను సంప్రదించడానికి అంగీకరిస్తున్నాను. *",
    commentsLabel: "అదనపు వ్యాఖ్యలు (ఐచ్ఛికం)",
    commentsHelper: "కార్యక్రమ బృందం తెలుసుకోవాల్సిన ఇతర ఏదైనా.",
    disclaimerConsent:
      "నేను [LINK]Event Disclaimer and Social Media Policy[/LINK] మరియు [TERMS]heartfulness.org/us/terms[/TERMS] వద్ద ఉన్న నిబంధనలను చదివాను మరియు అంగీకరిస్తున్నాను. నేను కనీసం 18 సంవత్సరాల వయస్సు కలిగి ఉన్నానని నిర్ధారిస్తున్నాను మరియు ఈ కార్యక్రమం యొక్క రికార్డింగ్‌లు చేయడానికి అంగీకరిస్తున్నాను. *",
    disclaimerShort: "డిస్‌క్లెయిమర్ సమ్మతి",
    submitButton: "నమోదును సమర్పించండి",
    submittingText: "సమర్పిస్తోంది... దయచేసి వేచి ఉండండి",
    successTitle: "నమోదు స్వీకరించబడింది!",
    successMessage: "నమోదు చేసినందుకు ధన్యవాదాలు. కార్యక్రమం ప్రారంభ తేదీకి దగ్గరగా మీ ఈమెయిల్‌కు నిర్ధారణ పంపబడుతుంది.",
    errorRequired: "అవసరమైన ఫీల్డ్‌లు లేవు:",
    networkError: "నెట్‌వర్క్ లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.",
    select: "ఎంచుకోండి",
    yes: "అవును",
    no: "కాదు",
    optional: "ఐచ్ఛికం",
  },
  kn: {
    pageTitle: "HC Essentials — ಕಾರ್ಯಕ್ರಮ ನೋಂದಣಿ",
    languageLabel: "ಕಾರ್ಯಕ್ರಮ ಭಾಷೆ *",
    languageHelper: "ಮುಖ್ಯ: ನಿಮ್ಮ ಅಧಿವೇಶನಗಳು ಈ ಭಾಷೆಯಲ್ಲಿ ನಡೆಸಲ್ಪಡುತ್ತವೆ.",
    notOpenTitle: "ನೋಂದಣಿ ಪ್ರಸ್ತುತ ತೆರೆದಿಲ್ಲ",
    notOpenMessage:
      "ಈ ಭಾಷೆಯಲ್ಲಿ ಪ್ರಸ್ತುತ ನೋಂದಣಿಗೆ ತೆರೆದಿರುವ HC Essentials ಬ್ಯಾಚ್ ಯಾವುದೂ ಇಲ್ಲ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪರಿಶೀಲಿಸಿ.",
    loadingPrograms: "ಲಭ್ಯವಿರುವ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
    chooseBatch: "ಒಂದು ಬ್ಯಾಚ್ ಆಯ್ಕೆಮಾಡಿ *",
    scheduleLabel: "ವೇಳಾಪಟ್ಟಿ",
    deadlineLabel: "ನೋಂದಣಿ ಗಡುವು",
    email: "ಇಮೇಲ್ *",
    emailHelper:
      "ಪ್ರಮುಖ: ಈ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಎಲ್ಲಾ ಭವಿಷ್ಯತ್ ಸಂವಹನ ಈ ಇಮೇಲ್ ವಿಳಾಸಕ್ಕೆ ಮಾತ್ರ ಕಳುಹಿಸಲಾಗುವುದು, ವಾಟ್ಸ್ಅಪ್‌ಗೆ ಅಲ್ಲ. ದಯವಿಟ್ಟು ಈ ಇಮೇಲ್ ಅನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
    firstName: "ಮೊದಲ ಹೆಸರು *",
    initials: "ಇನಿಷಿಯಲ್ಸ್",
    initialsHelper: "ಅಧಿಕೃತ ದಾಖಲೆಗಳಲ್ಲಿ ಬಳಸಿದರೆ ನಿಮ್ಮ ತಂದೆ/ಪತಿಯ ಇನಿಷಿಯಲ್.",
    age: "ವಯಸ್ಸು",
    gender: "ಲಿಂಗ",
    genderSelect: "ಆಯ್ಕೆಮಾಡಿ",
    genderFemale: "ಮಹಿಳೆ",
    genderMale: "ಪುರುಷ",
    genderOther: "ಇತರೆ",
    genderPreferNot: "ಹೇಳಲು ಇಚ್ಛಿಸುವುದಿಲ್ಲ",
    whatsapp: "ವಾಟ್ಸ್ಅಪ್ / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *",
    whatsappHelper: "ದೇಶದ ಕೋಡ್ ಸಹಿತ, ಉದಾ. +91XXXXXXXXXX.",
    heartfulnessId: "Heartfulness / ಅಭ್ಯಾಸಿ ಐಡಿ",
    heartfulnessIdHelper: "ಇನ್ನೂ ಇಲ್ಲದಿದ್ದರೆ ಖಾಲಿ ಬಿಡಿ.",
    center: "ನಿಮ್ಮ Heartfulness ಕೇಂದ್ರ *",
    zone: "ವಲಯ",
    english: "ನೀವು ಇಂಗ್ಲಿಷ್ ತಿಳಿದಿದ್ದೀರಾ? *",
    whatsappGroup: "ಈ ಕಾರ್ಯಕ್ರಮದ ವಾಟ್ಸ್ಅಪ್ ಗುಂಪಿಗೆ ಸೇರಲು ನೀವು ಸಿದ್ಧರಿದ್ದೀರಾ? *",
    whatsappGroupHelper: "ಕಾರ್ಯಕ್ರಮದ ಸಮಯದಲ್ಲಿ ಜ್ಞಾಪನೆಗಳು ಮತ್ತು ಸಮನ್ವಯಕ್ಕಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ.",
    sessionConsent: "ನನ್ನ ಸಾಮರ್ಥ್ಯದ ಮಟ್ಟಿಗೆ ಈ ಕಾರ್ಯಕ್ರಮದ ಎಲ್ಲಾ ಅಧಿವೇಶನಗಳಿಗೆ ಹಾಜರಾಗಲು ಬದ್ಧನಾಗಿದ್ದೇನೆ/ಬದ್ಧಳಾಗಿದ್ದೇನೆ. *",
    videoConsent: "ನೇರ ಅಧಿವೇಶನಗಳ ಸಮಯದಲ್ಲಿ ನನ್ನ ವೀಡಿಯೊವನ್ನು ಆನ್‌ನಲ್ಲಿ ಇರಿಸಲು ಒಪ್ಪುತ್ತೇನೆ. *",
    contactConsent: "ಈ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ಕಾರ್ಯಕ್ರಮ ತಂಡವು ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಲು ಒಪ್ಪುತ್ತೇನೆ. *",
    commentsLabel: "ಹೆಚ್ಚುವರಿ ಕಾಮೆಂಟ್‌ಗಳು (ಐಚ್ಛಿಕ)",
    commentsHelper: "ಕಾರ್ಯಕ್ರಮ ತಂಡ ತಿಳಿದುಕೊಳ್ಳಬೇಕಾದ ಬೇರೆ ಏನಾದರೂ.",
    disclaimerConsent:
      "ನಾನು [LINK]Event Disclaimer and Social Media Policy[/LINK] ಮತ್ತು [TERMS]heartfulness.org/us/terms[/TERMS] ನಲ್ಲಿನ ನಿಯಮಗಳನ್ನು ಓದಿದ್ದೇನೆ ಮತ್ತು ಒಪ್ಪುತ್ತೇನೆ. ನಾನು ಕನಿಷ್ಠ 18 ವರ್ಷ ವಯಸ್ಸನ್ನು ತಲುಪಿದ್ದೇನೆ ಎಂದು ದೃಢೀಕರಿಸುತ್ತೇನೆ ಮತ್ತು ಈ ಕಾರ್ಯಕ್ರಮದ ರೆಕಾರ್ಡಿಂಗ್‌ಗಳನ್ನು ಮಾಡಲು ಒಪ್ಪುತ್ತೇನೆ. *",
    disclaimerShort: "ಹಕ್ಕುನಿರಾಕರಣೆ ಸಮ್ಮತಿ",
    submitButton: "ನೋಂದಣಿ ಸಲ್ಲಿಸಿ",
    submittingText: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ... ದಯವಿಟ್ಟು ಕಾಯಿರಿ",
    successTitle: "ನೋಂದಣಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ!",
    successMessage: "ನೋಂದಾಯಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ಕಾರ್ಯಕ್ರಮ ಪ್ರಾರಂಭದ ದಿನಾಂಕದ ಹತ್ತಿರ ದೃಢೀಕರಣವನ್ನು ನಿಮ್ಮ ಇಮೇಲ್‌ಗೆ ಕಳುಹಿಸಲಾಗುವುದು.",
    errorRequired: "ಅಗತ್ಯವಿರುವ ಕ್ಷೇತ್ರಗಳು ಕಾಣೆಯಾಗಿವೆ:",
    networkError: "ನೆಟ್‌ವರ್ಕ್ ದೋಷ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    select: "ಆಯ್ಕೆಮಾಡಿ",
    yes: "ಹೌದು",
    no: "ಇಲ್ಲ",
    optional: "ಐಚ್ಛಿಕ",
  },
};
