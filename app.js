// ==========================================
// 1. قواعد البيانات المحلية (الأحاديث والمقولات)
// ==========================================
const hadithDB = [
    {
        text: "« أَنَا عِنْدَ ظَنِّ عَبْدِي بِي... »",
        thought: "حديث قدسي يختصر فلسفة النجاة؛ ظن بالله خيراً تجده، وظن به الجبر فيجبرك، الكون كله يتحرك بناءً على يقين قلبك.",
        source: "صحيح البخاري - حديث قدسي"
    },
    {
        text: "« عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ... »",
        thought: "لا يوجد خسارة في قاموس المؤمن.. إن أُعطي شكر فكان خيراً له، وإن مُنع أو ابتُلي صبر فكان خيراً له. معادلة لا تُهزم.",
        source: "صحيح مسلم"
    },
    {
        text: "« لَوْ أَنَّكُمْ تَتَوَكَّلُونَ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرَزَقَكُمْ كَمَا يَرْزُقُ الطَّيْرَ... »",
        thought: "الطيور لا تملك أرصدة في البنوك ولا تخطط للغد، تغدو خماصاً وتعود بطاناً.. رزقك يبحث عنك أكثر مما تبحث عنه، فقط توكل سعياً ويقيناً.",
        source: "سنن الترمذي - حديث صحيح"
    },
    {
        text: "« احْفَظِ اللَّهَ يَحْفَظْكَ، احْفَظِ اللَّهَ تَجِدْهُ تُجَاهَكَ... »",
        thought: "قاعدة ذهبية للحياة: من جعل الله في قلبه وحفظ حدوده في خلواته، سخر الله له الكون كله، وجعل الملائكة حراساً لمسيرته.",
        source: "سنن الترمذي - حديث حسن صحيح"
    },
    {
        text: "« الدُّعَاءُ هُوَ الْعِبَادَةُ »",
        thought: "الدعاء ليس طلباً عابراً، بل هو اعترافك بالضعف وتعلقك بالقوة الأعظم. فيه توحيد وتواضع وثقة تجعل الإنسان في أسمى مراتب العبودية.",
        source: "سنن الترمذي - حديث حسن"
    }
];

const quotesDB = [
    {
        text: "« لا شيء أثقل على النفس من كلمات لم تُقل. »",
        thought: "الصمت ليس دائماً علامة على الرضا، أحياناً يكون مقبرة للروح، ندفن فيها عتاباً لو خرج لأحرق الأخضر واليابس.",
        source: "فيودور دوستويفسكي"
    },
    {
        text: "« إنما الناس بحار، فلا تحكم على أعماقهم وأنت لا ترى إلا شواطئهم. »",
        thought: "خلف كل وجه هادئ تراه، عواصف ومعارك لا يعلمها إلا الله.. كن لطيفاً، فالكل يخوض حرباً لا تعرف عنها شيئاً.",
        source: "شمس التبريزي"
    },
    {
        text: "« المهزوم إذا ابتسم، أفقد المنتصر لذة الفوز. »",
        thought: "الابتسامة في وجه العواصف والصفعات هي أقوى دروعك، إنها الرسالة الصامتة التي تقول: 'أنا لم أنكسر بعد'.",
        source: "وليم شكسبير"
    },
    {
        text: "« لا تحاول أن تقاوم التغييرات التي تعترض سبيلك، بل دع الحياة تعيش فيك. »",
        thought: "المرونة هي سر البقاء.. الشجرة التي تنحني للريح تنجو، بينما التي تتصلب تنكسر من جذورها.",
        source: "جلال الدين الرومي"
    },
    {
        text: "« الحب الحقيقي لا يُبحث عنه، بل يجدك وأنت لا تتوقع. »",
        thought: "في لحظة ما، ستجد نفسك تحب شخصاً بلا سبب منطقي، فقط لأن القلب قرر أن هذا الشخص يستحق كل ما بداخلك.",
        source: "تشارلز ديكنز"
    }
];

// ==========================================
// 2. دوال الجلب وتغيير الخطوط
// ==========================================

// أ) جلب القرآن من API (يستخدم خط Amiri Quran)
async function fetchQuranAPI() {
    const btn = document.querySelector('.quran-btn');
    btn.innerText = "⏳ جاري الجلب...";
    btn.disabled = true;

    try {
        const randomVerseNumber = Math.floor(Math.random() * 6236) + 1;
        const response = await fetch(`https://api.alquran.cloud/v1/ayah/${randomVerseNumber}/editions/quran-uthmani,ar.muyassar`);
        const data = await response.json();

        if (data.code === 200) {
            document.getElementById('mainTextInput').value = `﴿ ${data.data[0].text} ﴾`;
            document.getElementById('commentaryInput').value = data.data[1].text;
            document.getElementById('sourceInput').value = `${data.data[0].surah.name} - آية ${data.data[0].numberInSurah}`;
            // تغيير الخط للرسم العثماني
            document.getElementById('mainTextDisplay').style.fontFamily = "'Amiri Quran', serif";
            updatePreview();
        }
    } catch (error) {
        alert('فشل الاتصال بخادم القرآن الكريم.');
        console.error('Error fetching Quran:', error);
    } finally {
        btn.innerText = "📖 آية عشوائية وتفسير (API)";
        btn.disabled = false;
    }
}

// ب) جلب الحديث النبوي (يستخدم خط Amiri الأنيق)
function fetchHadith() {
    const randomIndex = Math.floor(Math.random() * hadithDB.length);
    const data = hadithDB[randomIndex];

    document.getElementById('mainTextInput').value = data.text;
    document.getElementById('commentaryInput').value = data.thought;
    document.getElementById('sourceInput').value = data.source;

    // تغيير الخط ليناسب النصوص العادية بلمسة تراثية فخمة
    document.getElementById('mainTextDisplay').style.fontFamily = "'Amiri', serif";
    updatePreview();
}

// ج) جلب المقولات العميقة (يستخدم خط Amiri الأنيق)
function fetchQuote() {
    const randomIndex = Math.floor(Math.random() * quotesDB.length);
    const data = quotesDB[randomIndex];

    document.getElementById('mainTextInput').value = data.text;
    document.getElementById('commentaryInput').value = data.thought;
    document.getElementById('sourceInput').value = data.source;

    // تغيير الخط ليناسب النصوص العادية بلمسة تراثية فخمة
    document.getElementById('mainTextDisplay').style.fontFamily = "'Amiri', serif";
    updatePreview();
}

// ==========================================
// 3. التحديث المباشر وتجميع الصورة
// ==========================================
function updatePreview() {
    document.getElementById('mainTextDisplay').innerText = document.getElementById('mainTextInput').value;
    document.getElementById('commentaryDisplay').innerText = document.getElementById('commentaryInput').value;
    document.getElementById('sourceDisplay').innerText = document.getElementById('sourceInput').value;

    const verseSize = document.getElementById('verseSize').value;
    const commentarySize = document.getElementById('commentarySize').value;
    document.getElementById('mainTextDisplay').style.fontSize = verseSize + 'px';
    document.getElementById('commentaryDisplay').style.fontSize = commentarySize + 'px';
}

function compileImage() {
    const btn = document.querySelector('.compile-btn');
    const originalText = btn.innerText;
    btn.innerText = "⏳ جاري المعالجة...";
    btn.disabled = true;

    document.fonts.ready.then(() => {
        const node = document.getElementById('capture-node');
        html2canvas(node, {
            scale: 3,
            backgroundColor: null,
            useCORS: true,
            allowTaint: false,
            logging: false
        }).then(canvas => {
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.download = `Fekr_Moshawash_${Date.now()}.png`;
            link.href = image;
            link.click();
            btn.innerText = originalText;
            btn.disabled = false;
        }).catch(err => {
            console.error('Error capturing image:', err);
            btn.innerText = "❌ فشل التقاط الصورة";
            btn.disabled = false;
            setTimeout(() => {
                btn.innerText = originalText;
            }, 2000);
        });
    });
}

// تشغيل التحديث مبدئياً لضبط الأبعاد
document.addEventListener('DOMContentLoaded', () => {
    updatePreview();
});

// تسجيل Service Worker للدعم Offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}
