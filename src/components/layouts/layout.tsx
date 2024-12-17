import { useState } from "react"

type own = {
  main: () => React.ReactElement,
  sub: (fc: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactElement,
}

type Props = React.ComponentProps<'div'> & own

export const Layout = ({ main, sub }: Props) => {
  const [isClicked, setIsClicked] = useState(false)

  return (
    isClicked
      ? main()
      : sub(setIsClicked)
  )
}
