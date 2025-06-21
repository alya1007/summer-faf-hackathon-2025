import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PageLayout from './routes/page-layout'
import { AxiosInterceptorWrapper } from './utils/axios'

function App() {
  return (
    <>
      <BrowserRouter>
        <AxiosInterceptorWrapper>
          <Routes>
            <Route index element="<div></div>" />
            <Route path="/register" element="<div>lksjdslkd</div>" />
            <Route path="/login" element="<div>login</div>" />
            <Route path="*" element={<PageLayout />} />
          </Routes>
        </AxiosInterceptorWrapper>
      </BrowserRouter>
    </>
  )
}

export default App;
