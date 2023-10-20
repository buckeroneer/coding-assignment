import Popup from "reactjs-popup";
import YoutubePlayer from "./YoutubePlayer";
import '../styles/modal.css'

const Modal = ({isOpen, videoKey, closeModal}) => {
    return(
        <div className="modal"> 
            <Popup
            open={isOpen}
            onClose={()=>{ closeModal() }}
            className="modalTrailer"
            >  
            <button className="btn btn-outline-dark btn-sm" id="btn-close-popup" onClick={closeModal}><b>X</b></button>         
            {videoKey? (<YoutubePlayer videoKey={videoKey}/>) : (<h1 className="no-trailer-message">Not trailer found!</h1>)}
            </Popup>
        </div>
    )

}

export default Modal;