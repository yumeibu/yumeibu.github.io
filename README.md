# yumeibu.github.io
# 南部鉄道 ホームページ

## 構成
```
index.html              トップページ
railway/                鉄道について
  ├ index.html            概要
  ├ route.html            路線図
  └ rolling-stock.html    車両
models/                 Robloxモデル配布
  ├ index.html            概要
  ├ trains.html           車両モデル
  └ terms.html            利用規約
style.css               共通スタイル
script.js               共通スクリプト(モバイルメニューの開閉)
```

## GitHub Pagesでの公開方法
1. このフォルダの中身をリポジトリのルートにアップロードする
2. リポジトリの `Settings` → `Pages` を開く
3. `Source` で公開したいブランチ(例: `main`)とフォルダ(`/root`)を選択して保存する
4. しばらくすると `https://ユーザー名.github.io/リポジトリ名/` で公開される

## ページを追加する場合
1. `railway/` または `models/` にある既存ファイルをコピーして新しいファイル名で保存する
2. 内容を書き換える
3. 全ページ共通の以下の3か所に、新しいページへのリンクを追加する
   - ヘッダーの `subnav`(そのセクション内のメニュー)
   - フッターの該当する `footer__col`
   - (トップレベルのメニュー自体を増やす場合は)ヘッダーの `primary-nav` と `mobile-nav`

## 差し替えが必要な箇所(TODOコメント付き)
- `models/trains.html` の各「ダウンロード」ボタンのリンク先(`href="#"`)
- `models/terms.html` の利用規約の内容(テンプレートなので実際の運用に合わせて調整してください)
