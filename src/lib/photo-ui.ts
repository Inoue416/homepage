export interface MemoryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface MemoryGroup {
  id: string;
  date: string;
  title: string;
  note: string;
  photo: MemoryPhoto;
}

export interface ScaleUiProposal {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  recommendation: string;
}

export const memoryGroups: MemoryGroup[] = [
  {
    id: 'spring-walk',
    date: '2026-04-12',
    title: '春の散歩と朝のコーヒー',
    note: '駅から少し歩いて、朝の光が入る店まで行った日の記録。',
    photo: {
      src: '/photo-ui/morning-window.jpg',
      alt: '朝の光が入る窓辺',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'blue-evening',
    date: '2026-05-03',
    title: '海辺を歩いた夕方',
    note: '曇り空から夕焼けに変わるまで、ゆっくり寄り道した日。',
    photo: {
      src: '/photo-ui/seaside-walk.jpg',
      alt: '夕方の海辺の道',
      width: 1300,
      height: 820,
    },
  },
  {
    id: 'small-trip',
    date: '2026-06-18',
    title: '短い旅の終わり',
    note: '公園で過ごした短い時間を、1枚だけ残した日の記録。',
    photo: {
      src: '/photo-ui/green-park.jpg',
      alt: '緑の多い公園の景色',
      width: 1200,
      height: 820,
    },
  },
];

export const scaleUiProposal: ScaleUiProposal = {
  id: 'latest-spotlight',
  title: '案5: 最新を大きく、過去を小さく',
  shortTitle: '最新重視',
  summary:
    '最新の1枚を大きく見せ、残りをコンパクトなリストで続ける案。更新直後の写真を強く印象づけられます。',
  recommendation:
    '件数が増えても最初に見るべき写真が明確で、過去の写真にもすぐ移れるため、このUIで進めます。',
};

export const scaleMemoryGroups: MemoryGroup[] = [
  ...memoryGroups,
  {
    id: 'market-morning',
    date: '2026-06-02',
    title: '朝の市場を歩く',
    note: '早い時間の静かな通りを抜けて、少しだけ買い物をした日。',
    photo: {
      src: '/photo-ui/market-lane.jpg',
      alt: '市場へ続く細い道',
      width: 800,
      height: 1200,
    },
  },
  {
    id: 'station-light',
    date: '2026-05-21',
    title: '駅前の明かり',
    note: '帰り道に少しだけ足を止めた、夜の駅前の記録。',
    photo: {
      src: '/photo-ui/station-night.jpg',
      alt: '夜に明かりが灯った駅前',
      width: 820,
      height: 1200,
    },
  },
  {
    id: 'coffee-break',
    date: '2026-05-10',
    title: '午後の休憩',
    note: '予定の合間に、短い休憩を取った時の1枚。',
    photo: {
      src: '/photo-ui/coffee-table.jpg',
      alt: 'テーブルに置いたコーヒーと朝食',
      width: 1000,
      height: 1000,
    },
  },
  {
    id: 'museum-walk',
    date: '2026-04-26',
    title: '展示室の通路',
    note: '人が少ない時間に、展示室をゆっくり歩いた日の記録。',
    photo: {
      src: '/photo-ui/museum-hall.jpg',
      alt: '静かな展示室の通路',
      width: 820,
      height: 1200,
    },
  },
  {
    id: 'small-cake',
    date: '2026-04-05',
    title: '小さなケーキ',
    note: '帰る前に寄った店で、甘いものを食べた日。',
    photo: {
      src: '/photo-ui/cake-square.jpg',
      alt: '休憩で食べた小さなケーキ',
      width: 980,
      height: 980,
    },
  },
  {
    id: 'home-dinner',
    date: '2026-03-30',
    title: '旅の終わりの夕食',
    note: '外から戻って、家で落ち着いて食べた夕食の記録。',
    photo: {
      src: '/photo-ui/home-dinner.jpg',
      alt: '旅の終わりに食べた夕食',
      width: 1000,
      height: 1000,
    },
  },
  {
    id: 'seaside-return',
    date: '2026-03-17',
    title: '海沿いの帰り道',
    note: '風が落ち着いた夕方、駅へ戻る途中で撮った1枚。',
    photo: {
      src: '/photo-ui/seaside-walk.jpg',
      alt: '夕方の海辺の道',
      width: 1300,
      height: 820,
    },
  },
  {
    id: 'park-shadow',
    date: '2026-02-24',
    title: '公園の影',
    note: '冬の終わりに、少し長くなった影を眺めた日。',
    photo: {
      src: '/photo-ui/green-park.jpg',
      alt: '緑の多い公園の景色',
      width: 1200,
      height: 820,
    },
  },
  {
    id: 'window-light',
    date: '2026-02-09',
    title: '窓辺の光',
    note: '何でもない朝に、光だけがきれいだった時の記録。',
    photo: {
      src: '/photo-ui/morning-window.jpg',
      alt: '朝の光が入る窓辺',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'market-rain',
    date: '2026-01-28',
    title: '雨上がりの市場',
    note: '雨が止んだあと、濡れた道を歩いた日の1枚。',
    photo: {
      src: '/photo-ui/market-lane.jpg',
      alt: '市場へ続く細い道',
      width: 800,
      height: 1200,
    },
  },
  {
    id: 'night-platform',
    date: '2026-01-12',
    title: '夜のホーム',
    note: 'いつもより遅い時間に帰った日の、駅の明かり。',
    photo: {
      src: '/photo-ui/station-night.jpg',
      alt: '夜に明かりが灯った駅前',
      width: 820,
      height: 1200,
    },
  },
  {
    id: 'new-year-table',
    date: '2026-01-03',
    title: '年始のテーブル',
    note: '新しい年のはじめに、静かに食事をした日の記録。',
    photo: {
      src: '/photo-ui/home-dinner.jpg',
      alt: '旅の終わりに食べた夕食',
      width: 1000,
      height: 1000,
    },
  },
];
