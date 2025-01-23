const navListData = [
  {
    _id: 1,
    target: 'home',
    name: `Home`,
    icon: 'bi-house-door',
    active: true,
  },
  {
    _id: 2,
    target: 'categories',
    name: `Categories`,
    icon: 'bi-window-stack',
    active: false,
  },
  {
    _id: 3,
    target: 'library',
    name: `My Library`,
    icon: 'bi-heart',
    active: false,
  },
  {
    _id: 4,
    target: 'streaming',
    name: `Streaming`,
    icon: 'bi-collection-play-fill',
    isPremium: true,
    active: false,
  }
];

export default navListData;
