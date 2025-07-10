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
    passwordNotMatch: "Password does not match"
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  messages
})

export default i18n
