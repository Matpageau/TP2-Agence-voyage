import { createI18n } from 'vue-i18n'

const messages = {
  fr: {
    travel: "Voyages",
    admin: "Admin",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    confirmPassword: "Confirmer votre mot de passe",
    login: "Connexion",
    register: "S'inscrire",
    userNotFound: "Utilisateur invalide",
    invalidPassword: "Le mot de passe est incorrecte",
    usernameAlreadyTaken: "Nom d'utilisateur invalide",
    passwordNotMatch: "Les mots de passe ne correspondent pas",
    ourTravels: "Nos voyages",
    inclusive: "Tout inclus",
    pois: "aucun point d'intérêt | point d'intérêt | points d'intérêt",
    days: "{count} jour | {count} jour | {count} jours",
    book: "Réserver",
    search: "Rechercher",
    allInclusive: "Tout inclus",
    backpack: "Sac à dos",
    allType: "Tout",
    favorite: "Favoris",
    ascPrice: "Prix Asc.",
    desPrice: "Prix Des.",
    edit: "Modifier",
    create: "Ajouter",
  },
  en: {
    travel: "Travels",
    admin: "Admin",
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm password",
    login: "Login",
    register: "Sign up",
    userNotFound: "User not found",
    invalidPassword: "Invalid password",
    usernameAlreadyTaken: "This username is already taken",
    passwordNotMatch: "Password does not match",
    ourTravels: "Our travels",
    inclusive: "All inclusive",
    pois: "np point of interest | point of interest | points of interest",
    days: "{count} day | {count} day | {count} days",
    book: "Book",
    search: "Search",
    allInclusive: "All inclusive",
    backpack: "Backpack",
    allType: "All",
    favorite: "Favorite",
    ascPrice: "Asc. price",
    desPrice: "Des. price",
    edit: "Edit",
    create: "Create",
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  messages,
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }
    },
    fr: {
      currency: {
        style: 'currency',
        currency: "CAD",
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }
    }
  }
})

export default i18n
