import {useContext} from "react"
import {DataCentext} from "../../store/Globalstate"
import Loading from "./Loading"
import Toast from "./Toast"

const Notify = () =>{
    const {state,dispatch} = useContext(DataCentext)
    const {notify} = state

    return(
        <>
            {notify.loading && <Loading />}
            {notify.error && <Toast
                msg={{msg:notify.err, title:"Eksik veri yada tekrarlayan işlem"}}
                handleShow={() => dispatch({type: 'NOTIFY',payload:{}})}
                bgColor="red"
            />}
            {notify.success && <Toast
                msg={{msg:notify.success, title:"İşlem oluşturuldu lütfen cüzdandan ödemeyi onayla"}}
                handleShow={() => dispatch({type: 'NOTIFY',payload:{}})}
                bgColor="green"
            />}
        </>
    )
}

export default Notify