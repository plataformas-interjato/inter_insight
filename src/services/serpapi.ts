const CACHE_DURATION = 60 * 60 * 1000; // 1 hora em milissegundos
const API_BASE_URL = '/api/trends';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface TimelineDataPoint {
  date: string;
  timestamp: string;
  values: Array<{
    query: string;
    value: string;
    extracted_value: number;
  }>;
}

interface RegionDataPoint {
  geo: string;
  location: string;
  max_value_index: number;
  values: Array<{
    query: string;
    value: string;
    extracted_value: number;
  }>;
}

interface RelatedQuery {
  query: string;
  value?: string;
  extracted_value?: number;
  link?: string;
}

// Funções de cache
const getCacheKey = (type: string, keywords: string[], geo: string): string => {
  return `serpapi_${type}_${keywords.join('_')}_${geo}`;
};

const getFromCache = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const entry: CacheEntry<T> = JSON.parse(cached);
    const now = Date.now();
    
    if (now - entry.timestamp < CACHE_DURATION) {
      return entry.data;
    }
    
    // Cache expirado, remove
    localStorage.removeItem(key);
    return null;
  } catch {
    return null;
  }
};

const saveToCache = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // Ignora erros de localStorage (quota excedida, etc)
  }
};

// Função para fazer requisição à API Route local
const fetchFromApi = async <T>(params: Record<string, string>): Promise<T> => {
  const url = new URL(API_BASE_URL, window.location.origin);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  const response = await fetch(url.toString());
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || `API error: ${response.status}`);
  }
  
  return data;
};

// Buscar Interest Over Time (gráfico de linha)
export const fetchInterestOverTime = async (
  keywords: string[],
  geo: string = 'BR-RN',
  date: string = 'today 12-m'
): Promise<TimelineDataPoint[]> => {
  const cacheKey = getCacheKey('timeseries', keywords, geo);
  
  // Verifica cache
  const cached = getFromCache<TimelineDataPoint[]>(cacheKey);
  if (cached) {
    return cached;
  }
  
  try {
    const data = await fetchFromApi<{ interest_over_time?: { timeline_data: TimelineDataPoint[] }; error?: string }>({
      q: keywords.join(','),
      geo,
      date,
      data_type: 'TIMESERIES',
    });
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    const result = data.interest_over_time?.timeline_data || [];
    saveToCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Erro ao buscar Interest Over Time:', error);
    throw error;
  }
};

// Buscar Interest by Region (mapa/ranking por região)
// GEO_MAP requer múltiplas keywords para comparação
export const fetchInterestByRegion = async (
  keywords: string[],
  geo: string = 'BR-RN',
  date: string = 'today 12-m'
): Promise<RegionDataPoint[]> => {
  const cacheKey = getCacheKey('region', keywords, geo);
  
  // Verifica cache
  const cached = getFromCache<RegionDataPoint[]>(cacheKey);
  if (cached) {
    return cached;
  }
  
  try {
    // GEO_MAP precisa de múltiplas keywords
    const data = await fetchFromApi<{ compared_breakdown_by_region?: RegionDataPoint[]; interest_by_region?: RegionDataPoint[]; error?: string }>({
      q: keywords.join(','),
      geo,
      date,
      data_type: 'GEO_MAP',
    });
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    const result = data.compared_breakdown_by_region || data.interest_by_region || [];
    saveToCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Erro ao buscar Interest by Region:', error);
    throw error;
  }
};

// Buscar Related Queries (pesquisas relacionadas)
// RELATED_QUERIES requer uma única keyword
export const fetchRelatedQueries = async (
  keywords: string[],
  geo: string = 'BR-RN',
  date: string = 'today 12-m'
): Promise<{ rising: RelatedQuery[]; top: RelatedQuery[] }> => {
  // Usa apenas a primeira keyword
  const keyword = keywords[0];
  const cacheKey = getCacheKey('related', [keyword], geo);
  
  // Verifica cache
  const cached = getFromCache<{ rising: RelatedQuery[]; top: RelatedQuery[] }>(cacheKey);
  if (cached) {
    return cached;
  }
  
  try {
    const data = await fetchFromApi<{ related_queries?: { rising?: RelatedQuery[]; top?: RelatedQuery[] }; error?: string }>({
      q: keyword,
      geo,
      date,
      data_type: 'RELATED_QUERIES',
    });
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    const result = {
      rising: data.related_queries?.rising || [],
      top: data.related_queries?.top || [],
    };
    saveToCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Erro ao buscar Related Queries:', error);
    throw error;
  }
};

// Tipos exportados
export type { TimelineDataPoint, RegionDataPoint, RelatedQuery };
