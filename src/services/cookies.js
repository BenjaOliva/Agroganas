function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export default function getVisitCount() {
  const visitTime = parseInt(getCookie('visit'));
  switch (visitTime) {
    case 1:
      setCookie('visit', visitTime + 1, 7);
      return 1;
    case 2:
      setCookie('visit', visitTime + 1, 7);
      return 2;
    case 3:
      setCookie('visit', visitTime + 1, 7);
      return 3;
    default:
      setCookie('visit', 2, 7);
      return 1;
  }
}
