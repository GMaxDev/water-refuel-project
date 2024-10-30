import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
  return (
    <section className="dashboard-container">{children}
    </section>
  )
}
