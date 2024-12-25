import { forwardRef, useRef, useImperativeHandle } from 'react';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { useFlowStore, type FlowStore } from '@/store/soundStore';
import { Handle } from './types'

const selector = (store: FlowStore) => ({
  createNode: store.createNode,
});

export const PaneContextMenu = forwardRef<Handle>((props, ref) => {
  const store = useFlowStore(selector)
  const triggerRef = useRef<HTMLSpanElement>(null);

  useImperativeHandle(ref, () => {
    return {
      openContextMenu(x: number, y: number) {
        triggerRef.current?.dispatchEvent(
          new MouseEvent("contextmenu", {
            bubbles: true,
            clientX: x,
            clientY: y,
          }),
        );
      },
    };
  }, []);

  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger
        ref={triggerRef}
      >
      </ContextMenuTrigger>

      <ContextMenuContent className="w-40">
        <ContextMenuSub>
          <ContextMenuSubTrigger>Make node</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-40">
            <ContextMenuItem onSelect={() => { store.createNode('osc') }}>
              Osc
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => { store.createNode('amp') }}>
              Amp
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => { store.createNode('analyser') }}>
              Analyser
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => { store.createNode('mixer') }}>
              Mixer
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => { store.createNode('renderer') }}>
              Renderer
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
})
