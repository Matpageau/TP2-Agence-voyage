import { createI18n } from 'vue-i18n'

const messages = {
  fr: {
    trip: "Voyages",
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
    ourTrips: "Nos voyages",
    inclusive: "Tout inclus",
    pois: "aucun point d'intérêt | point d'intérêt | points d'intérêt",
    days: "{count} jour | {count} jour | {count} jours",
    book: "Réserver",
  },
  en: {
    trip: "Trips",
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
    ourTrips: "Our trips",
    inclusive: "All inclusive",
    pois: "np point of interest | point of interest | points of interest",
    days: "{count} day | {count} day | {count} days",
    book: "Book",
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
