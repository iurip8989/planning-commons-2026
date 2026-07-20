const metrics = [
  { label: "中山区人口", value: "211,011", note: "2026年5月。女性人口が多い都心区。" },
  { label: "高齢化率", value: "25.6%", note: "65歳以上。台北市平均を上回る。" },
  { label: "線形公園", value: "500m", note: "中山駅から雙連駅へ続く帯状空間。" },
  { label: "商業登記", value: "8,587", note: "台北市12区で最多。小売・飲食が突出。" }
];

const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1eHd2k_SL4kdEmYBhD1yMMxIn6THXo54W";

const peopleInsights = [
  {
    title: "単身・少人数世帯の都心",
    body: "中山区は約21万人、世帯数は約10.4万戸で、1世帯あたり約2.04人。路地スケールの生活サービス、休憩場所、夜間の安全性が提案の対象になりやすい。",
    tags: ["人口", "世帯", "生活"]
  },
  {
    title: "高齢化と若い商業文化が同居",
    body: "65歳以上は25.6%、0–14歳は10.5%。一方で赤峰街や中山駅周辺には若い来訪者とクリエイティブ系店舗が集まる。世代間の使い方の差を観察したい。",
    tags: ["高齢化", "商業", "現地調査"]
  },
  {
    title: "昼・夜・食の三層構造",
    body: "昼は赤峰街・文創、夜は林森北路・條通、食は晴光市場・雙城街。都市イメージは一枚ではなく、時間帯ごとに切り替わる。",
    tags: ["生活景", "夜間経済", "都市イメージ"]
  },
  {
    title: "所得と空間のコントラスト",
    body: "中山区内には大直・北安の高所得住宅地と、心中山周辺の商業・歓楽・小規模店舗が並存する。区平均だけで判断しないことが重要。",
    tags: ["所得", "格差", "里別"]
  }
];

const boroughRows = [
  { area: "中山里", pop: 6945, old: 1690, elder: 24.3, child: 7.5, note: "中山駅周辺の読み取り候補" },
  { area: "民安里", pop: 4291, old: 1290, elder: 30.1, child: 10.8, note: "高齢化率が高い" },
  { area: "正得里", pop: 3761, old: 1014, elder: 27.0, child: 9.1, note: "中山北路沿いの検討候補" },
  { area: "晴光里", pop: 5645, old: 1433, elder: 25.4, child: 9.4, note: "晴光市場周辺" },
  { area: "雙連里", pop: 9000, old: 1944, elder: 21.6, child: 14.4, note: "大同区側、線形公園に隣接" },
  { area: "金泰里", pop: 8095, old: 1349, elder: 16.7, child: 13.6, note: "大直・北安側、高所得里" }
];

const spaceCards = [
  {
    title: "AI“と”プランニング",
    body: "プランニングを「人の課題」と「空間」のマッチングとして捉え、人のデータ・空間のデータを高解像度で集め、共有し、育てる方針を示す。",
    tags: ["AI", "プランニングコモンズ", "方法"],
    source: "AI“と”プランニング.pdf"
  },
  {
    title: "演習要項 2026",
    body: "対象地は台北市心中山地区。テーマは路地空間・線状空地・まちなみ景観。現地調査、課題発見、空間開発提案、アウトプット/アウトカム説明が求められる。",
    tags: ["授業", "心中山", "課題"],
    source: "グローバル都市地域演習 2026.pdf"
  },
  {
    title: "都市計画・更新資料群",
    body: "大同区主要計画、中山区細部計画、防災型都市更新、騎楼・歩行空間、用途規制、商住混合、都市更新圧力を読むための資料群。",
    tags: ["都市更新", "用途規制", "歩行空間"],
    source: "Google Driveフォルダ内ファイル要約"
  },
  {
    title: "世界のSSD100",
    body: "100の都市持続再生事例を、場所の再編集、ブラウンフィールド、記憶の継承、郊外再定義、脆弱市街地、川、新しい公共空間などの章で整理する。学生は索引から読みたい頁を選ぶ。",
    tags: ["SSD100", "事例", "空間デザイン"],
    source: "世界のSSDpdf.pdf"
  },
  {
    title: "都市の鍼治療データベース",
    body: "365件の小さな都市介入・再生事例を検索できる外部サイト。ここでは全件を出典リンクつきの授業用カードとして扱う。",
    tags: ["事例", "外部リンク", "比較"],
    source: "hilife.or.jp/cities"
  },
  {
    title: "人のデータフォルダ",
    body: "人口・世帯・年齢・産業・所得・MRT・文献・映画・在地言説を、AIに読ませやすい形へ整理するための作業フォルダ。",
    tags: ["人口", "文献", "データセット"],
    source: "人のデータ_PeopleData"
  }
];

const cases = [
  {
    kind: "taiwan",
    title: "迪化街の歴史保全",
    place: "台湾 台北市大同区",
    source: "都市の鍼治療データベース",
    url: "https://www.hilife.or.jp/cities/data.php?jirei_id=032",
    tags: ["台湾", "歴史保全", "商業街", "容積移転", "アイデンティティ"],
    reading: "道路拡幅と開発圧力に対し、街屋と商業空間を保全した事例。心中山では、赤峰街や中山南西商圈の小規模商業をどう守るかの比較軸になる。",
    ai: "迪化街の保全手法を心中山に読み替えると、どの条件が似ていて、どの条件が異なるか。賃料・観光化・用途規制の副作用も挙げる。"
  },
  {
    kind: "taiwan",
    title: "剥皮寮の歴史保全",
    place: "台湾 台北市萬華区",
    source: "都市の鍼治療データベース",
    url: "https://www.hilife.or.jp/cities/data.php?jirei_id=031",
    tags: ["台湾", "歴史保全", "教育", "映画", "都市イメージ"],
    reading: "歴史街区を教育・展示・映画ロケ地として再編集した事例。心中山の生活景を、展示化しすぎず日常とどう両立させるかを考える材料。",
    ai: "剥皮寮のような歴史教育化は、心中山の路地文化にとって保全になるか、消費化になるか。住民・店主・観光客の立場で評価する。"
  },
  {
    kind: "taiwan",
    title: "稲米故事館",
    place: "台湾 桃園県新屋区",
    source: "都市の鍼治療データベース",
    url: "https://www.hilife.or.jp/cities/data.php?jirei_id=071",
    tags: ["台湾", "建物再利用", "記憶", "文化施設", "農業"],
    reading: "日本時代の穀物倉庫を、米文化と地域記憶を伝える施設に再利用した事例。心中山では、古い建物を単なる店舗化ではなく記憶装置として扱う視点につながる。",
    ai: "心中山の老屋や空き店舗を、消費空間だけでなく記憶装置として再利用するなら、どんな展示・運営・収益モデルが考えられるか。"
  },
  {
    kind: "ssd",
    title: "SSD100 第1章 場所の再編集",
    place: "世界各地",
    source: "世界のSSD100",
    tags: ["SSD100", "場所", "再編集", "公共空間"],
    reading: "場所の記憶や既存活動を読み替え、都市の魅力を再構成する章。心中山の線形公園・赤峰街・條通を一体の生活景として扱う手がかり。",
    ai: "心中山を一つの観光地ではなく、複数の時間帯と生活景が重なる場所として再編集する案を3つ出す。"
  },
  {
    kind: "ssd",
    title: "SSD100 第3章 記憶の継承",
    place: "倉敷・川越・北京・ソウルほか",
    source: "世界のSSD100",
    tags: ["SSD100", "記憶", "歴史", "生活景"],
    reading: "歴史を博物館化するだけでなく、街並み・商業・日常の中に残す視点。大正町、條通、晴光市場を読む軸になる。",
    ai: "心中山で継承すべき記憶を、建物・商業・路地名・食・夜の文化に分けて整理し、提案に使える資源を選ぶ。"
  },
  {
    kind: "ssd",
    title: "SSD100 第8章 新しい公共空間",
    place: "日向・ボゴタ・パリ・東京ほか",
    source: "世界のSSD100",
    tags: ["SSD100", "公共空間", "広場", "線形公園"],
    reading: "公共空間を単なる広場ではなく、移動、滞留、自然、商業、住民活動の結節点として扱う章。心中山線形公園の評価に直結する。",
    ai: "心中山線形公園の公共性を、通過・滞留・商業・高齢者利用・夜間利用の5軸で診断する。"
  },
  {
    kind: "analog",
    title: "代官山ヒルサイドテラス",
    place: "日本 東京都渋谷区",
    source: "世界のSSD100",
    tags: ["比較候補", "低層商業", "街並み", "回遊"],
    reading: "低層建築、歩行者スケール、店舗の連なりを考える比較候補。赤峰街や中山駅周辺の小規模商業と比較しやすい。",
    ai: "代官山型の低層商業環境と赤峰街の違いを、所有・賃料・路地・店舗更新の観点で比較する。"
  },
  {
    kind: "analog",
    title: "清渓川復元事業",
    place: "韓国 ソウル",
    source: "世界のSSD100 / 都市の鍼治療類似事例",
    tags: ["比較候補", "線形空間", "水辺", "再生"],
    reading: "線形空間の再生が都市イメージと人流を変える事例。心中山線形公園の波及効果と比較できる。",
    ai: "清渓川のような大規模再生と心中山線形公園の小規模再生では、効果測定の指標をどう変えるべきか。"
  },
  {
    kind: "analog",
    title: "谷中・根津・千駄木のまちづくり",
    place: "日本 東京都台東区・文京区",
    source: "世界のSSD100",
    tags: ["比較候補", "路地", "地域文化", "小商い"],
    reading: "小規模商店、路地、生活文化を観光資源化しすぎず維持する比較候補。赤峰街が「台版谷中」と呼ばれる文脈と接続できる。",
    ai: "赤峰街を谷中と比較するとき、似ている点と誤解しやすい点を分けて、現地調査で確認すべき項目を作る。"
  }
];

const ssdRaw = `
001|第1章 場所の再編集|Birmingham|中心市街デザイン戦略|22|場所,中心市街地
002|第1章 場所の再編集|Copenhagen|ストロイエ・アーバンアクションプラン|26|歩行者空間,ネットワーク
003|第1章 場所の再編集|Melbourne|ダウンタウン再生|30|公共空間,街路
004|第1章 場所の再編集|Stuttgart|クンストムゼウム|34|文化施設,結節点
005|第1章 場所の再編集|Den Haag|健康の中心に関する都市施策|38|健康,生活支援
006|第1章 場所の再編集|Genova|歴史的港湾地区|42|港湾,記憶
007|第1章 場所の再編集|Bristol|分かりやすい都市プロジェクト|46|情報デザイン,回遊
008|第1章 場所の再編集|Yokohama|横浜都心部再生|50|文化芸術,都市戦略
009|第1章 場所の再編集|Berlin|ポツダム広場|54|時間,都市軸
010|第1章 場所の再編集|Newcastle / Gateshead|タイン川再開発計画|58|アート,都市連携
011|第1章 場所の再編集|Niigata|中心市街地と掘割再生|62|掘割,将来像
012|第1章 場所の再編集|Daikanyama|代官山ヒルサイドテラス|66|低層商業,物語
013|第1章 場所の再編集|Marunouchi|丸の内のまちづくり|70|都心,更新
014|第2章 ブラウンフィールドの再生|Stockholm|ハマルビー・ショースタッド|76|水辺,環境
015|第2章 ブラウンフィールドの再生|Hamburg|ハーフェンシティ|80|港湾,情報拠点
016|第2章 ブラウンフィールドの再生|Ebisu|恵比寿ガーデンプレイス|84|オープンスペース,都市再生
017|第2章 ブラウンフィールドの再生|Bilbao|ネルビオン川周辺再生|88|川,都市イメージ
018|第2章 ブラウンフィールドの再生|Zurich|チューリッヒ・ウエスト|92|協議型計画,工業地
019|第2章 ブラウンフィールドの再生|London|グリニッジ・ミレニアム・ビレッジ|96|環境共生,住宅地
020|第2章 ブラウンフィールドの再生|Rotterdam|ポート・ビジョン2020|100|港湾,都市機能
021|第2章 ブラウンフィールドの再生|Barcelona|22@BCNプロジェクト|104|産業転換,情報産業
022|第2章 ブラウンフィールドの再生|Essen|IBAエムシャーパーク|108|工業地域,ランドスケープ
023|第2章 ブラウンフィールドの再生|Keihin|京浜臨海部|112|工業地帯,臨海部
024|第3章 記憶の継承|Mostar|スターリ・モスト再生|118|戦禍,記憶
025|第3章 記憶の継承|Chester|歴史的中心市街地の保全と活性化|122|歴史街区,中心市街地
026|第3章 記憶の継承|Lyon|歴史地区ライトアップ計画|126|照明,歴史
027|第3章 記憶の継承|Kurashiki|倉敷美観地区|130|歴史保全,観光
028|第3章 記憶の継承|Kawagoe|川越中心市街地|134|都市構造,蔵造り
029|第3章 記憶の継承|Obuse|小布施のまちづくり|138|歴史,積層
030|第3章 記憶の継承|Kuroishi|こみせ通りの保全と広場整備|142|私有地,公共性
031|第3章 記憶の継承|Idanha-a-Nova|イダーニャ・ア・ヴェーリャ|146|考古学,廃墟再生
032|第3章 記憶の継承|Paris|ZACアマンディエ地区|150|再開発,街のリズム
033|第3章 記憶の継承|Barcelona|旧市街再生プロジェクト|154|多孔質化,旧市街
034|第3章 記憶の継承|Beijing|北京胡同の保全と再開発|158|生活文化,胡同
035|第3章 記憶の継承|Seoul|北村づくり事業|162|民官協働,町並み
036|第3章 記憶の継承|Beijing|大山子芸術区798芸術工廠|166|工場再活用,文化
037|第3章 記憶の継承|Shanghai|歴史的建物のコンバージョン|170|コンバージョン,上海
038|第3章 記憶の継承|Kyoto|京町家まちづくりファンド|174|町家,基金
039|第3章 記憶の継承|Osaka|法善寺横丁|178|路地,更新
040|第3章 記憶の継承|Nagano|善光寺参道沿い|182|既存ストック,参道
041|第3章 記憶の継承|Nihonbashi|東日本橋インフィルプロジェクト|186|インフィル,隙間
042|第4章 集住のボキャブラリー|Shinonome|東雲キャナルコートCODAN|196|集住,都市回帰
043|第4章 集住のボキャブラリー|Beijing|建外SOHO|200|SOHO,都市活動
044|第4章 集住のボキャブラリー|New York City|ロワーマンハッタン|204|コンバージョン,都心居住
045|第4章 集住のボキャブラリー|Seattle|サウス・レイク・ユニオン|208|新産業,路面電車
046|第4章 集住のボキャブラリー|New York City|ニューアーバニティ|212|路上活性,町並み
047|第4章 集住のボキャブラリー|London|バトラースワーフのコンバージョン|216|倉庫,集住
048|第4章 集住のボキャブラリー|London|コインストリート|220|NPO,都市再生
049|第4章 集住のボキャブラリー|Amsterdam|東部港湾地区開発|224|横断体制,持続可能性
050|第4章 集住のボキャブラリー|Toronto|トロント・オフィシャル・プラン|228|小さなまち,都市計画
051|第4章 集住のボキャブラリー|Shanghai|旧住宅総合改造計画|232|住居改善,生活水準
052|第5章 郊外の再定義|Copenhagen|コロニーガーデン|242|都市農園,生活拠点
053|第5章 郊外の再定義|Copenhagen|まちのアップグレード|246|コミュニティ,再生
054|第5章 郊外の再定義|Amsterdam|ベルマミーア団地|250|団地再生,多様性
055|第5章 郊外の再定義|Berlin|マルツァーン・ヘラースドルフ団地|254|社会資産,住宅地
056|第5章 郊外の再定義|Linz|ソーラーシティ|258|太陽,環境都市
057|第5章 郊外の再定義|Greenbelt|グリーンベルトホームズ|262|共用,役割分担
058|第5章 郊外の再定義|Seaside|ニューアーバニズム|266|郊外,車依存
059|第5章 郊外の再定義|Urasoe|Uニュータウン|270|ニュータウン,継承
060|第6章 脆弱市街地の再解釈|Jakarta|カンポン改善プログラム|276|近隣,助け合い
061|第6章 脆弱市街地の再解釈|Karachi|オーランギー・パイロット・プロジェクト|280|路地開発,住環境
062|第6章 脆弱市街地の再解釈|Bangkok|コミュニティ組織開発機構|284|住まい,エンパワーメント
063|第6章 脆弱市街地の再解釈|Ahmedabad|スラム・ネットワーク計画|288|スラム改善,都市活性
064|第6章 脆弱市街地の再解釈|Rio de Janeiro|ロシーニャ地区のスラム改善|292|低所得地区,改善
065|第6章 脆弱市街地の再解釈|Medellín|メトロ・ケーブル|296|ロープウェイ,交通
066|第6章 脆弱市街地の再解釈|Istanbul|ゼイティンブルヌ地区パイロットプロジェクト|300|地震,防災
067|第6章 脆弱市街地の再解釈|Lusaka|未計画居住区住環境改善事業|304|国際協力,住環境
068|第6章 脆弱市街地の再解釈|Seoul|コミュニティ開発マネジメント|308|コミュニティ,開発管理
069|第6章 脆弱市街地の再解釈|Taishido|太子堂2・3丁目地区のまちづくり|312|住民参加,環境改善
070|第6章 脆弱市街地の再解釈|Kyojima|京島地区のまちづくり|316|住み続ける改善,密集市街地
071|第6章 脆弱市街地の再解釈|Itami|中村地区整備事業|320|まなざし,地区整備
072|第7章 川の潜在力|Seoul|清渓川復元事業|330|河川復元,線形空間
073|第7章 川の潜在力|Bordeaux|2つの岸プロジェクト|334|岸辺,交通
074|第7章 川の潜在力|Yokohama|和泉川の川づくり|338|川づくり,まちづくり
075|第7章 川の潜在力|Zurich|バッハコンセプト|342|小川,原風景
076|第7章 川の潜在力|Mishima|源兵衛川の再生|346|生態系,生活の川辺
077|第7章 川の潜在力|O Porto|ケーブルカーとバターリャ広場|350|水際,丘
078|第7章 川の潜在力|Shanghai|蘇州河環境総合整備計画|354|水の再生,土地価値
079|第7章 川の潜在力|Aarhus|オーフス川リ・オープン・プロジェクト|358|暗渠,再開
080|第7章 川の潜在力|San Antonio|サンアントニオ・リバーウォーク|362|水辺,都市機能
081|第7章 川の潜在力|Yanagawa|柳川の掘割再生|366|水路,生活
082|第8章 新しい公共空間|Hyuga|日向市の連続立体交差事業|376|地産地消,駅周辺
083|第8章 新しい公共空間|Bogotá|ボゴタ公共空間マスタープラン|380|公共空間,戦略
084|第8章 新しい公共空間|Lille|ユーラリール|384|交通拠点,都市開発
085|第8章 新しい公共空間|Nagasaki|長崎水辺の森公園|388|水辺,公園
086|第8章 新しい公共空間|Paris|アンドレ・シトロエン公園とライブラリー公園|392|周縁,文化公園
087|第8章 新しい公共空間|Tokyo|東京駅|396|玄関口,駅前
088|第8章 新しい公共空間|Luzern|ルツェルン文化および会議センター|400|庇,都市空間
089|第8章 新しい公共空間|Bogotá|自転車道ネットワーク|404|自然環境,社会施設
090|第8章 新しい公共空間|Toyota|児ノ口公園|408|住民,自然
091|第8章 新しい公共空間|Rotterdam|スカウバーグプレイン|412|広場,都市文脈
092|第8章 新しい公共空間|Yokohama|横浜港大さん橋国際船ターミナル|416|港,開放
093|第8章 新しい公共空間|Stockholm|森の墓地|420|最後の場所,ランドスケープ
094|第8章 新しい公共空間|Sapporo|モエレ沼公園|424|大地,公園
095|第8章 新しい公共空間|Kakamigahara|水と緑の回廊計画|428|回廊,環境共生
096|第8章 新しい公共空間|Medellín|ベレン公園図書館|432|広場,図書館
097|第9章 無名の知恵の集積|Akihabara|秋葉原|438|部品,サブカルチャー
098|第9章 無名の知恵の集積|Shimokitazawa|下北沢|442|街の魅力,課題
099|第9章 無名の知恵の集積|Kagurazaka|神楽坂|446|生活文化,構想継承
100|第9章 無名の知恵の集積|Yanesen|谷中・根津・千駄木のまちづくり|450|地域文化,掘り起こし
`;

const ssdCases = ssdRaw.trim().split("\n").map((line) => {
  const [no, chapter, city, project, page, tagText] = line.split("|");
  return {
    no,
    chapter,
    city,
    project,
    page,
    tags: ["SSD100", ...tagText.split(",")]
  };
});

const ssdProjectCases = ssdCases.map((item) => {
  const focus = item.tags.filter((tag) => tag !== "SSD100").slice(0, 3).join("、");
  return {
    kind: "ssd",
    title: `${item.no} ${item.project}`,
    place: item.city,
    source: "世界のSSD100 都市持続再生のツボ",
    tags: item.tags,
    page: item.page,
    reading: `『世界のSSD100』p.${item.page} の「${item.project}」を、${focus || "都市再生"}の観点から読む。心中山では、空間資源、運営主体、周辺への波及を比較する材料になる。`,
    ai: `${item.project}を心中山に読み替える場合、似ている条件、異なる条件、現地調査で確認すべき条件を分けて整理する。`,
    aliases: [item.no, item.chapter, item.city, item.project, "書籍", "本", "book", "SSD", "案例"]
  };
});

const prompts = [
  {
    title: "人と空間のマッチング",
    body: "次の人物像と空間条件を照合し、心中山で解決すべき課題、使える空間資源、調査で確認すべきことを表にしてください。人物像: [ここにペルソナ]。空間条件: 線形公園、赤峰街、條通、晴光市場、MRT中山駅・雙連駅。",
    tags: ["AI", "人口", "歩行空間"]
  },
  {
    title: "事例の読み替え",
    body: "次の事例を心中山に直接移植せず、条件差を明示して読み替えてください。事例: [事例名]。比較軸: 主体、制度、地価・賃料、住民、来訪者、時間帯、維持管理。最後に使える要素と使えない要素を分けてください。",
    tags: ["AI", "事例", "SSD100"]
  },
  {
    title: "アウトプットとアウトカム",
    body: "この提案案について、直接的に生まれるアウトプットと、間接的・長期的に期待されるアウトカムを分けてください。さらに、悪い副作用と、それを調査・設計で抑える方法も挙げてください。",
    tags: ["AI", "都市更新", "用途規制"]
  },
  {
    title: "典型的ペルソナ探索",
    body: "中山区の人口構成、高齢化率、単身世帯、商業集積、昼夜の街の性格を踏まえて、心中山の都市提案を評価する5人のペルソナを作ってください。各ペルソナは、日中・夜間・休日の使い方を含めてください。",
    tags: ["AI", "人口", "生活景"]
  },
  {
    title: "現地調査計画",
    body: "テーマを [路地空間 / 線状空地 / 都市イメージ] として、90分の現地調査計画を作ってください。観察地点、写真、スケッチ、短い聞き取り質問、注意すべきバイアスを含めてください。",
    tags: ["AI", "歩行空間", "生活景"]
  },
  {
    title: "制度と実態のずれ",
    body: "都市計画上の用途規制、都市更新、歩行者空間整備と、実際の小規模商業・文創店舗・夜間経済のずれを整理してください。心中山で対立が起きやすい利害関係者を挙げ、対話の論点を作ってください。",
    tags: ["AI", "用途規制", "商業"]
  }
];

const sources = [
  {
    type: "PDF",
    title: "AI“と”プランニング",
    summary: "プランニングコモンズ、個室AI、人のデータ・空間のデータ、事前ワークショップの方針を示す基礎資料。",
    tags: ["AI", "方法", "授業"],
    driveRef: "AI“と”プランニング.pdf"
  },
  {
    type: "PDF",
    title: "グローバル都市地域演習 2026",
    summary: "対象地、テーマ、現地調査、提出物、日程、協働相手をまとめた演習要項。",
    tags: ["授業", "心中山", "課題"],
    driveRef: "グローバル都市地域演習 2026.pdf"
  },
  {
    type: "DOCX",
    title: "Google Driveフォルダ内ファイル要約",
    summary: "大同区・中山区の都市計画、都市更新、歩行空間、用途規制、商圈摩擦を横断的にまとめた資料。",
    tags: ["空間", "都市更新", "用途規制"],
    driveRef: "Google Driveフォルダ内ファイル要約 日本語 地図位置版.docx"
  },
  {
    type: "PDF",
    title: "世界のSSD100 都市持続再生のツボ",
    summary: "100事例を通じて、持続再生型の都市空間デザインを読む書籍。スキャンPDFのため全文検索は不可。",
    tags: ["SSD100", "事例", "空間"],
    driveRef: "２）空間のデータ / 世界のSSDpdf.pdf"
  },
  {
    type: "WEB",
    title: "都市の鍼治療データベース",
    summary: "外部の都市再生事例データベース。授業サイトでは転載せず、出典リンクと授業用の読み替え軸として利用。",
    tags: ["事例", "外部リンク", "空間"],
    url: "https://www.hilife.or.jp/cities/"
  },
  {
    type: "DOCX",
    title: "人のデータ報告書_心中山_v4",
    summary: "人口、年齢、里別高齢化、所得、産業、MRT、人流、歴史、文化をまとめた人のデータ報告書。",
    tags: ["人口", "産業", "人流"],
    driveRef: "人のデータ_PeopleData / 人のデータ報告書_心中山_v4.docx"
  },
  {
    type: "DOCX",
    title: "心中山 地域特色・在地言説プロファイル",
    summary: "昼の文創、夜の條通、晴光市場、SNS・メディア言説を整理した質的データ編。",
    tags: ["生活景", "文献", "地域言説"],
    driveRef: "人のデータ_PeopleData / 心中山_地域特色・在地言説プロファイル.docx"
  },
  {
    type: "MD",
    title: "PeopleData README",
    summary: "人のデータ収集フォルダの構成、進捗、統計・文献収集方針、AI汇总への接続を示す。",
    tags: ["人のデータ", "作業方針", "索引"],
    driveRef: "人のデータ_PeopleData / README.md"
  },
  {
    type: "MD",
    title: "中山区 基礎データ 検証済み",
    summary: "中山区の人口、世帯、面積、線形公園、地区性格、追加確認項目を整理。",
    tags: ["人口", "心中山", "基礎データ"],
    driveRef: "人のデータ_PeopleData / _index_索引 / 中山区_基礎データ_検証済み.md"
  },
  {
    type: "MD",
    title: "統計データ 出典インデックス",
    summary: "人口・年齢・所得・産業・住宅・MRT・外国人・観光などの一次資料URLと取得方法。",
    tags: ["統計", "出典", "CSV"],
    driveRef: "人のデータ_PeopleData / _index_索引 / 統計データ_出典インデックス.md"
  },
  {
    type: "MD",
    title: "文献 出典インデックス",
    summary: "心中山線形公園、文学、歴史、條通、晴光市場、映画、ニュース言説の出典索引。",
    tags: ["文献", "生活景", "映画"],
    driveRef: "人のデータ_PeopleData / _index_索引 / 文献_出典インデックス.md"
  },
  {
    type: "MD",
    title: "補助ツール TODO",
    summary: "ペルソナ、プロンプト集、用語集、調査フレーズ、地図ビューアなどの授業補助案。",
    tags: ["AI", "運営", "ツール"],
    driveRef: "人のデータ_PeopleData / _index_索引 / 補助ツール_TODO.md"
  },
  {
    type: "CSV",
    title: "中山区 里別年齢 最新",
    summary: "中山区42里の総人口、0–14、15–64、65歳以上、高齢化率、幼年率を集計したCSV。",
    tags: ["里別", "高齢化", "CSV"],
    driveRef: "人のデータ_PeopleData / 中山区_里別年齢_最新.csv"
  },
  {
    type: "CSV",
    title: "大同区 里別年齢 最新",
    summary: "大同区25里の年齢3区分と高齢化率。心中山の大同区側、特に雙連里の比較に使う。",
    tags: ["里別", "大同区", "CSV"],
    driveRef: "人のデータ_PeopleData / 大同区_里別年齢_最新.csv"
  },
  {
    type: "CSV",
    title: "2023年以降 各里人口數按年齡分",
    summary: "台北市全域の里別・性別・単一年齢・月次データ。民国112年は西暦2023年を指す。大容量の基礎CSV。",
    tags: ["人口", "年齢", "CSV"],
    driveRef: "人のデータ_PeopleData / 112迄今各里人口數按年齡分.csv"
  },
  {
    type: "XLS",
    title: "外僑居留人數統計表 2025年12月",
    summary: "内政部移民署の外国人居留統計。民国114年12月は西暦2025年12月。区別ではなく市レベルの参考資料として扱う。",
    tags: ["外国人", "統計", "XLS"],
    driveRef: "人のデータ_PeopleData / 外僑居留人數統計表11412.xls"
  },
  {
    type: "PDF",
    title: "臺北市商業登記家数統計表 2026年4月",
    summary: "民国115年4月、つまり西暦2026年4月の商業登記家数。中山区の商業登記家数が台北市最多であることを示す。",
    tags: ["商業", "産業", "PDF"],
    driveRef: "人のデータ_PeopleData / 1 115年4月臺北市商業登記家數統計表(依行業別及行政區).pdf"
  },
  {
    type: "PDF",
    title: "臺北市中山區統計年報",
    summary: "中山区公所が編製した統計年報。一般概況、民政、社会、経建、兵役、人文を含む120頁の一次資料。",
    tags: ["統計年報", "中山区", "PDF"],
    driveRef: "人のデータ_PeopleData / 臺北市中山區統計年報.pdf"
  },
  {
    type: "PY",
    title: "中山区大同区 年齢集計スクリプト",
    summary: "里別年齢CSVを中山区・大同区に絞り込み、0–14/15–64/65+と高齢化率を集計する補助スクリプト。",
    tags: ["集計", "CSV", "ツール"],
    driveRef: "人のデータ_PeopleData / 01_統計_Statistics / 里別_BoroughLevel / 中山区大同区_年齢集計.py"
  },
  {
    type: "計画資料",
    title: "防災型都市更新細部計画案",
    summary: "老朽・危険建築物の更新を、防災・減災・環境性能と結びつける全市的制度資料。",
    tags: ["都市更新", "防災", "空間"],
    driveRef: "Google Drive要約内: P113010.pdf"
  },
  {
    type: "計画資料",
    title: "大同区都市計画通盤検討 主要計画",
    summary: "大同区を歴史文化、TOD、商圈、公共施設不足、防災韌性から読む基幹計画。",
    tags: ["大同区", "計画", "歴史商圈"],
    driveRef: "Google Drive要約内: 臺北市大同區都市計畫通盤檢討(主要計畫)案.pdf"
  },
  {
    type: "計画資料",
    title: "大同区細部計画 図面・都市設計要点",
    summary: "土地使用、騎楼指定、交九転運站、双連段・大龍段の都市設計準則を含む補完資料。",
    tags: ["騎楼", "歩行空間", "大同区"],
    driveRef: "Google Drive要約内: 細部計画案-1〜4"
  },
  {
    type: "計画資料",
    title: "中山区都市計画通盤検討 細部計画",
    summary: "土地使用、生活圈別変更、大彎北段の商住混合処理、騎楼・歩行空間を扱う資料。",
    tags: ["中山区", "用途規制", "商住混合"],
    driveRef: "Google Drive要約内: 都市計畫通盤檢討.pdf"
  },
  {
    type: "報道資料",
    title: "中山南西商圈関連報道リスト",
    summary: "赤峰街・中山南西の小規模店舗が、用途規制や都市更新圧力に直面する状況を示す入口資料。",
    tags: ["商圈", "報道", "用途規制"],
    driveRef: "Google Drive要約内: 中山南西商圈相關報導.docx / pdf"
  },
  {
    type: "DOCX",
    title: "人のデータ報告書 旧版アーカイブ",
    summary: "人のデータ報告書の初版、v2、v3。内容確認用の版管理資料。",
    tags: ["アーカイブ", "人のデータ", "DOCX"],
    driveRef: "人のデータ_PeopleData / 人のデータ報告書_心中山.docx ほか"
  }
];

const tags = [
  "人口",
  "里別",
  "生活景",
  "都市更新",
  "用途規制",
  "事例",
  "都市の鍼治療",
  "SSD100",
  "AI",
  "歩行空間",
  "公共空間",
  "商業",
  "交通",
  "歴史保全",
  "コミュニティ",
  "環境",
  "文献"
];

let activeTag = "すべて";
let activeCaseFilter = "all";
let aiChatBusy = false;
let aiInputComposing = false;
let aiChatMessages = [
  {
    role: "assistant",
    content: "授業資料について質問できます。例: 「高齢者向け提案に使える事例は？」「赤峰街と谷中を比較して」「公共空間の調査項目を中文で整理して」。",
    sources: []
  }
];

const UI_TEXT = {
  ja: {
    language: "言語", navOverview: "概要", navVisuals: "位置・図表", navPeople: "人のデータ", navSpace: "空間のデータ", navCases: "事例", navPrompts: "AIプロンプト", navUpload: "資料共有の検討", navSources: "資料一覧",
    searchLabel: "資料・事例を検索", searchPlaceholder: "例: 赤峰街、人口、都市更新、案例、park", filterLabel: "テーマで絞り込む", studyArea: "対象地",
    classroomNotice: "このサイトは授業内の検討用資料であり、外部サイトや書籍の本文・画像を転載せず、短い要約・出典リンク・授業用の分析軸で構成している。", mapCaption: "概略図。法定境界や正確な位置は原資料で確認する。",
    heroTitle: "中山駅から雙連駅へ、線形公園・路地・商業・記憶をつなぐ。", heroBody: "本サイトは、事前学習と現地調査で使うための資料入口である。「人のデータ」と「空間のデータ」を同じ画面で見比べ、AIに投げる問いをつくる。",
    howToRead: "このサイトの読み方", step1Title: "現況をつかむ", step1Body: "人口、年齢、商業、交通、人流、生活景のデータから、誰のどんな課題があるかを仮説化する。", step2Title: "空間と照合する", step2Body: "線形公園、路地、騎楼、都市更新、用途規制などの空間制度と照らし合わせる。", step3Title: "事例で考える", step3Body: "SSD100と都市の鍼治療の事例を、心中山にそのまま移植せず、条件差を見ながら読み替える。",
    visualsTitle: "位置・図表で対象地をつかむ", visualsBody: "まず地図で場所を確認し、次に人口構成・資料の厚み・時間帯の違いを見比べる。数値は提案の答えではなく、現地で確かめるための仮説の入口である。", orientationLabel: "位置と図表の見方", readingScalesLabel: "読み取りのスケール", peopleDataLabel: "人のデータ", materialCoverageLabel: "資料の範囲", fieldworkLensLabel: "現地調査の視点", aiNavigatorLabel: "AI資料ナビゲーター", spatialDataLabel: "空間のデータ", caseWorkspaceLabel: "事例ワークスペース", promptStudioLabel: "AIプロンプト・スタジオ", fieldworkCommonsLabel: "現地調査コモンズ", inventoryLabel: "資料一覧",
    googleMapTitle: "中山駅から雙連駅まで", googleMapArea: "台北市 中山区・大同区", googleMapNote: "埋め込み地図は位置確認用。徒歩ルート、駅出口、現地の最新状況はGoogle Mapsで開いて確認する。", openAreaMap: "心中山周辺を開く ↗", openWalkingRoute: "徒歩ルートを見る ↗",
    scaleTitle: "4つのスケールを往復する", scale1Title: "台北の都市構造", scale1Body: "駅・区・人流", scale2Title: "心中山の線形公園", scale2Body: "約500mの連続空間", scale3Title: "路地・騎楼・店舗", scale3Body: "用途・境界・滞留", scale4Title: "一人の体験", scale4Body: "歩く・休む・働く", scaleNote: "広域の統計だけでも、個別の店舗だけでも提案は作れない。4つのスケールを行き来して、データと観察を重ねる。",
    elderChartTitle: "里別の高齢化率", age65Plus: "65歳以上", elderChartNote: "横棒は0–32%の共通スケール。区平均だけでなく、駅周辺と大同区側の里を比較し、高齢者の存在を歩行・休憩・買い物の行動として観察する。", coverageTitle: "比較できる資料の厚み", itemCount: "件数", coverageNote: "資料数が多いこと自体が答えではない。自分の問いに合う資料を選び、最後は現地の声・写真・歩行記録で検証する。",
    timeTitle: "時間帯で見る都市の表情", morning: "朝", morningTitle: "生活・通勤", morningBody: "駅、通学、開店準備", daytime: "昼", daytimeTitle: "回遊・商業", daytimeBody: "赤峰街、文創、ランチ", night: "夜", nightTitle: "飲食・歓楽", nightBody: "條通、夜間経済、安全", timeNote: "同じ場所でも、時間帯が変わると利用者・音・光・安全感・商業の組み合わせが変わる。調査計画に時間差を入れる。",
    navigatorTitle: "資料についてAIに質問する", navigatorBody: "このサイトは位置とデータを確認する入口。複数の資料を横断して要約・比較・問いづくりをするときは、授業用NotebookLMを使う。", askNotebook: "NotebookLMで資料に質問する ↗", navigatorNote: "Googleアカウントでログインし、回答の引用元と原資料を確認する。", notebookKicker: "AI資料相談", notebookLabel: "NotebookLMで質問",
    peopleTitle: "人のデータ", peopleBody: "人口、世帯、年齢、所得、産業、交通、地域言説を、提案の相手となる「人」の像に接続する。", keyReadings: "主要な読み取り", boroughData: "里別データの入口",
    spaceTitle: "空間のデータ", spaceBody: "計画図書、制度、都市更新、歩行空間、公共施設不足、商圏摩擦を、提案の条件として整理する。",
    ssdTitle: "世界のSSD100 事例索引", ssdBody: "書籍本文を転載せず、ケース番号・場所・プロジェクト名・頁・授業用タグで、学生が自由に参照先を選べる入口をつくる。", chapterFilter: "章で絞り込む",
    casesTitle: "事例カード", casesBody: "HILIFEの都市の鍼治療データベースとSSD100を、授業用の読み替え軸つきカードとして横断検索する。", promptsTitle: "AIに投げる問い", promptsBody: "個室AIとプランニングコモンズを往復するための、授業用プロンプト雛形。",
    uploadTitle: "現地調査資料の共有方法を検討中", uploadBody: "この公開試用版ではアップロードを停止しています。事前授業で必要性と運用方法を確認し、採用する場合は写真・PDF・短い動画を安全に共有できる機能を追加します。", discussionLabel: "授業で確認すること", discussionPoint1: "誰がアップロード・改名・削除できるべきか", discussionPoint2: "写真・PDF・動画をどのくらい保存する必要があるか", discussionPoint3: "授業終了後に資料を残すか、削除するか", fieldDate: "調査日", studentGroup: "学生グループ", groupA: "A班", groupB: "B班", groupC: "C班", groupD: "D班", groupE: "E班", observationCategory: "観察カテゴリー", catWalking: "歩行空間", catPublic: "公共空間", catCommerce: "商業", catTransport: "交通", catCommunity: "コミュニティ", catEnvironment: "環境", catOther: "その他", otherCategory: "その他のカテゴリー", otherPlaceholder: "例：音環境、サインシステム", chooseFiles: "ファイルを選択", fileHint: "写真・スケッチ・PDF・動画を最大5件選択できます。", uploadSubmit: "アップロードして表示",
    materialName: "資料名（任意）", materialNamePlaceholder: "例：赤峰街の歩行空間調査", uploadedMaterialsLabel: "共有資料", uploadedMaterials: "アップロード済み資料", filterDate: "日付で絞り込む", filterGroup: "学生グループで絞り込む", filterCategory: "観察カテゴリーで絞り込む", allGroups: "すべてのグループ", allCategories: "すべてのカテゴリー", clearFilters: "絞り込みを解除", loadingMaterials: "資料を読み込んでいます…", noUploadedMaterials: "条件に合う資料はまだありません。", loadMaterialsError: "資料を読み込めませんでした。", preview: "プレビュー", rename: "名前を変更", delete: "削除", star: "標星する", unstar: "標星を外す", closePreview: "プレビューを閉じる", renamePrompt: "新しい資料名を入力してください。", deleteConfirm: "この資料を削除しますか？この操作は元に戻せません。", updateError: "資料を更新できませんでした。", deleteError: "資料を削除できませんでした。", originalFileName: "元のファイル名", fileImage: "画像", fileVideo: "動画", filePdf: "PDF", fileOther: "ファイル",
    sourcesTitle: "資料インベントリ", sourcesBody: "授業で参照する資料の所在と用途を一覧化する。配布元はローカルパスではなく、共有用Google Driveフォルダで案内する。", footerProject: "作成対象: グローバル都市地域演習 2026 / 台北市・心中山地区", footerRights: "外部資料は出典明示のうえ、授業内分析のための短い要約として扱う。",
    all: "すべて", urbanAcupuncture: "都市の鍼治療", taiwan: "台湾", comparisons: "比較候補", selectedFiles: "{count}件を選択", uploading: "アップロード中…", uploadSuccess: "{count}件を保存し、資料一覧に表示しました。", uploadError: "アップロードできませんでした。もう一度お試しください。", tooManyFiles: "一度に選択できるのは5件までです。", fileTooLarge: "1ファイルは100MB以下にしてください。", caseCount: "{shown} / {total} 件を表示中", noCases: "該当する事例はありません。", filterAll: "すべての資料を表示中。事例カードは {count} 件。", noPeople: "該当する人のデータはありません。", noBorough: "該当する里別データはありません。", noSpace: "該当する空間データはありません。", noPrompts: "該当するプロンプトはありません。", noSources: "該当する資料はありません。", sourceLabel: "出典", aiQuestion: "AI問い", openOriginal: "原資料を開く", externalMaterial: "外部ウェブ資料", driveFolder: "Google Drive共有フォルダ", openExternal: "外部リンクを開く", openDrive: "Google Driveフォルダを開く", open: "開く", copy: "コピー", copied: "コピー済み", itemsUnit: "件", tableArea: "里", tablePopulation: "人口", tableAgeing: "高齢化率", tableCompare: "比較", tableReading: "読み取り", searchScope: "検索対象", searchResults: "検索結果", noMatch: "該当なし", searchHint: "日本語・繁體中文・英語の一部キーワードを同義語として扱う。", sourceUrban: "都市の鍼治療", sourceUrbanNote: "外部事例カード", sourceSsd: "SSD100", sourceSsdNote: "書籍ケースカード", sourceInventory: "資料インベントリ", sourceInventoryNote: "授業資料の入口", sourcePrompts: "AIプロンプト", sourcePromptsNote: "問いの雛形", childAndOlder: "0–14歳 {child}% / 65歳以上 {old}人", filterQuery: "検索", filterTheme: "テーマ", filterCase: "事例", filtering: "{parts} で絞り込み中。"
  },
  "zh-Hant": {
    language: "語言", navOverview: "概要", navVisuals: "位置・圖表", navPeople: "人的資料", navSpace: "空間資料", navCases: "案例", navPrompts: "AI 提問", navUpload: "資料共享討論", navSources: "資料一覽",
    searchLabel: "搜尋資料與案例", searchPlaceholder: "例：赤峰街、人口、都市更新、案例、park", filterLabel: "依主題篩選", studyArea: "研究區域",
    classroomNotice: "本網站僅供課堂討論使用，不轉載外部網站或書籍的正文與圖片；內容由短摘要、來源連結與課堂分析架構組成。", mapCaption: "概略圖。法定邊界與精確位置請以原始資料為準。",
    heroTitle: "從中山站到雙連站，串連線形公園、巷弄、商業與記憶。", heroBody: "本網站是課前學習與實地調查的資料入口。可在同一畫面比較「人的資料」與「空間資料」，並建立向 AI 提問的問題。",
    howToRead: "網站閱讀方式", step1Title: "掌握現況", step1Body: "從人口、年齡、商業、交通、人流與生活景觀，提出誰面臨什麼問題的假設。", step2Title: "與空間對照", step2Body: "對照線形公園、巷弄、騎樓、都市更新與使用分區等空間制度。", step3Title: "以案例思考", step3Body: "比較 SSD100 與都市針灸案例，理解條件差異，而不是直接套用到心中山。",
    visualsTitle: "以位置與圖表掌握研究區域", visualsBody: "先用地圖確認位置，再比較人口結構、資料覆蓋與時段差異。數值不是提案答案，而是實地驗證假設的入口。", orientationLabel: "位置與圖表說明", readingScalesLabel: "觀察尺度", peopleDataLabel: "人的資料", materialCoverageLabel: "資料涵蓋範圍", fieldworkLensLabel: "實地調查視角", aiNavigatorLabel: "AI 資料導覽", spatialDataLabel: "空間資料", caseWorkspaceLabel: "案例工作區", promptStudioLabel: "AI 提問工作室", fieldworkCommonsLabel: "實地調查共享區", inventoryLabel: "資料清單",
    googleMapTitle: "從中山站到雙連站", googleMapArea: "臺北市中山區・大同區", googleMapNote: "嵌入地圖用於確認位置。步行路線、捷運出口與最新現況請在 Google Maps 中開啟確認。", openAreaMap: "開啟心中山周邊地圖 ↗", openWalkingRoute: "查看步行路線 ↗",
    scaleTitle: "往返四種觀察尺度", scale1Title: "臺北都市結構", scale1Body: "車站・行政區・人流", scale2Title: "心中山線形公園", scale2Body: "約 500 公尺的連續空間", scale3Title: "巷弄・騎樓・店家", scale3Body: "使用・邊界・停留", scale4Title: "個人經驗", scale4Body: "行走・休息・工作", scaleNote: "只看廣域統計或單一店家都不足以形成提案。需要在四種尺度間往返，疊合資料與現地觀察。",
    elderChartTitle: "各里高齡化率", age65Plus: "65 歲以上", elderChartNote: "橫條統一使用 0–32% 的比例尺。除了區平均，也比較車站周邊與大同區側各里，並把高齡者的存在轉化為步行、休息與購物行為來觀察。", coverageTitle: "可供比較的資料量", itemCount: "件數", coverageNote: "資料多不等於得到答案。請選擇符合問題的資料，最後以現地聲音、照片與步行紀錄驗證。",
    timeTitle: "不同時段的城市表情", morning: "早晨", morningTitle: "生活・通勤", morningBody: "車站、上學、開店準備", daytime: "白天", daytimeTitle: "遊逛・商業", daytimeBody: "赤峰街、文創、午餐", night: "夜間", nightTitle: "飲食・娛樂", nightBody: "條通、夜間經濟、安全", timeNote: "同一地點在不同時段會出現不同的使用者、聲音、光線、安全感與商業組合。調查計畫應納入時段差異。",
    navigatorTitle: "向 AI 詢問課堂資料", navigatorBody: "本網站是確認位置與資料的入口。需要跨資料摘要、比較與建立問題時，可使用課堂 NotebookLM。", askNotebook: "在 NotebookLM 詢問資料 ↗", navigatorNote: "請登入 Google 帳號，並核對回答引用的來源與原始資料。", notebookKicker: "AI 資料諮詢", notebookLabel: "在 NotebookLM 提問",
    peopleTitle: "人的資料", peopleBody: "將人口、家戶、年齡、所得、產業、交通與地方論述，連結到提案所面向的人群。", keyReadings: "主要解讀", boroughData: "里別資料入口",
    spaceTitle: "空間資料", spaceBody: "整理都市計畫、制度、都市更新、步行空間、公共設施不足與商圈摩擦，作為提案條件。",
    ssdTitle: "世界 SSD100 案例索引", ssdBody: "不轉載書籍正文，以案例編號、地點、專案名稱、頁碼與課堂標籤，提供學生選擇參考案例的入口。", chapterFilter: "依章節篩選",
    casesTitle: "案例卡片", casesBody: "以課堂分析視角，跨資料庫搜尋 HILIFE 都市針灸與 SSD100 案例。", promptsTitle: "向 AI 提問", promptsBody: "往返個人 AI 與 Planning Commons 的課堂提問範本。",
    uploadTitle: "實地調查資料共享方式討論中", uploadBody: "此公開試用版暫停上傳功能。事前課程將確認需求與管理方式；若決定採用，再加入可安全共享照片、PDF與短影片的功能。", discussionLabel: "課堂討論事項", discussionPoint1: "哪些人可以上傳、重新命名及刪除資料", discussionPoint2: "需要保存多少照片、PDF與影片", discussionPoint3: "課程結束後保留或刪除資料", fieldDate: "調查日期", studentGroup: "學生分組", groupA: "A 組", groupB: "B 組", groupC: "C 組", groupD: "D 組", groupE: "E 組", observationCategory: "觀察類別", catWalking: "步行空間", catPublic: "公共空間", catCommerce: "商業", catTransport: "交通", catCommunity: "社區", catEnvironment: "環境", catOther: "其它", otherCategory: "請填寫其它類別", otherPlaceholder: "例：聲音環境、標識系統", chooseFiles: "選擇檔案", fileHint: "可選擇最多 5 個照片、手繪圖、PDF 或影片。", uploadSubmit: "上傳並顯示",
    materialName: "資料名稱（選填）", materialNamePlaceholder: "例：赤峰街步行空間調查", uploadedMaterialsLabel: "共享資料", uploadedMaterials: "已上傳資料", filterDate: "依日期篩選", filterGroup: "依學生分組篩選", filterCategory: "依觀察類別篩選", allGroups: "所有分組", allCategories: "所有類別", clearFilters: "清除篩選", loadingMaterials: "正在讀取資料…", noUploadedMaterials: "目前沒有符合條件的資料。", loadMaterialsError: "無法讀取資料。", preview: "預覽", rename: "重新命名", delete: "刪除", star: "加上星號", unstar: "取消星號", closePreview: "關閉預覽", renamePrompt: "請輸入新的資料名稱。", deleteConfirm: "確定要刪除此資料嗎？此操作無法復原。", updateError: "無法更新資料。", deleteError: "無法刪除資料。", originalFileName: "原始檔名", fileImage: "圖片", fileVideo: "影片", filePdf: "PDF", fileOther: "檔案",
    sourcesTitle: "資料清單", sourcesBody: "列出課堂參考資料的位置與用途，並透過共用 Google Drive 資料夾提供來源。", footerProject: "製作對象：Global Urban Regional Studio 2026／臺北市心中山地區", footerRights: "外部資料均標示來源，僅以短摘要供課堂分析使用。",
    all: "全部", urbanAcupuncture: "都市針灸", taiwan: "臺灣", comparisons: "比較候選", selectedFiles: "已選擇 {count} 個檔案", uploading: "上傳中…", uploadSuccess: "已儲存 {count} 個檔案並顯示於資料清單。", uploadError: "無法上傳，請再試一次。", tooManyFiles: "一次最多選擇 5 個檔案。", fileTooLarge: "每個檔案須小於 100MB。", caseCount: "顯示 {shown} / {total} 件", noCases: "沒有符合條件的案例。", filterAll: "正在顯示所有資料，共有 {count} 張案例卡片。", noPeople: "沒有符合條件的人的資料。", noBorough: "沒有符合條件的里別資料。", noSpace: "沒有符合條件的空間資料。", noPrompts: "沒有符合條件的提問範本。", noSources: "沒有符合條件的資料。", sourceLabel: "來源", aiQuestion: "AI 問題", openOriginal: "開啟原始資料", externalMaterial: "外部網頁資料", driveFolder: "Google Drive 共用資料夾", openExternal: "開啟外部連結", openDrive: "開啟 Google Drive 資料夾", open: "開啟", copy: "複製", copied: "已複製", itemsUnit: "件", tableArea: "里", tablePopulation: "人口", tableAgeing: "高齡化率", tableCompare: "比較", tableReading: "解讀", searchScope: "搜尋範圍", searchResults: "搜尋結果", noMatch: "沒有符合項目", searchHint: "日語、繁體中文與英語的部分關鍵字會視為同義詞。", sourceUrban: "都市針灸", sourceUrbanNote: "外部案例卡片", sourceSsd: "SSD100", sourceSsdNote: "書籍案例卡片", sourceInventory: "資料清單", sourceInventoryNote: "課堂資料入口", sourcePrompts: "AI 提問", sourcePromptsNote: "問題範本", childAndOlder: "0–14 歲 {child}%／65 歲以上 {old} 人", filterQuery: "搜尋", filterTheme: "主題", filterCase: "案例", filtering: "正在依 {parts} 篩選。"
  },
  en: {
    language: "Language", navOverview: "Overview", navVisuals: "Location & charts", navPeople: "People data", navSpace: "Spatial data", navCases: "Cases", navPrompts: "AI prompts", navUpload: "Sharing discussion", navSources: "Sources",
    searchLabel: "Search sources and cases", searchPlaceholder: "e.g. Chifeng Street, population, urban renewal", filterLabel: "Filter by theme", studyArea: "Study area",
    classroomNotice: "This site is for classroom discussion. It does not reproduce text or images from external websites or books; it uses short summaries, source links, and class-specific analytical lenses.", mapCaption: "Schematic map. Verify statutory boundaries and exact locations in the original sources.",
    heroTitle: "Connect the linear park, lanes, commerce, and memory from Zhongshan to Shuanglian.", heroBody: "This site is an entry point for pre-class learning and fieldwork. Compare people and spatial data on one page, then develop questions for AI-supported inquiry.",
    howToRead: "How to use this site", step1Title: "Understand current conditions", step1Body: "Use population, age, commerce, transport, movement, and everyday-life data to form hypotheses about people and their needs.", step2Title: "Compare with spatial conditions", step2Body: "Relate the findings to the linear park, lanes, arcades, urban renewal, and land-use controls.", step3Title: "Think through cases", step3Body: "Read SSD100 and urban-acupuncture cases through local differences instead of copying them directly into Heart of Zhongshan.",
    visualsTitle: "Understand the study area through maps and charts", visualsBody: "Locate the area first, then compare population, source coverage, and time-of-day differences. Numbers are starting points for field verification, not final answers.", orientationLabel: "Orientation & visual notes", readingScalesLabel: "Reading scales", peopleDataLabel: "People data", materialCoverageLabel: "Material coverage", fieldworkLensLabel: "Fieldwork lens", aiNavigatorLabel: "AI material navigator", spatialDataLabel: "Spatial data", caseWorkspaceLabel: "Case workspace", promptStudioLabel: "AI prompt studio", fieldworkCommonsLabel: "Fieldwork commons", inventoryLabel: "Inventory",
    googleMapTitle: "From Zhongshan Station to Shuanglian Station", googleMapArea: "Zhongshan and Datong Districts, Taipei", googleMapNote: "The embedded map is for orientation. Open Google Maps to confirm walking routes, station exits, and current conditions.", openAreaMap: "Open the Heart of Zhongshan area ↗", openWalkingRoute: "View the walking route ↗",
    scaleTitle: "Move between four reading scales", scale1Title: "Taipei urban structure", scale1Body: "Stations · districts · flows", scale2Title: "Heart of Zhongshan linear park", scale2Body: "A continuous space of about 500 m", scale3Title: "Lanes · arcades · shops", scale3Body: "Use · edges · staying", scale4Title: "Individual experience", scale4Body: "Walk · rest · work", scaleNote: "Neither citywide statistics nor a single shop is enough for a proposal. Move between all four scales and combine data with observation.",
    elderChartTitle: "Ageing rate by neighborhood", age65Plus: "Age 65+", elderChartNote: "All bars use the same 0–32% scale. Compare neighborhoods around the stations and on the Datong side, then observe older residents through walking, resting, and shopping behavior.", coverageTitle: "Depth of comparable material", itemCount: "Items", coverageNote: "More sources do not automatically produce an answer. Select sources that fit your question, then verify them with local voices, photographs, and walking records.",
    timeTitle: "How the city changes by time of day", morning: "Morning", morningTitle: "Daily life · commuting", morningBody: "Stations, school trips, opening shops", daytime: "Day", daytimeTitle: "Circulation · commerce", daytimeBody: "Chifeng Street, creative shops, lunch", night: "Night", nightTitle: "Food · entertainment", nightBody: "Tiaotong streets, night economy, safety", timeNote: "At the same place, users, sound, light, perceived safety, and commerce change over time. Build time differences into the fieldwork plan.",
    navigatorTitle: "Ask AI about the class material", navigatorBody: "This site is an entry point for locations and data. Use the class NotebookLM to summarize, compare, and develop questions across multiple sources.", askNotebook: "Ask about the material in NotebookLM ↗", navigatorNote: "Sign in with a Google account and verify both the cited passages and original sources.", notebookKicker: "AI source help", notebookLabel: "Ask in NotebookLM",
    peopleTitle: "People data", peopleBody: "Connect population, households, age, income, industry, transport, and local narratives to the people a proposal is meant to serve.", keyReadings: "Key readings", boroughData: "Neighborhood data",
    spaceTitle: "Spatial data", spaceBody: "Organize plans, regulations, urban renewal, walking space, public-facility gaps, and commercial friction as design conditions.",
    ssdTitle: "World SSD100 case index", ssdBody: "Without reproducing the book, this index lets students choose references by case number, place, project, page, and class tags.", chapterFilter: "Filter by chapter",
    casesTitle: "Case cards", casesBody: "Search HILIFE urban-acupuncture and SSD100 cases through class-specific comparison lenses.", promptsTitle: "Questions for AI", promptsBody: "Class prompt templates for moving between individual AI work and the Planning Commons.",
    uploadTitle: "Fieldwork sharing under discussion", uploadBody: "Uploads are paused in this public trial. The preparatory class will confirm the need and operating rules; secure sharing for photos, PDFs, and short videos can then be added if adopted.", discussionLabel: "Questions for class", discussionPoint1: "Who should be able to upload, rename, and delete material", discussionPoint2: "How much photo, PDF, and video storage is needed", discussionPoint3: "Whether material should remain after the course", fieldDate: "Fieldwork date", studentGroup: "Student group", groupA: "Group A", groupB: "Group B", groupC: "Group C", groupD: "Group D", groupE: "Group E", observationCategory: "Observation category", catWalking: "Walking space", catPublic: "Public space", catCommerce: "Commerce", catTransport: "Transport", catCommunity: "Community", catEnvironment: "Environment", catOther: "Other", otherCategory: "Describe the other category", otherPlaceholder: "e.g. soundscape, signage system", chooseFiles: "Choose files", fileHint: "Select up to 5 photos, sketches, PDFs, or videos.", uploadSubmit: "Upload and display",
    materialName: "Material name (optional)", materialNamePlaceholder: "e.g. Chifeng Street walking-space survey", uploadedMaterialsLabel: "Shared materials", uploadedMaterials: "Uploaded materials", filterDate: "Filter by date", filterGroup: "Filter by student group", filterCategory: "Filter by observation category", allGroups: "All groups", allCategories: "All categories", clearFilters: "Clear filters", loadingMaterials: "Loading materials…", noUploadedMaterials: "No materials match these filters yet.", loadMaterialsError: "Materials could not be loaded.", preview: "Preview", rename: "Rename", delete: "Delete", star: "Add star", unstar: "Remove star", closePreview: "Close preview", renamePrompt: "Enter a new material name.", deleteConfirm: "Delete this material? This cannot be undone.", updateError: "The material could not be updated.", deleteError: "The material could not be deleted.", originalFileName: "Original filename", fileImage: "Image", fileVideo: "Video", filePdf: "PDF", fileOther: "File",
    sourcesTitle: "Source inventory", sourcesBody: "Lists where class sources are stored and how they are used, with access through the shared Google Drive folder.", footerProject: "Project: Global Urban Regional Studio 2026 / Heart of Zhongshan, Taipei", footerRights: "External sources are credited and used only as short summaries for classroom analysis.",
    all: "All", urbanAcupuncture: "Urban acupuncture", taiwan: "Taiwan", comparisons: "Comparisons", selectedFiles: "{count} files selected", uploading: "Uploading…", uploadSuccess: "Saved {count} files and added them to the library.", uploadError: "Upload failed. Please try again.", tooManyFiles: "Select no more than 5 files at a time.", fileTooLarge: "Each file must be under 100MB.", caseCount: "Showing {shown} / {total}", noCases: "No matching cases.", filterAll: "Showing all materials. {count} case cards are available.", noPeople: "No matching people data.", noBorough: "No matching neighborhood data.", noSpace: "No matching spatial data.", noPrompts: "No matching prompts.", noSources: "No matching sources.", sourceLabel: "Source", aiQuestion: "AI question", openOriginal: "Open original source", externalMaterial: "External web source", driveFolder: "Shared Google Drive folder", openExternal: "Open external link", openDrive: "Open Google Drive folder", open: "Open", copy: "Copy", copied: "Copied", itemsUnit: "items", tableArea: "Neighborhood", tablePopulation: "Population", tableAgeing: "Ageing rate", tableCompare: "Comparison", tableReading: "Reading", searchScope: "Search scope", searchResults: "Search results", noMatch: "No matches", searchHint: "Selected Japanese, Traditional Chinese, and English terms are treated as synonyms.", sourceUrban: "Urban acupuncture", sourceUrbanNote: "External case cards", sourceSsd: "SSD100", sourceSsdNote: "Book case cards", sourceInventory: "Source inventory", sourceInventoryNote: "Entry points to class material", sourcePrompts: "AI prompts", sourcePromptsNote: "Question templates", childAndOlder: "Age 0–14 {child}% / age 65+ {old}", filterQuery: "Search", filterTheme: "Theme", filterCase: "Case", filtering: "Filtering by {parts}."
  }
};

let currentLanguage = "ja";
let observationItems = [];

function t(key, variables = {}) {
  const template = UI_TEXT[currentLanguage]?.[key] || UI_TEXT.ja[key] || key;
  return Object.entries(variables).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), template);
}

const TAG_LABELS = {
  "zh-Hant": {
    "人口": "人口", "里別": "里別", "生活景": "生活景觀", "都市更新": "都市更新", "用途規制": "使用分區", "事例": "案例", "都市の鍼治療": "都市針灸", "歩行空間": "步行空間", "公共空間": "公共空間", "商業": "商業", "交通": "交通", "歴史保全": "歷史保存", "コミュニティ": "社區", "環境": "環境", "文献": "文獻", "比較候補": "比較候選", "教育": "教育", "再生": "再生", "空間": "空間", "高齢化": "高齡化", "世帯": "家戶", "方法": "方法", "授業": "課堂", "課題": "課題", "記憶": "記憶", "歴史": "歷史", "広場": "廣場", "線形公園": "線形公園", "場所": "場所", "再編集": "重新詮釋", "外部リンク": "外部連結", "比較": "比較", "文化施設": "文化設施", "地域文化": "地方文化", "小商い": "小型商業", "街並み": "街道景觀", "回遊": "遊逛", "水辺": "水岸"
  },
  en: {
    "人口": "Population", "里別": "Neighborhood", "生活景": "Everyday life", "都市更新": "Urban renewal", "用途規制": "Land-use control", "事例": "Cases", "都市の鍼治療": "Urban acupuncture", "歩行空間": "Walking space", "公共空間": "Public space", "商業": "Commerce", "交通": "Mobility", "歴史保全": "Historic preservation", "コミュニティ": "Community", "環境": "Environment", "文献": "Literature", "比較候補": "Comparison", "教育": "Education", "再生": "Regeneration", "空間": "Space", "高齢化": "Ageing", "世帯": "Households", "方法": "Method", "授業": "Class", "課題": "Assignment", "記憶": "Memory", "歴史": "History", "広場": "Plaza", "線形公園": "Linear park", "場所": "Place", "再編集": "Reframing", "外部リンク": "External link", "比較": "Comparison", "文化施設": "Cultural facility", "地域文化": "Local culture", "小商い": "Small business", "街並み": "Streetscape", "回遊": "Circulation", "水辺": "Waterfront"
  }
};

const CONTENT_TEXT = {
  "zh-Hant": {
    metrics: [
      { label: "中山區人口", note: "2026 年 5 月。女性人口較多的都心行政區。" },
      { label: "高齡化率", note: "65 歲以上人口比例，高於臺北市平均。" },
      { label: "線形公園", note: "從中山站延伸至雙連站的帶狀空間。" },
      { label: "商業登記", note: "臺北市 12 區最多，零售與餐飲尤其集中。" }
    ],
    peopleInsights: [
      { title: "單人與小型家戶集中的都心", body: "中山區約 21 萬人、約 10.4 萬戶，平均每戶約 2.04 人。巷弄尺度的生活服務、休息場所與夜間安全容易成為提案重點。" },
      { title: "高齡化與年輕商業文化並存", body: "65 歲以上占 25.6%，0–14 歲占 10.5%；同時赤峰街和中山站周邊聚集年輕訪客與創意店家。應觀察不同世代的使用差異。" },
      { title: "白天、夜晚與飲食的三層結構", body: "白天以赤峰街與文創活動為主，夜晚轉向林森北路與條通，飲食則集中於晴光市場和雙城街。城市形象會隨時段切換。" },
      { title: "所得與空間的對比", body: "中山區同時包含大直、北安的高所得住宅區，以及心中山周邊的商業、娛樂與小型店家；不能只依區平均判斷。" }
    ],
    boroughNotes: ["中山站周邊的觀察候選", "高齡化率較高", "中山北路沿線的觀察候選", "晴光市場周邊", "大同區側，鄰接線形公園", "大直、北安側的高所得里"],
    spaceCards: [
      { title: "AI『與』規劃", body: "把規劃理解為人的課題與空間的配對，蒐集、共享並持續完善高解析度的人的資料與空間資料。" },
      { title: "2026 演習要項", body: "研究區域為臺北市心中山，主題包括巷弄、線形開放空間與街道景觀；課程要求實地調查、問題發現、空間提案與成果說明。" },
      { title: "都市計畫與更新資料群", body: "用於理解大同區主要計畫、中山區細部計畫、防災型都市更新、騎樓與步行空間、使用分區及更新壓力。" },
      { title: "世界 SSD100", body: "以九個主題整理 100 個都市永續再生案例。學生可在案例卡片中選擇需要閱讀的頁面。" },
      { title: "都市針灸資料庫", body: "可搜尋 365 個小型都市介入與再生案例的外部網站；本站以附來源連結的課堂案例卡片呈現。" },
      { title: "人的資料資料夾", body: "整理人口、家戶、年齡、產業、所得、MRT、文獻、電影與地方論述，方便在課堂中使用 AI 進行比較。" }
    ],
    prompts: [
      { title: "人與空間的配對", body: "請對照以下人物設定與空間條件，以表格整理心中山需要解決的課題、可利用的空間資源，以及實地調查需要確認的事項。人物設定：[填入人物]。空間條件：線形公園、赤峰街、條通、晴光市場、MRT 中山站與雙連站。" },
      { title: "重新解讀案例", body: "不要把以下案例直接移植到心中山，請先說明條件差異。案例：[案例名稱]。比較面向：主體、制度、地價與租金、居民、訪客、時段、維護管理。最後區分可採用與不可採用的元素。" },
      { title: "直接成果與長期成效", body: "請區分此提案直接產生的成果與間接、長期的成效，並列出可能的負面影響，以及可透過調查和設計降低影響的方法。" },
      { title: "探索典型人物", body: "依中山區人口結構、高齡化、單人家戶、商業聚集與晝夜差異，建立五位可用來評估心中山提案的人物，並說明其白天、夜間與假日的使用方式。" },
      { title: "實地調查計畫", body: "以 [巷弄空間／線形開放空間／城市形象] 為主題，設計 90 分鐘調查計畫，包括觀察點、照片、速寫、簡短訪談問題與需要注意的偏誤。" },
      { title: "制度與實際使用的落差", body: "整理使用分區、都市更新、步行空間改善與小型商業、文創店家及夜間經濟之間的落差，列出心中山容易發生衝突的利害關係人與對話議題。" }
    ]
  },
  en: {
    metrics: [
      { label: "Zhongshan District population", note: "May 2026. A central district with a larger female population." },
      { label: "Ageing rate", note: "Residents aged 65+, above the Taipei average." },
      { label: "Linear park", note: "A band of public space linking Zhongshan and Shuanglian stations." },
      { label: "Registered businesses", note: "The highest count among Taipei's 12 districts, led by retail and food service." }
    ],
    peopleInsights: [
      { title: "A central district of one- and two-person households", body: "Zhongshan District has about 211,000 residents and 104,000 households, or roughly 2.04 people per household. Lane-scale services, places to rest, and nighttime safety are likely design concerns." },
      { title: "Ageing alongside youth-oriented commerce", body: "Residents aged 65+ make up 25.6%, while ages 0–14 are 10.5%. Younger visitors and creative shops cluster around Chifeng Street and Zhongshan Station, making generational differences important to observe." },
      { title: "Three layers of day, night, and food", body: "Daytime activity centers on Chifeng Street and creative retail; nighttime activity shifts to Linsen North Road and the Tiaotong streets; food clusters around Qingguang Market and Shuangcheng Street." },
      { title: "Contrasts between income and urban space", body: "High-income residential areas such as Dazhi and Bei'an coexist with the commerce, nightlife, and small shops around Heart of Zhongshan. District averages alone are misleading." }
    ],
    boroughNotes: ["Candidate area around Zhongshan Station", "Higher ageing rate", "Candidate area along Zhongshan North Road", "Around Qingguang Market", "Datong side, adjoining the linear park", "Higher-income neighborhood near Dazhi and Bei'an"],
    spaceCards: [
      { title: "Planning with AI", body: "Frames planning as matching people's needs with space, and proposes collecting, sharing, and improving high-resolution people and spatial data." },
      { title: "2026 studio brief", body: "The study area is Heart of Zhongshan, Taipei. Themes include lanes, linear open space, and streetscape; students conduct fieldwork, identify issues, propose spatial interventions, and explain outputs and outcomes." },
      { title: "Planning and urban-renewal sources", body: "Material for reading Datong's major plan, Zhongshan's detailed plan, disaster-oriented renewal, arcades and walking space, land-use controls, mixed use, and redevelopment pressure." },
      { title: "World SSD100", body: "Organizes 100 sustainable urban-regeneration cases into nine themes. Students can select the pages they need from the case-card workspace." },
      { title: "Urban Acupuncture Database", body: "An external database of 365 small urban interventions and regeneration cases, presented here as class cards with source links." },
      { title: "People Data folder", body: "Organizes population, households, age, industry, income, MRT, literature, film, and local narratives for comparison and AI-supported class work." }
    ],
    prompts: [
      { title: "Match people and space", body: "Compare the following persona and spatial conditions. Make a table of issues to address in Heart of Zhongshan, usable spatial resources, and points to verify in fieldwork. Persona: [insert persona]. Conditions: linear park, Chifeng Street, Tiaotong streets, Qingguang Market, MRT Zhongshan and Shuanglian stations." },
      { title: "Translate a case to local conditions", body: "Do not directly copy the following case into Heart of Zhongshan. State the differences in actors, institutions, land value and rent, residents, visitors, time of day, and maintenance, then separate usable from unusable elements. Case: [case name]." },
      { title: "Outputs and outcomes", body: "Separate the proposal's direct outputs from indirect, long-term outcomes. Identify possible negative effects and ways to reduce them through research and design." },
      { title: "Develop representative personas", body: "Using Zhongshan's population, ageing, single-person households, commercial concentration, and day–night character, create five personas for evaluating an urban proposal, including daytime, nighttime, and weekend use." },
      { title: "Fieldwork plan", body: "Create a 90-minute fieldwork plan for [lane space / linear open space / urban image], including observation points, photographs, sketches, short interview questions, and possible biases." },
      { title: "Gaps between regulation and use", body: "Compare land-use controls, urban renewal, and pedestrian improvements with small businesses, creative shops, and the nighttime economy. Identify likely stakeholders and issues for dialogue." }
    ]
  }
};

function localizedItem(collection, index, item) {
  return { ...item, ...(CONTENT_TEXT[currentLanguage]?.[collection]?.[index] || {}) };
}

function translatedTag(tag) {
  const translated = TAG_LABELS[currentLanguage]?.[tag];
  if (translated || currentLanguage === "ja" || /^[\x00-\x7F]+$/.test(tag)) return translated || tag;
  return currentLanguage === "zh-Hant" ? "課堂標籤" : "Class tag";
}

function localizedSourceName(source) {
  if (currentLanguage === "ja") return source;
  const known = {
    "都市の鍼治療データベース": { "zh-Hant": "都市針灸資料庫", en: "Urban Acupuncture Database" },
    "世界のSSD100": { "zh-Hant": "世界 SSD100", en: "World SSD100" },
    "世界のSSD100 都市持続再生のツボ": { "zh-Hant": "世界 SSD100：都市永續再生", en: "World SSD100: Sustainable Urban Regeneration" },
    "世界のSSD100 / 都市の鍼治療類似事例": { "zh-Hant": "世界 SSD100／都市針灸類似案例", en: "World SSD100 / related urban-acupuncture case" }
  };
  return known[source]?.[currentLanguage] || source;
}

function localizedSourceType(type) {
  if (currentLanguage === "ja") return type;
  const types = {
    "計画資料": { "zh-Hant": "計畫資料", en: "Planning document" },
    "報道資料": { "zh-Hant": "報導資料", en: "News source" }
  };
  return types[type]?.[currentLanguage] || type;
}

function localizedCaseField(item, field) {
  if (currentLanguage === "ja") return item[field] || "";
  const title = item.title || item.project || "case";
  const place = item.place || item.city || item.source || "";
  const lenses = (item.tags || []).slice(0, 3).map(translatedTag).join(currentLanguage === "zh-Hant" ? "、" : ", ");
  if (field === "reading") {
    return currentLanguage === "zh-Hant"
      ? `以「${title}」（${place}）為案例，從${lenses || "都市再生"}的角度解讀，並與心中山的空間尺度、治理主體、維護方式及居民與訪客的關係進行比較。`
      : `Read “${title}” (${place}) through ${lenses || "urban regeneration"}, then compare its scale, governance, maintenance, and resident–visitor relationship with Heart of Zhongshan.`;
  }
  if (field === "ai") {
    return currentLanguage === "zh-Hant"
      ? `若將「${title}」與心中山比較，請分別整理相似條件、不同條件，以及實地調查需要確認的事項。`
      : `When comparing “${title}” with Heart of Zhongshan, separate similar conditions, different conditions, and points that fieldwork must verify.`;
  }
  return item[field] || "";
}

function localizedSourceSummary(item) {
  if (currentLanguage === "ja") return item.summary;
  return currentLanguage === "zh-Hant"
    ? `課堂參考資料「${item.title}」。請開啟來源，確認原文、資料版本與適用範圍。`
    : `Class reference: “${item.title}.” Open the source to verify the original text, version, and scope.`;
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });
  const picker = $("#siteLanguage");
  if (picker) picker.value = currentLanguage;
}

const $ = (selector) => document.querySelector(selector);

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replaceAll("臺", "台")
    .replaceAll("台北市", "台北")
    .replaceAll("區", "区")
    .replaceAll("髙", "高");
}

const queryDictionary = [
  { keys: ["案例", "事例", "case", "cases"], values: ["事例", "ケース", "案例", "case", "都市の鍼治療", "SSD100"] },
  { keys: ["检索", "検索", "搜", "search"], values: ["検索", "資料", "事例", "source"] },
  { keys: ["人口", "people", "人"], values: ["人口", "世帯", "高齢化", "里別", "people"] },
  { keys: ["高龄", "高齢", "老人"], values: ["高齢化", "65歳", "単身", "生活"] },
  { keys: ["空间", "空間", "space"], values: ["空間", "歩行空間", "公共空間", "線形公園"] },
  { keys: ["公共空间", "公共空間", "public"], values: ["公共空間", "公園", "広場", "滞留"] },
  { keys: ["商业", "商業", "商圈", "市場"], values: ["商業", "商圈", "市場", "小商い", "店舗"] },
  { keys: ["交通", "mobility", "駅"], values: ["交通", "駅", "MRT", "歩行者", "自転車"] },
  { keys: ["历史", "歴史", "记忆", "記憶"], values: ["歴史", "歴史保全", "記憶", "文化", "老屋"] },
  { keys: ["更新", "都市更新", "再生"], values: ["都市更新", "再生", "改修", "活性化", "再開発"] },
  { keys: ["台湾", "taiwan"], values: ["台湾", "台北", "迪化街", "剥皮寮", "稲米故事館"] },
  { keys: ["书", "書", "book", "ssd"], values: ["SSD100", "世界のSSD100", "書籍", "本"] },
  { keys: ["网页", "網站", "网站", "web", "hilife"], values: ["都市の鍼治療", "HILIFE", "外部リンク"] }
];

function queryTerms(query) {
  const normalized = normalizeText(query).trim();
  if (!normalized) return [];
  const chunks = normalized.split(/[\s,，、/]+/).filter(Boolean);
  const terms = new Set([normalized, ...chunks]);
  queryDictionary.forEach((entry) => {
    const matched = entry.keys.some((key) => {
      const normalizedKey = normalizeText(key);
      return normalized.includes(normalizedKey) || chunks.includes(normalizedKey);
    });
    if (matched) entry.values.forEach((value) => terms.add(normalizeText(value)));
  });
  return [...terms].filter((term) => term.length > 0);
}

function searchableText(item) {
  return normalizeText([
    item.no,
    item.title,
    item.chapter,
    item.city,
    item.project,
    item.page,
    item.summary,
    item.body,
    item.reading,
    item.place,
    item.source,
    item.driveRef,
    item.url,
    ...(item.tags || []),
    ...(item.aliases || [])
  ].join(" "));
}

function includesQuery(item, query) {
  if (!query) return true;
  const haystack = searchableText(item);
  return queryTerms(query).some((term) => haystack.includes(term));
}

function matchesTag(item) {
  return activeTag === "すべて" || (item.tags || []).includes(activeTag);
}

function tagMarkup(itemTags) {
  const labels = [...new Set((itemTags || []).map(translatedTag))];
  return `<div class="tag-row">${labels.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>`;
}

function allCaseCards() {
  return [
    ...cases,
    ...ssdProjectCases,
    ...(window.HILIFE_CASES || [])
  ];
}

function renderMetrics() {
  $("#keyMetrics").innerHTML = metrics.map((metric, index) => localizedItem("metrics", index, metric)).map((metric) => `
    <article class="metric-card">
      <div class="metric-label">${metric.label}</div>
      <div class="metric-value">${metric.value}</div>
      <p class="metric-note">${metric.note}</p>
    </article>
  `).join("");
}

function renderVisualCharts() {
  const peopleChart = $("#peopleChart");
  const sourceChart = $("#sourceChart");
  if (!peopleChart || !sourceChart) return;

  const peopleRows = boroughRows.map((row, index) => ({ ...row, note: CONTENT_TEXT[currentLanguage]?.boroughNotes?.[index] || row.note })).sort((a, b) => b.elder - a.elder);
  const maxElderRate = 32;
  peopleChart.innerHTML = peopleRows.map((row) => `
    <div class="chart-row">
      <div class="chart-row-label"><span>${escapeHtml(row.area)}</span><strong>${row.elder}%</strong></div>
      <div class="chart-track" aria-hidden="true"><div class="chart-fill" style="width:${(row.elder / maxElderRate) * 100}%"></div></div>
      <small>${t("childAndOlder", { child: row.child, old: row.old.toLocaleString(currentLanguage) })}</small>
    </div>
  `).join("");

  const sourceRows = [
    { label: t("sourceUrban"), value: (window.HILIFE_CASES || []).length, note: t("sourceUrbanNote") },
    { label: t("sourceSsd"), value: ssdCases.length, note: t("sourceSsdNote") },
    { label: t("sourceInventory"), value: sources.length, note: t("sourceInventoryNote") },
    { label: t("sourcePrompts"), value: prompts.length, note: t("sourcePromptsNote") }
  ];
  const maxSourceCount = Math.max(...sourceRows.map((row) => row.value), 1);
  sourceChart.innerHTML = sourceRows.map((row) => `
    <div class="chart-row">
      <div class="chart-row-label"><span>${escapeHtml(row.label)}</span><strong>${row.value.toLocaleString(currentLanguage)} ${t("itemsUnit")}</strong></div>
      <div class="chart-track" aria-hidden="true"><div class="chart-fill source-fill" style="width:${(row.value / maxSourceCount) * 100}%"></div></div>
      <small>${escapeHtml(row.note)}</small>
    </div>
  `).join("");
}

function renderTagFilters() {
  $("#tagFilters").innerHTML = ["すべて", ...tags].map((tag) => `
    <button type="button" class="filter-chip ${activeTag === tag ? "active" : ""}" data-tag="${tag}">${tag === "すべて" ? t("all") : escapeHtml(translatedTag(tag))}</button>
  `).join("");

  document.querySelectorAll(".filter-chip").forEach((button) => {
    button.addEventListener("click", () => {
      activeTag = button.dataset.tag;
      renderAll();
    });
  });
}

function renderPeople() {
  const query = $("#siteSearch").value.trim();
  const localizedInsights = peopleInsights.map((item, index) => localizedItem("peopleInsights", index, item));
  const filteredInsights = localizedInsights.filter((item) => includesQuery(item, query) && matchesTag(item));
  $("#peopleInsights").innerHTML = filteredInsights.length ? filteredInsights.map((item) => `
    <article class="insight">
      <h4>${item.title}</h4>
      <p>${item.body}</p>
      ${tagMarkup(item.tags)}
    </article>
  `).join("") : `<div class="empty-state">${t("noPeople")}</div>`;

  const rowItems = boroughRows.map((row, index) => ({
    ...row,
    note: CONTENT_TEXT[currentLanguage]?.boroughNotes?.[index] || row.note,
    title: row.area,
    summary: row.note,
    tags: ["人口", "里別", "高齢化"]
  })).filter((row) => includesQuery(row, query) && matchesTag(row));

  const rows = rowItems.map((row) => `
    <tr>
      <td>${row.area}</td>
      <td>${row.pop.toLocaleString(currentLanguage)}</td>
      <td>${row.elder}%</td>
      <td class="bar-cell">
        <div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${row.elder * 2.4}%"></div></div>
      </td>
      <td>${row.note}</td>
    </tr>
  `).join("");

  $("#boroughTable").innerHTML = rowItems.length ? `
    <table>
      <thead>
        <tr><th>${t("tableArea")}</th><th>${t("tablePopulation")}</th><th>${t("tableAgeing")}</th><th>${t("tableCompare")}</th><th>${t("tableReading")}</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  ` : `<div class="empty-state">${t("noBorough")}</div>`;
}

function renderSpaceCards() {
  const query = $("#siteSearch").value.trim();
  const localizedCards = spaceCards.map((item, index) => localizedItem("spaceCards", index, item));
  const filtered = localizedCards.filter((item) => includesQuery(item, query) && matchesTag(item));
  $("#spaceCards").innerHTML = filtered.length ? filtered.map((item) => `
    <article class="space-card">
      <h3>${item.title}</h3>
      <p>${item.body}</p>
      ${tagMarkup(item.tags)}
      <p class="source-path">${t("sourceLabel")}: ${item.source}</p>
    </article>
  `).join("") : `<div class="empty-state">${t("noSpace")}</div>`;
}

function renderCases() {
  const query = $("#siteSearch").value.trim();
  const casePool = allCaseCards();
  const filtered = casePool.filter((item) => {
    const caseOk = activeCaseFilter === "all" || item.kind === activeCaseFilter;
    return caseOk && includesQuery(item, query) && matchesTag(item);
  });

  $("#caseCount").textContent = t("caseCount", { shown: filtered.length.toLocaleString(currentLanguage), total: casePool.length.toLocaleString(currentLanguage) });

  $("#caseGrid").innerHTML = filtered.length ? filtered.map((item) => `
    <article class="case-card">
      <p class="eyebrow">${escapeHtml(item.place || item.source)}</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(localizedCaseField(item, "reading"))}</p>
      ${tagMarkup(item.tags)}
      <p><strong>${t("aiQuestion")}:</strong> ${escapeHtml(localizedCaseField(item, "ai"))}</p>
      <p class="case-meta">${t("sourceLabel")}: ${escapeHtml(localizedSourceName(item.source))}${item.page ? ` / p.${escapeHtml(item.page)}` : ""}</p>
      ${item.url ? `<a class="source-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${t("openOriginal")}</a>` : ""}
    </article>
  `).join("") : `<div class="empty-state">${t("noCases")}</div>`;
}

function renderPrompts() {
  const query = $("#siteSearch").value.trim();
  const filtered = prompts
    .map((prompt, index) => ({ ...localizedItem("prompts", index, prompt), index }))
    .filter((prompt) => includesQuery(prompt, query) && matchesTag(prompt));
  $("#promptGrid").innerHTML = filtered.length ? filtered.map((prompt) => `
    <article class="prompt-card">
      <h3>${prompt.title}</h3>
      <div class="prompt-text" id="prompt-${prompt.index}">${prompt.body}</div>
      <button type="button" class="copy-button" data-copy="prompt-${prompt.index}">${t("copy")}</button>
    </article>
  `).join("") : `<div class="empty-state">${t("noPrompts")}</div>`;
}

function renderSources() {
  const query = $("#siteSearch").value.trim();
  const filtered = sources.filter((item) => includesQuery(item, query) && matchesTag(item));
  $("#sourceCount").textContent = filtered.length;

  $("#sourceList").innerHTML = filtered.length ? filtered.map((item) => `
    <article class="source-item">
      <div><span class="source-type">${escapeHtml(localizedSourceType(item.type))}</span>${tagMarkup(item.tags)}</div>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(localizedSourceSummary(item))}</p>
        <p class="source-location">${item.url ? t("externalMaterial") : `${t("driveFolder")} / ${escapeHtml(item.driveRef || item.title)}`}</p>
        <a class="source-link" href="${escapeHtml(item.url || DRIVE_FOLDER_URL)}" target="_blank" rel="noreferrer">
          ${item.url ? t("openExternal") : t("openDrive")}
        </a>
      </div>
      <a class="copy-button source-open" href="${escapeHtml(item.url || DRIVE_FOLDER_URL)}" target="_blank" rel="noreferrer">${t("open")}</a>
    </article>
  `).join("") : `<div class="empty-state">${t("noSources")}</div>`;
}

function resultTitle(item) {
  return item.title || item.project || item.area || item.label || t("sourceInventory");
}

function renderResultGroup(group) {
  const preview = group.items.slice(0, 5).map((item) => `
    <a href="${group.href}">
      <span>${escapeHtml(resultTitle(item))}</span>
      <small>${escapeHtml(item.place || item.city || item.source || item.note || "")}</small>
    </a>
  `).join("");

  return `
    <article class="result-group">
      <div>
        <span>${escapeHtml(group.label)}</span>
        <strong>${group.items.length.toLocaleString(currentLanguage)} ${t("itemsUnit")}</strong>
      </div>
      ${group.items.length ? `<div class="result-links">${preview}</div>` : `<p>${t("noMatch")}</p>`}
    </article>
  `;
}

function renderSearchResults() {
  const query = $("#siteSearch").value.trim();
  const casePool = allCaseCards();
  const boroughItems = boroughRows.map((row, index) => ({
    ...row,
    note: CONTENT_TEXT[currentLanguage]?.boroughNotes?.[index] || row.note,
    title: row.area,
    summary: row.note,
    tags: ["人口", "里別", "高齢化"]
  }));

  if (!query && activeTag === "すべて" && activeCaseFilter === "all") {
    $("#searchResults").innerHTML = `
      <div class="result-overview">
        <span>${t("searchScope")}</span>
        <strong>HILIFE ${((window.HILIFE_CASES || []).length).toLocaleString(currentLanguage)} / SSD100 ${ssdCases.length.toLocaleString(currentLanguage)} / ${t("sourceInventory")} ${sources.length.toLocaleString(currentLanguage)}</strong>
        <p>${t("searchHint")}</p>
      </div>
    `;
    return;
  }

  const filteredCases = casePool.filter((item) => {
    const caseOk = activeCaseFilter === "all" || item.kind === activeCaseFilter;
    return caseOk && includesQuery(item, query) && matchesTag(item);
  });

  const groups = [
    {
      label: t("peopleTitle"),
      href: "#people",
      items: [...peopleInsights.map((item, index) => localizedItem("peopleInsights", index, item)), ...boroughItems].filter((item) => includesQuery(item, query) && matchesTag(item))
    },
    {
      label: t("spaceTitle"),
      href: "#space",
      items: spaceCards.map((item, index) => localizedItem("spaceCards", index, item)).filter((item) => includesQuery(item, query) && matchesTag(item))
    },
    {
      label: t("casesTitle"),
      href: "#cases",
      items: filteredCases
    },
    {
      label: t("sourcesTitle"),
      href: "#sources",
      items: sources.filter((item) => includesQuery(item, query) && matchesTag(item))
    }
  ];

  $("#searchResults").innerHTML = `
    <div class="result-header">
      <span>${t("searchResults")}</span>
      <strong>${groups.reduce((sum, group) => sum + group.items.length, 0).toLocaleString(currentLanguage)} ${t("itemsUnit")}</strong>
    </div>
    <div class="result-grid">${groups.map(renderResultGroup).join("")}</div>
  `;
}

function setupSegments() {
  document.querySelectorAll(".segment").forEach((button) => {
    button.addEventListener("click", () => {
      activeCaseFilter = button.dataset.caseFilter;
      document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderAll();
    });
  });
}

function setupCopy() {
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;

    const target = document.getElementById(button.dataset.copy);
    if (!target) return;

    const text = target.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = t("copied");
      setTimeout(() => { button.textContent = original; }, 1200);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(target);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
}

function formatChatText(text) {
  return escapeHtml(text).replace(/\n/g, "<br>");
}

function aiSourceMarkup(source) {
  const meta = [source.type, source.source, source.page ? `p.${source.page}` : ""].filter(Boolean).join(" / ");
  const content = `
    <strong>${escapeHtml(source.title)}</strong>
    <span>${escapeHtml(meta)}</span>
  `;

  return source.url
    ? `<a class="ai-source-link" href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${content}</a>`
    : `<div class="ai-source-link">${content}</div>`;
}

function renderAiChatMessages() {
  const messageBox = $("#aiChatMessages");
  if (!messageBox) return;

  messageBox.innerHTML = aiChatMessages.map((message) => `
    <article class="ai-message ${message.role}">
      <div class="ai-message-bubble">${formatChatText(message.content)}</div>
      ${message.sources?.length ? `<div class="ai-sources">${message.sources.map(aiSourceMarkup).join("")}</div>` : ""}
    </article>
  `).join("");

  messageBox.scrollTop = messageBox.scrollHeight;
}

function setAiChatBusy(nextBusy) {
  aiChatBusy = nextBusy;
  const form = $("#aiChatForm");
  if (!form) return;

  form.querySelector("textarea").disabled = nextBusy;
  form.querySelector("button").disabled = nextBusy;
}

function setAiChatStatus(text) {
  const status = $("#aiChatStatus");
  if (status) status.textContent = text;
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setupAiChatResize(panel, handle) {
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("planningCommonsAiChatSize") || "null");
    } catch {
      return null;
    }
  })();

  function applySize(width, height) {
    const maxWidth = Math.max(360, window.innerWidth - 32);
    const maxHeight = Math.max(420, window.innerHeight - 48);
    const nextWidth = clampNumber(width, 360, Math.min(900, maxWidth));
    const nextHeight = clampNumber(height, 420, Math.min(860, maxHeight));
    panel.style.setProperty("--ai-chat-width", `${nextWidth}px`);
    panel.style.setProperty("--ai-chat-height", `${nextHeight}px`);
    return { width: nextWidth, height: nextHeight };
  }

  if (stored?.width && stored?.height) applySize(stored.width, stored.height);

  handle.addEventListener("pointerdown", (event) => {
    if (window.matchMedia("(max-width: 720px)").matches) return;
    event.preventDefault();

    const startRect = panel.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    handle.setPointerCapture(event.pointerId);
    document.body.classList.add("ai-chat-resizing");

    function onPointerMove(moveEvent) {
      const nextSize = applySize(
        startRect.width + startX - moveEvent.clientX,
        startRect.height + startY - moveEvent.clientY
      );
      try {
        localStorage.setItem("planningCommonsAiChatSize", JSON.stringify(nextSize));
      } catch {
        // Ignore storage failures; resizing should still work for the current session.
      }
    }

    function onPointerUp(upEvent) {
      handle.releasePointerCapture(upEvent.pointerId);
      document.body.classList.remove("ai-chat-resizing");
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", onPointerUp);
      handle.removeEventListener("pointercancel", onPointerUp);
    }

    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", onPointerUp);
    handle.addEventListener("pointercancel", onPointerUp);
  });
}

async function submitAiChat() {
  if (aiChatBusy) return;

  const input = $("#aiChatInput");
  const language = $("#aiLanguage");
  const text = input.value.trim();
  if (!text) return;

  aiChatMessages.push({ role: "user", content: text, sources: [] });
  input.value = "";
  renderAiChatMessages();
  setAiChatBusy(true);
  setAiChatStatus("資料を検索して回答を作成中...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: language.value,
        messages: aiChatMessages
          .filter((message) => message.role === "user" || message.role === "assistant")
          .map(({ role, content }) => ({ role, content }))
          .slice(-8)
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.answer) {
      throw new Error(data.error || "AI response failed.");
    }

    aiChatMessages.push({
      role: "assistant",
      content: data.answer,
      sources: data.sources || []
    });
    renderAiChatMessages();
    setAiChatStatus(data.configured === false ? "AI生成未設定。資料候補のみ表示中。" : "回答を生成しました。");
  } catch {
    aiChatMessages.push({
      role: "assistant",
      content: "AI相談に接続できませんでした。公開URLまたはローカル開発サーバーで開いているか確認してください。file://で直接開いた場合、サーバー側APIは動作しません。",
      sources: []
    });
    renderAiChatMessages();
    setAiChatStatus("接続に失敗しました。");
  } finally {
    setAiChatBusy(false);
    input.focus();
  }
}

function setupAiChat() {
  const chat = document.querySelector(".ai-chat");
  const panel = $("#aiChatPanel");
  const toggle = $("#aiChatToggle");
  const close = $("#aiChatClose");
  const form = $("#aiChatForm");
  const input = $("#aiChatInput");
  const resize = $("#aiChatResize");

  if (!chat || !panel || !toggle || !close || !form || !input) return;

  function openPanel() {
    panel.hidden = false;
    chat.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    renderAiChatMessages();
    setTimeout(() => input.focus(), 0);
  }

  function closePanel() {
    panel.hidden = true;
    chat.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }

  toggle.addEventListener("click", openPanel);
  close.addEventListener("click", closePanel);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitAiChat();
  });
  input.addEventListener("compositionstart", () => {
    aiInputComposing = true;
  });
  input.addEventListener("compositionend", () => {
    setTimeout(() => {
      aiInputComposing = false;
    }, 0);
  });
  input.addEventListener("keydown", (event) => {
    const isComposing = aiInputComposing || event.isComposing || event.keyCode === 229;
    if (isComposing) return;

    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  if (resize) setupAiChatResize(panel, resize);
  renderAiChatMessages();
}

function renderAll() {
  renderTagFilters();
  renderMetrics();
  renderVisualCharts();
  renderPeople();
  renderSpaceCards();
  renderCases();
  renderPrompts();
  renderSources();
  renderSearchResults();
  renderFilterStatus();
  renderObservations();
}

function renderFilterStatus() {
  const query = $("#siteSearch").value.trim();
  const parts = [];
  if (query) parts.push(`${t("filterQuery")}:「${query}」`);
  if (activeTag !== "すべて") parts.push(`${t("filterTheme")}: ${translatedTag(activeTag)}`);
  if (activeCaseFilter !== "all") {
    const label = document.querySelector(`[data-case-filter="${activeCaseFilter}"]`)?.textContent || activeCaseFilter;
    parts.push(`${t("filterCase")}: ${label}`);
  }
  $("#filterStatus").textContent = parts.length
    ? t("filtering", { parts: parts.join(" / ") })
    : t("filterAll", { count: allCaseCards().length.toLocaleString(currentLanguage) });
}

function setupLanguage() {
  const saved = localStorage.getItem("planning-commons-language");
  if (saved && UI_TEXT[saved]) currentLanguage = saved;
  applyStaticTranslations();

  $("#siteLanguage").addEventListener("change", (event) => {
    currentLanguage = UI_TEXT[event.target.value] ? event.target.value : "ja";
    localStorage.setItem("planning-commons-language", currentLanguage);
    applyStaticTranslations();
    renderAll();
  });
}

function observationCategoryLabel(item) {
  if (item.category === "other") return item.otherCategory || t("catOther");
  const keys = {
    walking: "catWalking",
    public_space: "catPublic",
    commerce: "catCommerce",
    transport: "catTransport",
    community: "catCommunity",
    environment: "catEnvironment"
  };
  return t(keys[item.category] || "catOther");
}

function observationFileKind(item) {
  if (item.contentType.startsWith("image/")) return "image";
  if (item.contentType.startsWith("video/")) return "video";
  if (item.contentType === "application/pdf") return "pdf";
  return "other";
}

function formatObservationDate(value) {
  const locale = currentLanguage === "zh-Hant" ? "zh-TW" : currentLanguage;
  return new Date(`${value}T00:00:00`).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function observationFileUrl(id) {
  return `/api/observations/${encodeURIComponent(id)}/file`;
}

function renderObservations() {
  const grid = $("#observationGrid");
  if (!grid) return;

  $("#observationCount").textContent = observationItems.length.toLocaleString(currentLanguage);
  if (!observationItems.length) {
    grid.innerHTML = `<p class="empty-state">${escapeHtml(t("noUploadedMaterials"))}</p>`;
    return;
  }

  grid.innerHTML = observationItems.map((item) => {
    const kind = observationFileKind(item);
    const title = item.displayName || item.originalName;
    const preview = kind === "image"
      ? `<img src="${observationFileUrl(item.id)}" alt="${escapeHtml(title)}" loading="lazy" />`
      : `<span class="observation-file-badge">${escapeHtml(t(kind === "video" ? "fileVideo" : kind === "pdf" ? "filePdf" : "fileOther"))}</span>`;
    return `
      <article class="observation-card${item.starred ? " is-starred" : ""}">
        <button class="observation-preview-trigger" type="button" data-observation-action="preview" data-id="${escapeHtml(item.id)}" aria-label="${escapeHtml(`${t("preview")}: ${title}`)}">
          ${preview}
        </button>
        <div class="observation-card-body">
          <div class="observation-card-title-row">
            <h4>${escapeHtml(title)}</h4>
            <button class="observation-icon-button${item.starred ? " active" : ""}" type="button" data-observation-action="star" data-id="${escapeHtml(item.id)}" aria-label="${escapeHtml(t(item.starred ? "unstar" : "star"))}" title="${escapeHtml(t(item.starred ? "unstar" : "star"))}">${item.starred ? "★" : "☆"}</button>
          </div>
          <p class="observation-meta">${escapeHtml(formatObservationDate(item.fieldDate))} · ${escapeHtml(`${t("studentGroup")} ${item.groupCode}`)} · ${escapeHtml(observationCategoryLabel(item))}</p>
          <p class="observation-filename"><span>${escapeHtml(t("originalFileName"))}:</span> ${escapeHtml(item.originalName)} · ${escapeHtml(formatFileSize(item.sizeBytes))}</p>
          <div class="observation-actions">
            <button type="button" data-observation-action="preview" data-id="${escapeHtml(item.id)}">${escapeHtml(t("preview"))}</button>
            <button type="button" data-observation-action="rename" data-id="${escapeHtml(item.id)}">${escapeHtml(t("rename"))}</button>
            <button class="danger" type="button" data-observation-action="delete" data-id="${escapeHtml(item.id)}">${escapeHtml(t("delete"))}</button>
          </div>
        </div>
      </article>`;
  }).join("");
}

async function loadObservations() {
  const status = $("#observationLibraryStatus");
  status.textContent = t("loadingMaterials");
  const query = new URLSearchParams();
  const date = $("#observationDateFilter").value;
  const group = $("#observationGroupFilter").value;
  const category = $("#observationCategoryFilter").value;
  if (date) query.set("date", date);
  if (group) query.set("group", group);
  if (category) query.set("category", category);

  try {
    const response = await fetch(`/api/observations${query.size ? `?${query}` : ""}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Load failed");
    observationItems = result.items || [];
    status.textContent = "";
    renderObservations();
  } catch {
    observationItems = [];
    status.textContent = t("loadMaterialsError");
    renderObservations();
  }
}

function openObservationPreview(item) {
  const dialog = $("#observationPreviewDialog");
  const body = $("#observationPreviewBody");
  const title = item.displayName || item.originalName;
  const kind = observationFileKind(item);
  const source = observationFileUrl(item.id);
  $("#observationPreviewTitle").textContent = title;
  if (kind === "image") {
    body.innerHTML = `<img src="${source}" alt="${escapeHtml(title)}" />`;
  } else if (kind === "video") {
    body.innerHTML = `<video src="${source}" controls playsinline></video>`;
  } else if (kind === "pdf") {
    body.innerHTML = `<iframe src="${source}" title="${escapeHtml(title)}"></iframe>`;
  } else {
    body.innerHTML = `<a class="source-link" href="${source}" target="_blank" rel="noreferrer">${escapeHtml(t("open"))}</a>`;
  }
  dialog.showModal();
}

async function updateObservation(id, changes) {
  const response = await fetch(`/api/observations/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes)
  });
  if (!response.ok) throw new Error("Update failed");
}

function setupFieldworkUpload() {
  const form = $("#fieldworkForm");
  if (!form) return;
  const category = $("#observationCategory");
  const otherField = $("#otherCategoryField");
  const otherInput = $("#otherCategory");
  const filesInput = $("#fieldworkFiles");
  const selectedFiles = $("#selectedFiles");
  const submit = $("#fieldworkSubmit");
  const status = $("#fieldworkStatus");
  const dateInput = $("#fieldDate");
  const library = $("#observationGrid");
  const previewDialog = $("#observationPreviewDialog");

  dateInput.value = new Date().toISOString().slice(0, 10);

  category.addEventListener("change", () => {
    const isOther = category.value === "other";
    otherField.hidden = !isOther;
    otherInput.required = isOther;
    if (!isOther) otherInput.value = "";
  });

  filesInput.addEventListener("change", () => {
    const count = filesInput.files?.length || 0;
    selectedFiles.textContent = count ? t("selectedFiles", { count }) : t("fileHint");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const files = [...(filesInput.files || [])];
    if (!files.length) return;
    if (files.length > 5) {
      status.textContent = t("tooManyFiles");
      return;
    }
    if (files.some((file) => file.size > 100 * 1024 * 1024)) {
      status.textContent = t("fileTooLarge");
      return;
    }

    submit.disabled = true;
    status.textContent = t("uploading");
    const payload = new FormData(form);
    try {
      const response = await fetch("/api/observations", { method: "POST", body: payload });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed");
      status.textContent = t("uploadSuccess", { count: result.count || files.length });
      filesInput.value = "";
      $("#observationName").value = "";
      selectedFiles.textContent = t("fileHint");
      await loadObservations();
    } catch {
      status.textContent = t("uploadError");
    } finally {
      submit.disabled = false;
    }
  });

  [$("#observationDateFilter"), $("#observationGroupFilter"), $("#observationCategoryFilter")]
    .forEach((control) => control.addEventListener("change", loadObservations));

  $("#observationFiltersClear").addEventListener("click", () => {
    $("#observationDateFilter").value = "";
    $("#observationGroupFilter").value = "";
    $("#observationCategoryFilter").value = "";
    loadObservations();
  });

  library.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-observation-action]");
    if (!button) return;
    const item = observationItems.find((entry) => entry.id === button.dataset.id);
    if (!item) return;

    const action = button.dataset.observationAction;
    if (action === "preview") {
      openObservationPreview(item);
      return;
    }
    if (action === "rename") {
      const nextName = window.prompt(t("renamePrompt"), item.displayName || item.originalName);
      if (!nextName?.trim()) return;
      try {
        await updateObservation(item.id, { displayName: nextName.trim() });
        await loadObservations();
      } catch {
        $("#observationLibraryStatus").textContent = t("updateError");
      }
      return;
    }
    if (action === "star") {
      try {
        await updateObservation(item.id, { starred: !item.starred });
        await loadObservations();
      } catch {
        $("#observationLibraryStatus").textContent = t("updateError");
      }
      return;
    }
    if (action === "delete" && window.confirm(t("deleteConfirm"))) {
      try {
        const response = await fetch(`/api/observations/${encodeURIComponent(item.id)}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Delete failed");
        await loadObservations();
      } catch {
        $("#observationLibraryStatus").textContent = t("deleteError");
      }
    }
  });

  $("#observationPreviewClose").addEventListener("click", () => previewDialog.close());
  previewDialog.addEventListener("click", (event) => {
    if (event.target === previewDialog) previewDialog.close();
  });
  previewDialog.addEventListener("close", () => {
    $("#observationPreviewBody").innerHTML = "";
  });

  loadObservations();
}

function init() {
  setupLanguage();
  setupSegments();
  setupCopy();
  setupAiChat();
  setupFieldworkUpload();
  renderAll();
  applyStaticTranslations();
  $("#siteSearch").addEventListener("input", renderAll);
}

init();
