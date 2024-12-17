import { useState, useRef, useEffect } from "react"
import { initAudioOnFirstClick } from '@/audio/context'

type own = {
  main: () => React.ReactElement,
  sub: (fc: React.Dispatch<React.SetStateAction<boolean>>, ref: React.RefObject<HTMLButtonElement>) => React.ReactElement,
}

type Props = React.ComponentProps<'div'> & own

export const Layout = ({ main, sub }: Props) => {
  const [isClicked, setIsClicked] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      initAudioOnFirstClick(buttonRef.current)
        // .then((() => console.log('then')))
        .catch((error) => {
          console.error(`Audio initialization error ${error}`)
        })
    }
  }, [])

  return (
    isClicked
      ? main()
      : sub(setIsClicked, buttonRef)
  )
}
