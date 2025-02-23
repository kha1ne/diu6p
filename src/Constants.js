export const Players = {
  list: [
    'Babba',
    'Bata',
    'Damjan',
    'Gogi',
    'Grubač',
    'Iki',
    'Krimer',
    'Lučić',
    'Mare',
    'Miške',
    'Neša',
    'Peki',
    'Robi',
    'Šilja',
    'Žex'
  ],
  defaultDropdownValue: 'Select player'
};

export const Leaders = {
  unknown: {
    Questionmark: {
      image: require('./img/questionmark.png'),
      tooltip: 'Leader not assigned'
    }
  },
  commanders: {
    Paul: {
      image: require('./img/leaders/paul_54x54.png'),
      tooltip: "Muad'Dib"
    },
    Shaddam: {
      image: require('./img/leaders/shadam_54x54.png'),
      tooltip: 'Emperor Shaddam Corrino IV'
    }
  },
  allies: {
    Amber: {
      image: require('./img/leaders/amber_54x54.png'),
      tooltip: 'Lady Amber Metulli',
      expansion: 'Main Game'
    },
    Feyd: {
      image: require('./img/leaders/feyd_54x54.png'),
      tooltip: 'Feyd-Rautha Harkonnen',
      expansion: 'Main Game'
    },
    Gurney: {
      image: require('./img/leaders/gurney_54x54.png'),
      tooltip: 'Gurney Halleck',
      expansion: 'Main Game'
    },
    Irulan: {
      image: require('./img/leaders/irulan_54x54.png'),
      tooltip: 'Princess Irulan',
      expansion: 'Main Game'
    },
    Jessica: {
      image: require('./img/leaders/jessica_54x54.png'),
      tooltip: 'Lady Jessica',
      expansion: 'Main Game'
    },
    Margot: {
      image: require('./img/leaders/margot_54x54.png'),
      tooltip: 'Lady Margot Fenring',
      expansion: 'Main Game'
    },
    Staban: {
      image: require('./img/leaders/staban_54x54.png'),
      tooltip: 'Staban Tuek',
      expansion: 'Main Game'
    },
    Kota: {
      image: require('./img/leaders/kota_54x54.png'),
      tooltip: 'Kota Odax of Ix',
      expansion: 'Bloodlines'
    },
    Piter: {
      image: require('./img/leaders/piter_54x54.png'),
      tooltip: 'Piter de Vries',
      expansion: 'Bloodlines'
    },
    Chani: {
      image: require('./img/leaders/chani_54x54.png'),
      tooltip: 'Chani Kynes',
      expansion: 'Bloodlines'
    },
    Duncan: {
      image: require('./img/leaders/duncan_54x54.png'),
      tooltip: 'Duncan Idaho',
      expansion: 'Bloodlines'
    },
    Hasimir: {
      image: require('./img/leaders/hasimir_54x54.png'),
      tooltip: 'Count Hasimir Fenring',
      expansion: 'Bloodlines'
    },
    Yrkoon: {
      image: require('./img/leaders/yrkoon_54x54.png'),
      tooltip: "Steersman Y'rkoon",
      expansion: 'Bloodlines'
    },
    Mohiam: {
      image: require('./img/leaders/mohiam_54x54.png'),
      tooltip: 'Gaius Helen Mohiam',
      expansion: 'Bloodlines'
    },
    Esmar: {
      image: require('./img/leaders/esmar_54x54.png'),
      tooltip: 'Esmar Tuek',
      expansion: 'Bloodlines'
    }
  }
};

export const DefaultTheme = {
  typography: {
    fontFamily: ['Anta'].join(',')
  }
};
