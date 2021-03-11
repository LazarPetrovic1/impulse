const notiflangs = {
  like: {
    en: ['The user', 'likes your post'],
    sr: ['Korisniku', 'se svidja Vasa objava'],
    de: ['Dem Benutzer', 'gefällt Ihr Beitrag']
  },
  dislike: {
    en: ['The user', "does't like your post"],
    sr: ['Korisniku', 'se ne svidja Vasa objava'],
    de: ['Dem Benutzer', 'gefällt Ihr Beitrag nicht']
  },
  impulse: {
    en: ['The user', "loves your post"],
    sr: ['Korisnik', 'obozava Vasu objavu'],
    de: ['Der Benutzer', 'liebt deinen Beitrag']
  },
  friendrequest: {
    en: 'You have a friend request from',
    sr: 'Imate zahtev za prijateljstvo od korisnika',
    de: 'Du hast eine Freundschaftsanfrage von'
  },
  comment: {
    en: ['The user', 'has commented on your post'],
    sr: ['Korisnik', 'je komentarisao na Vasoj objavi'],
    de: ['Der Benutzer', 'hat deinen Beitrag kommentiert']
  },
  forumpostreply: {
    en: ['The user', 'has replied to your comment'],
    sr: ['Korisnik', 'je odgovorio na Vas komentar'],
    de: ['Der Benutzer', 'hat auf deinen Kommentar geantwortet']
  },
  notif: {
    en: "You have a notification",
    sr: "Imate obavestenje",
    de: "Du hast eine Benachrichtigung"
  }
}

function getText({ type, language, username, name }) {
  switch (type) {
    case "like":
      return `${notiflangs.like[language][0]} ${name} (@${username}) ${notiflangs.like[language][1]}`
    case "dislike":
      return `${notiflangs.dislike[language][0]} ${name} (@${username}) ${notiflangs.dislike[language][1]}`
    case "impulse":
      return `${notiflangs.impulse[language][0]} ${name} (@${username}) ${notiflangs.impulse[language][1]}`
    case "friendrequest":
      return `${notiflangs.friendrequest[language]} ${name} (@${username})`
    case "friendrequest":
      return `${notiflangs.comment[language][0]} ${name} (@${username}) ${notiflangs.comment[language][1]}`
    case "forumpostreply":
      return `${notiflangs.forumpostreply[language][0]} ${name} (@${username}) ${notiflangs.forumpostreply[language][1]}`
    default:
      return notiflangs.notif[language]
  }
}

module.exports = { getText };
