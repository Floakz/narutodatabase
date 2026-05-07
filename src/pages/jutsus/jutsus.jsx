import { useState } from "react";
import Menu from "../../components/menu/menu";
import PageHeader from "../../components/pageHeader/pageHeader";
import styles from './jutsus.module.css'
import Footer from "../../components/footer/footer";




export default function Jutsus() {


    return (
        <>

            <div className="container">
                <Menu />

                <PageHeader title={`ALL JUTSUS`} />




            </div>
            <Footer />
        </>
    )
}