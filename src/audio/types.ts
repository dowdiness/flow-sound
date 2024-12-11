export const audioNodeNames = ['osc', 'amp', 'analyser', 'out'] as const
export type audioNodeTypes = typeof audioNodeNames[number]
