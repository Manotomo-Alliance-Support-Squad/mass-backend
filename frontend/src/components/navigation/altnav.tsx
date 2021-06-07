import { useLocation } from 'react-router-dom';
import InPageNav from '../../components/inPageNav/inPageNav';
import InfoIcon from '@material-ui/icons/Info';

const creditsNav = [                                                                                                         
    {
        link: 'https://github.com/Manotomo-Alliance-Support-Squad/aqua-sweet-dreams',                                                      
        buttonContent: "Credits",                                                                                            
        page: "",                                                                                                            
        startIcon: <InfoIcon />                                                                                              
    },                                                                                                                       
];

export default function AltNav() {
    const location = useLocation();                                                                                          
    if (location.pathname == "/home") {                                                                                      
        return <InPageNav navButtons={creditsNav}/>;                                                                         
    }                                                                                                                        
    return <span />
}
