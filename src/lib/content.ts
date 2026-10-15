export const official = {
  bahamut: 'https://ani.gamer.com.tw/animeVideo.php?sn=49830',
  x: 'https://x.com/Otome_Kaiju',
  photos: 'https://x.com/Otome_Kaiju/media?filter=photo',
  home: 'https://otomekaiju.com/',
  manga: 'https://comic-alive.jp/product/otomekaijyu/',
  onair: 'https://otomekaiju.com/onair/',
  crunchyroll: 'https://www.crunchyroll.com/series/GT00378081',
  prime: 'https://www.primevideo.com/-/id/detail/0TQLQ7LQB2OHCJ13WR73925XBF',
  tbs: 'https://www.tbscontents.com/en/program/kaijugirlcaramelise',
  daichi: 'https://animestore.docomo.ne.jp/animestore/ci_pc?workId=29113',
  moa: 'https://atrays.jp/actor/appearance/anime/花井美春が南最愛役でtvアニメ「乙女怪獣キャラメ/',
};
export type Character = {
  id: string; name: string; jp: string; en: string; cv: string; color: string;
  theme: string; description: string; detail: string; source: string;
  verification: string; art: string; ja: { description: string; detail: string; verification: string };
};
const charSource = (id: string) => `https://otomekaiju.com/character/${id}.html`;
export const characters: Character[] = [
  { id:'kuroe', name:'赤石黑繪', jp:'赤石 黒絵', en:'KUROE AKAISHI', cv:'千賀光莉', color:'#eab4c0', theme:'不器用な、恋', description:'內向又不善言辭，總是把心事藏得很深，戀愛卻讓安靜的日常泛起漣漪，連小小的心動都能化成巨大力量', detail:'因不明症狀而避開人群的高中生，喜歡畫畫、聽音樂與甜點，情感高漲時會變成哈爾岡', source:charSource('kuroe'), verification:'角色、聲優與興趣經官方角色頁核實；變身設定見官方第 2 集', art:'girl', ja:{ description:"内気で口下手、心の内をなかなか見せない少女。恋が静かな日常にさざ波を立て、小さなときめきさえ大きな力に変わっていく", detail:"人混みを避けて暮らす高校生。絵を描くこと、音楽、スイーツが好きで、感情が高ぶるとハルゴンに変身する", verification:"キャラクター・声優・趣味は公式キャラクターページで確認済み。変身設定は公式第2話に基づく" } },
  { id:'harugon', name:'哈爾岡', jp:'ハルゴン', en:'HARUGON', cv:'千賀光莉', color:'#a39bc9', theme:'恋心、110メートル', description:'黑繪藏不住的心動，化為城市上空的巨大身影，紫色鱗片與如火焰般的背鰭之下，是少女最真切的戀心', detail:'赤石黑繪的巨大怪獸形態，CV 同黑繪，身高 110 公尺、體重 65,000 噸，擁有銳利的爪與閃耀如火焰的角及背鰭', source:charSource('harugon'), verification:'尺寸與外觀依動畫官方角色頁；CV 依黑繪角色資料，依使用者確認補上相同形態的對應', art:'kaiju', ja:{ description:"黒絵が隠しきれない恋心が、街の上空に現れた巨大な影。紫の鱗と炎のような背びれの下にあるのは、少女のいちばん素直な想い", detail:"赤石黒絵の巨大怪獣形態。CVは黒絵と同じ。身長110メートル、体重65,000トン。鋭い爪と、炎のように輝く角と背びれを持つ", verification:"サイズと外観は公式キャラクターページに基づく。CVは黒絵のキャラクター情報に基づき、同一形態として対応" } },
  { id:'arata', name:'南新汰', jp:'南 新汰', en:'ARATA MINAMI', cv:'梶田大嗣', color:'#f2ca9a', theme:'きみの隣へ', description:'溫柔又帶點天然，總在不經意間拉近距離，讓黑繪平靜的心跳，一次次失去原本的節奏', detail:'黑繪的同班同學，外表出眾，天然又親近的相處方式常讓黑繪不知所措，喜歡料理，也很注意熱量管理', source:charSource('arata'), verification:'角色、聲優與興趣經官方角色頁核實', art:'boy', ja:{ description:"やさしくて少し天然、気づけば距離を縮めている人。黒絵の静かな鼓動のリズムを、何度も狂わせていく", detail:"黒絵のクラスメイト。目立つ容姿に天然で気さくな接し方が、黒絵をたびたび戸惑わせる。料理が好きで、カロリー管理にも気を配る", verification:"キャラクター・声優・趣味は公式キャラクターページで確認済み" } },
  { id:'manatsu', name:'友里真夏', jp:'友里 真夏', en:'MANATSU TOMOSATO', cv:'関根明良', color:'#bfceb0', theme:'怪獣愛、全開！', description:'怪獸電影、怪獸裝，還有最喜歡的哈爾岡，真夏把所有熱情毫無保留地放在喜歡的事物上', detail:'與黑繪就讀同一所高中，熱愛怪獸電影與製作怪獸裝，崇拜哈爾岡，還把黑繪當成牠的巫女', source:charSource('manatsu'), verification:'角色、聲優與興趣經官方角色頁核實', art:'fan', ja:{ description:"怪獣映画、怪獣の着ぐるみ、そして大好きなハルゴン。真夏は好きなものに情熱をまっすぐ注ぎ込む", detail:"黒絵と同じ高校に通い、怪獣映画と着ぐるみ作りが大好き。ハルゴンを崇拝し、黒絵をその巫女と思い込んでいる", verification:"キャラクター・声優・趣味は公式キャラクターページで確認済み" } },
  { id:'raimu', name:'河野來夢', jp:'河野 来夢', en:'RAIMU KONO', cv:'白石晴香', color:'#ebabc4', theme:'かわいいは、勇気', description:'開朗的人氣網紅，也是擅長化妝的らいりー，鏡子映出的不只是外表，還有追逐夢想的勇氣', detail:'新學年與黑繪同班的人氣網紅，暱稱「らいりー」，個性開朗，擅長化妝，也會向黑繪推薦美妝用品', source:charSource('raimu'), verification:'角色、聲優與興趣經官方角色頁核實', art:'mirror', ja:{ description:"明るい人気インフルエンサーで、メイク上手の「らいりー」。鏡に映るのは外見だけでなく、夢を追う勇気も", detail:"新学年で黒絵と同じクラスになった人気インフルエンサー。愛称は「らいりー」。明るい性格でメイクが得意、黒絵にコスメを勧めてくれる", verification:"キャラクター・声優・趣味は公式キャラクターページで確認済み" } },
  { id:'rinko', name:'赤石凜子', jp:'赤石 凛子', en:'RINKO AKAISHI', cv:'三石琴乃', color:'#e5bd97', theme:'おかえり、黒絵', description:'有些過度保護的媽媽，總在黑繪身後留下溫暖的日常，無論心事多麼巨大，家裡依然有安心的位置', detail:'黑繪的母親，有些過度保護女兒，興趣是生物研究，也是歌手浜崎まゆみ的忠實粉絲', source:charSource('rinko'), verification:'角色、聲優與興趣經官方角色頁核實', art:'mother', ja:{ description:"少し過保護なお母さん。いつも黒絵の背中にあたたかな日常を残してくれる。どんなに大きな悩みも、家には安心できる居場所がある", detail:"黒絵の母。娘にやや過保護で、趣味は生物研究。歌手・浜崎まゆみの熱烈なファン", verification:"キャラクター・声優・趣味は公式キャラクターページで確認済み" } },
  { id:'kotaro', name:'響野光太郎', jp:'響野 光太郎', en:'KOTARO HIBINO', cv:'小西克幸', color:'#adbdba', theme:'未知への、まなざし', description:'研究未知的生命，也熱愛金屬樂的生物學家，科學筆記與搖滾節拍，是光太郎獨特的生活日常', detail:'曾在東非進行研究的生物學家，是凜子過去的工作夥伴，熱愛金屬樂，興趣是聆聽搖滾音樂', source:charSource('kotaro'), verification:'角色、聲優與經歷經官方角色頁核實', art:'scientist', ja:{ description:"未知の生命を研究し、メタルをこよなく愛する生物学者。科学ノートとロックのビートが、光太郎ならではの日常をつくる", detail:"東アフリカで研究していた生物学者で、凛子のかつての仕事仲間。メタルが大好きで、趣味はロックを聴くこと", verification:"キャラクター・声優・経歴は公式キャラクターページで確認済み" } },
  { id:'jumboking', name:'巨霸王', jp:'ジャンボキング', en:'JUMBO KING', cv:'松井恵理子', color:'#e3cb9b', theme:'小さな、家族', description:'聰明可愛的赤石家小成員，喜歡尋寶，也替不普通的家庭帶來輕快的腳步聲', detail:'赤石家聰明又可愛的寵物狗，喜歡尋寶，生日是 1 月 1 日', source:charSource('jumboking'), verification:'角色、聲優與興趣經官方角色頁核實', art:'dog', ja:{ description:"賢くてかわいい赤石家の小さな家族。宝探しが好きで、ふつうじゃない家庭に軽やかな足音を運んでくれる", detail:"赤石家の賢くてかわいい愛犬。宝探しが好きで、誕生日は1月1日", verification:"キャラクター・声優・趣味は公式キャラクターページで確認済み" } },
  { id:'moa', name:'南最愛', jp:'南 最愛', en:'MOA MINAMI', cv:'花井美春', color:'#e4b9cd', theme:'青春の、小さな光', description:'南新汰的妹妹，金色捲髮綁成雙馬尾，是讓南家日常更加熱鬧的小妹妹', detail:'小學生，南新汰的妹妹，CV 花井美春，角色圖片採用本次提供的金色雙馬尾劇照', source:official.moa, verification:'CV：聲優事務所 atrays 出演公告；親屬：原作角色資料；無動畫獨立角色視覺', art:'sister', ja:{ description:"南新汰の妹。金色の巻き髪をツインテールにした、南家の毎日をにぎやかにしてくれる小さな女の子", detail:"小学生で、南新汰の妹。CVは花井美春。キャラクター画像には今回提供された金髪ツインテールのスチールを使用", verification:"CV：声優事務所 atrays の出演告知／親族関係：原作キャラクター情報／アニメ単独のキャラクタービジュアルなし" } },
  { id:'daichi', name:'米山大地', jp:'米山 大地', en:'DAICHI YONEYAMA', cv:'鈴木崚汰', color:'#aebcd1', theme:'偶然から、物語へ', description:'偶然與黑繪相遇的小學生，從街頭的一次相遇，走進這段不普通的青春故事', detail:'CV 鈴木崚汰，合照左側紅髮男孩為米山大地，右側為赤石黑繪', source:official.daichi, verification:'CV 依 d 動畫商城；角色劇照與畫面左側位置由使用者確認', art:'child', ja:{ description:"偶然黒絵と出会った小学生。街角でのひとつの出会いから、この普通ではない青春の物語へ足を踏み入れる", detail:"CVは鈴木崚汰。集合写真の左側の赤髪の少年が米山大地、右側が赤石黒絵", verification:"CVはdアニメストア情報に基づく。スチールと画面左側の位置は提供者が確認" } },
  { id:'akae', name:'紅繪', jp:'アカエ', en:'AKAE', cv:'官方未公開', color:'#c97d84', theme:'もうひとつの、巨影', description:'全身染上燃燒般的赤紅色，擁有與哈爾岡匹敵的強韌體格與壓倒性力量，另一個巨大身影登上舞台', detail:'官方日文名稱為アカエ，出現在南方島嶼的巨大怪獸，身高 100 公尺、體重 60,000 噸', source:charSource('akae'), verification:'角色圖片、名稱與尺寸依指定的動畫官方角色頁核實', art:'redkaiju', ja:{ description:"燃えるような真っ赤な体に、ハルゴンに匹敵する頑強な体格と圧倒的な力。もうひとつの巨大な影が舞台に現れる", detail:"公式の日本語名称はアカエ。南の島に現れた巨大怪獣で、身長100メートル、体重60,000トン", verification:"画像・名称・サイズは指定の公式キャラクターページに基づき確認済み" } },
];
export const episodes = [
  { title:'乙女怪獣東京に現る', emotion:'初次心動', motif:'heartbeat', summary:'習慣避開人群的黑繪，開始被校園裡耀眼的新汰搭話，她安靜的生活，從此有了不同的節拍', ja:{ emotion:"初めてのときめき", summary:"人混みを避けてきた黒絵は、校内でまぶしい新汰に声をかけられる。静かだった毎日に、違うリズムが生まれ始める" } },
  { title:'開かない扉', emotion:'不安與靠近', motif:'door', summary:'初次巨大化後，黑繪仍在意著新汰，真夏的出現讓她誤會，而夜裡又有新的怪獸身影', ja:{ emotion:"不安と接近", summary:"初めての巨大化のあとも新汰が気になる黒絵。真夏の登場で誤解が生まれ、夜には新たな怪獣の影が現れる" } },
  { title:'キラメク週末～夢の国へ～', emotion:'期待與笨拙', motif:'wheel', summary:'與新汰第一次到東京迪士提尼樂園約會，為了避免怪獸化，黑繪準備萬全，卻讓兩人的心意錯開', ja:{ emotion:"期待と不器用", summary:"新汰と初めて東京ディスティニーランドへデート。怪獣化を避けるため万全に備える黒絵だが、二人の気持ちはすれ違ってしまう" } },
  { title:'恐怖の怪獣フェス', emotion:'喧鬧的心事', motif:'music', summary:'在金屬樂音樂祭，黑繪巧遇打工中的新汰，陪同的光太郎與新汰之間，出現微妙的氣氛', ja:{ emotion:"にぎやかな心の内", summary:"メタルの音楽フェスで、バイト中の新汰とばったり出会う黒絵。付き添いの光太郎と新汰の間に、微妙な空気が流れる" } },
  { title:'ギャルと口紅', emotion:'跨出一步', motif:'lipstick', summary:'升上高二的黑繪試著改變自己，卻很快受到同班人氣網紅來夢的關注', ja:{ emotion:"一歩を踏み出す", summary:"高校2年生になった黒絵は変わろうとするが、すぐにクラスの人気インフルエンサー・来夢に注目される" } },
  { title:'らいりの森', emotion:'坦率的勇氣', motif:'leaf', summary:'得知來夢的過去與夢想，黑繪也獲得了勇氣，校外教學時，來夢遇見曾經喜歡的岡田', ja:{ emotion:"素直になる勇気", summary:"来夢の過去と夢を知った黒絵も勇気をもらう。校外学習で、来夢はかつて好きだった岡田と再会する" } },
  { title:'狙われた新汰', emotion:'無法停止的想念', motif:'camera', summary:'一段與哈爾岡相關的影片讓新汰成為焦點，他想讓騷動平息，卻也壓不住想見黑繪的心情', ja:{ emotion:"止まらない想い", summary:"ハルゴンに関する動画で新汰が注目の的に。騒ぎを収めたい彼だが、黒絵に会いたい気持ちは抑えられない" } },
  { title:'マ夏の怪獣島へ飛べ！！', emotion:'毫無保留的喜歡', motif:'island', summary:'真夏想向哈爾岡傳達喜歡的心意，於是邀黑繪與來夢前往以怪獸傳說聞名的島嶼', ja:{ emotion:"まっすぐな「好き」", summary:"真夏はハルゴンに好きな気持ちを伝えたくて、黒絵と来夢を怪獣伝説で知られる島へ誘う" } },
  { title:'乙女怪獣愚痴を吐け！', emotion:'不安的漣漪', motif:'wave', summary:'新汰受到更多關注，黑繪的心也跟著忐忑，另一邊，凜子踏上了一座島嶼', ja:{ emotion:"不安のさざ波", summary:"新汰がより多くの注目を集め、黒絵の心もざわつく。一方、凛子はある島へと向かっていた" } },
  { title:'泣くな失恋怪獣', emotion:'藏不住的眼淚', motif:'tear', summary:'大地知道了黑繪的怪獸身分，黑繪煩惱著該如何面對，又碰上大地與小學生爭執的場面', ja:{ emotion:"隠せない涙", summary:"黒絵の怪獣としての正体を知った大地。黒絵はどう向き合うか悩み、さらに大地と小学生の争いの場に出くわす" } },
  { title:'クロエVSアカエ', emotion:'城市與心的震動', motif:'claw', summary:'アカエ現身東京，目標似乎是黑繪，黑繪卻因情感的糾結而無法變身；新汰在火海中四處尋找她', ja:{ emotion:"街と心の震え", summary:"アカエが東京に現れ、狙いは黒絵らしい。しかし黒絵は感情の迷いで変身できない。新汰は火の海の中で彼女を探し回る" } },
  { title:'この一撃に愛をこめて', emotion:'盛滿心意的一擊', motif:'heart', summary:'哈爾岡遭アカエ的光束擊中而沉寂，東京持續遭到破壞，絕望之中，新汰獨自攀上哈爾岡的背', ja:{ emotion:"想いを込めた一撃", summary:"ハルゴンはアカエの光線に撃たれて沈黙し、東京の破壊は続く。絶望の中、新汰はひとりハルゴンの背に登る" } },
];
export const sceneNamesJa = ['オープニング','少女の想い','恋 × 怪獣','キャラクター','12の鼓動','最後の抱擁','第2期へ'];
export const scenes = [
  ['opening','序幕','OPENING'], ['girl','少女的心事','THE GIRL'], ['kaiju','戀愛 × 怪獸','LOVE × KAIJU'],
  ['characters','角色圖鑑','CHARACTERS'], ['memories','十二次心動','MEMORIES'], ['embrace','最後的擁抱','FINAL EMBRACE'], ['finale','寫給下一季','TO SEASON 2'],
] as const;
export const assetRecords = characters.map(c => ({
  character: c.name, originalName: c.jp, imageSource: c.id === 'moa' || c.id === 'daichi' ? null : c.source,
  officialImageUse:['moa','daichi'].includes(c.id)?'使用者提供劇照，僅供本機審閱':'官方原始網域嵌入並提供角色頁連結；不重新託管',
  displayedAsset:['moa','daichi'].includes(c.id)?'使用者提供的角色劇照，完整呈現人物':'由官方原始網域載入，未重新託管的角色圖', use:'角色圖鑑與互動分鏡',
  licenseStatus:'未取得官方授權；僅嵌入原站公開視覺並提供原始頁連結，不重新發布圖檔',
  cutoutSuitable:false, resolution:'維持來源原始尺寸，不去背、不修改角色畫風', characterConfirmed:c.verification,
}));
export const characterImages: Record<string,string> = {
  kuroe:'https://otomekaiju.com/core_sys/images/main/cont/character/chara01.png',
  arata:'https://otomekaiju.com/core_sys/images/main/cont/character/chara02.png',
  manatsu:'https://otomekaiju.com/core_sys/images/main/cont/character/chara03.png',
  raimu:'https://otomekaiju.com/core_sys/images/main/cont/character/chara04.png',
  rinko:'https://otomekaiju.com/core_sys/images/main/cont/character/chara05.png',
  kotaro:'https://otomekaiju.com/core_sys/images/main/cont/character/chara06.png',
  jumboking:'https://otomekaiju.com/core_sys/images/main/cont/character/chara07.png',
  harugon:'https://otomekaiju.com/core_sys/images/main/cont/character/chara08.png',
  akae:'https://otomekaiju.com/core_sys/images/main/cont/character/chara09.png',
  daichi:'/art/daichi.webp',
  moa:'/art/moa.webp',
};
