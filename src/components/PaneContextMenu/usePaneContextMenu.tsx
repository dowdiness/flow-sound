import { useRef, useCallback, useMemo } from 'react';
import { PaneContextMenu } from './PaneContextMenu'
import { Handle } from './types'

export function usePaneContextMenu() {
  const triggerRef = useRef<Handle & HTMLSpanElement>(null);
  const _openContextMenu = useCallback((x: number, y: number) => {
    triggerRef.current?.openContextMenu(x, y)
  }, [])

  const openContextMenu = useMemo(() => _openContextMenu, [_openContextMenu])

  const contextMenuElement = <PaneContextMenu ref={triggerRef} />
  return [contextMenuElement, openContextMenu] as const
}
