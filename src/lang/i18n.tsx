import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationEnglish from "./en.json"
import trabslationHebrew from "./he.json"

const resources = {
    en: {
        main: translationEnglish
    },
    he: {
        main: trabslationHebrew
    }
}

i18next
    .use(initReactI18next)
    .init({ resources, lng: "en" })

export default i18next