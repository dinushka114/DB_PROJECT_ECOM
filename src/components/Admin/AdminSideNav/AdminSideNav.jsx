import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideNav = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <Link style={{ textDecoration: 'none' }} to={'/admin/'}>
                        <a className="nav-link">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </a>
                    </Link>
                    <div className="sb-sidenav-menu-heading">Orders</div>
                    <Link style={{ textDecoration: 'none' }} to={'/admin/check-orders'}>
                        <a className="nav-link" href="charts.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                            Manage Orders
                        </a>
                    </Link>
                    {/* <Link style={{ textDecoration: 'none' }} to={'/admin/manage-delivery'}>
                        <a className="nav-link" href="tables.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                            Manage delivery services
                        </a>
                    </Link> */}
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {localStorage.getItem("userName")}
            </div>
        </nav>
    )
}

export default AdminSideNav