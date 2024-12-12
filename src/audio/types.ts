export const audioNodeNames = ['osc', 'amp', 'analyser', 'out', 'mixer'] as const
export type audioNodeTypes = typeof audioNodeNames[number]
