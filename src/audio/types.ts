export const audioNodeNames = ['osc', 'amp', 'analyser', 'out', 'mixer', 'renderer'] as const
export type audioNodeTypes = typeof audioNodeNames[number]
