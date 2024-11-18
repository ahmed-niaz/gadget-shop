import { Outlet } from "react-router-dom"
import Sidebar from "../components/dashboard/Sidebar"


const DashboardLayout = () => {
  return (
    <main className="grid lg:grid-cols-12">
        <section className="col-span-2">
            <Sidebar/>
        </section>
        <section className="col-span-10 p-12">
            <Outlet/>
        </section>
    </main>
  )
}

export default DashboardLayout