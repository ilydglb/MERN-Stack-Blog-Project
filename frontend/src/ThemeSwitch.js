import Switch from "react-switch";
import { BsMoon } from 'react-icons/bs'
import { BsSun } from 'react-icons/bs'
import useTheme from "./hooks/useTheme";

function ThemeSwitch() {
    const { theme,setTheme } = useTheme();

 const toggleTheme = () => {
  setTheme((curr) => (curr === "light" ? "dark" : "light"));
}
  return (
    
    <Switch onChange ={ toggleTheme } className="switch"
     checked={theme === "dark"}             
    checkedIcon={
     <div
     style={{
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       height: "100%",
       fontSize: 17,
       paddingLeft: 2,
       color:'white'
     }}>
    <BsMoon/>
   </div>}
    uncheckedIcon={
    
     <div
     style={{
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       height: "100%",
       fontSize: 17,
       paddingRight: 2
     }} >
    <BsSun/>
   </div>
    }
    offColor={"#789e9b"}
   onColor={"#1a0e15"}                       
    />
  )
}

export default ThemeSwitch
