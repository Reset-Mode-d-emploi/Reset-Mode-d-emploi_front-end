const dataExample = {
  name: 'Cycles & Go',
  'Nom structure': 'CYCLES&GO',
  Sites: 'CYCLES&GO',
  alt_name: 'placeholder',
  description:
    "Notre activité est le recyclage de vélos qui s'organise autour d'un atelier de réparation et remise en état de vélos (particuliers et entreprises) et d'un magasin de vente de vélos d'occasion sur l'agglomération Grenobloise",
  Objets: 'Vélos et pièces détachées',
  Action: "Je donne et j'achète d’occasion",
  repair_oneself: 'placeholder',
  repair_pro: 'bicycle',
  sell: 'bicycle',
  give: 'bicycle',
  opening_hours: 'Mo-Fr 10:00-12:00,13:00-13:00 ; Sa 10:00-15:00',
  Adresse: '15, rue Abbé-Vincent, 38600 Fontaine',
  'addr:housenumber': 15,
  'addr:housename': 'placeholder',
  'addr:street': "Rue de l'Abbé Vincent",
  'addr:city': 'Fontaine',
  'addr:postcode': 38600,
  'contact:website': 'https://www.cycles-go.com/',
  website: 'placeholder',
  'Site Web': 'www.cycles-go.com',
  'contact:phone': '+33 4 76 25 51 10',
  phone: 'placeholder',
  'contact:email': 'placeholder',
  email: 'placeholder',
  'contact:facebook': 'https://www.facebook.com/cyclesandgo/',
  wheelchair: 'placeholder',
  lat: 45.1930729,
  Latitude: 45.193166,
  lon: 5.6724496,
  Longitude: 5.672249,
  type: 'node',
  id: 5961767982,
};

const guideExample = {
  object: 'Vélo',
  ref: 'bicycle',
  part: 'Les roues',
  issue: 'Problèmes de rayons',
  tutorials: [
    'https://www.spareka.fr/comment-reparer/electromenager/cafetiere-et-expresso',
    'https://www.miss-pieces.com/diagnostic-aide-reparation-panne-machine-cafe-cafetiere__c41385.html',
  ],
};

export type DataPoint = typeof dataExample;
export type GuideData = typeof guideExample;
export type rawGSheetData = { values: string[][] };

// eslint-disable-next-line import/prefer-default-export
export function convertData(
  data: rawGSheetData | undefined | null,
  convertDatum: any
) {
  if (!data) return data;
  // The first value is in fact the header of the dataset
  return data.values
    .slice(1)
    .map((datum: string[]) => convertDatum(datum, data.values[0] as any));
}

// eslint-disable-next-line import/prefer-default-export
export function convertDataPoint(
  dataPoint: string[],
  columns: (keyof DataPoint)[]
) {
  const res: Partial<DataPoint> = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < columns.length; i++) {
    const col = columns[i];
    res[col] = dataPoint[i] as any;
  }
  return res;
}

// eslint-disable-next-line import/prefer-default-export
export function convertGuide(rawGuide: string[], columns: (keyof GuideData)[]) {
  const res: Partial<GuideData> = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < columns.length; i++) {
    const col = columns[i];
    if (col === 'tutorials') {
      res.tutorials = rawGuide[i] ? rawGuide[i].split(';') : [''];
    } else {
      res[col] = rawGuide[i];
    }
  }
  return res;
}
