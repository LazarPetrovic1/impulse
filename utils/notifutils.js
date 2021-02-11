const notiflangs = {
  like: {
    en: ['The user', 'likes your post'],
    sr: ['Korisniku', 'se svidja vasa objava'],
    de: ['Dem Benutzer', 'gefällt Ihr Beitrag']
  },
  dislike: {
    en: ['The user', "does't like your post"],
    sr: ['Korisniku', 'se ne svidja vasa objava'],
    de: ['Dem Benutzer', 'gefällt Ihr Beitrag nicht']
  },
  friendrequest: {
    en: 'You have a friend request from',
    sr: 'Imate zahtev za prijateljstvo od korisnika',
    de: 'Du hast eine Freundschaftsanfrage von'
  },
  comment: {
    en: ['The user', 'has commented on your post'],
    sr: ['Korisnik', 'je komentarisao na Vasoj objavi'],
    de: ['Der Benutzer', 'hat Ihren Beitrag kommentiert']
  },
  notif: {
    en: "You have a notification",
    sr: "Imate obavestenje",
    de: "Du hast eine Benachrichtigung"
  }
}

function getText({ type, language, username, name }) {
  let text;
  switch (type) {
    case "like":
      text = `${notiflangs.like[language][0]} ${name} (@${username}) ${notiflangs.like[language][1]}`
      break;
    case "dislike":
      text = `${notiflangs.dislike[language][0]} ${name} (@${username}) ${notiflangs.dislike[language][1]}`
      break;
    case "friendrequest":
      text = `${notiflangs.friendrequest[language]} ${name} (@${username})`
      break;
    case "friendrequest":
      text = `${notiflangs.comment[language][0]} ${name} (@${username}) ${notiflangs.comment[language][1]}`
      break;
    default:
      text = notiflangs.notif[language]

    return text
  }
}

module.exports = { getText };
