import React from 'react'
import { Link } from 'react-router-dom'

const SellerSideNav = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <a className="nav-link" href="index.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </a>
                    <div className="sb-sidenav-menu-heading">Interface</div>
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Shop
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link style={{ textDecoration: 'none' }} to={'/seller/manage-category'}><a className="nav-link" href="layout-static.html">Manage Categories</a></Link>
                            <Link style={{ textDecoration: 'none' }} to={'/seller/manage-product'}><a className="nav-link" href="layout-static.html">Manage Products</a></Link>
                        </nav>
                    </div>
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                        <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                        Orders
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <Link style={{ textDecoration: 'none' }} to={'/seller/products-tracking'}>
                                <a className="nav-link">Products tracking</a>
                            </Link>
                            <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link" href="401.html">401 Page</a>
                                    <a className="nav-link" href="404.html">404 Page</a>
                                    <a className="nav-link" href="500.html">500 Page</a>
                                </nav>
                            </div>
                        </nav>
                    </div>
                    <div className="sb-sidenav-menu-heading">Addons</div>
                    <a className="nav-link" href="charts.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                        Charts
                    </a>
                    <a className="nav-link" href="tables.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                        Tables
                    </a>
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {
                    localStorage.getItem("userName")
                }
            </div>
        </nav>
    )
}

export default SellerSideNav