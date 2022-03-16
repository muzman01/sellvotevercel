import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources:{
        en:{
            translations:{
            'Home':'Home',
            'About Us':'About Us',
           
           
            }
        },
        tr:{
            translations:{
                'Home':'Anasayfa',
                'About Us':'Hakkımızda',

            
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