import {BrowserRouter, Routes, Route} from "react-router-dom"
import Catalog from "../views/Catalog"
import NotFound from "../views/NotFound"
import About from "../views/About"

const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<Catalog/>}/>
                <Route path="/about" element= {<About/>}/>
                <Route path="/*" element= {<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export {RouterApp}