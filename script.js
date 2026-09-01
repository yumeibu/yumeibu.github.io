(function(){
  // モバイルメニューの開閉
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mobileNav');
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

  // 発車標：現在時刻と次発案内を動的に生成
  var pad = function(n){ return n < 10 ? '0' + n : '' + n; };
  var clockEl = document.getElementById('clock');
  var rowsEl = document.getElementById('boardRows');

  var departures = [
    { platform: '1', offset: 6,  line: '本線 快速', lineClass: 'line-tag--teal',  dest: '港北ゆき' },
    { platform: '2', offset: 13, line: '本線 各停', lineClass: 'line-tag--teal',  dest: '桜台ゆき' },
    { platform: '3', offset: 21, line: '支線 各停', lineClass: 'line-tag--amber', dest: '湾岸ふ頭ゆき' },
    { platform: '4', offset: 30, line: '本線 各停', lineClass: 'line-tag--teal',  dest: '港北ゆき' }
  ];

  function renderBoard(){
    var now = new Date();
    clockEl.innerHTML = pad(now.getHours()) + '<span class="colon">:</span>' + pad(now.getMinutes());

    rowsEl.innerHTML = departures.map(function(d){
      var t = new Date(now.getTime() + d.offset * 60000);
      return '<div class="board__row">' +
        '<span class="platform">' + d.platform + '番線</span>' +
        '<time>' + pad(t.getHours()) + ':' + pad(t.getMinutes()) + '</time>' +
        '<span class="line-tag ' + d.lineClass + '">' + d.line + '</span>' +
        '<span class="dest">' + d.dest + '</span>' +
      '</div>';
    }).join('');
  }

  renderBoard();
  setInterval(function(){
    var now = new Date();
    clockEl.innerHTML = pad(now.getHours()) + '<span class="colon">:</span>' + pad(now.getMinutes());
  }, 15000);
})();
