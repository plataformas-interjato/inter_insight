import { z } from 'zod';

export const colorVariantSchema = z.enum(['blue', 'red', 'yellow', 'green', 'purple']);

export const searchTermSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  label: z.string().min(1, 'Label é obrigatório'),
  color: colorVariantSchema,
});

export const chartDataPointSchema = z.object({
  month: z.string(),
  value: z.number().min(0).max(100),
});

export const termChartDataSchema = z.object({
  termId: z.string(),
  data: z.array(chartDataPointSchema),
});

export type SearchTermInput = z.infer<typeof searchTermSchema>;
export type ChartDataPointInput = z.infer<typeof chartDataPointSchema>;
export type TermChartDataInput = z.infer<typeof termChartDataSchema>;

