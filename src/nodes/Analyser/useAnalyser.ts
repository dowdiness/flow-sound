import { useRef, useEffect } from 'react'

export function useAnalyser() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      throw new Error('Canvas element does not exist.');
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error('Failed to get a canvas context.');
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, [])

  return [canvasRef] as const
}
