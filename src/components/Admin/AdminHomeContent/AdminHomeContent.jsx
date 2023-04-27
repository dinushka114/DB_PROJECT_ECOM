import React, { useState } from 'react'

const AdminHomeContent = ({ totalNoOfOrders, setAllIncome, commis }) => {

    return (
        <main>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Dashboard</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                <div className="row">
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-primary text-white mb-4">
                            <div className="card-body">Total no of orders</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <p className='mb-0'>{totalNoOfOrders}</p>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-info text-white mb-4">
                            <div className="card-body">Amount of all income</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <p className='mb-0'>Rs. {setAllIncome}.00</p>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-success text-white mb-4">
                            <div className="card-body">Platform income</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <p className='mb-0'>Rs. {commis}.00</p>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AdminHomeContent