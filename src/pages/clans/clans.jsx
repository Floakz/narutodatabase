import { useState } from "react";
import Menu from "../../components/menu/menu";
import PageHeader from "../../components/pageHeader/pageHeader";
import styles from './clans.module.css'
import Footer from "../../components/footer/footer";




export default function Clans() {


    return (
        <>

            <div className="container">
                <Menu />

                <PageHeader title={`ALL CLANS`} />




            </div>
            <Footer />
        </>
    )
}