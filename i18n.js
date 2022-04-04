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
           
            }
        },
        tr:{
            translations:{
                'Home':'Anasayfa',
                'About Us':'Hakkımızda',
                'My transactions':'İşlemlerim',
                'Buy Vote':'Oy Satın Al',
                'WALLET CONNECTED':'CÜZDANA BAĞLANDI'
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