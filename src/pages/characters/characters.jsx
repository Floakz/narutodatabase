import { useState } from "react";
import Menu from "../../components/menu/menu";
import PageHeader from "../../components/pageHeader/pageHeader";

import charactersData from '../../data/characters'
import CharacterCard from "../../components/characterCard/characterCard";

import styles from './characters.module.css'
import Footer from "../../components/footer/footer";




export default function Characters() {


    return (
        <>

            <div className="container">
                <Menu />

                <PageHeader title={`ALL  CHARACTERS`} />




            </div>
            <Footer />
        </>
    )
}