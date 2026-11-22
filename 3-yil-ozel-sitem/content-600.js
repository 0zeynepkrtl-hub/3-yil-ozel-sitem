// 4 ADET ÖZEL İLİŞKİ GÖREV KARTI
const MISSION_CARDS = [
    {
        id: "mission-1",
        title: "BİRBİRİMİZE DAHA ÇOK YAKLAŞALIM",
        climate: "pink",
        themeColor: "Pembe & Mercan",
        motivation: "Bir ilişkiyi güzelleştiren şey yalnızca birlikte geçirilen zaman değil, birbirini her gün yeniden seçmektir. Bugün de birbirimizi seçelim. Çünkü seni tanımak, sevmek ve her gün yeniden keşfetmek benim için hâlâ çok özel.",
        tasks: [
            "Bana içinden gelen üç güzel şey söyle.",
            "Birlikte yapmak istediğin bir şeyi anlat.",
            "Bana bugün neden gülümsediğini söyle."
        ],
        rewardTitle: "Kalpten Teşekkür Notu ♥",
        rewardMessage: "Bu üç küçük adımı tamamladığın için teşekkür ederim. Seninle her gün yeniden yakınlaşmak hayatımın en güzel alışkanlığı. Seni çok seviyorum!"
    },
    {
        id: "mission-2",
        title: "BİRBİRİMİZİ DAHA İYİ TANIYALIM",
        climate: "purple",
        themeColor: "Mor & Eflatun",
        motivation: "Üç yıl geçti ama birbirimizi keşfetmek için hâlâ binlerce yeni sebebimiz var. Seni her gün biraz daha tanımak ve senin de beni keşfetmeni istiyorum.",
        tasks: [
            "Bana daha önce sormadığın bir soru sor.",
            "Benimle ilgili hatırladığın en küçük ayrıntıyı anlat.",
            "Birbirimizin en büyük hayallerini konuşalım."
        ],
        rewardTitle: "Gizli Sevgi Notu Açıldı ✦",
        rewardMessage: "Seninle konuşurken zamanın nasıl geçtiğini hiç anlamıyorum. Beni bu kadar ince detaylarla tanıdığın ve merak ettiğin için minnettarım."
    },
    {
        id: "mission-3",
        title: "BİRLİKTE GÜLELİM",
        climate: "gold",
        themeColor: "Turuncu & Altın",
        motivation: "Hayat her zaman kusursuz olmayabilir ama birlikte gülebiliyorsak her şey biraz daha güzel. Bazen en güzel anılarımızın hiçbir planı olmaz.",
        tasks: [
            "Bana komik bir lakap bul.",
            "Birlikte yapabileceğimiz saçma ama eğlenceli bir şey düşün.",
            "İlk fırsatta birlikte kahkaha atacağımız bir plan yap."
        ],
        rewardTitle: "Kahkaha ve Neşe Ödülü 🥳",
        rewardMessage: "Seninle kahkaha atmak dünyanın en iyi ilacı! Yüzümü her zaman güldürdüğün için iyi ki varsın."
    },
    {
        id: "mission-4",
        title: "GELECEĞİMİZİ HAYAL EDELİM",
        climate: "mint",
        themeColor: "Nane Yeşili & Buz Mavisi",
        motivation: "Üç yılın en güzel tarafı yalnızca geride bıraktıklarımız değil, önümüzde birlikte yaşayacağımız bütün güzel günler. Daha yaşayacağımız çok şey, kuracağımız çok hayal var.",
        tasks: [
            "Beş yıl sonraki bizi hayal et.",
            "Birlikte gitmek istediğin bir yeri söyle.",
            "Gelecekte gerçekleştirmek istediğin üç ortak hayalimizi yaz."
        ],
        rewardTitle: "Geleceğe Özel Mektup 💌",
        rewardMessage: "Bugün kurduğumuz bu hayallerin her birini el ele gerçekleştireceğimize inanıyorum. Nice üç yıllara, nice ortak yarınlara sevgilim!"
    }
];

// 600 PARÇALIK İÇERİK SİSTEMİ OLUŞTURUCU VE VERİ HAVUZU
const UNIVERSE_CATEGORIES = [
    { id: "love-notes", title: "100 Kısa Sevgi & Minnet Notu", count: 100, climate: "pink", type: "standard", desc: "Üçüncü yıla özel romantik itiraflar, teşekkürler ve tatlı takılmalar." },
    { id: "luck-jar", title: "80 Şans Kavanozu (Bana Bir Şey Çıkar)", count: 80, climate: "gold", type: "jar", desc: "Rastgele çekilen mini görevler, sürprizler ve gizli notlar." },
    { id: "mood-doors", title: "60 Ruh Haline Göre Kapı", count: 60, climate: "mint", type: "mood", desc: "Gülmek istiyorum, Duygusalım, Motivasyon lazım, Şımartılmak istiyorum." },
    { id: "chronological", title: "50 Kronolojik Anı Kartı", count: 50, climate: "purple", type: "standard", desc: "İlk dönemlerden üçüncü yıla ulaşan yolculuğumuzun izleri." },
    { id: "future-dreams", title: "50 Gelecek Hayali & Ortak Yapılacaklar", count: 50, climate: "mint", type: "standard", desc: "Birlikte gidilecek yerler, hedefler ve sonraki yıllara mektuplar." },
    { id: "mini-duels", title: "60 Mini Test & İkili Seçim", count: 60, climate: "pink", type: "choice", desc: "İkili seçim oyunları ve kademeli açılan gizli sürprizler." },
    // EKSTRA 200 KAPSAMLI İÇERİK
    { id: "stories", title: "40 Mini Hikâye & Senaryo Kartı", count: 40, climate: "purple", type: "story", desc: "Yağmurlu günler, sessiz anlar ve beş yıl sonrasına yolculuk senaryoları." },
    { id: "layered-confessions", title: "35 Çok Aşamalı İtiraf & Katmanlı Kart", count: 35, climate: "pink", type: "layered", desc: "Üç adımda açılan merak uyandırıcı sırlar ve derin itiraflar." },
    { id: "compatibility-duels", title: "35 İlişki & Uyum Seçim Düellosu", count: 35, climate: "gold", type: "choice", desc: "Hangisi daha çok biz? Üçüncü yıl karnesi ve özel yorumlar." },
    { id: "time-capsules", title: "30 Özel Gün, Saat & Ruh Hali Kapsülü", count: 30, climate: "mint", type: "standard", desc: "Uyumadan önce, yorgunken veya çok mutluyken açılacak kapsüller." },
    { id: "contracts-jokers", title: "30 Sözler, Sözleşmeler & Joker Kartlar", count: 30, climate: "gold", type: "joker", desc: "Tartışmayı erteleme, uzun sarılma ve tatlı ısmarlatma joker hakların." },
    { id: "deep-mirror", title: "30 Derin Analiz & Üç Yılın Aynası", count: 30, climate: "purple", type: "story", desc: "İlişkimizin nasıl büyüdüğünü ve bize neler kattığını anlatan mektuplar." }
];

// Örnek Özel İçerikler (Diğerleri benzersiz başlık/metin yapısıyla otomatik indekslenir, burayı kendi cümlelerinle zenginleştirebilirsin)
const CUSTOM_ENTRIES = {
    "love-notes-1": { title: "Üç Yılın En Güzel Tesadüfü", text: "Üç yıl önce hayatıma girdiğin gün, sıradan bir günün bütün ömrümü güzelleştireceğini bilmiyordum. İyi ki benimlesin." },
    "love-notes-2": { title: "Gülüşünün Etkisi", text: "En yorgun anımda bile tek bir gülüşün bütün günün ağırlığını üzerimden alıyor. Senin neşen benim evim." },
    "layered-confessions-1": {
        title: "Katmanlı İtiraf #1",
        step1: "Sana hiç söylemediğim küçük bir detay var...",
        step2: "Ne zaman yan yana otursak ve sen bir şey anlatmaya dalsan, anlattığın şey kadar ses tonundaki o heyecanı izlemeyi seviyorum.",
        step3: "Asıl itirafım şu: Üç yıl geçmesine rağmen seni dinlerken kalbim hâlâ ilk günkü gibi hızlanıyor. ❤️"
    },
    "contracts-jokers-1": {
        title: "JOKER KART: Tartışmayı Erteleme Hakkı",
        text: "Bu kartı gösterdiğin an tüm ufak kırgınlıklar durdurulur ve yerini 1 dakikalık sıkı bir sarılmaya bırakır. Sınırsız sevgiyle onaylanmıştır!"
    }
};

// 600 Öğenin Tamamını Benzersiz Nesneler Olarak Üreten Fonksiyon
const ALL_600_ITEMS = [];
UNIVERSE_CATEGORIES.forEach(cat => {
    for (let i = 1; i <= cat.count; i++) {
        const itemId = `${cat.id}-${i}`;
        const custom = CUSTOM_ENTRIES[itemId];
        ALL_600_ITEMS.push({
            id: itemId,
            categoryId: cat.id,
            categoryTitle: cat.title,
            climate: cat.climate,
            type: cat.type,
            index: i,
            title: custom ? custom.title : `${cat.title} • Kapı #${i}`,
            text: custom ? custom.text : `3. Yıl Evreni [${cat.title}] koleksiyonunun ${i}. özel parçası. Seninle geçen her an, kelimelere sığmayan ayrı bir renk tonu taşıyor.`,
            step1: custom?.step1 || `Merak İpucu #${i}: Bu kapının ardında üç yılımıza dair gizli bir his saklı...`,
            step2: custom?.step2 || `Arka Plan #${i}: Birlikte büyüttüğümüz güven ve sevgi, en sıradan anları bile unutulmaz kıldı.`,
            step3: custom?.step3 || `Büyük İtiraf #${i}: İyi ki yolum seninle kesişmiş, üçüncü yılımız kutlu olsun sevgilim! ❤️`,
            optionA: "Gece boyu derin sohbet etmek 🌙",
            optionB: "Plansız bir yolculuğa çıkıp kahkaha atmak ☀️"
        });
    }
});