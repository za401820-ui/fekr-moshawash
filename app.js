// ==========================================
// 1. قواعد البيانات
// ==========================================

const hadithDB = [
    { text: "« أَنَا عِنْدَ ظَنِّ عَبْدِي بِي... »", thought: "حديث قدسي يختصر فلسفة النجاة؛ ظن بالله خيراً تجده، الكون كله يتحرك بناءً على يقين قلبك.", source: "صحيح البخاري" },
    { text: "« عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ »", thought: "لا يوجد خسارة في قاموس المؤمن.. معادلة لا تُهزم.", source: "صحيح مسلم" },
    { text: "« لَوْ أَنَّكُمْ تَتَوَكَّلُونَ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ »", thought: "الطيور لا تملك أرصدة في البنوك، رزقك يبحث عنك أكثر مما تبحث عنه.", source: "سنن الترمذي" }
];

const quotesDB = [
    { text: "« لا شيء أثقل على النفس من كلمات لم تُقل. »", thought: "الصمت ليس دائماً علامة على الرضا، أحياناً يكون مقبرة للروح.", source: "فيودور دوستويفسكي" },
    { text: "« إنما الناس بحار، فلا تحكم على أعماقهم »", thought: "خلف كل وجه هادئ، عواصف لا يعلمها إلا الله.. كن لطيفاً.", source: "شمس التبريزي" }
];

const tipsDB = [
    { title: "نصيحة ذهبية", text: "ابدأ يومك بدعاء صادق، وانهِ يومك برضا عن نفسك. الحياة ليست عن الكمال، بل عن المحاولة المستمرة.", source: "حكمة يومية" },
    { title: "نصيحة للصبر", text: "الصبر ليس تحملاً صامتاً، بل هو إيمان فعّال بأن الله يرى ويسمع ويستجيب. لا تيأس من رحمة الله.", source: "كلمة منتقاة" }
];

const storiesDB = [
    { title: "قصة الرجل الذي دعا", text: "كان هناك رجل فقير، دعا الله بصدق وإيمان. دعاؤه لم يكن عن الغنى، بل عن القوة على الحلال. فرزقه الله عملاً كريماً، وأعطاه حياة كريمة. والعبرة أن الدعاء الصادق لا يضيع أبداً.", source: "قصة مُلهمة" },
    { title: "قصة الصبر", text: "امرأة فقدت والديها في نفس اليوم، ظنّت أن حياتها انتهت. لكنها اختارت الصبر والدعاء. ومع الوقت، اكتشفت أن ألمها علّمها الرحمة، فأصبحت تساعد الأيتام. وحولت حزنها إلى نور يضيء لغيرها.", source: "درس من الحياة" }
];

const infoDBDB = [
    { title: "معلومة إسلامية", text: "هل تعلم أن الابتسامة في وجه أخيك صدقة؟ نعم، لأنك بابتسامتك تزيل عنه الهم وتدخل السرور إلى قلبه. الكلمة الطيبة أيضاً صدقة، والعلم الذي تشاركه حكمة صدقة.", source: "فائدة دينية" },
    { title: "معلومة عن الدعاء", text: "أفضل وقت للدعاء هو في السجود. قال النبي صلى الله عليه وسلم: 'أقرب ما يكون العبد من ربه وهو ساجد'. فاجعل سجودك حوار مع الله، ليس مجرد حركة.", source: "تذكرة ربانية" }
];

const challengesDB = [
    { title: "تحدي: قراءة آية يومياً", text: "اقرأ آية من القرآن الكريم كل صباح، وتدبر معناها. لا تسعَ لقراءة الكثير، بل افهم القليل. جودة الفهم أفضل من كثرة القراءة.", source: "تحدي روحي" },
    { title: "تحدي: صدقة يومية", text: "تصدق بشيء كل يوم، حتى لو بابتسامة. الصدقة لا تقتصر على المال، بل تشمل العلم والوقت والدعاء. جعل الله هذه الأيام حياتك أطيب.", source: "تحدي ديني" }
];

// ==========================================
// 2. نظام التنقل
// ==========================================

function switchSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(sectionName + '-section').classList.add('active');
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    if (sectionName === 'todos') {
        todoApp.renderTodos();
    } else if (sectionName === 'misc') {
        miscApp.loadSavedMisc();
    }
}

// ==========================================
// 3. قسم المحتوى الإسلامي
// ==========================================

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
            document.getElementById('mainTextDisplay').style.fontFamily = "'Amiri Quran', serif";
            updatePreview();
        }
    } catch (error) {
        alert('فشل الاتصال بخادم القرآن الكريم.');
        console.error('Error:', error);
    } finally {
        btn.innerText = "📖 آية عشوائية (API)";
        btn.disabled = false;
    }
}

function fetchHadith() {
    const randomIndex = Math.floor(Math.random() * hadithDB.length);
    const data = hadithDB[randomIndex];
    document.getElementById('mainTextInput').value = data.text;
    document.getElementById('commentaryInput').value = data.thought;
    document.getElementById('sourceInput').value = data.source;
    document.getElementById('mainTextDisplay').style.fontFamily = "'Amiri', serif";
    updatePreview();
}

function fetchQuote() {
    const randomIndex = Math.floor(Math.random() * quotesDB.length);
    const data = quotesDB[randomIndex];
    document.getElementById('mainTextInput').value = data.text;
    document.getElementById('commentaryInput').value = data.thought;
    document.getElementById('sourceInput').value = data.source;
    document.getElementById('mainTextDisplay').style.fontFamily = "'Amiri', serif";
    updatePreview();
}

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
        html2canvas(node, { scale: 3, backgroundColor: null, useCORS: true, allowTaint: false, logging: false })
            .then(canvas => {
                const image = canvas.toDataURL("image/png");
                const link = document.createElement('a');
                link.download = `Fekr_Moshawash_${Date.now()}.png`;
                link.href = image;
                link.click();
                btn.innerText = originalText;
                btn.disabled = false;
            }).catch(err => {
                console.error('Error:', err);
                btn.innerText = "❌ فشل التقاط الصورة";
                btn.disabled = false;
                setTimeout(() => { btn.innerText = originalText; }, 2000);
            });
    });
}

// ==========================================
// 4. نظام المهام (Todos)
// ==========================================

class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.filter = 'all';
    }
    loadTodos() {
        const saved = localStorage.getItem('fekrMoshawashTodos');
        return saved ? JSON.parse(saved) : [];
    }
    saveTodos() {
        localStorage.setItem('fekrMoshawashTodos', JSON.stringify(this.todos));
    }
    addTodo(text, priority = 'medium') {
        if (!text.trim()) return;
        this.todos.push({
            id: Date.now(),
            text,
            priority,
            completed: false,
            createdAt: new Date().toLocaleDateString('ar-EG')
        });
        this.saveTodos();
        this.renderTodos();
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.renderTodos();
    }
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
        }
    }
    getFilteredTodos() {
        switch (this.filter) {
            case 'active': return this.todos.filter(t => !t.completed);
            case 'completed': return this.todos.filter(t => t.completed);
            default: return this.todos;
        }
    }
    renderTodos() {
        const todosList = document.getElementById('todosList');
        const filtered = this.getFilteredTodos();
        todosList.innerHTML = filtered.length === 0 ?
            '<div style="text-align: center; padding: 30px; color: var(--text-gray);">لا توجد مهام</div>' :
            filtered.map(todo => `
                <div class="todo-item ${todo.priority} ${todo.completed ? 'completed' : ''}">
                    <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} onchange="todoApp.toggleTodo(${todo.id})">
                    <div class="todo-text">${todo.text}</div>
                    <div class="todo-priority">${['low', 'medium', 'high'][['low', 'medium', 'high'].indexOf(todo.priority)]}</div>
                    <button class="todo-delete" onclick="todoApp.deleteTodo(${todo.id})">🗑 حذف</button>
                </div>
            `).join('');
        this.updateStats();
    }
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const remaining = total - completed;
        document.getElementById('totalTodos').innerText = total;
        document.getElementById('completedTodos').innerText = completed;
        document.getElementById('remainingTodos').innerText = remaining;
    }
}

const todoApp = new TodoApp();

function addTodo() {
    const input = document.getElementById('todoInput');
    const priority = document.getElementById('todoPriority').value;
    todoApp.addTodo(input.value, priority);
    input.value = '';
}

function filterTodos(filter) {
    todoApp.filter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    todoApp.renderTodos();
}

// ==========================================
// 5. قسم المنوعات
// ==========================================

class MiscApp {
    constructor() {
        this.saved = this.loadSaved();
    }
    loadSaved() {
        const saved = localStorage.getItem('fekrMoshawashMisc');
        return saved ? JSON.parse(saved) : [];
    }
    saveMisc() {
        localStorage.setItem('fekrMoshawashMisc', JSON.stringify(this.saved));
    }
    displayContent(title, text, source) {
        document.getElementById('miscTitle').innerText = title;
        document.getElementById('miscText').innerText = text;
        document.getElementById('miscSource').innerText = `📌 المصدر: ${source}`;
    }
    saveCurrent(title, text, source) {
        const item = { id: Date.now(), title, text, source };
        this.saved.unshift(item);
        if (this.saved.length > 20) this.saved.pop();
        this.saveMisc();
        this.loadSavedMisc();
    }
    loadSavedMisc() {
        const list = document.getElementById('savedMiscList');
        list.innerHTML = this.saved.length === 0 ?
            '<div style="text-align: center; padding: 20px; color: var(--text-gray);">لا توجد عناصر محفوظة</div>' :
            this.saved.map((item, idx) => `
                <div class="saved-item" onclick="miscApp.displayContent('${item.title.replace(/'/g, "\\'")}',' ${item.text.replace(/'/g, "\\'")}',' ${item.source.replace(/'/g, "\\'")}')">                    <div class="saved-item-title">${item.title}</div>
                    <div class="saved-item-text">${item.text.substring(0, 80)}...</div>
                </div>
            `).join('');
    }
}

const miscApp = new MiscApp();

function fetchTip() {
    const tip = tipsDB[Math.floor(Math.random() * tipsDB.length)];
    miscApp.displayContent(tip.title, tip.text, tip.source);
}

function fetchStory() {
    const story = storiesDB[Math.floor(Math.random() * storiesDB.length)];
    miscApp.displayContent(story.title, story.text, story.source);
}

function fetchInfo() {
    const info = infoDBDB[Math.floor(Math.random() * infoDBDB.length)];
    miscApp.displayContent(info.title, info.text, info.source);
}

function fetchChallenge() {
    const challenge = challengesDB[Math.floor(Math.random() * challengesDB.length)];
    miscApp.displayContent(challenge.title, challenge.text, challenge.source);
}

function loadSavedMisc() {
    miscApp.loadSavedMisc();
}

// التشغيل على التحميل
document.addEventListener('DOMContentLoaded', () => {
    updatePreview();
    todoApp.renderTodos();
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}
