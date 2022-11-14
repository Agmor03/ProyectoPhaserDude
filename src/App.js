import React, { useEffect, useState } from "react";
import Phaser from "phaser";
import Scene from './components/Scene';

export default function App() {

    //uso state de una variable listo, si no usamos esto los lienzos se acumularan en la vista
    const [listo, setListo] = useState(false);

    //usamos el hook para que renderice acciones que react no hace
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 100 }
                }
            },
            /*scene: {
                preload: preload,
                create: create
            }*/
            scene: [Scene]
        };
        //arranca el juego desde aqui
        const game = new Phaser.Game(config);

        //trigger cuando el juego esta completamente listo
        game.events.on("LISTO", setListo)

        //si no pongo esto, se acumulan duplicados del lienzo
        return () => {
            setListo(false);
            game.destroy(true);
        }
    }, [listo]);
}