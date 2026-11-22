// --- DURUM YÖNETİMİ (LocalStorage ile İlerleme Koruma) ---
let appState = JSON.parse(localStorage.getItem('3rdYearUniverseState')) || {
    discoveredIds: [],
    completedMissions: {}, // { "mission-1": [true, false, true] }
    quizAnswers: {},       // { 1: 3, 2: 1 }
    milestonesShown: [],   // [100, 250, 450, 600]
    secretClicks: 0
};

let navigationHistory = [];

function saveState() {
    localStorage.setItem('3rdYearUniverseState', JSON.stringify(appState));
    updateTopCounter();
}

// --- BAŞLATMA ---
document.addEventListener('DOMContentLoaded', () => {
    startAmbientSymbols();
    updateTopCounter();

    // Karşılama Butonu -> İki Katmanlı Perde Geçişi
    document.getElementById('enter-universe-btn').addEventListener('click', () => {
        spawnSymbolBurst(25, ['♥', '✦', '✧', '✿']);
        const c1 = document.getElementById('curtain-layer-1');
        const c2 = document.getElementById('curtain-layer-2');
        c1.classList.add('curtain-active');
        c2.classList.add('curtain-active');

        setTimeout(() => {
            document.getElementById('welcome-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('welcome-screen').classList.add('hidden');
                document.getElementById('main-universe').classList.remove('hidden');
                navigateTo('home');
                c1.classList.remove('curtain-active');
                c2.classList.remove('curtain-active');
            }, 400);
        }, 650);
    });

    // Kalp Patlat Butonu
    document.getElementById('burst-hearts-btn').addEventListener('click', () => {
        spawnSymbolBurst(18, ['♥', '♡', '✦', '✧', '❖', '✿', '✨']);
    });

    // Azaltılmış Animasyon Seçeneği
    document.getElementById('reduce-motion-btn').addEventListener('click', () => {
        document.body.classList.toggle('reduce-motion');
    });
});

// --- KEŞİF SAYACI VE EŞİK SÜRPRİZLERİ (100, 250, 450, 600) ---
function markDiscovered(contentId) {
    if (!appState.discoveredIds.includes(contentId)) {
        appState.discoveredIds.push(contentId);
        saveState();
        checkMilestones(appState.discoveredIds.length);
    }
}

function updateTopCounter() {
    document.getElementById('discovery-count').textContent = appState.discoveredIds.length;
}

function checkMilestones(count) {
    const milestones = {
        100: { emoji: "💖", title: "100 Keşif Tamamlandı!", msg: "100 küçük kapı açıldı ama sana söyleyeceklerim hâlâ bitmedi. ❤️" },
        250: { emoji: "💜", title: "250 Keşif!", msg: "250 keşif! Benim dünyamın yarısını bile henüz görmedin." },
        450: { emoji: "🌟", title: "450 Yıldız Parladı!", msg: "450 kez gülümsedin, düşündün veya keşfettin. İyi ki bu yolculuktasın." },
        600: { emoji: "👑❤️", title: "600 / 600 BÜYÜK FİNAL!", msg: "600 kapının tamamını açtın. Ama bilmeni istediğim bir şey var: Sana anlatacaklarım hiçbir sayıya sığmaz. Üçüncü yılımız kutlu olsun, iyi ki varsın. ❤️" }
    };

    if (milestones[count] && !appState.milestonesShown.includes(count)) {
        appState.milestonesShown.push(count);
        saveState();
        spawnSymbolBurst(35, ['♥', '✦', '✨', '✿']);
        showModal(milestones[count].emoji, milestones[count].title, milestones[count].msg);
    }
}

// --- İKLİM DEĞİŞTİRİCİ ---
function setClimate(climateKey, label) {
    document.body.className = document.body.classList.contains('reduce-motion') 
        ? `climate-${climateKey} reduce-motion` 
        : `climate-${climateKey}`;
    document.getElementById('active-climate-name').textContent = label;
}

// --- BAĞIMSIZ SAYFA YÖNLENDİRME MOTORU ---
function navigateTo(route, param = null, isBack = false) {
    if (!isBack) {
        navigationHistory.push({ route, param });
    }
    spawnSymbolBurst(8, ['♥', '✦', '✧']);
    const viewport = document.getElementById('page-viewport');
    viewport.style.animation = 'none';
    viewport.offsetHeight; // Reflow tetikle
    viewport.style.animation = 'pageFadeUp 0.45s ease forwards';

    if (route === 'home') renderHomePage(viewport);
    else if (route === 'climate') renderClimatePage(viewport, param);
    else if (route === 'mission') renderMissionDetailPage(viewport, param);
    else if (route === 'quiz') renderQuizPage(viewport, param || 0);
    else if (route === 'quiz-result') renderQuizResultPage(viewport);
    else if (route === 'category') renderCategoryPage(viewport, param);
    else if (route === 'item') renderItemDetailPage(viewport, param);
}

function goBack() {
    if (navigationHistory.length > 1) {
        navigationHistory.pop();
        const prev = navigationHistory[navigationHistory.length - 1];
        navigateTo(prev.route, prev.param, true);
    } else {
        navigateTo('home');
    }
}

function renderNavHeader() {
    return `
        <div class="nav-controls">
            <button class="btn-nav" onclick="goBack()">← Geri Dön</button>
            <button class="btn-nav" onclick="navigateTo('home')">⌂ Ana Evren</button>
        </div>
    `;
}

// --- 1. ANA SAHNE RENDER ---
function renderHomePage(container) {
    setClimate('default', 'Evren Merkezi');
    container.innerHTML = `
        <div style="text-align:center; margin-bottom:35px;">
            <h2 class="font-romantic" style="font-size:2rem;">"600 küçük kapı, binlerce duygu, üç yıllık hikâye… Ve hepsinin en güzel tarafı sensin. ❤️"</h2>
        </div>

        <h3 class="font-punchy">Dört Renk İklimi Seç</h3>
        <div class="grid-4">
            <div class="universe-card" style="border-color:#ff477e;" onclick="navigateTo('climate', 'pink')">
                <h3>🌸 Pembe & Mercan</h3>
                <p>Flört, neşe, tatlı takılmalar ve romantik kıvılcımlar.</p>
            </div>
            <div class="universe-card" style="border-color:#a855f7;" onclick="navigateTo('climate', 'purple')">
                <h3>🌙 Mor & Eflatun</h3>
                <p>Derin konuşmalar, duygusal itiraflar, gece sohbetleri ve özlem.</p>
            </div>
            <div class="universe-card" style="border-color:#f59e0b;" onclick="navigateTo('climate', 'gold')">
                <h3>☀️ Turuncu & Altın</h3>
                <p>Enerji, kahkaha, macera ve gelecek hayalleri.</p>
            </div>
            <div class="universe-card" style="border-color:#10b981;" onclick="navigateTo('climate', 'mint')">
                <h3>🍃 Nane Yeşili & Buz Mavisi</h3>
                <p>Huzur, güven, sığınma hissi ve "Yanındayım" mesajları.</p>
            </div>
        </div>

        <h3 class="font-punchy" style="margin-top:40px;">Dört Özel İlişki Görev Kartı</h3>
        <div class="grid-4">
            ${MISSION_CARDS.map(m => {
                const doneCount = (appState.completedMissions[m.id] || []).filter(Boolean).length;
                const isComplete = doneCount === 3;
                return `
                    <div class="universe-card" onclick="navigateTo('mission', '${m.id}')">
                        ${isComplete ? '<span class="completed-stamp">✓ Tamamlandı</span>' : ''}
                        <small>${m.themeColor}</small>
                        <h4 style="margin:8px 0;">${m.title}</h4>
                        <p style="font-size:0.9rem;">İlerleme: ${doneCount} / 3 Görev</p>
                    </div>
                `;
            }).join('')}
        </div>

        <h3 class="font-punchy" style="margin-top:40px;">Özel Etkileşim & 600 Parçalık Arşiv Kapıları</h3>
        <div class="grid-4">
            <div class="universe-card" style="border-width:3px;" onclick="navigateTo('quiz', 0)">
                <h4>❤️ Beni Ne Kadar Tanıyorsun?</h4>
                <p>11 Kişisel Soru • Anında Tepkili Bilgi Yarışması</p>
            </div>
            <div class="universe-card" onclick="openRandomUnseenItem()">
                <h4>🎲 Rastgele Sürpriz Kapı Aç</h4>
                <p>Daha önce görmediğin bir içeriğe ışınlan!</p>
            </div>
            <div class="universe-card" id="secret-triple-card" onclick="handleTripleSecretClick()">
                <h4>🔒 Kilitli Gizli Zarf</h4>
                <p>İpucu: Kilidi kırmak için buraya 3 kez dokun...</p>
            </div>
            ${UNIVERSE_CATEGORIES.map(cat => `
                <div class="universe-card" onclick="navigateTo('category', '${cat.id}')">
                    <h4>${cat.title}</h4>
                    <p style="font-size:0.88rem; margin-top:6px;">${cat.desc}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// --- 2. RENK İKLİMİ SAYFASI ---
function renderClimatePage(container, climateKey) {
    const info = {
        pink: { name: "Pembe & Mercan İklimi", desc: "Flört, neşe, tatlı takılmalar ve romantik kıvılcımların diyarı." },
        purple: { name: "Mor & Eflatun İklimi", desc: "Derin konuşmalar, gece sohbetleri ve birbirimizi anlamanın huzuru." },
        gold: { name: "Turuncu & Altın İklimi", desc: "Bitmeyen enerjimiz, kahkahalarımız ve ortak maceralarımız." },
        mint: { name: "Nane Yeşili & Buz Mavisi İklimi", desc: "En güvenli limanım, sakinliğim ve 'her zaman yanındayım' sözüm." }
    }[climateKey];

    setClimate(climateKey, info.name);
    const filteredCats = UNIVERSE_CATEGORIES.filter(c => c.climate === climateKey);

    container.innerHTML = `
        ${renderNavHeader()}
        <h1>${info.name}</h1>
        <p class="font-romantic" style="margin:15px 0 30px;">${info.desc}</p>
        <div class="grid-4">
            ${filteredCats.map(cat => `
                <div class="universe-card" onclick="navigateTo('category', '${cat.id}')">
                    <h3>${cat.title}</h3>
                    <p>${cat.desc}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// --- 3. İLİŞKİ GÖREV KARTI DETAY SAYFASI ---
function renderMissionDetailPage(container, missionId) {
    const mission = MISSION_CARDS.find(m => m.id === missionId);
    setClimate(mission.climate, mission.themeColor);
    if (!appState.completedMissions[missionId]) appState.completedMissions[missionId] = [false, false, false];

    const statuses = appState.completedMissions[missionId];
    const allDone = statuses.every(Boolean);

    container.innerHTML = `
        ${renderNavHeader()}
        <div class="universe-card" style="cursor:default;">
            <h2>${mission.title}</h2>
            <p class="font-romantic" style="margin:20px 0;">"${mission.motivation}"</p>
            
            <div style="display:flex; flex-direction:column; gap:14px; margin:25px 0;">
                ${mission.tasks.map((t, idx) => `
                    <label style="display:flex; align-items:center; gap:12px; padding:15px; border-radius:12px; background:rgba(0,0,0,0.12); cursor:pointer;">
                        <input type="checkbox" ${statuses[idx] ? 'checked' : ''} onchange="toggleMissionTask('${missionId}', ${idx})" style="width:22px; height:22px;">
                        <span style="font-size:1.05rem;"><strong>Görev ${idx + 1}:</strong> ${t}</span>
                    </label>
                `).join('')}
            </div>

            ${allDone ? `
                <div class="font-secret" style="margin-top:25px;">
                    <h3>${mission.rewardTitle}</h3>
                    <p style="margin-top:10px;">${mission.rewardMessage}</p>
                </div>
            ` : `<p style="opacity:0.8;">🔒 Ödül mektubunu açmak için 3 görevi de tamamla ve işaretle.</p>`}
        </div>
    `;
}

function toggleMissionTask(missionId, index) {
    appState.completedMissions[missionId][index] = !appState.completedMissions[missionId][index];
    saveState();
    if (appState.completedMissions[missionId].every(Boolean)) {
        spawnSymbolBurst(25, ['♥', '🥳', '✨', '✿']);
        // 4 Kartın tamamı bittiyse büyük kutlama
        const allFourDone = MISSION_CARDS.every(m => (appState.completedMissions[m.id] || []).every(Boolean));
        if (allFourDone) {
            showModal("🏆❤️", "Dört İlişki Görevinin Tamamı Bitti!", "Üç yılımızı daha da güçlendiren bütün görevleri tamamladın. Seninle her yolculuk mükemmel!");
        }
    }
    renderMissionDetailPage(document.getElementById('page-viewport'), missionId);
}

// --- 4. KİŞİSEL BİLGİ YARIŞMASI (11 SORU) ---
function renderQuizPage(container, qIndex) {
    setClimate('pink', 'Kişisel Bilgi Yarışması');
    const q = PERSONAL_QUIZ_DATA[qIndex];
    const savedAnswer = appState.quizAnswers[q.id];

    container.innerHTML = `
        ${renderNavHeader()}
        <div class="universe-card" style="cursor:default; max-width:750px; margin:0 auto;">
            <span class="climate-badge">Soru ${qIndex + 1} / ${PERSONAL_QUIZ_DATA.length}</span>
            <h2 style="margin:15px 0;">Bakalım Beni Gerçekten Ne Kadar Tanıyorsun? ❤️</h2>
            <p style="opacity:0.9; margin-bottom:20px;">Üç yıldır hayatımdasın ama bakalım benim küçük detaylarımı ne kadar iyi hatırlıyorsun?</p>
            
            <h3 class="font-punchy" style="font-size:1.5rem; margin:20px 0;">${q.question}</h3>
            
            <div class="quiz-options">
                ${q.options.map((opt, idx) => {
                    let extraClass = '';
                    if (savedAnswer !== undefined) {
                        if (idx === q.correctIndex) extraClass = 'correct';
                        else if (idx === savedAnswer) extraClass = 'wrong';
                    }
                    return `<button class="quiz-option-btn ${extraClass}" ${savedAnswer !== undefined ? 'disabled' : ''} onclick="answerQuiz(${qIndex}, ${idx})">${opt}</button>`;
                }).join('')}
            </div>

            <div id="quiz-feedback" style="margin-top:25px;">
                ${savedAnswer !== undefined ? renderQuizFeedbackHTML(q, savedAnswer === q.correctIndex, qIndex) : ''}
            </div>
        </div>
    `;
}

function answerQuiz(qIndex, selectedIdx) {
    const q = PERSONAL_QUIZ_DATA[qIndex];
    appState.quizAnswers[q.id] = selectedIdx;
    saveState();

    const isCorrect = selectedIdx === q.correctIndex;
    if (isCorrect) {
        spawnSymbolBurst(22, ['🥳', '♥', '✦', '✨']);
    } else {
        spawnSymbolBurst(18, ['😠', '💢', '♥']);
    }
    renderQuizPage(document.getElementById('page-viewport'), qIndex);
}

function renderQuizFeedbackHTML(q, isCorrect, qIndex) {
    const nextBtn = qIndex + 1 < PERSONAL_QUIZ_DATA.length
        ? `<button class="btn-primary" onclick="navigateTo('quiz', ${qIndex + 1})">Sonraki Soruya Geç →</button>`
        : `<button class="btn-primary" onclick="navigateTo('quiz-result')">Test Sonucunu Gör 🏆</button>`;

    if (isCorrect) {
        return `
            <div style="padding:20px; border-radius:16px; background:rgba(16,185,129,0.2); border:1px solid #10b981;">
                <div style="font-size:3rem;">🥳</div>
                <h3>DOĞRU BİLDİİİN! ❤️ Beni gerçekten tanıyorsun!</h3>
                <p style="margin-top:8px;">${q.correctNote}</p>
                ${nextBtn}
            </div>
        `;
    } else {
        return `
            <div style="padding:20px; border-radius:16px; background:rgba(239,68,68,0.2); border:1px solid #ef4444;">
                <div style="font-size:3rem;">😠</div>
                <h3>YANLIŞ BİLDİNN! 😤 Bunu nasıl bilemezsin?</h3>
                <p style="margin-top:8px;">Doğru Cevap: <strong>${q.options[q.correctIndex]}</strong>. ${q.wrongNote}</p>
                ${nextBtn}
            </div>
        `;
    }
}

function renderQuizResultPage(container) {
    let correctCount = 0;
    PERSONAL_QUIZ_DATA.forEach(q => {
        if (appState.quizAnswers[q.id] === q.correctIndex) correctCount++;
    });
    const total = PERSONAL_QUIZ_DATA.length;
    const wrongCount = total - correctCount;
    const percent = Math.round((correctCount / total) * 100);

    let resultMsg = "";
    if (correctCount >= 10) resultMsg = "BENİ GERÇEKTEN ÇOK İYİ TANIYORSUN! 🥹❤️ Üç yılda bütün küçük detaylarımı bile öğrenmişsin. İyi ki benimlesin!";
    else if (correctCount >= 7) resultMsg = "Fena değilsin aşkım! Ama hâlâ keşfedeceğin küçük sırlarım var. Daha çok zamanımız var. ❤️";
    else if (correctCount >= 4) resultMsg = "Biraz daha dikkat etmen gerekiyor! 😤 Ama seni sevdiğim için bir şans daha veriyorum.";
    else resultMsg = "YOK ARTIK! 😠 Beni biraz daha tanıman gerekiyor. Telafi görevin: Bana üç güzel iltifat et!";

    container.innerHTML = `
        ${renderNavHeader()}
        <div class="universe-card" style="text-align:center; max-width:650px; margin:0 auto; cursor:default;">
            <h2>Test Sonuç Ekranı</h2>
            <p style="font-size:1.3rem; margin:15px 0;">Toplam: ${total} | Doğru: <strong>${correctCount}</strong> | Yanlış: ${wrongCount} | Başarı: <strong>%${percent}</strong></p>
            <p class="font-romantic" style="margin:20px 0;">${resultMsg}</p>
            <button class="btn-magic-gradient" onclick="showModal('💌', 'Özel Yarışma Ödül Mektubun', 'Beni ne kadar tanıdığını test ettik ama asıl önemli olan seni her gün yeniden sevmek. Üçüncü yılımız kutlu olsun her şeyim! ❤️')">
                Ödülümü Almak İstiyorum ❤️
            </button>
        </div>
    `;
}

// --- 5. KATEGORİ VE 600 PARÇALIK İÇERİK SAYFALARI ---
function renderCategoryPage(container, catId) {
    const cat = UNIVERSE_CATEGORIES.find(c => c.id === catId);
    setClimate(cat.climate, cat.title);
    const items = ALL_600_ITEMS.filter(item => item.categoryId === catId);

    container.innerHTML = `
        ${renderNavHeader()}
        <h2>${cat.title}</h2>
        <p style="margin:10px 0 25px;">${cat.desc}</p>
        ${cat.type === 'jar' ? `<button class="btn-magic-gradient" style="margin-bottom:25px;" onclick="openRandomFromCategory('${catId}')">🎲 Kavanozdan Rastgele Bir Şey Çek</button>` : ''}
        <div class="grid-4">
            ${items.map(item => {
                const isSeen = appState.discoveredIds.includes(item.id);
                return `
                    <div class="universe-card" onclick="navigateTo('item', '${item.id}')">
                        ${isSeen ? '<span class="completed-stamp">Keşfedildi ✓</span>' : ''}
                        <h4>${item.title}</h4>
                        <p style="font-size:0.85rem; margin-top:8px;">Kapıyı açmak için tıkla →</p>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderItemDetailPage(container, itemId) {
    const item = ALL_600_ITEMS.find(i => i.id === itemId);
    setClimate(item.climate, item.categoryTitle);
    markDiscovered(item.id); // İlk kez açılıyorsa 600 sayacını +1 artırır

    let bodyHTML = `<p class="font-romantic" style="margin:25px 0;">${item.text}</p>`;

    // Çok Aşamalı 3 Adımlı İtiraf Kartı
    if (item.type === 'layered') {
        bodyHTML = `
            <div style="margin:25px 0; display:flex; flex-direction:column; gap:15px;">
                <div class="font-secret"><strong>1. Aşama:</strong> ${item.step1}</div>
                <button class="btn-nav" onclick="document.getElementById('layer-2').classList.remove('hidden'); this.remove();">2. Aşamayı Aç ↓</button>
                <div id="layer-2" class="font-secret hidden"><strong>2. Aşama:</strong> ${item.step2}
                    <br><button class="btn-nav" style="margin-top:10px;" onclick="document.getElementById('layer-3').classList.remove('hidden'); this.remove();">Asıl İtirafı Gör ❤️ ↓</button>
                </div>
                <div id="layer-3" class="font-romantic hidden" style="padding:20px; border:2px dashed var(--accent-color); border-radius:16px;">${item.step3}</div>
            </div>
        `;
    }

    // İkili Seçim Düellosu
    if (item.type === 'choice') {
        bodyHTML = `
            <p style="margin:15px 0;">Hangisi daha çok biz? Seçimini yap:</p>
            <div class="quiz-options">
                <button class="quiz-option-btn" onclick="alert('Harika seçim! Seninle her anı yaşamaya hazırım ❤️')">${item.optionA}</button>
                <button class="quiz-option-btn" onclick="alert('Kesinlikle biz! İlk fırsatta bunu yapıyoruz ✨')">${item.optionB}</button>
            </div>
        `;
    }

    container.innerHTML = `
        ${renderNavHeader()}
        <div class="universe-card" style="cursor:default; max-width:760px; margin:0 auto;">
            <span class="climate-badge">${item.categoryTitle}</span>
            <h2 style="margin-top:15px;">${item.title}</h2>
            ${bodyHTML}
        </div>
    `;
}

// --- YARDIMCI ÖZELLİKLER (Rastgele Kapı, 3 Tıklamalı Sır, Kalp Patlaması) ---
function openRandomUnseenItem() {
    const unseen = ALL_600_ITEMS.filter(i => !appState.discoveredIds.includes(i.id));
    const pool = unseen.length > 0 ? unseen : ALL_600_ITEMS;
    const randomItem = pool[Math.floor(Math.random() * pool.length)];
    navigateTo('item', randomItem.id);
}

function openRandomFromCategory(catId) {
    const catItems = ALL_600_ITEMS.filter(i => i.categoryId === catId);
    const unseen = catItems.filter(i => !appState.discoveredIds.includes(i.id));
    const pool = unseen.length > 0 ? unseen : catItems;
    const randomItem = pool[Math.floor(Math.random() * pool.length)];
    navigateTo('item', randomItem.id);
}

function handleTripleSecretClick() {
    appState.secretClicks = (appState.secretClicks || 0) + 1;
    spawnSymbolBurst(6, ['✦', '♥']);
    if (appState.secretClicks >= 3) {
        appState.secretClicks = 0;
        spawnSymbolBurst(25, ['♥', '💌', '✨']);
        showModal("💌 Gizli Zarf Açıldı!", "Üç Dokunuşluk Sır", "Bu gizli zarfı bulacağını biliyordum! Üç yıl boyunca kalbimin en güzel köşesinde hep sen vardın, bundan sonra da hep sen olacaksın. Seni çok seviyorum!");
    }
}

function showModal(emoji, title, message) {
    document.getElementById('modal-emoji').textContent = emoji;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    document.getElementById('celebration-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('celebration-modal').classList.add('hidden');
}

// Performans Dostu Kalp & Sembol Patlama Motoru
function spawnSymbolBurst(count, symbols) {
    if (document.body.classList.contains('reduce-motion')) return;
    const layer = document.getElementById('floating-symbols-layer');
    const colors = ['#ff4d8d', '#ffb703', '#c084fc', '#4cc9f0', '#fb7185', '#fde047'];

    for (let i = 0; i < count; i++) {
        const el = document.createElement('span');
        el.className = 'floating-item';
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.left = Math.random() * 94 + 'vw';
        el.style.top = (65 + Math.random() * 30) + 'vh';
        el.style.fontSize = (16 + Math.random() * 24) + 'px';
        el.style.color = colors[Math.floor(Math.random() * colors.length)];
        el.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
        layer.appendChild(el);

        setTimeout(() => el.remove(), 5000); // Tamamlanınca DOM'dan temizle
    }
}

function startAmbientSymbols() {
    setInterval(() => {
        if (!document.body.classList.contains('reduce-motion')) {
            spawnSymbolBurst(2, ['♥', '♡', '✦', '✧', '❖', '✿']);
        }
    }, 1800);
}