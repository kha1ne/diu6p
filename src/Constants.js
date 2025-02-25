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
      expansion: 'Main Game',
      alignment: 'Neutral'
    },
    Feyd: {
      image: require('./img/leaders/feyd_54x54.png'),
      tooltip: 'Feyd-Rautha Harkonnen',
      expansion: 'Main Game',
      alignment: 'Corrino'
    },
    Gurney: {
      image: require('./img/leaders/gurney_54x54.png'),
      tooltip: 'Gurney Halleck',
      expansion: 'Main Game',
      alignment: 'Atreides'
    },
    Irulan: {
      image: require('./img/leaders/irulan_54x54.png'),
      tooltip: 'Princess Irulan',
      expansion: 'Main Game',
      alignment: 'Corrino'
    },
    Jessica: {
      image: require('./img/leaders/jessica_54x54.png'),
      tooltip: 'Lady Jessica',
      expansion: 'Main Game',
      alignment: 'Atreides'
    },
    Margot: {
      image: require('./img/leaders/margot_54x54.png'),
      tooltip: 'Lady Margot Fenring',
      expansion: 'Main Game',
      alignment: 'Corrino'
    },
    Staban: {
      image: require('./img/leaders/staban_54x54.png'),
      tooltip: 'Staban Tuek',
      expansion: 'Main Game',
      alignment: 'Atreides'
    },
    Kota: {
      image: require('./img/leaders/kota_54x54.png'),
      tooltip: 'Kota Odax of Ix',
      expansion: 'Bloodlines',
      alignment: 'Neutral'
    },
    Piter: {
      image: require('./img/leaders/piter_54x54.png'),
      tooltip: 'Piter de Vries',
      expansion: 'Bloodlines',
      alignment: 'Corrino'
    },
    Chani: {
      image: require('./img/leaders/chani_54x54.png'),
      tooltip: 'Chani Kynes',
      expansion: 'Bloodlines',
      alignment: 'Atreides'
    },
    Duncan: {
      image: require('./img/leaders/duncan_54x54.png'),
      tooltip: 'Duncan Idaho',
      expansion: 'Bloodlines',
      alignment: 'Atreides'
    },
    Hasimir: {
      image: require('./img/leaders/hasimir_54x54.png'),
      tooltip: 'Count Hasimir Fenring',
      expansion: 'Bloodlines',
      alignment: 'Corrino'
    },
    Yrkoon: {
      image: require('./img/leaders/yrkoon_54x54.png'),
      tooltip: "Steersman Y'rkoon",
      expansion: 'Bloodlines',
      alignment: 'Neutral'
    },
    Mohiam: {
      image: require('./img/leaders/mohiam_54x54.png'),
      tooltip: 'Gaius Helen Mohiam',
      expansion: 'Bloodlines',
      alignment: 'Corrino'
    },
    Esmar: {
      image: require('./img/leaders/esmar_54x54.png'),
      tooltip: 'Esmar Tuek',
      expansion: 'Bloodlines',
      alignment: 'Atreides'
    }
  }
};

export const DefaultTheme = {
  typography: {
    fontFamily: ['Anta'].join(',')
  }
};
