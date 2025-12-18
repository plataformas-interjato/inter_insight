import { NextRequest, NextResponse } from 'next/server';

const SERPAPI_KEY = process.env.SERPAPI_KEY || '';
const SERPAPI_BASE_URL = 'https://serpapi.com/search.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const q = searchParams.get('q') || '';
  const geo = searchParams.get('geo') || 'BR-RN';
  const date = searchParams.get('date') || 'today 12-m';
  const dataType = searchParams.get('data_type') || 'TIMESERIES';

  if (!SERPAPI_KEY) {
    return NextResponse.json(
      { error: 'API Key não configurada. Adicione SERPAPI_KEY no .env.local' },
      { status: 500 }
    );
  }

  try {
    const url = new URL(SERPAPI_BASE_URL);
    url.searchParams.append('api_key', SERPAPI_KEY);
    url.searchParams.append('engine', 'google_trends');
    url.searchParams.append('q', q);
    url.searchParams.append('geo', geo);
    url.searchParams.append('date', date);
    url.searchParams.append('hl', 'pt');
    url.searchParams.append('data_type', dataType);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `SerpApi error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro na API Route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}

