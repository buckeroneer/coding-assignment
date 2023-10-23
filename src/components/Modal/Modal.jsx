import Popup from "reactjs-popup";
import { YoutubePlayer } from "../index.js";
import './modal.css'

const Modal = ({isOpen, videoKey, closeModal}) => {
    return(
        <div className="modal"> 
            <Popup
            open={isOpen}
            onClose={()=>{ closeModal() }}
            className="modalTrailer"
            >  
            <button className="btn btn-outline-dark btn-sm" id="btn-close-popup" onClick={closeModal}><b>X</b></button>         
            {videoKey ? (<YoutubePlayer videoKey={videoKey}/>) : (<h1 className="no-trailer-message">No trailer found!</h1>)}
            </Popup>
        </div>
    )

}

export default Modal;