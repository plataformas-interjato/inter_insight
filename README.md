# InterInsights

Aplicação frontend para análise de tendências e insights de pesquisa.

## Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **Zod** - Validação de schemas
- **React Hook Form** - Gerenciamento de formulários

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js)
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── components/             # Componentes React
│   ├── ChartContainer/     # Container para gráficos (iframe/HTML)
│   ├── Header/             # Cabeçalho da aplicação
│   └── SearchTermCard/     # Cards de termos de pesquisa
├── interfaces/             # Tipos TypeScript
│   └── search-term.interface.ts
├── schemas/                # Schemas Zod
│   └── search-term.schema.ts
└── stores/                 # Stores Zustand
    └── search_terms.ts
```

## Uso

1. Clique nos cards de termos de pesquisa para selecioná-los
2. Ao selecionar um termo, o container de gráfico correspondente é exibido
3. Insira seus gráficos via iframe ou script HTML no componente `ChartContainer`

## Adicionando Gráficos

Para adicionar gráficos, edite o arquivo `src/components/ChartContainer/index.tsx`:

```tsx
<div 
  className="min-h-[300px] w-full rounded-lg bg-slate-50"
  data-chart-id={term.id}
>
  <iframe 
    src="URL_DO_SEU_GRAFICO" 
    className="h-[300px] w-full border-0"
    title={`Gráfico ${term.label}`}
  />
</div>
```

## Scripts

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Iniciar servidor de produção
- `npm run lint` - Verificar erros de lint
