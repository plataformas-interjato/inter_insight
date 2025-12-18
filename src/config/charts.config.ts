export interface AreaChartConfig {
  areaId: string;
  areaName: string;
  description: string;
  keywords: string[];
  geo: string;
}

export const chartsConfig: Record<string, AreaChartConfig> = {
  // Economia - ID: 1
  '1': {
    areaId: '1',
    areaName: 'Economia',
    description: 'Inflação, desemprego, crescimento e custo de vida',
    keywords: ['inflação', 'desemprego', 'crescimento', 'custo de vida'],
    geo: 'BR-RN',
  },
  // Segurança e crime - ID: 2
  '2': {
    areaId: '2',
    areaName: 'Segurança e crime',
    description: 'Violência, segurança pública e criminalidade',
    keywords: ['violência', 'segurança pública', 'crime', 'assalto'],
    geo: 'BR-RN',
  },
  // Saúde - ID: 3
  '3': {
    areaId: '3',
    areaName: 'Saúde',
    description: 'Sistema de saúde, hospitais e atendimento',
    keywords: ['saúde', 'hospital', 'SUS', 'médico'],
    geo: 'BR-RN',
  },
  // Corrupção e política - ID: 4
  '4': {
    areaId: '4',
    areaName: 'Corrupção e política',
    description: 'Corrupção, confiança em líderes e política',
    keywords: ['corrupção', 'política', 'confiança no presidente', 'confiança no prefeito'],
    geo: 'BR-RN',
  },
  // Serviços públicos sociais - ID: 5
  '5': {
    areaId: '5',
    areaName: 'Serviços públicos sociais',
    description: 'Educação, transporte e serviços públicos',
    keywords: ['educação', 'transporte público', 'saneamento', 'infraestrutura'],
    geo: 'BR-RN',
  },
  // Meio ambiente/clima - ID: 6
  '6': {
    areaId: '6',
    areaName: 'Meio ambiente/clima',
    description: 'Meio ambiente, clima e sustentabilidade',
    keywords: ['meio ambiente', 'clima', 'poluição', 'desmatamento'],
    geo: 'BR-RN',
  },
  // Migração e sociedade - ID: 7
  '7': {
    areaId: '7',
    areaName: 'Migração e sociedade',
    description: 'Migração, imigração e questões sociais',
    keywords: ['migração', 'imigração', 'refugiados', 'desigualdade'],
    geo: 'BR-RN',
  },
};
