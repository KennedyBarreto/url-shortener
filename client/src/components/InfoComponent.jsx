import React from "react";
import { FaRegHandPointer, FaBrush, FaCreativeCommonsShare , FaAngleDoubleRight, FaAngleDoubleDown} from "react-icons/fa"


export default function Info(){
    return(
        <section>
        <div id="steps">
        <div>
            <div className="step1">
                <h2> Vantagens de Encurtar links </h2>
                <div>
                    <FaAngleDoubleRight className="FaAngleDoubleRight"/>
                    <FaAngleDoubleDown className="FaAngleDoubleDown"/>
                </div>
            </div>
            
            <div className="steps">
                <div>
                    <FaCreativeCommonsShare className="step-icons"/>
                    <h2> Facilidade de Compartilhamento </h2>
                    <p>Ao encurtar um link longo, você economiza espaço e torna mais conveniente
                         o compartilhamento em mensagens, e-mails ou publicações online.</p>
                </div>
                <div>
                    <FaBrush className="step-icons"/>
                    <h2> Aparência Mais Limpa e Atraente </h2>
                    <p>Em vez de exibir URLs longas e complicadas, um link encurtado é mais limpo e mais atraente visualmente. </p>
                </div>
                <div>
                    <FaRegHandPointer className="step-icons"/>
                    <h2> Aumento da Taxa de Cliques (CTR): </h2>
                    <p>Links encurtados podem ter uma taxa de cliques (CTR) potencialmente maior 
                        em comparação com URLs longos e complexos. </p>
                    
                </div>
            </div>
        </div>
 </div>
 </section>
    )
}