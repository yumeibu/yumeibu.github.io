(function(){
  // モバイルメニューの開閉
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mobileNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

(function(){
  // テーマ切り替え(ライト/ダーク/システム設定)
  var buttons = document.querySelectorAll('.theme-switch [data-theme-choice]');
  if (!buttons.length) return;

  function apply(choice){
    if (choice === 'light' || choice === 'dark'){
      document.documentElement.setAttribute('data-theme', choice);
    } else {
      choice = 'system';
      document.documentElement.removeAttribute('data-theme');
    }
    try { localStorage.setItem('theme', choice); } catch (e) {}
    buttons.forEach(function(b){
      var active = b.getAttribute('data-theme-choice') === choice;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  var saved = 'system';
  try { saved = localStorage.getItem('theme') || 'system'; } catch (e) {}
  apply(saved);

  buttons.forEach(function(b){
    b.addEventListener('click', function(){
      apply(b.getAttribute('data-theme-choice'));
    });
  });
})();
