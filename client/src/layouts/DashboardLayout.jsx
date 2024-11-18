import { Outlet } from "react-router-dom"
import Sidebar from "../components/dashboard/Sidebar"


const DashboardLayout = () => {
  return (
    <main className="grid lg:grid-cols-12 grid-rows-12">
        <section className="lg:col-span-2 items-center justify-center">
            <Sidebar/>
        </section>
        <section className="lg:col-span-10 p-12 ">
            <Outlet/>
        </section>
    </main>
  )
}

export default DashboardLayout