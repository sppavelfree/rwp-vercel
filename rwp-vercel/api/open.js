// api/open.js — Vercel serverless function
module.exports = (req, res) => {
  const target = (req.query.target || '').toLowerCase();
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const isAndroid = /android/.test(ua);
  // mapping (настройки под твои данные)
  const map = {
    telegram: {
      intent: 'intent://resolve?domain=rinwoodplast#Intent;package=org.telegram.messenger;scheme=tg;end',
      web: 'https://t.me/rinwoodplast'
    },
    viber: {
      intent: 'intent://chat?number=%2B380676037100#Intent;package=com.viber.voip;scheme=viber;end',
      web: 'https://viber.com/+380676037100'
    },
    whatsapp: {
      intent: 'intent://send?phone=380676037100#Intent;package=com.whatsapp;scheme=whatsapp;end',
      web: 'https://wa.me/380676037100'
    },
    instagram: {
      intent: 'intent://user?username=rin_wood_plast#Intent;package=com.instagram.android;scheme=instagram;end',
      web: 'https://instagram.com/rin_wood_plast'
    },
    messenger: {
      intent: 'intent://user-thread/rinwoodplast#Intent;package=com.facebook.orca;scheme=fb-messenger;end',
      web: 'https://m.me/rinwoodplast'
    },
    call: {
      intent: 'intent://+380676037100#Intent;scheme=tel;package=com.android.server.telecom;end',
      web: 'tel:+380676037100'
    }
  };

  const entry = map[target] || map['telegram'];

  if (isAndroid) {
    const fb = encodeURIComponent(entry.web);
    let intent = entry.intent;
    if (!/browser_fallback_url/.test(intent)) {
      intent = intent.replace(/#Intent;/, `#Intent;S.browser_fallback_url=${fb};`);
    }
    res.writeHead(302, { Location: intent });
    res.end();
  } else {
    res.writeHead(302, { Location: entry.web });
    res.end();
  }
};
