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

  // ===== 路線を選ぶ(サイドバー) =====
  // TODO: 実際の路線構成に合わせて内容を編集・追加してください
  var LINES = [
    {
      id: 'honsen',
      name: '本線東西線',
      tag: '通勤',
      color: 'var(--teal)',
      desc: '都心部を東西に結ぶ、看板路線。ラッシュ時は5分間隔で運行しています。',
      stats: [
        { label: '駅数', value: '8' },
        { label: '営業距離', value: '18.2km' },
        { label: '車両形式', value: '2' }
      ],
      stations: ['港北','桜台','中央','本町','川岸','新田','みなと中央','湾岸ふ頭'],
      loop: false,
      trains: [
        { type: '各駅停車', name: 'E001系', spec: '定員140名／最高速度100km/h', windows: 4 },
        { type: '快速',     name: 'K200系', spec: '定員120名／最高速度120km/h', windows: 4 }
      ],
      playUrl: '#'
    },
    {
      id: 'wangan',
      name: '湾岸臨海線',
      tag: '臨海',
      color: 'var(--amber)',
      desc: '空港連絡橋を渡り、埋立地エリアを結ぶ路線。夜景区間が人気です。',
      stats: [
        { label: '駅数', value: '5' },
        { label: '営業距離', value: '11.4km' },
        { label: '車両形式', value: '2' }
      ],
      stations: ['空港前','ふ頭前','倉庫街','展望台','湾岸中央'],
      loop: false,
      trains: [
        { type: '空港連絡', name: 'A100系', spec: '定員100名／最高速度110km/h', windows: 4 },
        { type: '各駅停車', name: 'R50系',  spec: '定員90名／最高速度90km/h', windows: 3 }
      ],
      playUrl: '#'
    },
    {
      id: 'loop',
      name: '山手ループ線',
      tag: '周遊',
      color: 'var(--violet)',
      desc: '旧市街をぐるりと一周する環状線。観光名所を巡ります。',
      stats: [
        { label: '駅数', value: '6' },
        { label: '営業距離', value: '9.8km' },
        { label: '車両形式', value: '1' }
      ],
      stations: ['旧市街','城跡前','大通り','市場前','公園前','川沿い'],
      loop: true,
      trains: [
        { type: '周遊形', name: 'S30系', spec: '定員110名／最高速度80km/h', windows: 4 }
      ],
      playUrl: '#'
    },
    {
      id: 'freight',
      name: '貨物線システム',
      tag: '貨物',
      color: 'var(--red)',
      desc: 'コミュニティが運営する貨物輸送特化の路線。旅客列車は走りません。',
      stats: [
        { label: '駅数', value: '4' },
        { label: '営業距離', value: '14.0km' },
        { label: '車両形式', value: '1' }
      ],
      stations: ['基地','積出港','中継センター','工業団地'],
      loop: false,
      trains: [
        { type: '貨物機関車', name: 'DF-01形', spec: '牽引重量2,000t／最高速度75km/h', windows: 2 }
      ],
      playUrl: '#'
    }
  ];

  var tabsEl = document.getElementById('lineTabs');
  var panelEl = document.getElementById('linePanel');

  function renderTabs(activeId){
    tabsEl.innerHTML = LINES.map(function(line){
      var active = line.id === activeId;
      return '<button type="button" class="line-tab' + (active ? ' is-active' : '') + '" ' +
        'role="tab" id="tab-' + line.id + '" aria-selected="' + (active ? 'true' : 'false') + '" ' +
        'aria-controls="panel-' + line.id + '" data-id="' + line.id + '" style="--line-color:' + line.color + '">' +
        '<span class="line-tab__dot" style="background:' + line.color + '"></span>' +
        '<span class="line-tab__text">' +
          '<span class="line-tab__name">' + line.name + '</span>' +
          '<span class="line-tab__tag">' + line.tag + '</span>' +
        '</span>' +
      '</button>';
    }).join('');
  }

  function renderPanel(id){
    var line = LINES.filter(function(l){ return l.id === id; })[0];
    if (!line) return;

    var stationsHtml = line.stations.map(function(name, i){
      return '<div class="station">' +
        '<span class="station__num">' + (i + 1) + '</span>' +
        '<span class="station__dot" style="background:' + line.color + '"></span>' +
        '<span class="station__name">' + name + '</span>' +
      '</div>';
    }).join('');

    var trainsHtml = line.trains.map(function(t){
      var windows = '';
      for (var w = 0; w < t.windows; w++){ windows += '<span></span>'; }
      return '<article class="train-card" style="--accent:' + line.color + '">' +
        '<div class="train-card__art">' +
          '<div class="body"></div>' +
          '<div class="windows">' + windows + '</div>' +
          '<div class="wheels"><span></span><span></span></div>' +
        '</div>' +
        '<div class="train-card__info">' +
          '<div class="train-card__type">' + t.type + '</div>' +
          '<div class="train-card__name">' + t.name + '</div>' +
          '<p class="train-card__spec">' + t.spec + '</p>' +
        '</div>' +
      '</article>';
    }).join('');

    var statsHtml = line.stats.map(function(s){
      return '<div class="stat"><div class="num" style="color:' + line.color + '">' + s.value + '</div>' +
        '<div class="label">' + s.label + '</div></div>';
    }).join('');

    panelEl.id = 'panel-' + line.id;
    panelEl.setAttribute('aria-labelledby', 'tab-' + line.id);
    panelEl.innerHTML =
      '<div class="line-panel__head">' +
        '<h3 style="--line-color:' + line.color + '">' + line.name + '</h3>' +
        '<p>' + line.desc + '</p>' +
        (line.loop ? '<p class="line-panel__note">※ この路線は環状運転です</p>' : '') +
      '</div>' +
      '<div class="line-panel__stats">' + statsHtml + '</div>' +
      '<div class="route-scroll"><div class="route-track">' + stationsHtml + '</div></div>' +
      '<div class="gallery">' + trainsHtml + '</div>' +
      '<!-- TODO: 各路線のRobloxプレイスURLに差し替えてください -->' +
      '<a class="btn btn--primary line-panel__cta" href="' + line.playUrl + '">' +
        '<span class="play-icon" aria-hidden="true"></span>この路線でプレイ' +
      '</a>';
  }

  function selectLine(id){
    renderTabs(id);
    renderPanel(id);
  }

  if (tabsEl && panelEl){
    tabsEl.addEventListener('click', function(e){
      var btn = e.target.closest ? e.target.closest('.line-tab') : null;
      if (!btn) return;
      selectLine(btn.getAttribute('data-id'));
    });
    selectLine(LINES[0].id);
  }
})();
