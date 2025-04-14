import Link from "next/link"

function Gnb() {
  return (
    <header className="h-[60px] flex items-center mob:pl-[16px] mob:pr-[15px] tab:px-24px">
      <Link href="/">
        <img src="/images/Size=Large.svg" alt="logo_large" className="hidden tab:inline pc:inline" />
        <img src="/images/Size=Small.svg" alt="logo_small" className="inline tab:hidden pc:hidden" />
      </Link>
    </header>
  )
}

export default Gnb