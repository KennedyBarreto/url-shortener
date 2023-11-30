import React from "react";
import {FaWhatsapp, FaLink, FaRocketchat, FaQrcode, FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleDoubleDown} from "react-icons/fa"


export default function Steps(){
    return(
            <section>
            <div id="steps-reverse">
            <div> 

            <div className="step1">
                <div>
                        <FaAngleDoubleLeft className="FaAngleDoubleRight"/>
                        <FaAngleDoubleDown className="FaAngleDoubleDown"/>
                    </div>
                    <h2> Crie seu link em 3 passos </h2>
                    
                </div>

                <div className="steps-reverse">
                    <div>
                        <FaLink className="step-icons"/>
                        <h2> Abra o Innovlink </h2>
                        <p>Abra o Innovlink pelo navegador do seu computador ou celular.</p>
                    </div>
                    <div>
                        <FaRocketchat className="step-icons"/>
                        <h2> Cole ou digite o link a ser encurtado </h2>
                        <p>Preencha o campo com o link que deseja encurtar.</p>
                    </div>
                    <div>
                        <FaQrcode className="step-icons"/>
                        <h2> Copie o Link </h2>
                        <p>Clique no botão "Encurtar" e Pronto!🥳. Seu link curto está pronto para ser usado, também na versão QR CODE.</p>
                        
                    </div>
                </div>


            </div>
        </div>
        </section>
    )
}