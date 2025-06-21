import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import PageLayout from './routes/page-layout'
import { AxiosInterceptorWrapper } from './utils/axios'

function App() {
  return (
    <>
      <BrowserRouter>
        <AxiosInterceptorWrapper>
          <Route index element="<div></div>" />
          <Route path="/register" element="<div></div>" />
          <Route path="/login" element="<div></div>" />
          <Route path="*" element={<PageLayout />} />
        </AxiosInterceptorWrapper>
      </BrowserRouter>
    </>
  )
}

export default App;
