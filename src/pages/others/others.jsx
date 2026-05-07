import { useState } from "react";
import Menu from "../../components/menu/menu";
import PageHeader from "../../components/pageHeader/pageHeader";
import styles from './others.module.css'
import Footer from "../../components/footer/footer";




export default function Others() {


    return (
        <>

            <div className="container">
                <Menu />

                <PageHeader title={`OTHER INTERESTING THINGS`} />




            </div>
            <Footer />
        </>
    )
}