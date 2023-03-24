import NavBar from '@/components/navBar'
import SideMenu from '@/components/sideMenu'

export default function Layout({ children }) {

  return (
    <div>
      <SideMenu  />
      <div style={{marginLeft: '13vw'}}>
      <NavBar />
      <main style={{marginTop: '15vh'}}>{children}</main>
      </div>
    </div>
  )
}