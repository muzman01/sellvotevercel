import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources:{
        en:{
            translations:{
            'Home':'Home',
            'About Us':'About Us',
            'My transactions':'My transactions',
            'Buy Vote':'Buy Vote',
            'WALLET CONNECTED':'WALLET CONNECTED',
            'Blokfield, a company specializing in blockchain technology, is taking the lead in continuous innovation in the fields of DeFi, Game and Reits after a long business preparation period. We provide customers with a more efficient crypto asset management service with unprecedented attempts and technologies. We are growing into a company that pursues safe and continuous service trough more communication and gradual service improvement than any other company.': 'Blokfield, a company specializing in blockchain technology, is taking the lead in continuous innovation in the fields of DeFi, Game and Reits after a long business preparation period. We provide customers with a more efficient crypto asset management service with unprecedented attempts and technologies. We are growing into a company that pursues safe and continuous service trough more communication and gradual service improvement than any other company.',
            'What We Do ?':'What We Do ?',
            "[Defi 1.0] Robinia Swap is a Yield Farm Defi service running on the BSC chain , and various complementary systems have been added to control token economy and inflation.": "[Defi 1.0] Robinia Swap is a Yield Farm Defi service running on the BSC chain , and various complementary systems have been added to control token economy and inflation.",
            'There is no previous transaction.':'There is no previous transaction.',
            'WALLET DETECTED PLEASE LOGIN':'WALLET DETECTED PLEASE LOGIN',
            'WALLET NOT DETECTED':'WALLET NOT DETECTED',
            'The last update':'The last update',
            'You can buy Upvote!':'You can buy Upvote!',
            'You cant buy Upvote!':'You cant buy Upvote!',
            'Upvote Post':'Upvote Post',
            'Current voting power':'Current voting power',
            'Amount of BUSD to pay':'Amount of BUSD to pay',
            'Please confirm to get  votes':'Please confirm to get  votes',
            'You cant make transaction without connecting to your wallet!':'You cant make transaction without connecting to your wallet!',
            'Pay':'Pay',
            'Connect wallet':'Connect wallet',
            '[Defi 2.0] Wisteria Swap is the first Defi 2.0 model that maintains the yield farming system. It is as safe as using verified contracts , audited by Techrate , and features more than 6 deflation mechanisms.':'[Defi 2.0] Wisteria Swap is the first Defi 2.0 model that maintains the yield farming system. It is as safe as using verified contracts , audited by Techrate , and features more than 6 deflation mechanisms.',
            '[Game ] It is an economic strategy simulation SRPG genre in the background of the Middle Ages, and it can be played without downloading anywhere in the world through a fair blockchain reward system using the game money (Gold) system.':'[Game ] It is an economic strategy simulation SRPG genre in the background of the Middle Ages, and it can be played without downloading anywhere in the world through a fair blockchain reward system using the game money (Gold) system.',
            '[Defi 1.5] RobiniaSwap V2 is a DeFi 1.0 service, but it is a DeFi 1.5 service model that utilizes the strengths of the DeFi 2.0 service. Since the protocol is responsible for most of the liquidity supply, stable service operation is possible even if users do not proceed with the RV2 liquidity supply, a governance token.':'[Defi 1.5] RobiniaSwap V2 is a DeFi 1.0 service, but it is a DeFi 1.5 service model that utilizes the strengths of the DeFi 2.0 service. Since the protocol is responsible for most of the liquidity supply, stable service operation is possible even if users do not proceed with the RV2 liquidity supply, a governance token.',
            '[Reits] ReitsDAO is a service operated by Blokfield.Inc a decentralized real estate investment product linked to real assets in the BSC blockchain network service. ReitsDAO issues "RDF" tokens composed of real estate value as collateral and "RDF" is designed to include all real estate values owned by ReitsDAO and revenue generated from real estate.':'[Reits] ReitsDAO is a service operated by Blokfield.Inc a decentralized real estate investment product linked to real assets in the BSC blockchain network service. ReitsDAO issues "RDF" tokens composed of real estate value as collateral and "RDF" is designed to include all real estate values owned by ReitsDAO and revenue generated from real estate.',
            'Contact':'Contact',
            'We are always on the lookout for questions , business partnerships and offers regarding Blokfield projects.':'We are always on the lookout for questions , business partnerships and offers regarding Blokfield projects.',
            'Metamask must be installed in the browser used. If it is not installed, the system will give you a warning and a link to install it.':'Metamask must be installed in the browser used. If it is not installed, the system will give you a warning and a link to install it.',
            'If Metamask is installed and you are connected to Metamask, you will be automatically logged into the system.':'If Metamask is installed and you are connected to Metamask, you will be automatically logged into the system.',
            'When you come to the buy vote part, the system will show you the current voting power of the Robinia account. To buy votes, you need to click the "Connect Wallet" button and connect to Metamask, if you are already connected to the wallet, you can go directly to the payment screen.':'When you come to the buy vote part, the system will show you the current voting power of the Robinia account. To buy votes, you need to click the "Connect Wallet" button and connect to Metamask, if you are already connected to the wallet, you can go directly to the payment screen.',
            'After connecting to Metamask, a box will appear for you to enter the link of the post you will get votes for (Please Enter Completely).':'After connecting to Metamask, a box will appear for you to enter the link of the post you will get votes for (Please Enter Completely).',
            'After entering your information, a button will appear for you to confirm that it is complete, if your payment button is activated after you approve this button.':'After entering your information, a button will appear for you to confirm that it is complete, if your payment button is activated after you approve this button.',
            ' When the payment bot is active, when you click on pay, a popup will appear and you will be asked to confirm the payment. If you approve the transaction, your vote will be purchased and your vote will be used. You can see the status of your transactions in the "User Transactions" section. When you press the refresh button after typing your wallet number on the page, you can see all your recorded and done transactions.':' When the payment bot is active, when you click on pay, a popup will appear and you will be asked to confirm the payment. If you approve the transaction, your vote will be purchased and your vote will be used. You can see the status of your transactions in the "User Transactions" section. When you press the refresh button after typing your wallet number on the page, you can see all your recorded and done transactions.',
            'Step':'Step',
            'bot use':'bot use',

        }   
        },
        tr:{
            translations:{
                'Home':'Anasayfa',
                'About Us':'Hakkımızda',
                'My transactions':'İşlemlerim',
                'Buy Vote':'Oy Satın Al',
                'WALLET CONNECTED':'CÜZDANA BAĞLANDI',
                'Blokfield, a company specializing in blockchain technology, is taking the lead in continuous innovation in the fields of DeFi, Game and Reits after a long business preparation period. We provide customers with a more efficient crypto asset management service with unprecedented attempts and technologies. We are growing into a company that pursues safe and continuous service trough more communication and gradual service improvement than any other company.':'Blockchain teknolojisinde uzmanlaşmış bir şirket olan Blokfield, uzun bir iş hazırlık sürecinden sonra DeFi, Game ve Reits alanlarında sürekli inovasyona öncülük ediyor. Müşterilere eşi benzeri görülmemiş girişimler ve teknolojilerle daha verimli bir kripto varlık yönetimi hizmeti sunuyoruz. Diğer tüm şirketlerden daha fazla iletişim ve kademeli hizmet iyileştirme ile güvenli ve sürekli hizmet peşinde koşan bir şirkete dönüşüyoruz.',
                'What We Do ?':'Ne Yapıyoruz?',
                "[Defi 1.0] Robinia Swap is a Yield Farm Defi service running on the BSC chain , and various complementary systems have been added to control token economy and inflation.":"[Defi 1.0] Robinia Swap, BSC zincirinde çalışan bir Verim Çiftliği Defi hizmetidir ve token ekonomisini ve enflasyonu kontrol etmek için çeşitli tamamlayıcı sistemler eklenmiştir.",
                'There is no previous transaction.':'Geçmiş işlemin bululunmamaktadır.',
                'WALLET DETECTED PLEASE LOGIN':'Cüzdan algılandı, lütfen giriş yapın',
                'WALLET NOT DETECTED':'Tronlinkte herhangi bir cüzdan bulunamadı',
                'You cant make transaction without connecting to your wallet!':'Çüzdana bağlanmadan işlem yapamazsın',
                'You can buy Upvote!':'Upvote satın alabilirsin',
                'You cant buy Upvote!':'Upvote satın alamazsın',
                'The last update':'Son güncelleme',
                'Upvote Post':'Gönderiye oy ver!',
                'Current voting power':'Mevcut oy gücü:',
                'Amount of BUSD to pay':'Ödenecek BUSD',
                'Please confirm to get  votes':'oyu almak için lutfen onaylayın:',
                'Pay':'Öde',
                'Connect wallet':'Cüzdana Bağlan',
                '[Defi 2.0] Wisteria Swap is the first Defi 2.0 model that maintains the yield farming system. It is as safe as using verified contracts , audited by Techrate , and features more than 6 deflation mechanisms.':'[Defi 2.0] Wisteria Swap, verimli tarım sistemini sürdüren ilk Defi 2.0 modelidir. Doğrulanmış sözleşmeler kullanmak kadar güvenlidir, Techrate tarafından denetlenir ve 6 dan fazla deflasyon mekanizmasına sahiptir.',
                '[Game ] It is an economic strategy simulation SRPG genre in the background of the Middle Ages, and it can be played without downloading anywhere in the world through a fair blockchain reward system using the game money (Gold) system.':'[Oyun ] Orta Çağın arka planında yer alan bir ekonomik strateji simülasyonu SRPG türüdür ve oyun parası (Altın) sistemi kullanılarak adil bir blok zinciri ödül sistemi aracılığıyla dünyanın hiçbir yerinde indirmeden oynanabilir.',
'[Defi 1.5] RobiniaSwap V2 is a DeFi 1.0 service, but it is a DeFi 1.5 service model that utilizes the strengths of the DeFi 2.0 service. Since the protocol is responsible for most of the liquidity supply, stable service operation is possible even if users do not proceed with the RV2 liquidity supply, a governance token.':'[Defi 1.5] RobiniaSwap V2 bir DeFi 1.0 hizmetidir, ancak DeFi 2.0 hizmetinin güçlü yanlarını kullanan bir DeFi 1.5 hizmet modelidir. Protokol, likidite arzının çoğundan sorumlu olduğundan, kullanıcılar bir yönetişim belirteci olan RV2 likidite arzına devam etmeseler bile istikrarlı hizmet çalışması mümkündür.',
                '[Reits] ReitsDAO is a service operated by Blokfield.Inc a decentralized real estate investment product linked to real assets in the BSC blockchain network service. ReitsDAO issues "RDF" tokens composed of real estate value as collateral and "RDF" is designed to include all real estate values owned by ReitsDAO and revenue generated from real estate.':'[Reits] ReitsDAO, Blokfield.Inc tarafından işletilen bir hizmettir. BSC blok zinciri ağ hizmetindeki gerçek varlıklara bağlı merkezi olmayan bir gayrimenkul yatırım ürünüdür. ReitsDAO, teminat olarak gayrimenkul değerinden oluşan "RDF" jetonlarını ihraç eder ve "RDF", ReitsDAOnun sahip olduğu tüm gayrimenkul değerlerini ve gayrimenkulden elde edilen geliri içerecek şekilde tasarlanmıştır.',
                'Contact':'İletişim',
                'We are always on the lookout for questions , business partnerships and offers regarding Blokfield projects.':'Blokfield projeleriyle ilgili sorular, iş ortaklıkları ve teklifler için her zaman hazırız.',
                'Metamask must be installed in the browser used. If it is not installed, the system will give you a warning and a link to install it.':'Kullanılan tarayıca Metamask yüklü olmalıdır, Eğer yüklü değilse sistem size yükleme yapmanız için uyarı ve link verecektir',
                'If Metamask is installed and you are connected to Metamask, you will be automatically logged into the system.':'Metamask kurulu ise ve Metamaska bağlandıysanız sisteme otomatik olarak giriş yapmış sayılacaksınız',
                'When you come to the buy vote part, the system will show you the current voting power of the Robinia account. To buy votes, you need to click the "Connect Wallet" button and connect to Metamask, if you are already connected to the wallet, you can go directly to the payment screen.':'Buy vote kısmına geldiğinizde sistem size Robinia hesabının mevcut oy gücünü gösterecektir. Oy satın almak için "Connect Wallet" butonuna tıklayıp Metamaska bağlanmazı gerekmektedir, zaten cüzdana bağlı iseniz direk ödeme ekranına geçebilirsini.',
                'After connecting to Metamask, a box will appear for you to enter the link of the post you will get votes for (Please Enter Completely).':'Metamaska bağlandıktan sonra karşınıza oy alacağınız gönderinin linkini girmeniz için bir alan çıkacaktır(Lütfen Eksiksiz Giriniz)bDaha sonra yüzde kaç oy almak istiyorsanız seçebileceğiniz bir bar çıkacaktır',
                'After entering your information, a button will appear for you to confirm that it is complete, if your payment button is activated after you approve this button.':'Bilgileriniz girdikten sonra eksiksiz olduğunu onaylamanız için bir buton çıkacaktır bu butonu onayladıktan sonra ödeme yapma butonunuz aktifleşesek',
                ' When the payment bot is active, when you click on pay, a popup will appear and you will be asked to confirm the payment. If you approve the transaction, your vote will be purchased and your vote will be used. You can see the status of your transactions in the "User Transactions" section. When you press the refresh button after typing your wallet number on the page, you can see all your recorded and done transactions.':'Ödeme botunu aktif olduğu zaman, ödeme yap kısmına tıkladığınızda bir popup açılacak ve ödemeyi onaylamanız istenilecek, işlemi onayladığınız taktirde oy satın almış olacak ve oyunuz kullanılmış olacak.İşlemlerinizin durumunu "Kullanıcı İşlemleri" kısmından görebilirsiniz. cüzdan numaranız sayfada yazdıktan sonra yenile butonuna bastığınız zaman kaydedilmiş, yapılmış bütün işlemlerinizi görebilirsiniz.',
                'Step':'Adım',
                'bot use':'bot kullanımı',

}
        }
    },
    fallbackLng: 'en',
    ns:['translations'],
    defaultNS:'translations',
    keySeparator:false,
    interpolation:{
        escapeValue:false,
        formatSeparator:','
    },
    react:{
        wait: true
    }
});

export default i18n;