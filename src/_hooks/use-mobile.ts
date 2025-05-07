import { MOBILE_SIZE } from "@/_helpers/constants"
import * as React from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_SIZE - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_SIZE)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_SIZE)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
